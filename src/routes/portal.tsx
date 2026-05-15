import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Sparkles, Edit3, LogOut, Instagram } from "lucide-react";

export const Route = createFileRoute("/portal")({
  component: Portal,
  head: () => ({
    meta: [
      { title: "YOU — nailzxava" },
      { name: "description", content: "Ton archive. Ton profil. Ton vibe." },
    ],
  }),
});

interface Appt {
  id: string;
  starts_at: string;
  service_name: string;
  status: string;
}

const VIBES = [
  { id: "silent", label: "Silent Appointment", emoji: "🤫" },
  { id: "musical", label: "Musical Vibe", emoji: "🎵" },
  { id: "gossip", label: "Movie & Gossip", emoji: "🍿" },
];
const SHAPES = ["Amande", "Carré", "Stiletto", "Coffin"];
const LENGTHS = ["Court", "Moyen", "Long", "XXL"];

function Portal() {
  const { user, profile, loading, signIn, signUp, signOut, refreshProfile } = useAuth();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (loading) {
    return <div className="min-h-[80vh] grid place-items-center"><p className="eyebrow">Chargement de l'archive...</p></div>;
  }

  // === VIEW 1 : NON CONNECTÉ ===
  if (!user) {
    const submitAuth = async (e: React.FormEvent) => {
      e.preventDefault();
      setErr(null);
      if (authMode === "signup" && pwd !== pwd2) {
        setErr("Les mots de passe ne correspondent pas, l'archive ne peut pas être créée.");
        return;
      }
      setBusy(true);
      const { error } = authMode === "signin"
        ? await signIn(email, pwd)
        : await signUp(email, pwd);
      setBusy(false);
      if (error) setErr(error);
      else if (authMode === "signin") toast.success("Bon retour ♥");
      else toast.success("Archive créée. Bienvenue dans le cercle.");
    };

    return (
      <div className="relative min-h-[90vh] grid place-items-center px-6 py-16 overflow-hidden">
        <div className="bg-decor-text top-12 -left-12" aria-hidden>YOU</div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          className="glass-card relative w-full max-w-md p-10 rounded-sm"
        >
          <p className="eyebrow text-center">— Baddie Portal</p>
          <h1 className="font-display text-5xl text-center mt-3">
            {authMode === "signup" ? <>Crée ton <span className="italic text-primary">archive</span>.</> : <>Bon <span className="italic text-primary">retour</span>.</>}
          </h1>

          <div className="flex border-b border-border mt-8">
            {(["signup", "signin"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setAuthMode(m); setErr(null); }}
                className={`flex-1 py-3 text-xs uppercase tracking-[0.22em] transition-colors ${authMode === m ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"}`}
              >
                {m === "signup" ? "Inscription" : "Connexion"}
              </button>
            ))}
          </div>

          <form onSubmit={submitAuth} className="mt-6 space-y-4 relative">
            <div>
              <label className="eyebrow block mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-archive" />
            </div>
            <div>
              <label className="eyebrow block mb-2">Mot de passe</label>
              <input type="password" required minLength={6} value={pwd} onChange={(e) => setPwd(e.target.value)} className="input-archive" />
            </div>
            {authMode === "signup" && (
              <div>
                <label className="eyebrow block mb-2">Confirmer le mot de passe</label>
                <input type="password" required minLength={6} value={pwd2} onChange={(e) => setPwd2(e.target.value)} className="input-archive" />
              </div>
            )}

            {err && (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="error-neon italic"
              >
                ✗ {err}
              </motion.p>
            )}

            <button type="submit" disabled={busy} className="btn-chrome w-full mt-6">
              {busy ? "..." : authMode === "signup" ? "Créer mon archive" : "Entrer"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // === VIEW 2 : ONBOARDING STEP 1 (NOM/PRÉNOM) ===
  if (!profile?.first_name || !profile?.last_name) {
    return <OnboardingStep1 onDone={refreshProfile} signOut={signOut} />;
  }

  // === VIEW 3 : DASHBOARD + STEP 2 (SLIDE-IN PANEL) ===
  return <Dashboard onSignOut={signOut} onRefresh={refreshProfile} />;
}

// =====================================================
// STEP 1 — IDENTITÉ
// =====================================================
function OnboardingStep1({ onDone, signOut }: { onDone: () => Promise<void>; signOut: () => Promise<void> }) {
  const { user } = useAuth();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      first_name: first.trim(),
      last_name: last.trim(),
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else { await onDone(); toast.success("Identité enregistrée ♥"); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-[90vh] grid place-items-center px-6 py-16"
    >
      <div className="bg-decor-text top-0 -right-12" aria-hidden>IDENTITÉ</div>

      <div className="relative w-full max-w-2xl">
        <p className="eyebrow">— Étape 01 / 02</p>
        <h1 className="font-display text-6xl md:text-7xl mt-3 leading-[0.95]">
          TON <span className="italic text-primary">IDENTITÉ</span>
        </h1>
        <p className="text-muted-foreground mt-4 max-w-md">
          Avant tout, dis-nous qui tu es. C'est la signature de ton archive.
        </p>

        <form onSubmit={submit} className="mt-12 space-y-6 max-w-md">
          <div>
            <label className="eyebrow block mb-2">Prénom</label>
            <input required minLength={1} value={first} onChange={(e) => setFirst(e.target.value)} className="input-archive" />
          </div>
          <div>
            <label className="eyebrow block mb-2">Nom</label>
            <input required minLength={1} value={last} onChange={(e) => setLast(e.target.value)} className="input-archive" />
          </div>
          <div className="flex items-center gap-4 pt-4">
            <button type="submit" disabled={busy} className="btn-chrome">{busy ? "..." : "Continuer →"}</button>
            <button type="button" onClick={() => signOut()} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">Se déconnecter</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

// =====================================================
// DASHBOARD + STEP 2 PANEL
// =====================================================
function Dashboard({ onSignOut, onRefresh }: { onSignOut: () => Promise<void>; onRefresh: () => Promise<void> }) {
  const { user, profile } = useAuth();
  const [appts, setAppts] = useState<Appt[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);

  // Ouvrir auto le panel si pas encore fait l'étape 2 (vibe vide)
  useEffect(() => {
    if (profile && !profile.vibe && !profile.onboarded) {
      setPanelOpen(true);
    }
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    supabase.from("appointments").select("id,starts_at,service_name,status")
      .eq("user_id", user.id).order("starts_at", { ascending: false })
      .then(({ data }) => setAppts((data || []) as Appt[]));
  }, [user]);

  const done = appts.filter((a) => a.status === "done").length;
  const upcoming = appts.find((a) => new Date(a.starts_at) > new Date() && a.status !== "cancelled");
  const level = done >= 10 ? { n: 3, name: "Icon", next: 10, progress: 100 }
              : done >= 5  ? { n: 2, name: "Regular", next: 10, progress: ((done - 5) / 5) * 100 }
                          : { n: 1, name: "New Girl", next: 5, progress: (done / 5) * 100 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="bg-decor-text top-12 -left-12" aria-hidden>YOU</div>

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-10 pt-16 pb-24">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="eyebrow">— Baddie Dashboard</p>
            <h1 className="font-display text-5xl md:text-6xl mt-2">
              Welcome back, <span className="italic text-primary">{profile?.first_name}</span> 💅
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">{user?.email}</p>
          </div>
          <button onClick={() => onSignOut()} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 mt-14">
          {/* Loyalty */}
          <section className="lg:col-span-7 glass-card p-8 rounded-sm">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="eyebrow">Baddie Points · Level {level.n}</p>
            </div>
            <p className="font-display text-7xl mt-4">
              <span className="italic text-primary">{level.name}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {done} pose{done > 1 ? "s" : ""} archivée{done > 1 ? "s" : ""} · {Math.max(0, level.next - done)} avant le prochain niveau
            </p>
            <div className="loyalty-bar mt-6">
              <div className="loyalty-bar-fill" style={{ width: `${Math.min(100, level.progress)}%` }} />
            </div>
            <div className="flex justify-between mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>1. New Girl</span><span>2. Regular</span><span>3. Icon</span>
            </div>
          </section>

          {/* Prochaine pose */}
          <section className="lg:col-span-5 glass-card p-8 rounded-sm">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-primary" />
              <p className="eyebrow">Prochaine pose</p>
            </div>
            {upcoming ? (
              <>
                <p className="font-display text-3xl mt-4 italic">{upcoming.service_name}</p>
                <p className="text-sm text-muted-foreground mt-2 uppercase tracking-[0.16em]">
                  {new Date(upcoming.starts_at).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                  <br />
                  {new Date(upcoming.starts_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </p>
                <Link to="/portal" className="btn-ghost mt-6 inline-block">Voir mes RDV</Link>
              </>
            ) : (
              <>
                <p className="font-display text-2xl mt-4 italic text-muted-foreground">Aucun RDV à l'horizon.</p>
                <Link to="/booking" className="btn-chrome mt-6 inline-block">Réserver maintenant</Link>
              </>
            )}
          </section>

          {/* Profil résumé */}
          <section className="lg:col-span-12 glass-card p-8 rounded-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <p className="eyebrow">Mon Nail Profile</p>
              </div>
              <button onClick={() => setPanelOpen(true)} className="btn-ghost inline-flex items-center gap-2">
                <Edit3 className="w-3.5 h-3.5" /> Éditer mon archive
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <Field label="Vibe de séance" value={profile?.vibe ? VIBES.find((v) => v.id === profile.vibe)?.label || profile.vibe : null} />
              <Field label="Forme favorite" value={profile?.nail_shape} />
              <Field label="Longueur" value={profile?.nail_length} />
              <Field label="Instagram" value={profile?.instagram} />
            </div>
            {profile?.allergies && (
              <p className="text-xs text-muted-foreground mt-6 italic">⚠ Allergies : {profile.allergies}</p>
            )}
          </section>
        </div>
      </div>

      {/* SLIDE-IN PANEL — STEP 2 */}
      <AnimatePresence>
        {panelOpen && (
          <NailProfilePanel
            onClose={() => setPanelOpen(false)}
            onSaved={async () => { await onRefresh(); setPanelOpen(false); }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="font-display text-xl mt-2">{value || <span className="text-muted-foreground italic text-base">— non défini</span>}</p>
    </div>
  );
}

// =====================================================
// PANEL SLIDE-IN — NAIL PROFILE
// =====================================================
function NailProfilePanel({ onClose, onSaved }: { onClose: () => void; onSaved: () => Promise<void> }) {
  const { user, profile } = useAuth();
  const [vibe, setVibe] = useState(profile?.vibe || "");
  const [shape, setShape] = useState(profile?.nail_shape || "");
  const [length, setLength] = useState(profile?.nail_length || "");
  const [allergies, setAllergies] = useState(profile?.allergies || "");
  const [insta, setInsta] = useState(profile?.instagram || "");
  const [busy, setBusy] = useState(false);

  const save = async (markOnboarded: boolean) => {
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("profiles").update({
      vibe: vibe || null,
      nail_shape: shape || null,
      nail_length: length || null,
      allergies: allergies.trim() || null,
      instagram: insta.trim() || null,
      onboarded: markOnboarded || profile?.onboarded || false,
    }).eq("id", user.id);
    setBusy(false);
    if (error) toast.error(error.message);
    else { toast.success("Archive mise à jour ♥"); await onSaved(); }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background z-40"
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        className="fixed top-0 right-0 h-full w-full max-w-xl z-50 bg-background border-l border-border overflow-y-auto"
      >
        <div className="p-8 md:p-12">
          <div className="flex items-center justify-between">
            <p className="eyebrow">— Étape 02 / Nail Profile</p>
            <button onClick={onClose} className="text-2xl text-muted-foreground hover:text-foreground">✕</button>
          </div>
          <h2 className="font-display text-5xl mt-4 leading-[0.95]">
            Ton <span className="italic text-primary">vibe</span>.<br />Tes règles.
          </h2>

          {/* VIBE */}
          <div className="mt-10">
            <p className="eyebrow mb-4">Vibe de séance</p>
            <div className="grid grid-cols-1 gap-2">
              {VIBES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVibe(vibe === v.id ? "" : v.id)}
                  className={`vibe-pill text-left flex items-center gap-3 ${vibe === v.id ? "selected" : ""}`}
                >
                  <span className="text-xl">{v.emoji}</span> {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* SHAPE */}
          <div className="mt-8">
            <p className="eyebrow mb-4">Forme favorite</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SHAPES.map((s) => (
                <button key={s} type="button" onClick={() => setShape(shape === s ? "" : s)} className={`vibe-pill ${shape === s ? "selected" : ""}`}>{s}</button>
              ))}
            </div>
          </div>

          {/* LENGTH */}
          <div className="mt-8">
            <p className="eyebrow mb-4">Longueur</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {LENGTHS.map((l) => (
                <button key={l} type="button" onClick={() => setLength(length === l ? "" : l)} className={`vibe-pill ${length === l ? "selected" : ""}`}>{l}</button>
              ))}
            </div>
          </div>

          {/* ALLERGIES */}
          <div className="mt-8">
            <label className="eyebrow block mb-3">Allergies ou sensibilités</label>
            <textarea rows={3} value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="ex: résine, acrylique, parfum..." className="input-archive resize-none" />
          </div>

          {/* INSTA */}
          <div className="mt-6">
            <label className="eyebrow mb-3 flex items-center gap-2"><Instagram className="w-3 h-3" /> Ton Instagram</label>
            <input value={insta} onChange={(e) => setInsta(e.target.value)} placeholder="@nailzxava" className="input-archive" />
          </div>

          {/* ACTIONS */}
          <div className="mt-12 flex flex-col items-center gap-3">
            <button onClick={() => save(true)} disabled={busy} className="btn-chrome w-full">{busy ? "..." : "Enregistrer mon archive"}</button>
            <button onClick={() => save(true)} disabled={busy} className="text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground mt-3">PASSER</button>
            <p className="text-[10px] text-muted-foreground italic text-center max-w-xs">
              Ne t'inquiète pas, tu pourras revenir peaufiner ton archive plus tard.
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
