import type { GameProgress } from "./types";

const STORAGE_KEY = "oto-davar-progress";

const DEFAULT_PROGRESS: GameProgress = {
  currentStage: 1,
  maxStageReached: 1,
  correctCount: 0,
  wrongCount: 0,
  attemptsCount: 0,
  lastPlayedAt: new Date().toISOString(),
};

export function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as GameProgress;
    if (
      typeof parsed.currentStage !== "number" ||
      typeof parsed.maxStageReached !== "number"
    ) {
      return { ...DEFAULT_PROGRESS };
    }
    return parsed;
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: GameProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
