const ITEMS = [
  "Nail Art",
  "Full Glam",
  "Pose Gel",
  "Quiet Luxury",
  "Cyber Y2K",
  "Baddie Starter Pack",
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
