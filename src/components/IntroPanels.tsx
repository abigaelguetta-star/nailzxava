import { useEffect, useState } from "react";

export function IntroPanels() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("nailz-intro");
    if (seen) { setDone(true); return; }
    const t1 = setTimeout(() => setOpen(true), 200);
    const t2 = setTimeout(() => { setDone(true); sessionStorage.setItem("nailz-intro", "1"); }, 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (done) return null;

  return (
    <>
      <div className={`intro-panel left ${open ? "open" : ""}`} aria-hidden />
      <div className={`intro-panel right ${open ? "open" : ""}`} aria-hidden />
    </>
  );
}
