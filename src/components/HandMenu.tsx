import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Finger = {
  id: string;
  label: string;
  // finger base x position, height (length), nail position
  baseX: number;
  topY: number;
  bottomY: number;
  width: number;
  rotate: number;
  action: () => void;
};

export function HandMenu({ onHome }: { onHome: () => void }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  const fingers: Finger[] = [
    // pouce (à gauche, plus court, incliné)
    { id: "home", label: "HOME", baseX: 60, topY: 220, bottomY: 360, width: 46, rotate: -32, action: onHome },
    // index
    { id: "explore", label: "EXPLORE", baseX: 155, topY: 70, bottomY: 320, width: 42, rotate: -8, action: () => navigate({ to: "/selector" }) },
    // majeur (le plus long)
    { id: "booking", label: "BOOKING", baseX: 230, topY: 40, bottomY: 320, width: 44, rotate: 0, action: () => navigate({ to: "/booking" }) },
    // annulaire
    { id: "you", label: "YOU", baseX: 305, topY: 70, bottomY: 320, width: 42, rotate: 6, action: () => navigate({ to: "/portal" }) },
    // auriculaire
    { id: "guide", label: "GUIDE", baseX: 372, topY: 130, bottomY: 320, width: 36, rotate: 14, action: () => navigate({ to: "/aftercare" }) },
  ];

  return (
    <div className="relative w-full max-w-[520px] mx-auto select-none">
      <svg
        viewBox="0 0 460 540"
        className="w-full h-auto overflow-visible"
        style={{ filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.5))" }}
      >
        <defs>
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.32 0.02 30)" />
            <stop offset="100%" stopColor="oklch(0.18 0.012 30)" />
          </linearGradient>
          <linearGradient id="nailGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.04 30)" />
            <stop offset="100%" stopColor="oklch(0.55 0.04 30)" />
          </linearGradient>
          <radialGradient id="palmGrad" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0%" stopColor="oklch(0.34 0.02 30)" />
            <stop offset="100%" stopColor="oklch(0.16 0.012 30)" />
          </radialGradient>
          <filter id="nailGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* paume */}
        <path
          d="M 70 330 Q 50 380 80 460 Q 130 520 230 525 Q 330 520 380 460 Q 410 380 390 330 Z"
          fill="url(#palmGrad)"
          stroke="oklch(0.94 0.018 80 / 0.08)"
          strokeWidth="0.5"
        />

        {/* doigts */}
        {fingers.map((f) => {
          const cx = f.baseX + f.width / 2;
          const fingerHeight = f.bottomY - f.topY;
          const isHover = hovered === f.id;
          return (
            <g
              key={f.id}
              transform={`rotate(${f.rotate} ${cx} ${f.bottomY})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered(f.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={f.action}
            >
              {/* doigt */}
              <rect
                x={f.baseX}
                y={f.topY}
                width={f.width}
                height={fingerHeight}
                rx={f.width / 2}
                fill="url(#skinGrad)"
                stroke="oklch(0.94 0.018 80 / 0.06)"
                strokeWidth="0.5"
              />
              {/* phalange ligne */}
              <line
                x1={f.baseX + 6}
                x2={f.baseX + f.width - 6}
                y1={f.topY + fingerHeight * 0.45}
                y2={f.topY + fingerHeight * 0.45}
                stroke="oklch(0.94 0.018 80 / 0.08)"
                strokeWidth="0.5"
              />
              {/* ongle */}
              <ellipse
                cx={cx}
                cy={f.topY + 18}
                rx={f.width * 0.42}
                ry={22}
                fill={isHover ? "var(--pink)" : "url(#nailGrad)"}
                filter={isHover ? "url(#nailGlow)" : undefined}
                style={{ transition: "fill 0.3s ease" }}
              />
              {/* reflet */}
              <ellipse
                cx={cx - 4}
                cy={f.topY + 12}
                rx={f.width * 0.18}
                ry={6}
                fill="oklch(0.96 0.02 80 / 0.6)"
              />
              {/* hitbox transparente plus large */}
              <rect
                x={f.baseX - 6}
                y={f.topY - 18}
                width={f.width + 12}
                height={fingerHeight + 18}
                fill="transparent"
              />
            </g>
          );
        })}
      </svg>

      {/* tooltips */}
      <AnimatePresence>
        {fingers.map((f) =>
          hovered === f.id ? (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.77, 0, 0.175, 1] }}
              className="pointer-events-none absolute"
              style={{
                left: `${((f.baseX + f.width / 2) / 460) * 100}%`,
                top: `${((f.topY - 30) / 540) * 100}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="font-condensed text-primary text-xl tracking-[0.32em] whitespace-nowrap">
                {f.label}
              </div>
              <div className="h-px w-8 bg-primary mx-auto mt-1" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
