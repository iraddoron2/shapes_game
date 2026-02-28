import type { Stage } from "./types";

export const stages: Stage[] = [
  // Level 1 - singleCircle: vary fill color
  {
    stageNumber: 1,
    generatorKey: "singleCircle",
    target: { id: "t1", params: { fillColor: "#e74c3c" } },
    candidates: [
      { id: "c1a", params: { fillColor: "#3498db" } },
      { id: "c1b", params: { fillColor: "#2ecc71" } },
      { id: "t1", params: { fillColor: "#e74c3c" } },
      { id: "c1c", params: { fillColor: "#f39c12" } },
      { id: "c1d", params: { fillColor: "#9b59b6" } },
      { id: "c1e", params: { fillColor: "#1abc9c" } },
    ],
  },

  // Level 2 - coloredTriangle: vary color and rotation
  {
    stageNumber: 2,
    generatorKey: "coloredTriangle",
    target: { id: "t2", params: { fillColor: "#3498db", rotation: 0 } },
    candidates: [
      { id: "c2a", params: { fillColor: "#3498db", rotation: 60 } },
      { id: "c2b", params: { fillColor: "#e74c3c", rotation: 0 } },
      { id: "c2c", params: { fillColor: "#2ecc71", rotation: 30 } },
      { id: "t2", params: { fillColor: "#3498db", rotation: 0 } },
      { id: "c2d", params: { fillColor: "#3498db", rotation: 120 } },
      { id: "c2e", params: { fillColor: "#f39c12", rotation: 0 } },
    ],
  },

  // Level 3 - twoRects: vary the two colors
  {
    stageNumber: 3,
    generatorKey: "twoRects",
    target: { id: "t3", params: { color1: "#e74c3c", color2: "#3498db" } },
    candidates: [
      { id: "c3a", params: { color1: "#3498db", color2: "#e74c3c" } },
      { id: "c3b", params: { color1: "#e74c3c", color2: "#2ecc71" } },
      { id: "c3c", params: { color1: "#f39c12", color2: "#3498db" } },
      { id: "t3", params: { color1: "#e74c3c", color2: "#3498db" } },
      { id: "c3d", params: { color1: "#e74c3c", color2: "#9b59b6" } },
      { id: "c3e", params: { color1: "#2ecc71", color2: "#3498db" } },
      { id: "c3f", params: { color1: "#e74c3c", color2: "#f39c12" } },
    ],
  },

  // Level 4 - star: vary point count and color
  {
    stageNumber: 4,
    generatorKey: "star",
    target: { id: "t4", params: { numPoints: 5, fillColor: "#f39c12" } },
    candidates: [
      { id: "c4a", params: { numPoints: 6, fillColor: "#f39c12" } },
      { id: "c4b", params: { numPoints: 5, fillColor: "#e74c3c" } },
      { id: "c4c", params: { numPoints: 4, fillColor: "#f39c12" } },
      { id: "c4d", params: { numPoints: 7, fillColor: "#f39c12" } },
      { id: "t4", params: { numPoints: 5, fillColor: "#f39c12" } },
      { id: "c4e", params: { numPoints: 5, fillColor: "#9b59b6" } },
      { id: "c4f", params: { numPoints: 6, fillColor: "#e74c3c" } },
    ],
  },

  // Level 5 - concentricRings: vary ring count and colors
  {
    stageNumber: 5,
    generatorKey: "concentricRings",
    target: {
      id: "t5",
      params: { ringCount: 3, colors: ["#e74c3c", "#3498db", "#2ecc71"] },
    },
    candidates: [
      {
        id: "c5a",
        params: { ringCount: 2, colors: ["#e74c3c", "#3498db"] },
      },
      {
        id: "c5b",
        params: { ringCount: 3, colors: ["#3498db", "#e74c3c", "#2ecc71"] },
      },
      {
        id: "c5c",
        params: { ringCount: 4, colors: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12"] },
      },
      {
        id: "t5",
        params: { ringCount: 3, colors: ["#e74c3c", "#3498db", "#2ecc71"] },
      },
      {
        id: "c5d",
        params: { ringCount: 3, colors: ["#e74c3c", "#f39c12", "#2ecc71"] },
      },
      {
        id: "c5e",
        params: { ringCount: 3, colors: ["#e74c3c", "#3498db", "#9b59b6"] },
      },
      {
        id: "c5f",
        params: { ringCount: 3, colors: ["#2ecc71", "#3498db", "#e74c3c"] },
      },
      {
        id: "c5g",
        params: { ringCount: 2, colors: ["#e74c3c", "#2ecc71"] },
      },
    ],
  },

  // Level 6 - dotGrid: vary rows, cols, dot color
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
      { id: "c6f", params: { rows: 4, cols: 4, dotColor: "#2c3e50" } },
      { id: "c6g", params: { rows: 3, cols: 3, dotColor: "#3498db" } },
    ],
  },

  // Level 7 - stripes: vary count, angle, color
  {
    stageNumber: 7,
    generatorKey: "stripes",
    target: { id: "t7", params: { stripeCount: 5, angle: 45, color: "#2c3e50" } },
    candidates: [
      { id: "c7a", params: { stripeCount: 5, angle: 60, color: "#2c3e50" } },
      { id: "c7b", params: { stripeCount: 4, angle: 45, color: "#2c3e50" } },
      { id: "c7c", params: { stripeCount: 5, angle: 45, color: "#7f8c8d" } },
      { id: "c7d", params: { stripeCount: 6, angle: 45, color: "#2c3e50" } },
      { id: "c7e", params: { stripeCount: 5, angle: 30, color: "#2c3e50" } },
      { id: "t7", params: { stripeCount: 5, angle: 45, color: "#2c3e50" } },
      { id: "c7f", params: { stripeCount: 5, angle: 45, color: "#e74c3c" } },
      { id: "c7g", params: { stripeCount: 5, angle: 90, color: "#2c3e50" } },
    ],
  },

  // Level 8 - nestedSquares: vary count, rotation, colors
  {
    stageNumber: 8,
    generatorKey: "nestedSquares",
    target: {
      id: "t8",
      params: { squareCount: 3, rotation: 15, colors: ["#e74c3c", "#3498db", "#2ecc71"] },
    },
    candidates: [
      {
        id: "c8a",
        params: { squareCount: 3, rotation: 10, colors: ["#e74c3c", "#3498db", "#2ecc71"] },
      },
      {
        id: "c8b",
        params: { squareCount: 4, rotation: 15, colors: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12"] },
      },
      {
        id: "c8c",
        params: { squareCount: 3, rotation: 15, colors: ["#e74c3c", "#f39c12", "#2ecc71"] },
      },
      {
        id: "t8",
        params: { squareCount: 3, rotation: 15, colors: ["#e74c3c", "#3498db", "#2ecc71"] },
      },
      {
        id: "c8d",
        params: { squareCount: 3, rotation: 20, colors: ["#e74c3c", "#3498db", "#2ecc71"] },
      },
      {
        id: "c8e",
        params: { squareCount: 2, rotation: 15, colors: ["#e74c3c", "#3498db"] },
      },
      {
        id: "c8f",
        params: { squareCount: 3, rotation: 15, colors: ["#3498db", "#e74c3c", "#2ecc71"] },
      },
      {
        id: "c8g",
        params: { squareCount: 3, rotation: 25, colors: ["#e74c3c", "#3498db", "#2ecc71"] },
      },
      {
        id: "c8h",
        params: { squareCount: 3, rotation: 15, colors: ["#e74c3c", "#3498db", "#9b59b6"] },
      },
    ],
  },

  // Level 9 - crossHatch: vary line count, angle, color
  {
    stageNumber: 9,
    generatorKey: "crossHatch",
    target: { id: "t9", params: { lineCount: 4, angle: 45, lineColor: "#2c3e50" } },
    candidates: [
      { id: "c9a", params: { lineCount: 4, angle: 40, lineColor: "#2c3e50" } },
      { id: "c9b", params: { lineCount: 5, angle: 45, lineColor: "#2c3e50" } },
      { id: "c9c", params: { lineCount: 4, angle: 45, lineColor: "#7f8c8d" } },
      { id: "c9d", params: { lineCount: 3, angle: 45, lineColor: "#2c3e50" } },
      { id: "c9e", params: { lineCount: 4, angle: 50, lineColor: "#2c3e50" } },
      { id: "t9", params: { lineCount: 4, angle: 45, lineColor: "#2c3e50" } },
      { id: "c9f", params: { lineCount: 4, angle: 45, lineColor: "#34495e" } },
      { id: "c9g", params: { lineCount: 4, angle: 60, lineColor: "#2c3e50" } },
      { id: "c9h", params: { lineCount: 4, angle: 35, lineColor: "#2c3e50" } },
      { id: "c9i", params: { lineCount: 6, angle: 45, lineColor: "#2c3e50" } },
    ],
  },

  // Level 10 - composite: vary circle color, triangle rotation, line color
  {
    stageNumber: 10,
    generatorKey: "composite",
    target: {
      id: "t10",
      params: { circleColor: "#3498db", triRotation: 0, lineColor: "#e74c3c" },
    },
    candidates: [
      {
        id: "c10a",
        params: { circleColor: "#3498db", triRotation: 30, lineColor: "#e74c3c" },
      },
      {
        id: "c10b",
        params: { circleColor: "#3498db", triRotation: 0, lineColor: "#2c3e50" },
      },
      {
        id: "c10c",
        params: { circleColor: "#2ecc71", triRotation: 0, lineColor: "#e74c3c" },
      },
      {
        id: "c10d",
        params: { circleColor: "#3498db", triRotation: 15, lineColor: "#e74c3c" },
      },
      {
        id: "c10e",
        params: { circleColor: "#e74c3c", triRotation: 0, lineColor: "#e74c3c" },
      },
      {
        id: "t10",
        params: { circleColor: "#3498db", triRotation: 0, lineColor: "#e74c3c" },
      },
      {
        id: "c10f",
        params: { circleColor: "#3498db", triRotation: 0, lineColor: "#f39c12" },
      },
      {
        id: "c10g",
        params: { circleColor: "#9b59b6", triRotation: 0, lineColor: "#e74c3c" },
      },
      {
        id: "c10h",
        params: { circleColor: "#3498db", triRotation: 60, lineColor: "#e74c3c" },
      },
      {
        id: "c10i",
        params: { circleColor: "#3498db", triRotation: 0, lineColor: "#3498db" },
      },
    ],
  },
];
