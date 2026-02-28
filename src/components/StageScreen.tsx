import { useMemo, useRef, useState, useLayoutEffect } from "react";
import type { Stage } from "../game/types";
import { TOTAL_STAGES } from "../game/stages";
import { shuffle } from "../game/shuffle";
import ShapeCanvas from "./ShapeCanvas";

interface Props {
  stage: Stage;
  onCorrect: () => void;
  onWrong: () => void;
}

const MIN_TARGET_SIZE = 100;
const MIN_CANDIDATE_SIZE = 60;
const GRID_GAP = 16;

export default function StageScreen({ stage, onCorrect, onWrong }: Props) {
  const targetFrameRef = useRef<HTMLDivElement>(null);
  const candidatesGridRef = useRef<HTMLDivElement>(null);
  const [targetSize, setTargetSize] = useState(MIN_TARGET_SIZE);
  const [candidateSize, setCandidateSize] = useState(MIN_CANDIDATE_SIZE);

  useLayoutEffect(() => {
    const el = targetFrameRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const size = Math.max(MIN_TARGET_SIZE, Math.min(w, h));
      setTargetSize(size);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = candidatesGridRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const cellW = (w - 2 * GRID_GAP) / 3;
      const cellH = (h - GRID_GAP) / 2;
      const size = Math.max(
        MIN_CANDIDATE_SIZE,
        Math.min(cellW, cellH)
      );
      setCandidateSize(size);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const shuffledCandidates = useMemo(
    () => shuffle(stage.candidates),
    [stage]
  );

  function handleSelect(candidateId: string) {
    if (candidateId === stage.target.id) {
      onCorrect();
    } else {
      onWrong();
    }
  }

  return (
    <div className="stage-layout">
      <div className="stage-header">
        <span className="stage-indicator">
          שלב {stage.stageNumber} מתוך {TOTAL_STAGES}
        </span>
      </div>

      <div className="stage-content">
        <div className="target-panel">
          <h2 className="panel-label">הצורה לחיפוש</h2>
          <div className="target-frame" ref={targetFrameRef}>
            <ShapeCanvas
              generatorKey={stage.generatorKey}
              params={stage.target.params}
              size={targetSize}
            />
          </div>
        </div>

        <div className="stage-divider" aria-hidden />

        <div className="candidates-panel">
          <h2 className="panel-label">בחרו את הצורה הזהה</h2>
          <div className="candidates-grid" ref={candidatesGridRef}>
            {shuffledCandidates.map((candidate) => (
              <button
                key={candidate.id}
                className="candidate-card"
                onClick={() => handleSelect(candidate.id)}
              >
                <ShapeCanvas
                  generatorKey={stage.generatorKey}
                  params={candidate.params}
                  size={candidateSize}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
