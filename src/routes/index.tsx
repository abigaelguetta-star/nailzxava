import { createFileRoute, Link } from "@tanstack/react-router";
import { Marquee } from "@/components/Marquee";
import { PoseCard } from "@/components/PoseCard";
import { POSES, SERVICES } from "@/lib/poses";
import { PointillismLogo } from "@/components/PointillismLogo";
import { HandMenu } from "@/components/HandMenu";
import { triggerIntroReplay } from "@/components/IntroPanels";
import { ArrowRight, Heart, Calendar, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "nailzxava — L'onglerie comme pièce d'archive" },
      {
        name: "description",
        content:
          "Univers NAILZXAVA : luxe brut, esthétique cinématographique, chrome liquide et glamour sauvage. L'art de la baddie élevé au rang d'icône.",
      },
    ],
  }),
});

function Index() {
  const featured = POSES.slice(0, 4);

  return (
    <>
      {/* HERO — Pointillism + Hand */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex flex-col items-center justify-start pt-20 md:pt-28 pb-16">
        <div className="bg-decor-text top-12 -left-8" aria-hidden>
          NAILZ
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <p className="eyebrow reveal">— Editorial nails · Paris · 2026</p>

          {/* Pointillism interactive logo */}
          <div className="w-full mt-8 reveal reveal-delay-1">
            <PointillismLogo height={200} />
          </div>

          {/* Description FR */}
          <p className="mt-10 max-w-2xl text-center text-base md:text-lg leading-relaxed text-foreground/80 font-display italic reveal reveal-delay-2">
            Bienvenue dans l'univers NAILZXAVA, où l'onglerie devient une pièce d'archive.
            Entre luxe brut et esthétique cinématographique, nous sculptons votre identité
            jusqu'au bout des doigts. Ici, chaque pose est un manifeste de confiance,
            un mélange de chrome liquide et de glamour sauvage.
            <br />
            <span className="not-italic font-body text-sm uppercase tracking-[0.32em] text-primary mt-4 inline-block">
              Redéfinissez votre allure — affirmez votre vibe.
            </span>
          </p>

          {/* Hand menu */}
          <div className="mt-14 w-full reveal reveal-delay-3">
            <p className="eyebrow text-center mb-6">— Choisissez votre doigt</p>
            <HandMenu onHome={triggerIntroReplay} />
          </div>
        </div>
      </section>

      <Marquee />

      {/* NAIL SELECTOR PREVIEW */}
      <section className="relative max-w-[1600px] mx-auto px-6 md:px-10 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <p className="eyebrow">— 01 Nail Selector</p>
            <h2 className="font-display text-5xl md:text-7xl font-medium mt-3">
              Choisis ta <span className="italic text-primary">vibe</span>.
            </h2>
          </div>
          <Link
            to="/selector"
            className="link-underline text-sm uppercase tracking-[0.2em] flex items-center gap-2"
          >
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px]">
          {featured.map((p) => (
            <PoseCard key={p.id} pose={p} />
          ))}
        </div>
      </section>

      {/* BOOKING PREVIEW */}
      <section className="relative bg-surface border-y border-border">
        <div className="bg-decor-text -top-8 right-0 text-right" aria-hidden>
          BOOK
        </div>
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 py-24 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow">— 02 Booking</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium mt-3">
              Réserve ton <span className="italic text-primary">moment</span>.
            </h2>
            <p className="text-muted-foreground mt-6 max-w-md">
              5 étapes. Choisis ta prestation, tes options, ton créneau et l'ambiance de ton RDV.
            </p>
            <Link to="/booking" className="inline-block mt-8">
              <button className="btn-pink">
                <span>Commencer</span>
              </button>
            </Link>
          </div>
          <div className="md:col-span-7 space-y-px">
            {SERVICES.map((s, i) => (
              <div
                key={s.id}
                className="flex items-baseline justify-between py-6 border-b border-border hover-lift"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-condensed text-primary text-xl">0{i + 1}</span>
                  <p className="font-display text-2xl md:text-3xl">{s.name}</p>
                </div>
                <span className="eyebrow">{s.duration} min</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTAL PREVIEW */}
      <section className="relative max-w-[1600px] mx-auto px-6 md:px-10 py-24">
        <p className="eyebrow text-center">— 03 Baddie Portal</p>
        <h2 className="font-display text-5xl md:text-7xl font-medium mt-3 text-center">
          Ton espace, <span className="italic text-primary">ta vibe</span>.
        </h2>

        <div className="grid md:grid-cols-3 gap-px mt-16 border border-border">
          {[
            { icon: Heart, title: "Mon Moodboard", desc: "Sauvegarde tes poses préférées." },
            { icon: Calendar, title: "Mes RDV", desc: "Historique et prochains rendez-vous." },
            { icon: Sparkles, title: "Fidélité", desc: "5 poses = 1 nail art offert." },
          ].map((b) => (
            <div key={b.title} className="bg-background p-10 hover-lift">
              <div className="w-12 h-12 rounded-full border border-primary text-primary grid place-items-center mb-6">
                <b.icon className="w-5 h-5" />
              </div>
              <p className="font-display text-3xl">{b.title}</p>
              <p className="text-sm text-muted-foreground mt-3">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
