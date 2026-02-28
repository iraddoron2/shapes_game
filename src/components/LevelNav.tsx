import { useState } from "react";

interface Props {
  totalLevels: number;
  currentLevel: number;
  onSelectLevel: (level: number) => void;
  onRegenerate: () => void;
}

export default function LevelNav({
  totalLevels,
  currentLevel,
  onSelectLevel,
  onRegenerate,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelectLevel(level: number) {
    onSelectLevel(level);
    setIsOpen(false);
  }

  function handleRegenerate() {
    onRegenerate();
    setIsOpen(false);
  }

  const levelButtons = Array.from({ length: totalLevels }, (_, i) => i + 1);

  return (
    <>
      <nav className="level-nav">
        <button
          type="button"
          className="level-nav-hamburger"
          onClick={() => setIsOpen(true)}
          title="תפריט רמות"
          aria-label="תפריט רמות"
        >
          <span />
          <span />
          <span />
        </button>
        <div className="level-nav-desktop">
          <button
            className="level-nav-regenerate"
            onClick={handleRegenerate}
            title="צורות חדשות"
          >
            רענן
          </button>
          {levelButtons.map((level) => (
            <button
              key={level}
              className={`level-nav-btn${level === currentLevel ? " active" : ""}`}
              onClick={() => handleSelectLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </nav>

      {isOpen && (
        <div
          className="level-nav-overlay"
          data-open={isOpen}
          role="dialog"
          aria-modal="true"
          aria-label="בחירת שלב"
        >
          <div
            className="level-nav-overlay-backdrop"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
          <div className="level-nav-drawer">
            <div className="level-nav-drawer-header">
              <h2 className="level-nav-drawer-title">בחירת שלב</h2>
              <button
                type="button"
                className="level-nav-close"
                onClick={() => setIsOpen(false)}
                aria-label="סגור"
              >
                ×
              </button>
            </div>
            <button
              className="level-nav-regenerate level-nav-drawer-regenerate"
              onClick={handleRegenerate}
              title="צורות חדשות"
            >
              רענן
            </button>
            <div className="level-nav-drawer-grid">
              {levelButtons.map((level) => (
                <button
                  key={level}
                  className={`level-nav-btn${level === currentLevel ? " active" : ""}`}
                  onClick={() => handleSelectLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
