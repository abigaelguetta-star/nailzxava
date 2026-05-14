import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  c: string;
  r: number;
};

const TEXT = "NAILZXAVA";

export function PointillismLogo({ height = 180 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let particles: Particle[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const buildParticles = () => {
      const w = wrap.clientWidth;
      const h = height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Render text to offscreen
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d")!;
      // Fit font size to width
      let fontSize = Math.floor(h * 0.78);
      octx.font = `700 ${fontSize}px "Bebas Neue", Impact, sans-serif`;
      let metrics = octx.measureText(TEXT);
      const maxW = w * 0.96;
      if (metrics.width > maxW) {
        fontSize = Math.floor((fontSize * maxW) / metrics.width);
        octx.font = `700 ${fontSize}px "Bebas Neue", Impact, sans-serif`;
        metrics = octx.measureText(TEXT);
      }
      octx.fillStyle = "#fff";
      octx.textBaseline = "middle";
      octx.textAlign = "center";
      octx.letterSpacing = "0.04em" as unknown as string;
      octx.fillText(TEXT, w / 2, h / 2);

      const img = octx.getImageData(0, 0, w, h).data;
      const step = Math.max(3, Math.round(fontSize / 38)); // density
      const arr: Particle[] = [];
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4;
          if (img[i + 3] > 128) {
            // metallic mix: silver vs gold
            const gold = Math.random() < 0.42;
            const c = gold
              ? `hsl(${42 + Math.random() * 10}, ${65 + Math.random() * 20}%, ${55 + Math.random() * 15}%)`
              : `hsl(0, 0%, ${72 + Math.random() * 22}%)`;
            arr.push({
              x: x + (Math.random() - 0.5),
              y: y + (Math.random() - 0.5),
              ox: x,
              oy: y,
              vx: 0,
              vy: 0,
              c,
              r: step * 0.42 + Math.random() * 0.3,
            });
          }
        }
      }
      particles = arr;
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      const mr = 90;
      const mr2 = mr * mr;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // magnetic repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < mr2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = (1 - d / mr) * 4.5;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }
        // spring back
        p.vx += (p.ox - p.x) * 0.06;
        p.vy += (p.oy - p.y) * 0.06;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onResize = () => buildParticles();

    // Wait for fonts so metrics are correct
    const start = () => {
      buildParticles();
      tick();
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [height]);

  return (
    <div ref={wrapRef} className="w-full select-none" aria-label="NAILZXAVA">
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  );
}
