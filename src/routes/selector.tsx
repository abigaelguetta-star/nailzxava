import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { POSES, VIBES, type Vibe } from "@/lib/poses";
import { PoseCard } from "@/components/PoseCard";

export const Route = createFileRoute("/selector")({
  component: Selector,
  head: () => ({
    meta: [
      { title: "Nail Selector — nailzxava" },
      { name: "description", content: "Galerie éditoriale des créations d'Ava. Filtre par vibe et sauvegarde tes préférées." },
    ],
  }),
});

function Selector() {
  const [active, setActive] = useState<Vibe | "Tout">("Tout");

  const filtered = useMemo(
    () => active === "Tout" ? POSES : POSES.filter((p) => p.vibe === active),
    [active]
  );

  return (
    <div className="relative">
      <div className="bg-decor-text top-20 -left-12" aria-hidden>SELECT</div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-12 md:pt-20">
        <p className="eyebrow">— Nail Selector</p>
        <h1 className="headline mt-4 max-w-4xl">
          Pick your <span className="headline-italic">poison</span>.
        </h1>
        <p className="text-muted-foreground max-w-md mt-6">
          Chaque pose est une création unique. Like ce qui t'inspire pour le retrouver dans ton moodboard.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-12 no-scrollbar overflow-x-auto">
          <button onClick={() => setActive("Tout")} className={`pill ${active === "Tout" ? "active" : ""}`}>
            Tout
          </button>
          {VIBES.map((v) => (
            <button key={v} onClick={() => setActive(v)} className={`pill ${active === v ? "active" : ""}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-12 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3px]">
          {filtered.map((p) => <PoseCard key={p.id} pose={p} />)}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-24 font-display text-2xl italic">Rien dans cette vibe... encore.</p>
        )}
      </div>
    </div>
  );
}
