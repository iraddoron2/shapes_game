import ScreenShell from "./ScreenShell";

interface Props {
  onRestart: () => void;
}

export default function FinishScreen({ onRestart }: Props) {
  return (
    <ScreenShell>
      <div className="finish">
        <h1 className="finish-text">כל הכבוד! סיימת את המשחק</h1>
        <button className="btn btn-primary" onClick={onRestart}>
          שחק שוב
        </button>
      </div>
    </ScreenShell>
  );
}
