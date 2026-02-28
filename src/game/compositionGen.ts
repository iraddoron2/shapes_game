import type { Stage, ShapeParams } from "./types";

// ── Seeded PRNG (mulberry32) ────────────────────
function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;

function pick<T>(rng: Rng, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function randRange(rng: Rng, min: number, max: number): number {
  return min + rng() * (max - min);
}

function randInt(rng: Rng, min: number, max: number): number {
  return Math.floor(randRange(rng, min, max + 1));
}

// ── Color palette ───────────────────────────────
const PALETTE = [
  "#e74c3c", "#3498db", "#2ecc71", "#ff69b4", "#00bcd4",
  "#f1c40f", "#e67e22", "#9b59b6", "#800000", "#1a237e",
  "#8d6e63", "#4caf50", "#ff5722", "#00e5ff", "#d500f9",
  "#ff1744", "#651fff", "#76ff03", "#ffc107", "#795548",
];

function pickColor(rng: Rng): string {
  return pick(rng, PALETTE);
}

function pickDifferentColor(rng: Rng, exclude: string): string {
  const filtered = PALETTE.filter((c) => c !== exclude);
  return pick(rng, filtered);
}

// ── Composition data types ──────────────────────
export interface RectEl {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  cr: number;
}

export interface BarEl {
  orient: "h" | "v";
  pos: number;
  len: number;
  thick: number;
  color: string;
}

export interface CellData {
  bg: string;
  rects: RectEl[];
  bars: BarEl[];
}

export interface CompositionData {
  rows: number;
  cols: number;
  cells: CellData[];
}

// ── Generate a random composition ───────────────
function generateCell(rng: Rng): CellData {
  const bg = pickColor(rng);
  const numRects = randInt(rng, 2, 3);
  const rects: RectEl[] = [];
  for (let i = 0; i < numRects; i++) {
    rects.push({
      x: randRange(rng, 0.05, 0.5),
      y: randRange(rng, 0.05, 0.5),
      w: randRange(rng, 0.25, 0.7),
      h: randRange(rng, 0.2, 0.6),
      color: pickColor(rng),
      cr: randRange(rng, 2, 8),
    });
  }

  const bars: BarEl[] = [];
  if (rng() < 0.45) {
    bars.push({
      orient: rng() < 0.5 ? "h" : "v",
      pos: randRange(rng, 0.2, 0.8),
      len: randRange(rng, 0.5, 0.95),
      thick: randRange(rng, 3, 7),
      color: pickColor(rng),
    });
  }

  return { bg, rects, bars };
}

export function generateComposition(rng: Rng, rows: number, cols: number): CompositionData {
  const cells: CellData[] = [];
  for (let i = 0; i < rows * cols; i++) {
    cells.push(generateCell(rng));
  }
  return { rows, cols, cells };
}

// ── Deep clone composition ──────────────────────
function cloneComposition(c: CompositionData): CompositionData {
  return JSON.parse(JSON.stringify(c));
}

// ── Mutate a composition ────────────────────────
export function mutateComposition(
  rng: Rng,
  src: CompositionData,
  numMutations: number
): CompositionData {
  const comp = cloneComposition(src);
  const totalCells = comp.cells.length;

  for (let m = 0; m < numMutations; m++) {
    const cellIdx = randInt(rng, 0, totalCells - 1);
    const cell = comp.cells[cellIdx];
    const action = randInt(rng, 0, 4);

    switch (action) {
      case 0:
        cell.bg = pickDifferentColor(rng, cell.bg);
        break;
      case 1:
        if (cell.rects.length > 0) {
          const ri = randInt(rng, 0, cell.rects.length - 1);
          cell.rects[ri].color = pickDifferentColor(rng, cell.rects[ri].color);
        }
        break;
      case 2:
        if (cell.rects.length > 0) {
          const ri = randInt(rng, 0, cell.rects.length - 1);
          cell.rects[ri].x = Math.min(0.65, Math.max(0.05, cell.rects[ri].x + randRange(rng, -0.15, 0.15)));
          cell.rects[ri].y = Math.min(0.65, Math.max(0.05, cell.rects[ri].y + randRange(rng, -0.15, 0.15)));
        }
        break;
      case 3:
        if (cell.rects.length > 0) {
          const ri = randInt(rng, 0, cell.rects.length - 1);
          cell.rects[ri].w = Math.min(0.8, Math.max(0.15, cell.rects[ri].w + randRange(rng, -0.15, 0.15)));
          cell.rects[ri].h = Math.min(0.7, Math.max(0.15, cell.rects[ri].h + randRange(rng, -0.15, 0.15)));
        }
        break;
      case 4:
        if (cell.bars.length === 0) {
          cell.bars.push({
            orient: rng() < 0.5 ? "h" : "v",
            pos: randRange(rng, 0.2, 0.8),
            len: randRange(rng, 0.4, 0.9),
            thick: randRange(rng, 3, 6),
            color: pickColor(rng),
          });
        } else {
          cell.bars[0].color = pickDifferentColor(rng, cell.bars[0].color);
        }
        break;
    }
  }

  return comp;
}

// ── Encode composition into ShapeParams ─────────
function compositionToParams(comp: CompositionData): ShapeParams {
  return {
    rows: comp.rows,
    cols: comp.cols,
    cells: comp.cells,
  };
}

// ── Level configs ───────────────────────────────
interface LevelConfig {
  rows: number;
  cols: number;
  mutations: number;
  seed: number;
}

const LEVEL_CONFIGS: LevelConfig[] = [
  { rows: 2, cols: 2, mutations: 5, seed: 42 },
  { rows: 2, cols: 3, mutations: 4, seed: 137 },
  { rows: 3, cols: 3, mutations: 3, seed: 256 },
  { rows: 3, cols: 4, mutations: 2, seed: 512 },
];

// ── Generate a full stage ───────────────────────
export function generateCompositionStage(
  stageNumber: number,
  overrideSeed?: number
): Stage {
  const config = LEVEL_CONFIGS[stageNumber - 1];
  const seed = overrideSeed ?? config.seed;
  const rng = mulberry32(seed);

  const targetComposition = generateComposition(rng, config.rows, config.cols);
  const targetParams = compositionToParams(targetComposition);
  const targetId = `t${stageNumber}`;

  const candidates = [];

  for (let i = 0; i < 5; i++) {
    const mutatedComp = mutateComposition(rng, targetComposition, config.mutations);
    candidates.push({
      id: `c${stageNumber}_${i}`,
      params: compositionToParams(mutatedComp),
    });
  }

  candidates.push({ id: targetId, params: targetParams });

  return {
    stageNumber,
    generatorKey: "compositionGrid",
    target: { id: targetId, params: targetParams },
    candidates,
  };
}
