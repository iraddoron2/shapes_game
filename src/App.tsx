import { useState, useCallback } from "react";
import type { Screen, GameProgress } from "./game/types";
import { stages } from "./game/stages";
import { loadProgress, saveProgress, resetProgress } from "./game/storage";
import OrientationGate from "./components/OrientationGate";
import SplashScreen from "./components/SplashScreen";
import StageScreen from "./components/StageScreen";
import ResultScreen from "./components/ResultScreen";
import FinishScreen from "./components/FinishScreen";
import "./App.css";

function App() {
  const [progress, setProgress] = useState<GameProgress>(loadProgress);
  const [screen, setScreen] = useState<Screen>("SPLASH");

  const persist = useCallback((next: GameProgress) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  const currentStage = stages[progress.currentStage - 1];

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
    if (nextStageNum > 10) {
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

  return (
    <OrientationGate>
      {screen === "SPLASH" && <SplashScreen onStart={handleStart} />}
      {screen === "PLAYING" && currentStage && (
        <StageScreen
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
