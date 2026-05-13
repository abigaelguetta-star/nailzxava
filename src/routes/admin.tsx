import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Image as ImageIcon, Users, Clock, Trash2, Check, X } from "lucide-react";
import { VIBES } from "@/lib/poses";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({
    meta: [
      { title: "Admin — nailzxava" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type Tab = "slots" | "appointments" | "gallery" | "clients";

interface Slot { id: string; starts_at: string; duration_minutes: number; status: string }
interface Appt {
  id: string; starts_at: string; service_name: string; duration_minutes: number;
  status: string; total_price: number; vibe: string | null; user_id: string; deposit_paid: boolean;
}
interface GalleryItem { id: string; name: string; vibe: string; image_url: string; published: boolean; sort_order: number }
interface Profile { id: string; first_name: string | null; email: string | null; created_at: string }

function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("slots");

  if (loading) return <div className="min-h-[60vh] grid place-items-center"><p className="eyebrow">Chargement...</p></div>;

  if (!user) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6 text-center">
        <div>
          <p className="font-condensed text-6xl text-primary/30">ADMIN</p>
          <p className="font-display text-3xl mt-3">Connecte-toi.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6 text-center">
        <div className="max-w-lg">
          <p className="font-condensed text-6xl text-primary/30">ADMIN</p>
          <p className="font-display text-3xl mt-3">Accès <span className="italic text-primary">restreint</span>.</p>
          <p className="text-sm text-muted-foreground mt-4">
            Cet espace est réservé à Ava. Si tu es Ava, demande à promouvoir ton compte en admin via le backend Lovable Cloud.
          </p>
          <p className="text-xs text-muted-foreground mt-3 font-mono break-all bg-surface p-3 mt-4">
            INSERT INTO public.user_roles (user_id, role) VALUES ('{user.id}', 'admin');
          </p>
        </div>
      </div>
    );
  }

  const TABS: { id: Tab; label: string; icon: typeof Calendar }[] = [
    { id: "slots", label: "Créneaux", icon: Clock },
    { id: "appointments", label: "RDV", icon: Calendar },
    { id: "gallery", label: "Galerie", icon: ImageIcon },
    { id: "clients", label: "Clientes", icon: Users },
  ];

  return (
    <div className="relative">
      <div className="bg-decor-text top-12 -left-12" aria-hidden>AVA</div>
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24">
        <p className="eyebrow">— Admin Panel</p>
        <h1 className="headline mt-4">Atelier <span className="headline-italic">Ava</span>.</h1>

        <div className="flex flex-wrap gap-2 mt-12 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.2em] border-b-2 -mb-px transition-colors ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {tab === "slots" && <SlotsManager />}
          {tab === "appointments" && <AppointmentsManager />}
          {tab === "gallery" && <GalleryManager />}
          {tab === "clients" && <ClientsManager />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- SLOTS ---------------- */
function SlotsManager() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60);

  const load = () => supabase.from("slots").select("*").order("starts_at", { ascending: true })
    .then(({ data }) => setSlots((data || []) as Slot[]));
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!date || !time) return toast.error("Date et heure requises");
    const iso = new Date(`${date}T${time}`).toISOString();
    const { error } = await supabase.from("slots").insert({ starts_at: iso, duration_minutes: duration });
    if (error) return toast.error(error.message);
    toast.success("Créneau ajouté");
    setDate(""); setTime(""); load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("slots").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 border border-border p-6 bg-surface h-fit">
        <p className="eyebrow">Nouveau créneau</p>
        <div className="space-y-3 mt-4">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-background border border-border px-3 py-2" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-background border border-border px-3 py-2" />
          <div>
            <label className="eyebrow">Durée (min)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(+e.target.value)} className="w-full bg-background border border-border px-3 py-2 mt-1" />
          </div>
          <button onClick={add} className="btn-pink w-full"><span>Ajouter</span></button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-2">
        {slots.length === 0 && <p className="text-muted-foreground italic">Aucun créneau.</p>}
        {slots.map((s) => (
          <div key={s.id} className="flex items-center justify-between bg-surface border border-border p-4">
            <div>
              <p className="font-display text-xl">
                {new Date(s.starts_at).toLocaleString("fr-FR", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.16em] mt-1">{s.duration_minutes} min · {s.status}</p>
            </div>
            <button onClick={() => remove(s.id)} className="text-muted-foreground hover:text-primary p-2"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- APPOINTMENTS ---------------- */
function AppointmentsManager() {
  const [appts, setAppts] = useState<Appt[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});

  const load = async () => {
    const { data } = await supabase.from("appointments").select("*").order("starts_at", { ascending: false });
    setAppts((data || []) as Appt[]);
    const ids = Array.from(new Set((data || []).map((a) => a.user_id)));
    if (ids.length) {
      const { data: ps } = await supabase.from("profiles").select("*").in("id", ids);
      const map: Record<string, Profile> = {};
      (ps || []).forEach((p) => { map[p.id] = p as Profile; });
      setProfiles(map);
    }
  };
  useEffect(() => { load(); }, []);

  const update = async (id: string, patch: Partial<Appt>) => {
    const { error } = await supabase.from("appointments").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="space-y-3">
      {appts.length === 0 && <p className="text-muted-foreground italic">Aucun RDV.</p>}
      {appts.map((a) => {
        const p = profiles[a.user_id];
        const dt = new Date(a.starts_at);
        return (
          <div key={a.id} className="bg-surface border border-border p-5">
            <div className="flex items-baseline justify-between flex-wrap gap-3">
              <div>
                <p className="font-display text-2xl">{a.service_name}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-[0.16em]">
                  {p?.first_name || "—"} · {p?.email} · {dt.toLocaleString("fr-FR")} · {a.duration_minutes} min · {a.total_price}€
                </p>
                {a.vibe && <p className="text-sm italic text-muted-foreground mt-2">{a.vibe}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className={`pill !cursor-default ${a.status === "confirmed" ? "active" : ""}`}>{a.status}</span>
                <button onClick={() => update(a.id, { deposit_paid: !a.deposit_paid })} className={`pill ${a.deposit_paid ? "active" : ""}`}>
                  Acompte {a.deposit_paid ? "✓" : "✗"}
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {a.status !== "confirmed" && <button onClick={() => update(a.id, { status: "confirmed" })} className="btn-ghost text-xs"><Check className="w-3 h-3 inline mr-1" />Confirmer</button>}
              {a.status !== "done" && <button onClick={() => update(a.id, { status: "done" })} className="btn-ghost text-xs">Marquer terminé</button>}
              {a.status !== "cancelled" && <button onClick={() => update(a.id, { status: "cancelled" })} className="btn-ghost text-xs"><X className="w-3 h-3 inline mr-1" />Annuler</button>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- GALLERY ---------------- */
function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [name, setName] = useState("");
  const [vibe, setVibe] = useState<string>(VIBES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = () => supabase.from("gallery_items").select("*").order("sort_order").order("created_at", { ascending: false })
    .then(({ data }) => setItems((data || []) as GalleryItem[]));
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!name || !file) return toast.error("Nom et image requis");
    setUploading(true);
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("gallery").upload(path, file);
    if (upErr) { setUploading(false); return toast.error(upErr.message); }
    const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
    const { error } = await supabase.from("gallery_items").insert({ name, vibe, image_url: pub.publicUrl });
    setUploading(false);
    if (error) return toast.error(error.message);
    toast.success("Pose ajoutée ♥");
    setName(""); setFile(null); load();
  };

  const togglePub = async (it: GalleryItem) => {
    await supabase.from("gallery_items").update({ published: !it.published }).eq("id", it.id);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("gallery_items").delete().eq("id", id);
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 border border-border p-6 bg-surface h-fit">
        <p className="eyebrow">Nouvelle pose</p>
        <div className="space-y-3 mt-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom (ex: Liquid Mirror)" className="w-full bg-background border border-border px-3 py-2" />
          <select value={vibe} onChange={(e) => setVibe(e.target.value)} className="w-full bg-background border border-border px-3 py-2">
            {VIBES.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-xs" />
          <button onClick={add} disabled={uploading} className="btn-pink w-full disabled:opacity-40"><span>{uploading ? "Envoi..." : "Ajouter"}</span></button>
        </div>
      </div>

      <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((it) => (
          <div key={it.id} className="relative group bg-surface border border-border">
            <img src={it.image_url} alt={it.name} className="w-full aspect-[3/4] object-cover" />
            <div className="p-3">
              <p className="font-display text-lg">{it.name}</p>
              <p className="eyebrow mt-1">{it.vibe}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => togglePub(it)} className={`pill text-xs ${it.published ? "active" : ""}`}>{it.published ? "Publié" : "Caché"}</button>
                <button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-primary p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- CLIENTS ---------------- */
function ClientsManager() {
  const [clients, setClients] = useState<Profile[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const { data: ps } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      setClients((ps || []) as Profile[]);
      const { data: ap } = await supabase.from("appointments").select("user_id");
      const map: Record<string, number> = {};
      (ap || []).forEach((a: { user_id: string }) => { map[a.user_id] = (map[a.user_id] || 0) + 1; });
      setCounts(map);
    })();
  }, []);

  return (
    <div className="space-y-2">
      {clients.length === 0 && <p className="text-muted-foreground italic">Aucune cliente.</p>}
      {clients.map((c) => (
        <div key={c.id} className="flex items-center justify-between bg-surface border border-border p-4">
          <div>
            <p className="font-display text-xl">{c.first_name || "Anonyme"}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.email}</p>
          </div>
          <div className="text-right">
            <p className="font-condensed text-2xl text-primary">{counts[c.id] || 0}</p>
            <p className="eyebrow">RDV</p>
          </div>
        </div>
      ))}
    </div>
  );
}
