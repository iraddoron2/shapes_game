import type { Stage } from "./types";
import { generateCompositionStage } from "./compositionGen";

const COMPOSITION_LEVELS = [1, 2, 3, 4];

// Levels 5-10: existing generator-based stages, trimmed to 6 candidates each
const existingStages: Stage[] = [
  {
    stageNumber: 5,
    generatorKey: "concentricRings",
    target: {
      id: "t5",
      params: { ringCount: 3, colors: ["#e74c3c", "#3498db", "#2ecc71"] },
    },
    candidates: [
      { id: "c5a", params: { ringCount: 2, colors: ["#e74c3c", "#3498db"] } },
      { id: "c5b", params: { ringCount: 3, colors: ["#3498db", "#e74c3c", "#2ecc71"] } },
      { id: "c5c", params: { ringCount: 4, colors: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12"] } },
      { id: "t5", params: { ringCount: 3, colors: ["#e74c3c", "#3498db", "#2ecc71"] } },
      { id: "c5d", params: { ringCount: 3, colors: ["#e74c3c", "#f39c12", "#2ecc71"] } },
      { id: "c5e", params: { ringCount: 3, colors: ["#e74c3c", "#3498db", "#9b59b6"] } },
    ],
  },
  {
    stageNumber: 6,
    generatorKey: "dotGrid",
    target: { id: "t6", params: { rows: 3, cols: 3, dotColor: "#2c3e50" } },
    candidates: [
      { id: "c6a", params: { rows: 3, cols: 4, dotColor: "#2c3e50" } },
      { id: "c6b", params: { rows: 4, cols: 3, dotColor: "#2c3e50" } },
      { id: "c6c", params: { rows: 3, cols: 3, dotColor: "#e74c3c" } },
      { id: "c6d", params: { rows: 2, cols: 3, dotColor: "#2c3e50" } },
      { id: "t6", params: { rows: 3, cols: 3, dotColor: "#2c3e50" } },
      { id: "c6e", params: { rows: 3, cols: 2, dotColor: "#2c3e50" } },
    ],
  },
  {
    stageNumber: 7,
    generatorKey: "stripes",
    target: { id: "t7", params: { stripeCount: 5, angle: 45, color: "#2c3e50" } },
    candidates: [
      { id: "c7a", params: { stripeCount: 5, angle: 60, color: "#2c3e50" } },
      { id: "c7b", params: { stripeCount: 4, angle: 45, color: "#2c3e50" } },
      { id: "c7c", params: { stripeCount: 5, angle: 45, color: "#7f8c8d" } },
      { id: "c7d", params: { stripeCount: 6, angle: 45, color: "#2c3e50" } },
      { id: "t7", params: { stripeCount: 5, angle: 45, color: "#2c3e50" } },
      { id: "c7e", params: { stripeCount: 5, angle: 30, color: "#2c3e50" } },
    ],
  },
  {
    stageNumber: 8,
    generatorKey: "nestedSquares",
    target: {
      id: "t8",
      params: { squareCount: 3, rotation: 15, colors: ["#e74c3c", "#3498db", "#2ecc71"] },
    },
    candidates: [
      { id: "c8a", params: { squareCount: 3, rotation: 10, colors: ["#e74c3c", "#3498db", "#2ecc71"] } },
      { id: "c8b", params: { squareCount: 4, rotation: 15, colors: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12"] } },
      { id: "c8c", params: { squareCount: 3, rotation: 15, colors: ["#e74c3c", "#f39c12", "#2ecc71"] } },
      { id: "t8", params: { squareCount: 3, rotation: 15, colors: ["#e74c3c", "#3498db", "#2ecc71"] } },
      { id: "c8d", params: { squareCount: 3, rotation: 20, colors: ["#e74c3c", "#3498db", "#2ecc71"] } },
      { id: "c8e", params: { squareCount: 2, rotation: 15, colors: ["#e74c3c", "#3498db"] } },
    ],
  },
  {
    stageNumber: 9,
    generatorKey: "crossHatch",
    target: { id: "t9", params: { lineCount: 4, angle: 45, lineColor: "#2c3e50" } },
    candidates: [
      { id: "c9a", params: { lineCount: 4, angle: 40, lineColor: "#2c3e50" } },
      { id: "c9b", params: { lineCount: 5, angle: 45, lineColor: "#2c3e50" } },
      { id: "c9c", params: { lineCount: 4, angle: 45, lineColor: "#7f8c8d" } },
      { id: "c9d", params: { lineCount: 3, angle: 45, lineColor: "#2c3e50" } },
      { id: "t9", params: { lineCount: 4, angle: 45, lineColor: "#2c3e50" } },
      { id: "c9e", params: { lineCount: 4, angle: 50, lineColor: "#2c3e50" } },
    ],
  },
  {
    stageNumber: 10,
    generatorKey: "composite",
    target: {
      id: "t10",
      params: { circleColor: "#3498db", triRotation: 0, lineColor: "#e74c3c" },
    },
    candidates: [
      { id: "c10a", params: { circleColor: "#3498db", triRotation: 30, lineColor: "#e74c3c" } },
      { id: "c10b", params: { circleColor: "#3498db", triRotation: 0, lineColor: "#2c3e50" } },
      { id: "c10c", params: { circleColor: "#2ecc71", triRotation: 0, lineColor: "#e74c3c" } },
      { id: "c10d", params: { circleColor: "#3498db", triRotation: 15, lineColor: "#e74c3c" } },
      { id: "t10", params: { circleColor: "#3498db", triRotation: 0, lineColor: "#e74c3c" } },
      { id: "c10e", params: { circleColor: "#e74c3c", triRotation: 0, lineColor: "#e74c3c" } },
    ],
  },
];

const allStages: Stage[] = [
  ...COMPOSITION_LEVELS.map((n) => generateCompositionStage(n)),
  ...existingStages,
];

export const stages: Stage[] = allStages;

export const TOTAL_STAGES = stages.length;

export function getStage(
  level: number,
  compositionSeeds?: Record<number, number>
): Stage {
  if (COMPOSITION_LEVELS.includes(level)) {
    return generateCompositionStage(level, compositionSeeds?.[level]);
  }
  return allStages[level - 1];
}
