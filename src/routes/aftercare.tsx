import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/aftercare")({
  component: Aftercare,
  head: () => ({
    meta: [
      { title: "Aftercare — nailzxava" },
      { name: "description", content: "Guide d'entretien pour garder tes ongles parfaits plus longtemps." },
    ],
  }),
});

const RULES = [
  { title: "Hydrate tes cuticules", text: "Une goutte d'huile chaque soir. Tes ongles vivent grâce à la peau autour." },
  { title: "Évite l'eau chaude prolongée", text: "Pas de bain brûlant ni de vaisselle sans gants pendant 24h après la pose." },
  { title: "Pas d'ongles comme outils", text: "Canettes, étiquettes, scotch — tout ce qui se décolle te coûte un ongle." },
  { title: "Remplissage 3-4 semaines", text: "Au-delà, le gel pousse, fragilise et tire sur ton ongle naturel." },
  { title: "Casse ? Ne tire pas", text: "Prends RDV réparation. Arracher un gel arrache aussi ton ongle." },
];

function Aftercare() {
  return (
    <div className="relative">
      <div className="bg-decor-text top-20 -left-12" aria-hidden>CARE</div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24">
        <p className="eyebrow">— Aftercare</p>
        <h1 className="headline mt-4 max-w-3xl">
          Garde-les <span className="headline-italic">parfaits</span>.
        </h1>
        <p className="text-muted-foreground max-w-md mt-6">
          5 règles. Pas plus. Suis-les et tes ongles tiendront 4 semaines easy.
        </p>

        <div className="mt-16 space-y-px">
          {RULES.map((r, i) => (
            <article key={i} className="grid grid-cols-12 gap-6 py-10 border-t border-border items-baseline">
              <div className="col-span-12 md:col-span-3">
                <p className="font-condensed text-7xl md:text-8xl text-primary/30">0{i + 1}</p>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-display text-3xl md:text-4xl italic">{r.title}.</h2>
                <p className="text-muted-foreground mt-3 max-w-xl">{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
