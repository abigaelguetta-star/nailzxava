const ITEMS = [
  "Nail Art",
  "Full Glam",
  "Pose Gel-X",
  "Motifs iconiques",
  "Mixed Art",
  "Baddie Starter Pack",
  "Subversif",
  "Minimalisme texturé",
  "Matières hybrides",
  "Bijouterie d'ongle",
  "Précision Micro-Graphique"
];

export function Marquee() {
  const content = (
    <div className="marquee-track">
      {ITEMS.concat(ITEMS).map((it, i) => (
        <span key={i} className="font-condensed text-2xl md:text-4xl uppercase">
          {it} <span className="text-primary">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee">
      {content}
      {content}
    </div>
  );
}
