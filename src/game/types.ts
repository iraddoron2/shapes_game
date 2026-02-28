export type Screen = "SPLASH" | "PLAYING" | "WIN" | "LOSE" | "FINISH";

export interface ShapeParams {
  [key: string]: unknown;
}

export interface CandidateShape {
  id: string;
  params: ShapeParams;
}

export interface Stage {
  stageNumber: number;
  generatorKey: string;
  target: CandidateShape;
  candidates: CandidateShape[];
}

export interface GameProgress {
  currentStage: number;
  maxStageReached: number;
  correctCount: number;
  wrongCount: number;
  attemptsCount: number;
  lastPlayedAt: string;
  compositionSeeds?: Record<number, number>;
}
