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

const TIPS = [
  {
    num: "01",
    title: "L'eau chaude,\navec modération",
    text: "Les 24 premières heures après ta pose, évite les bains chauds prolongés et la vaisselle sans gants. Le gel a besoin de ce temps pour bien adhérer. Après ça, tu vis ta vie normalement.",
    side: "left",
    doodle: "drops",
  },
  {
    num: "02",
    title: "Elles sont solides,\nmais c'est pas des outils",
    text: "Je fais des poses qui tiennent : mes clientes font du sport, leur vie, sans problème. Mais forcer une serrure ou gratter une surface dure en répétition, c'est chercher les ennuis. Un peu de bon sens et ça dure.",
    side: "right",
    doodle: "hammer",
  },
  {
    num: "03",
    title: "Reviens avant\nque ça pousse trop",
    text: "3 à 4 semaines c'est le bon timing pour un remplissage. Au-delà, la repousse crée une pression sur le gel qui finit par le soulever. Mieux vaut revenir un peu tôt que d'attendre trop longtemps.",
    side: "left",
    doodle: "tape",
  },
  {
    num: "04",
    title: "Prends soin de tes\nongles naturels",
    text: "Entre deux rendez-vous, laisse respirer tes ongles si tu peux. Une petite pause de temps en temps, c'est ce qui garde tes ongles naturels en bonne santé sur le long terme.",
    side: "right",
    doodle: "polish",
  },
  {
    num: "05",
    title: "En cas de casse,\nne tire pas",
    text: "Je sais que le réflexe c'est d'arranger ça soi-même. Mais arracher un gel abîme l'ongle naturel en dessous! Envoie-moi un DM, on règle ça en réparation rapide.",
    side: "left",
    doodle: "phone",
  },
];

