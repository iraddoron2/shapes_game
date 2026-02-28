import { useState, useCallback } from "react";
import type { Screen, GameProgress } from "./game/types";
import { getStage, TOTAL_STAGES } from "./game/stages";
import { loadProgress, saveProgress, resetProgress } from "./game/storage";
import OrientationGate from "./components/OrientationGate";
import LevelNav from "./components/LevelNav";
import SplashScreen from "./components/SplashScreen";
import StageScreen from "./components/StageScreen";
import ResultScreen from "./components/ResultScreen";
import FinishScreen from "./components/FinishScreen";
import "./App.css";

function App() {
  const [progress, setProgress] = useState<GameProgress>(loadProgress);
  const [screen, setScreen] = useState<Screen>("SPLASH");
  const [regenerateKey, setRegenerateKey] = useState(0);

  const persist = useCallback((next: GameProgress) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  const currentStage = getStage(
    progress.currentStage,
    progress.compositionSeeds
  );
  const showNav = screen !== "SPLASH";

  function handleStart() {
    setScreen("PLAYING");
  }

  function handleCorrect() {
    const next: GameProgress = {
      ...progress,
      correctCount: progress.correctCount + 1,
      attemptsCount: progress.attemptsCount + 1,
      maxStageReached: Math.max(
        progress.maxStageReached,
        progress.currentStage
      ),
      lastPlayedAt: new Date().toISOString(),
    };
    persist(next);
    setScreen("WIN");
  }

  function handleWrong() {
    const next: GameProgress = {
      ...progress,
      wrongCount: progress.wrongCount + 1,
      attemptsCount: progress.attemptsCount + 1,
      lastPlayedAt: new Date().toISOString(),
    };
    persist(next);
    setScreen("LOSE");
  }

  function handleNextStage() {
    const nextStageNum = progress.currentStage + 1;
    if (nextStageNum > TOTAL_STAGES) {
      setScreen("FINISH");
      return;
    }
    const next: GameProgress = {
      ...progress,
      currentStage: nextStageNum,
      maxStageReached: Math.max(progress.maxStageReached, nextStageNum),
      lastPlayedAt: new Date().toISOString(),
    };
    persist(next);
    setScreen("PLAYING");
  }

  function handleRetry() {
    setScreen("PLAYING");
  }

  function handleRestart() {
    resetProgress();
    const fresh = loadProgress();
    setProgress(fresh);
    setScreen("SPLASH");
  }

  function handleGoToLevel(level: number) {
    const next: GameProgress = {
      ...progress,
      currentStage: level,
      maxStageReached: Math.max(progress.maxStageReached, level),
      lastPlayedAt: new Date().toISOString(),
    };
    persist(next);
    setScreen("PLAYING");
  }

  function handleRegenerate() {
    const level = progress.currentStage;
    if (level >= 1 && level <= 4) {
      const seeds = { ...progress.compositionSeeds };
      seeds[level] = Date.now();
      const next: GameProgress = {
        ...progress,
        compositionSeeds: seeds,
        lastPlayedAt: new Date().toISOString(),
      };
      persist(next);
    }
    setRegenerateKey((k) => k + 1);
  }

  return (
    <OrientationGate>
      {showNav && (
        <LevelNav
          totalLevels={TOTAL_STAGES}
          currentLevel={progress.currentStage}
          onSelectLevel={handleGoToLevel}
          onRegenerate={handleRegenerate}
        />
      )}
      {screen === "SPLASH" && <SplashScreen onStart={handleStart} />}
      {screen === "PLAYING" && currentStage && (
        <StageScreen
          key={`${progress.currentStage}-${regenerateKey}`}
          stage={currentStage}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}
      {screen === "WIN" && (
        <ResultScreen variant="win" onAction={handleNextStage} />
      )}
      {screen === "LOSE" && (
        <ResultScreen variant="lose" onAction={handleRetry} />
      )}
      {screen === "FINISH" && <FinishScreen onRestart={handleRestart} />}
    </OrientationGate>
  );
}

export default App;
