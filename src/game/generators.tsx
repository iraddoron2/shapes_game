import type { ReactNode } from "react";
import { Circle, Line, RegularPolygon, Rect, Group } from "react-konva";
import type { ShapeParams } from "./types";
import type { CellData } from "./compositionGen";

type GeneratorFn = (size: number, params: ShapeParams) => ReactNode;

// ── Composition Grid (levels 1-4) ──────────────

function compositionGrid(size: number, p: ShapeParams): ReactNode {
  const rows = p.rows as number;
  const cols = p.cols as number;
  const cells = p.cells as CellData[];

  const pad = size * 0.04;
  const cellW = (size - pad * (cols + 1)) / cols;
  const cellH = (size - pad * (rows + 1)) / rows;

  const elements: ReactNode[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const cell = cells[idx];
      const cx = pad + c * (cellW + pad);
      const cy = pad + r * (cellH + pad);

      elements.push(
        <Rect
          key={`bg-${idx}`}
          x={cx}
          y={cy}
          width={cellW}
          height={cellH}
          fill={cell.bg}
          cornerRadius={4}
        />
      );

      cell.rects.forEach((rect, ri) => {
        elements.push(
          <Rect
            key={`r-${idx}-${ri}`}
            x={cx + rect.x * cellW}
            y={cy + rect.y * cellH}
            width={rect.w * cellW}
            height={rect.h * cellH}
            fill={rect.color}
            cornerRadius={rect.cr}
          />
        );
      });

      cell.bars.forEach((bar, bi) => {
        let points: number[];
        if (bar.orient === "h") {
          const y = cy + bar.pos * cellH;
          const x1 = cx + (1 - bar.len) * cellW * 0.5;
          const x2 = x1 + bar.len * cellW;
          points = [x1, y, x2, y];
        } else {
          const x = cx + bar.pos * cellW;
          const y1 = cy + (1 - bar.len) * cellH * 0.5;
          const y2 = y1 + bar.len * cellH;
          points = [x, y1, x, y2];
        }
        elements.push(
          <Line
            key={`b-${idx}-${bi}`}
            points={points}
            stroke={bar.color}
            strokeWidth={bar.thick}
            lineCap="round"
          />
        );
      });
    }
  }

  return <Group>{elements}</Group>;
}

// ── Existing generators (levels 5-10) ───────────

function concentricRings(size: number, p: ShapeParams): ReactNode {
  const count = (p.ringCount as number) ?? 3;
  const colors = (p.colors as string[]) ?? ["#e74c3c", "#3498db", "#2ecc71"];
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.4;
  const rings: ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    const r = maxR * ((count - i) / count);
    rings.push(
      <Circle key={i} x={cx} y={cy} radius={r} fill={colors[i % colors.length]} />
    );
  }
  return <Group>{rings}</Group>;
}

function dotGrid(size: number, p: ShapeParams): ReactNode {
  const rows = (p.rows as number) ?? 3;
  const cols = (p.cols as number) ?? 3;
  const color = p.dotColor as string;
  const dotR = size * 0.04;
  const padX = size * 0.2;
  const padY = size * 0.2;
  const spacingX = cols > 1 ? (size - padX * 2) / (cols - 1) : 0;
  const spacingY = rows > 1 ? (size - padY * 2) / (rows - 1) : 0;
  const dots: ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <Circle
          key={`${r}-${c}`}
          x={padX + c * spacingX}
          y={padY + r * spacingY}
          radius={dotR}
          fill={color}
        />
      );
    }
  }
  return <Group>{dots}</Group>;
}

function stripes(size: number, p: ShapeParams): ReactNode {
  const count = (p.stripeCount as number) ?? 5;
  const angle = (p.angle as number) ?? 45;
  const color = p.color as string;
  const rad = (angle * Math.PI) / 180;
  const lines: ReactNode[] = [];
  const length = size * 1.5;

  for (let i = 0; i < count; i++) {
    const offset = (size / (count + 1)) * (i + 1);
    const cx = offset;
    const cy = size / 2;
    const dx = Math.cos(rad) * length;
    const dy = Math.sin(rad) * length;
    lines.push(
      <Line
        key={i}
        points={[cx - dx / 2, cy - dy / 2, cx + dx / 2, cy + dy / 2]}
        stroke={color}
        strokeWidth={3}
      />
    );
  }
  return <Group>{lines}</Group>;
}

function nestedSquares(size: number, p: ShapeParams): ReactNode {
  const count = (p.squareCount as number) ?? 3;
  const rotation = (p.rotation as number) ?? 0;
  const colors = (p.colors as string[]) ?? ["#e74c3c", "#3498db", "#2ecc71"];
  const rects: ReactNode[] = [];
  const cx = size / 2;
  const cy = size / 2;
  for (let i = 0; i < count; i++) {
    const s = size * 0.7 * ((count - i) / count);
    rects.push(
      <Rect
        key={i}
        x={cx}
        y={cy}
        width={s}
        height={s}
        offsetX={s / 2}
        offsetY={s / 2}
        fill="transparent"
        stroke={colors[i % colors.length]}
        strokeWidth={3}
        rotation={rotation * (i + 1)}
      />
    );
  }
  return <Group>{rects}</Group>;
}

function crossHatch(size: number, p: ShapeParams): ReactNode {
  const count = (p.lineCount as number) ?? 4;
  const angle = (p.angle as number) ?? 45;
  const color = p.lineColor as string;
  const lines: ReactNode[] = [];
  const length = size * 1.5;

  for (let i = 0; i < count; i++) {
    const offset = (size / (count + 1)) * (i + 1);
    for (const dir of [1, -1]) {
      const rad = (angle * dir * Math.PI) / 180;
      const cx = offset;
      const cy = size / 2;
      const dx = Math.cos(rad) * length;
      const dy = Math.sin(rad) * length;
      lines.push(
        <Line
          key={`${i}-${dir}`}
          points={[cx - dx / 2, cy - dy / 2, cx + dx / 2, cy + dy / 2]}
          stroke={color}
          strokeWidth={2}
        />
      );
    }
  }
  return <Group>{lines}</Group>;
}

function composite(size: number, p: ShapeParams): ReactNode {
  const circleColor = p.circleColor as string;
  const triRotation = (p.triRotation as number) ?? 0;
  const lineColor = p.lineColor as string;
  const cx = size / 2;
  const cy = size / 2;
  return (
    <Group>
      <Circle x={cx} y={cy} radius={size * 0.3} fill={circleColor} />
      <RegularPolygon
        x={cx}
        y={cy}
        sides={3}
        radius={size * 0.2}
        fill="transparent"
        stroke="#333"
        strokeWidth={2}
        rotation={triRotation}
      />
      <Line
        points={[size * 0.15, cy, size * 0.85, cy]}
        stroke={lineColor}
        strokeWidth={3}
      />
    </Group>
  );
}

export const generators: Record<string, GeneratorFn> = {
  compositionGrid,
  concentricRings,
  dotGrid,
  stripes,
  nestedSquares,
  crossHatch,
  composite,
};
