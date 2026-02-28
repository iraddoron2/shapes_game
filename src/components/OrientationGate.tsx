import { useEffect, useState } from "react";

function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export default function OrientationGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    function check() {
      const mobile = isMobileDevice() || window.innerWidth < 1024;
      const portrait = window.innerHeight > window.innerWidth;
      setBlocked(mobile && portrait);
    }

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (blocked) {
    return (
      <div className="orientation-overlay">
        <p>כדי לראות את המשחק, סובבו את הטלפון</p>
      </div>
    );
  }

  return <>{children}</>;
}
