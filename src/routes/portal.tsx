import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useMoodboard } from "@/lib/moodboard";
import { supabase } from "@/integrations/supabase/client";
import { PoseCard } from "@/components/PoseCard";
import { Heart, Sparkles, Calendar, BookOpen } from "lucide-react";

export const Route = createFileRoute("/portal")({
  component: Portal,
  head: () => ({
    meta: [
      { title: "Mon Portal — nailzxava" },
      { name: "description", content: "Espace cliente : moodboard, RDV, fidélité." },
    ],
  }),
});

interface Appt {
  id: string;
  starts_at: string;
  service_name: string;
  duration_minutes: number;
  vibe: string | null;
  status: string;
}

function Portal() {
  const { user, profile, loading } = useAuth();
  const { liked } = useMoodboard();
  const [appts, setAppts] = useState<Appt[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("appointments").select("id,starts_at,service_name,duration_minutes,vibe,status")
      .eq("user_id", user.id).order("starts_at", { ascending: false })
      .then(({ data }) => setAppts((data || []) as Appt[]));
  }, [user]);

  if (loading) {
    return <div className="min-h-[60vh] grid place-items-center"><p className="eyebrow">Chargement...</p></div>;
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6">
        <div className="text-center max-w-md">
          <p className="font-condensed text-6xl text-primary/30">PORTAL</p>
          <h1 className="font-display text-4xl mt-4">Espace <span className="italic text-primary">privé</span>.</h1>
          <p className="text-muted-foreground mt-4">Connecte-toi pour accéder à ton moodboard, tes RDV et ton programme de fidélité.</p>
          <p className="text-xs text-muted-foreground mt-6 uppercase tracking-[0.2em]">
            Clique sur "Se connecter" en haut à droite ↑
          </p>
        </div>
      </div>
    );
  }

  const points = appts.filter((r) => r.status === "done").length;
  const remaining = Math.max(0, 5 - (points % 5));

  return (
    <div className="relative">
      <div className="bg-decor-text top-12 -left-12" aria-hidden>YOU</div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24">
        {/* Header profil */}
        <div className="flex items-center gap-6 flex-wrap">
          <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/40 grid place-items-center font-display text-4xl text-primary">
            {(profile?.first_name || "B")[0].toUpperCase()}
          </div>
          <div>
            <p className="eyebrow">— Welcome back</p>
            <h1 className="font-display text-5xl md:text-6xl mt-1">
              Hey <span className="italic text-primary">{profile?.first_name || "baddie"}</span>.
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Sections */}
        <div className="grid lg:grid-cols-12 gap-12 mt-16">
          {/* Fidélité */}
          <section className="lg:col-span-5 border border-border p-8 bg-surface">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="eyebrow">Programme fidélité</p>
            </div>
            <p className="font-display text-7xl text-primary mt-4">{points}<span className="text-foreground/30 text-3xl">/5</span></p>
            <p className="text-sm text-muted-foreground mt-2">
              {remaining === 0 ? "Tu as ton nail art offert ♥" : `${remaining} pose${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""} avant ton cadeau.`}
            </p>
            <div className="flex gap-1 mt-6">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className={`flex-1 h-1 ${n <= points ? "bg-primary" : "bg-border"}`} />
              ))}
            </div>
          </section>

          {/* RDV */}
          <section className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <p className="eyebrow">Mes rendez-vous</p>
            </div>
            <div className="space-y-3">
              {MOCK_RDV.map((r) => (
                <div
                  key={r.id}
                  className={`p-5 bg-surface border-l-2 ${r.status === "À venir" ? "border-l-primary" : "border-l-border"} border-y border-r border-border`}
                >
                  <div className="flex items-baseline justify-between flex-wrap gap-3">
                    <div>
                      <p className="font-display text-xl">{r.service}</p>
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-[0.16em]">
                        {r.date} · {r.time} · {r.duration} min
                      </p>
                    </div>
                    <span className={`pill !cursor-default ${r.status === "À venir" ? "active" : ""}`}>{r.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 italic">{r.vibe}</p>
                </div>
              ))}
            </div>
            <Link to="/booking" className="btn-ghost mt-6 inline-block">+ Nouveau RDV</Link>
          </section>

          {/* Moodboard */}
          <section className="lg:col-span-12 mt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-primary" />
                <p className="eyebrow">Mon moodboard</p>
              </div>
              <Link to="/selector" className="link-underline text-xs uppercase tracking-[0.2em]">+ Ajouter</Link>
            </div>

            {liked.length === 0 ? (
              <div className="border border-border p-16 text-center">
                <p className="font-display text-2xl italic text-muted-foreground">
                  Ton moodboard est vide.
                </p>
                <Link to="/selector" className="btn-pink mt-6 inline-block"><span>Aller au Nail Selector ♡</span></Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3px]">
                {liked.map((p) => <PoseCard key={p.id} pose={p} showActions={false} />)}
              </div>
            )}
          </section>

          {/* Aftercare link */}
          <section className="lg:col-span-12">
            <Link to="/aftercare" className="block border border-border p-8 hover:border-primary transition-colors group">
              <div className="flex items-center justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <div>
                    <p className="eyebrow">Guide</p>
                    <p className="font-display text-3xl mt-1">Aftercare → 5 règles d'or</p>
                  </div>
                </div>
                <span className="text-primary uppercase text-xs tracking-[0.2em] link-underline">Lire le guide</span>
              </div>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
