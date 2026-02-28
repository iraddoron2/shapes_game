import ScreenShell from "./ScreenShell";

interface Props {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: Props) {
  return (
    <ScreenShell>
      <div className="splash">
        <h1 className="splash-title">אותו דבר</h1>
        <p className="splash-instructions">
          מצא איזה ריבוע זהה בדיוק לריבוע בצד ימין.
        </p>
        <button className="btn btn-primary" onClick={onStart}>
          התחל
        </button>
      </div>
    </ScreenShell>
  );
}
