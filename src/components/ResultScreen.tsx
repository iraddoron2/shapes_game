import ScreenShell from "./ScreenShell";

interface Props {
  variant: "win" | "lose";
  onAction: () => void;
}

export default function ResultScreen({ variant, onAction }: Props) {
  const isWin = variant === "win";

  return (
    <ScreenShell>
      <div className={`result ${isWin ? "result-win" : "result-lose"}`}>
        <h1 className="result-text">
          {isWin ? "תשובה נכונה" : "תשובה לא נכונה"}
        </h1>
        <button className="btn btn-primary" onClick={onAction}>
          {isWin ? "שלב הבא" : "נסו שוב"}
        </button>
      </div>
    </ScreenShell>
  );
}
