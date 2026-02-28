import { useMemo } from "react";
import type { Stage } from "../game/types";
import { shuffle } from "../game/shuffle";
import ShapeCanvas from "./ShapeCanvas";

interface Props {
  stage: Stage;
  onCorrect: () => void;
  onWrong: () => void;
}

export default function StageScreen({ stage, onCorrect, onWrong }: Props) {
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
          שלב {stage.stageNumber} מתוך 10
        </span>
      </div>

      <div className="stage-content">
        <div className="target-panel">
          <h2 className="panel-label">הצורה לחיפוש</h2>
          <div className="target-frame">
            <ShapeCanvas
              generatorKey={stage.generatorKey}
              params={stage.target.params}
              size={200}
            />
          </div>
        </div>

        <div className="candidates-panel">
          <h2 className="panel-label">בחרו את הצורה הזהה</h2>
          <div className="candidates-grid">
            {shuffledCandidates.map((candidate) => (
              <button
                key={candidate.id}
                className="candidate-card"
                onClick={() => handleSelect(candidate.id)}
              >
                <ShapeCanvas
                  generatorKey={stage.generatorKey}
                  params={candidate.params}
                  size={120}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
