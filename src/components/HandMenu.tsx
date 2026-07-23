import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import handImg from "@/assets/hand.png";

type Zone = {
  id: string;
  label: string;
  // position en % sur l'image
  left: string;
  top: string;
  width: string;
  height: string;
  action: () => void;
};

export function HandMenu({ onHome }: { onHome: () => void }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  const zones: Zone[] = [
  {
    id: "home",
    label: "HOME",
    // auriculaire — cheetah, penché à gauche
    left: "65%", top: "0%", width: "15%", height: "20%",
    action: onHome,
  },
  {
    id: "explore",
    label: "EXPLORE",
    // index — chrome noir, 2ème doigt
    left: "19%", top: "3%", width: "15%", height: "20%",
    action: () => navigate({ to: "/selector" }),
  },
  {
    id: "booking",
    label: "BOOKING",
    // majeur — aura violet, centre
    left: "35%", top: "0%", width: "16%", height: "33%",
    action: () => navigate({ to: "/booking" }),
  },
  {
    id: "guide",
    label: "GUIDE",
    // annulaire — ombre rose/étoile
    left: "51%", top: "3%", width: "15%", height: "30%",
    action: () => navigate({ to: "/aftercare" }),
  },
  {
    id: "you",
    label: "YOU",
    // pouce — french rose/noir, bas droite
    left: "72%", top: "48%", width: "20%", height: "28%",
    action: () => navigate({ to: "/portal" }),
  },
];

  return (
    <div className="relative w-full max-w-[480px] mx-auto select-none">
      {/* Image de la main détourée */}
      <img
        src={handImg}
        alt="Main nailzxava"
        className="w-full h-auto"
        draggable={false}
        style={{ filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.5))" }}
      />

      {/* Zones cliquables par-dessus chaque ongle */}
      {zones.map((z) => (
        <div
          key={z.id}
          className="absolute group"
          style={{
            left: z.left,
            top: z.top,
            width: z.width,
            height: z.height,
            cursor: "none",
          }}
          onMouseEnter={() => setHovered(z.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={z.action}
        >
          {/* Glow rose au hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            style={{
              background: "radial-gradient(ellipse at 50% 30%, rgba(255,0,102,0.4) 0%, transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
        </div>
      ))}

      {/* Tooltips au-dessus des doigts */}
      <AnimatePresence>
        {zones.map((z) =>
          hovered === z.id ? (
            <motion.div
              key={z.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.77, 0, 0.175, 1] }}
              className="pointer-events-none absolute"
              style={{
                left: `calc(${z.left} + calc(${z.width} / 2))`,
                top: z.top,
                transform: "translate(-50%, -110%)",
              }}
            >
              <div className="font-condensed text-primary text-xl tracking-[0.32em] whitespace-nowrap">
                {z.label}
              </div>
              <div className="h-px w-8 bg-primary mx-auto mt-1" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
