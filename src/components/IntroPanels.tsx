import { useEffect, useState } from "react";

export const INTRO_REPLAY_EVENT = "nailz-intro-replay";

export function IntroPanels() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("nailz-intro");
    if (!seen) {
      runSequence(true);
      sessionStorage.setItem("nailz-intro", "1");
    }
    const onReplay = () => runSequence(false);
    window.addEventListener(INTRO_REPLAY_EVENT, onReplay);
    return () => window.removeEventListener(INTRO_REPLAY_EVENT, onReplay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runSequence(initial: boolean) {
    setMounted(true);
    setOpen(false);
    const t1 = setTimeout(() => setOpen(true), initial ? 250 : 450);
    const t2 = setTimeout(() => setMounted(false), initial ? 1700 : 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }

  if (!mounted) return null;

  return (
    <>
      <div className={`intro-panel left ${open ? "open" : ""}`} aria-hidden>
        <div className="intro-panel-inner" />
      </div>
      <div className={`intro-panel right ${open ? "open" : ""}`} aria-hidden>
        <div className="intro-panel-inner" />
      </div>
    </>
  );
}

export function triggerIntroReplay() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(INTRO_REPLAY_EVENT));
  }
}