function DoodleDrops() {
  return (
    <svg width="76" height="100" viewBox="0 0 76 100" overflow="visible">
      <g><animateTransform attributeName="transform" type="translate" values="0,0;0,-9;0,0" dur="2.4s" repeatCount="indefinite" begin="0s" calcMode="easeInOut"/>
        <path d="M12,76 C4,76 0,69 0,62 C0,52 12,30 12,30 C12,30 24,52 24,62 C24,69 20,76 12,76Z" fill="none" stroke="#1a1209" strokeWidth="2.2" strokeLinecap="round"/>
      </g>
      <g><animateTransform attributeName="transform" type="translate" values="0,0;0,-9;0,0" dur="2.4s" repeatCount="indefinite" begin="0s" calcMode="easeInOut"/>
        <path d="M64,76 C56,76 52,69 52,62 C52,52 64,30 64,30 C64,30 76,52 76,62 C76,69 72,76 64,76Z" fill="none" stroke="#1a1209" strokeWidth="2.2" strokeLinecap="round"/>
      </g>
      <g><animateTransform attributeName="transform" type="translate" values="0,0;0,-9;0,0" dur="2.4s" repeatCount="indefinite" begin="1.2s" calcMode="easeInOut"/>
        <path d="M38,74 C30,74 26,67 26,60 C26,50 38,28 38,28 C38,28 50,50 50,60 C50,67 46,74 38,74Z" fill="none" stroke="#1a1209" strokeWidth="2.2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function DoodleHammer() {
  return (
    <svg width="76" height="100" viewBox="0 0 76 100" overflow="visible">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 38 82;-16 38 82;16 38 82;0 38 82" dur="2.2s" repeatCount="indefinite" begin="0s" calcMode="easeInOut"/>
        <rect x="34" y="44" width="8" height="46" rx="4" fill="none" stroke="#1a1209" strokeWidth="2.2"/>
        <rect x="14" y="24" width="48" height="22" rx="4" fill="none" stroke="#1a1209" strokeWidth="2.2"/>
      </g>
    </svg>
  );
}

function DoodleTape() {
  return (
    <svg width="76" height="110" viewBox="0 0 76 110" overflow="visible">
      <rect x="14" y="22" width="44" height="34" rx="10" fill="none" stroke="#1a1209" strokeWidth="2.2"/>
      <circle cx="36" cy="39" r="8" fill="none" stroke="#1a1209" strokeWidth="1.8"/>
      <circle cx="36" cy="39" r="3" fill="#1a1209" opacity={0.25}/>
      <rect x="32" y="56" width="8" rx="2" fill="#e8dcc0" stroke="#1a1209" strokeWidth="1.8">
        <animate attributeName="height" values="0;28;0" dur="2.6s" repeatCount="indefinite" calcMode="easeInOut"/>
      </rect>
      <line x1="32" x2="37" stroke="#1a1209" strokeWidth="1.2">
        <animate attributeName="y1" values="60;68;60" dur="2.6s" repeatCount="indefinite" calcMode="easeInOut"/>
        <animate attributeName="y2" values="60;68;60" dur="2.6s" repeatCount="indefinite" calcMode="easeInOut"/>
        <animate attributeName="opacity" values="0;1;0" dur="2.6s" repeatCount="indefinite" calcMode="easeInOut"/>
      </line>
      <line x1="32" x2="35" stroke="#1a1209" strokeWidth="1">
        <animate attributeName="y1" values="60;74;60" dur="2.6s" repeatCount="indefinite" calcMode="easeInOut"/>
        <animate attributeName="y2" values="60;74;60" dur="2.6s" repeatCount="indefinite" calcMode="easeInOut"/>
        <animate attributeName="opacity" values="0;0.8;0" dur="2.6s" repeatCount="indefinite" calcMode="easeInOut"/>
      </line>
      <line x1="32" x2="37" stroke="#1a1209" strokeWidth="1.2">
        <animate attributeName="y1" values="56;82;56" dur="2.6s" repeatCount="indefinite" calcMode="easeInOut"/>
        <animate attributeName="y2" values="56;82;56" dur="2.6s" repeatCount="indefinite" calcMode="easeInOut"/>
        <animate attributeName="opacity" values="0;0.6;0" dur="2.6s" repeatCount="indefinite" calcMode="easeInOut"/>
      </line>
    </svg>
  );
}

function DoodlePolish() {
  return (
    <svg width="76" height="110" viewBox="0 0 76 110" overflow="visible">
      <rect x="8" y="48" width="26" height="40" rx="5" fill="none" stroke="#1a1209" strokeWidth="2.2"/>
      <rect x="12" y="34" width="18" height="16" rx="3" fill="none" stroke="#1a1209" strokeWidth="2"/>
      <rect x="9" y="24" width="24" height="12" rx="4" fill="none" stroke="#1a1209" strokeWidth="2.2"/>
      <rect x="9" y="70" width="24" height="16" fill="#FF0066" opacity={0.18}/>
      <line x1="14" y1="52" x2="14" y2="74" stroke="white" strokeWidth="2" strokeLinecap="round" opacity={0.3}/>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;10,0;0,0;-10,0;0,0" dur="1.8s" repeatCount="indefinite" calcMode="easeInOut"/>
        <line x1="50" y1="20" x2="50" y2="65" stroke="#1a1209" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="50" y1="65" x2="46" y2="80" stroke="#1a1209" strokeWidth="2" strokeLinecap="round"/>
        <line x1="50" y1="65" x2="50" y2="81" stroke="#1a1209" strokeWidth="2" strokeLinecap="round"/>
        <line x1="50" y1="65" x2="54" y2="80" stroke="#1a1209" strokeWidth="2" strokeLinecap="round"/>
        <path d="M36,90 Q50,87 64,90" fill="none" stroke="#FF0066" strokeWidth="3" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function DoodlePhone() {
  return (
    <svg width="76" height="110" viewBox="0 0 76 110" overflow="visible">
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;-4,0;4,0;-4,0;0,0" dur="1.8s" repeatCount="indefinite" calcMode="easeInOut"/>
        <rect x="18" y="15" width="36" height="64" rx="7" fill="none" stroke="#1a1209" strokeWidth="2.2"/>
        <rect x="22" y="24" width="28" height="40" rx="2" fill="none" stroke="#1a1209" strokeWidth="1.3"/>
        <text x="36" y="47" textAnchor="middle" fontFamily="'Kalam',cursive" fontSize="11" fill="#FF0066" fontWeight="700">RDV</text>
        <line x1="26" y1="54" x2="46" y2="54" stroke="#FF0066" strokeWidth="1" opacity={0.5}/>
        <circle cx="36" cy="72" r="4.5" fill="none" stroke="#1a1209" strokeWidth="1.8"/>
        <rect x="28" y="18" width="16" height="3" rx="1.5" fill="#1a1209" opacity={0.35}/>
        <circle cx="46" cy="22" r="6" fill="#FF0066"/>
        <text x="46" y="26" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="white" fontWeight="700">!</text>
      </g>
    </svg>
  );
}

const DOODLES: Record<string, () => JSX.Element> = {
  drops: DoodleDrops,
  hammer: DoodleHammer,
  tape: DoodleTape,
  polish: DoodlePolish,
  phone: DoodlePhone,
};

function Aftercare() {
  return (
    <div className="relative min-h-screen bg-background">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&display=swap');
        .ballet { font-family: 'Ballet', cursive; }
        .paper-clip { 
          clip-path: polygon(0% 0%,2% 0.3%,4% 0%,6% 0.5%,8% 0.1%,10% 0.4%,12% 0%,14% 0.3%,16% 0.1%,18% 0.4%,20% 0%,22% 0.3%,24% 0.1%,26% 0.4%,28% 0%,30% 0.3%,32% 0.1%,34% 0.4%,36% 0%,38% 0.3%,40% 0.1%,42% 0.4%,44% 0%,46% 0.3%,48% 0.1%,50% 0.4%,52% 0%,54% 0.3%,56% 0.1%,58% 0.4%,60% 0%,62% 0.3%,64% 0.1%,66% 0.4%,68% 0%,70% 0.3%,72% 0.1%,74% 0.4%,76% 0%,78% 0.3%,80% 0.1%,82% 0.4%,84% 0%,86% 0.3%,88% 0.1%,90% 0.4%,92% 0%,94% 0.3%,96% 0.1%,100% 2%,99.5% 10%,100% 18%,99.3% 26%,100% 34%,99.5% 42%,100% 50%,99.3% 58%,100% 66%,99.5% 74%,100% 82%,99.3% 90%,98% 98%,96% 99.7%,94% 100%,92% 99.6%,90% 100%,88% 99.7%,86% 100%,84% 99.6%,82% 100%,80% 99.7%,78% 100%,76% 99.6%,74% 100%,72% 99.7%,70% 100%,68% 99.6%,66% 100%,64% 99.7%,62% 100%,60% 99.6%,58% 100%,56% 99.7%,54% 100%,52% 99.6%,50% 100%,48% 99.7%,46% 100%,44% 99.6%,42% 100%,40% 99.7%,38% 100%,36% 99.6%,34% 100%,32% 99.7%,30% 100%,28% 99.6%,26% 100%,24% 99.7%,22% 100%,20% 99.6%,18% 100%,16% 99.7%,14% 100%,12% 99.6%,10% 100%,8% 99.7%,6% 100%,4% 99.6%,2% 100%,0% 99.7%);
        }
        .hole-wrap { width:28px; height:28px; position:relative; }
        .hole-wrap::before { content:''; position:absolute; inset:4px; background:var(--background); border-radius:50%; }
        .hole-wrap::after { content:''; position:absolute; inset:-4px; border-radius:50%; box-shadow:inset 0 0 0 3px #c8b48a,2px -2px 0 1px #b8a07a,-3px 2px 0 1px #c0aa80; clip-path:polygon(20% 0%,80% 5%,100% 20%,95% 80%,80% 100%,20% 95%,0% 80%,5% 20%); }
      `}</style>

      <div className="max-w-[760px] mx-auto px-6 pt-12 md:pt-20 pb-4">
        <p className="eyebrow">— Aftercare</p>
        <h1 className="headline mt-4">
          Garde-les <span className="headline-italic">parfaits.</span>
        </h1>
      </div>

      {/* PAPER */}
      <div className="max-w-[760px] mx-auto px-6 pb-8 relative">
        <div
          className="paper-clip relative"
          style={{
            background: "#ede4cc",
            padding: "64px 72px 72px 88px",
            boxShadow: "inset 40px 0 60px rgba(0,0,0,0.06), inset 120px 80px 100px rgba(255,255,255,0.12), 0 20px 80px rgba(0,0,0,0.3)",
            animation: "popIn .5s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
        >
          {/* HOLES */}
          <div className="absolute -left-4 top-0 bottom-0 flex flex-col justify-evenly pointer-events-none z-10">
            {[0,1,2,3,4].map(i => <div key={i} className="hole-wrap"/>)}
          </div>

          {/* TIPS */}
          {TIPS.map((tip, i) => {
            const DoodleComponent = DOODLES[tip.doodle];
            const isRight = tip.side === "right";
            return (
              <div key={i}>
                <div className={`flex items-start gap-5 mb-11 ${isRight ? "flex-row-reverse" : ""}`}>
                  <div className="flex-shrink-0 w-20 flex items-center justify-center pt-2">
                    <DoodleComponent />
                  </div>
                  <div className="flex-1">
                    <p className="ballet text-sm mb-1" style={{ color: "#FF0066" }}>— {tip.num}</p>
                    <h2 className="ballet text-2xl mb-2 leading-snug whitespace-pre-line" style={{ color: "#FF0066" }}>{tip.title}</h2>
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: "17px", color: "#1a1209", lineHeight: 1.6 }}>{tip.text}</p>
                  </div>
                </div>
                {i < TIPS.length - 1 && (
                  <hr style={{ border: "none", borderTop: "1px dashed #c0aa80", marginBottom: "44px" }}/>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA hors feuille */}
      <div className="max-w-[760px] mx-auto px-6 pb-24 text-center">
        <p className="font-display text-xl italic text-muted-foreground mb-4">
          Prêt<em>(e)</em> pour ta prochaine pose ?
        </p>
        <a href="/booking" className="btn-outline-pink text-xs uppercase tracking-[0.2em]">
          Réserver →
        </a>
      </div>
    </div>
  );
}
