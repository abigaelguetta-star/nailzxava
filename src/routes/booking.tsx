import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SERVICES, ADDONS, VIBES_RDV } from "@/lib/poses";
import { useAuth } from "@/lib/auth";
import { Check, Calendar as CalIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/booking")({
  component: Booking,
  head: () => ({
    meta: [
      { title: "Booking — nailzxava" },
      { name: "description", content: "Réserve ton créneau en 5 étapes. Pose gel, nail art, options et ambiance." },
    ],
  }),
});

const STEPS = ["Prestation", "Options", "Créneau", "Ambiance", "Confirmation"];

// Mock disponibilités: certains jours du mois courant
const TODAY = new Date();
const AVAILABLE_DAYS = [3, 4, 6, 10, 11, 13, 17, 18, 20, 24, 25, 27].map((d) => {
  const dt = new Date(TODAY.getFullYear(), TODAY.getMonth(), d);
  return dt > TODAY ? dt : new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, d);
});
const SLOTS = ["10:00", "11:30", "14:00", "15:30", "17:00"];
const TAKEN: Record<string, string[]> = {};

function Booking() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [vibes, setVibes] = useState<string[]>([]);

  const service = SERVICES.find((s) => s.id === serviceId);
  const addons = ADDONS.filter((a) => addonIds.includes(a.id));
  const totalDuration = (service?.duration || 0) + addons.reduce((s, a) => s + a.duration, 0);
  const totalPrice = (service?.price || 0) + addons.reduce((s, a) => s + a.price, 0);
  const deposit = Math.round(totalPrice * 0.3);
  const isNewClient = true; // mock — would come from user RDV history

  const canNext = useMemo(() => {
    if (step === 0) return !!serviceId;
    if (step === 1) return true;
    if (step === 2) return !!date && !!slot;
    if (step === 3) return vibes.length > 0;
    return true;
  }, [step, serviceId, date, slot, vibes]);

  const confirm = () => {
    if (!user) {
      toast.error("Connecte-toi pour confirmer ta réservation.");
      return;
    }
    toast.success("Réservation enregistrée. À très vite ♥");
  };

  return (
    <div className="relative">
      <div className="bg-decor-text top-20 right-0 text-right" aria-hidden>BOOK</div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24 grid lg:grid-cols-12 gap-12">
        {/* Main */}
        <div className="lg:col-span-8">
          <p className="eyebrow">— Booking</p>
          <h1 className="headline mt-4">
            Ton <span className="headline-italic">RDV</span>.
          </h1>

          {/* Stepper */}
          <div className="flex items-center gap-3 mt-12 flex-wrap">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`step-num ${i === step ? "active" : i < step ? "done" : ""}`}>
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={`text-xs uppercase tracking-[0.2em] hidden md:inline ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                {i < STEPS.length - 1 && <div className="w-6 h-px bg-border hidden md:block" />}
              </div>
            ))}
          </div>

          <div className="mt-12 min-h-[400px]">
            {step === 0 && (
              <div className="space-y-px">
                {SERVICES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`w-full text-left flex items-baseline justify-between py-6 border-b border-border transition-all ${serviceId === s.id ? "pl-4 border-l-2 border-l-primary" : "hover:pl-4"}`}
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="font-condensed text-primary text-xl">0{i + 1}</span>
                      <div>
                        <p className="font-display text-2xl md:text-3xl">{s.name}</p>
                        <p className="eyebrow mt-1">{s.duration} min</p>
                      </div>
                    </div>
                    <span className="font-display text-2xl">{s.price}€</span>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid sm:grid-cols-2 gap-px bg-border">
                {ADDONS.map((a) => {
                  const checked = addonIds.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAddonIds((prev) => checked ? prev.filter((x) => x !== a.id) : [...prev, a.id])}
                      className={`bg-background p-6 text-left transition-colors ${checked ? "ring-1 ring-primary" : "hover:bg-surface"}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-display text-xl">{a.name}</p>
                          <p className="eyebrow mt-1">+{a.duration} min · +{a.price}€</p>
                        </div>
                        <div className={`w-5 h-5 border ${checked ? "bg-primary border-primary" : "border-border"} grid place-items-center`}>
                          {checked && <Check className="w-3 h-3 text-cream" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="eyebrow mb-4">Choisis un jour disponible</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {AVAILABLE_DAYS.map((d) => {
                    const sel = date?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={d.toISOString()}
                        onClick={() => { setDate(d); setSlot(null); }}
                        className={`p-3 border text-center transition-colors ${sel ? "bg-primary border-primary text-cream" : "border-border hover:border-foreground"}`}
                      >
                        <p className="text-xs uppercase tracking-wider opacity-70">{d.toLocaleDateString("fr-FR", { weekday: "short" })}</p>
                        <p className="font-display text-2xl mt-1">{d.getDate()}</p>
                        <p className="text-[10px] uppercase mt-1 opacity-70">{d.toLocaleDateString("fr-FR", { month: "short" })}</p>
                      </button>
                    );
                  })}
                </div>

                {date && (
                  <div className="mt-10">
                    <p className="eyebrow mb-4">Créneaux le {date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
                    <div className="flex flex-wrap gap-2">
                      {SLOTS.map((s) => {
                        const taken = (TAKEN[date.toDateString()] || []).includes(s);
                        const sel = slot === s;
                        return (
                          <button
                            key={s}
                            disabled={taken}
                            onClick={() => setSlot(s)}
                            className={`px-5 py-3 border text-sm uppercase tracking-[0.16em] transition-colors ${taken ? "line-through opacity-30 cursor-not-allowed" : sel ? "bg-primary border-primary text-cream" : "border-border hover:border-foreground"}`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="grid sm:grid-cols-2 gap-px bg-border">
                {VIBES_RDV.map((v) => {
                  const checked = vibes.includes(v.id);
                  return (
                    <button
                      key={v.id}
                      onClick={() => setVibes((prev) => checked ? prev.filter((x) => x !== v.id) : [...prev, v.id])}
                      className={`bg-background p-8 text-left transition-colors ${checked ? "ring-1 ring-primary" : "hover:bg-surface"}`}
                    >
                      <p className="text-3xl">{v.emoji}</p>
                      <p className="font-display text-2xl mt-3">{v.title}</p>
                      <p className="text-sm text-muted-foreground mt-1 italic">"{v.sub}"</p>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 4 && (
              <div>
                <p className="font-display text-3xl">
                  Tout est <span className="italic text-primary">prêt</span>.
                </p>
                <p className="text-muted-foreground mt-2">Vérifie ton récap à droite et confirme.</p>

                {isNewClient && (
                  <div className="mt-8 border border-primary/40 p-6 bg-primary/5">
                    <p className="eyebrow text-primary">⚡ Acompte requis (nouvelle cliente)</p>
                    <p className="font-display text-3xl mt-3">{deposit}€</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Envoie l'acompte via PayPal puis envoie la capture en DM Instagram.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-5">
                      <a href="[LIEN_PAYPAL_AVA]" target="_blank" rel="noreferrer" className="btn-pink"><span>PayPal</span></a>
                      <a href="https://instagram.com/nailzxava" target="_blank" rel="noreferrer" className="btn-ghost">DM @nailzxava</a>
                    </div>
                  </div>
                )}

                {!user && (
                  <p className="mt-6 text-sm text-muted-foreground">
                    <Link to="/" className="text-primary link-underline">Connecte-toi</Link> pour finaliser ta réservation.
                  </p>
                )}

                <button onClick={confirm} className="btn-pink mt-8 w-full sm:w-auto">
                  <span>Confirmer la réservation</span>
                </button>
              </div>
            )}
          </div>

          {/* Step nav */}
          <div className="flex justify-between mt-12 pt-6 border-t border-border">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-ghost disabled:opacity-30"
            >
              ← Précédent
            </button>
            {step < STEPS.length - 1 && (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext}
                className="btn-pink disabled:opacity-30"
              >
                <span>Suivant →</span>
              </button>
            )}
          </div>
        </div>

        {/* Sticky récap */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 border border-border p-6 bg-surface">
            <p className="eyebrow">— Récap</p>
            <p className="font-display text-3xl mt-2">Ta commande</p>

            <div className="mt-6 space-y-4 text-sm">
              <Row label="Prestation" value={service?.name || "—"} />
              <Row label="Options" value={addons.length ? addons.map((a) => a.name).join(", ") : "Aucune"} />
              <Row label="Durée totale" value={totalDuration ? `${totalDuration} min` : "—"} />
              <Row
                label="Date"
                value={date ? `${date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}${slot ? ` · ${slot}` : ""}` : "—"}
              />
              <Row label="Ambiance" value={vibes.length ? vibes.map((id) => VIBES_RDV.find((v) => v.id === id)?.title).join(", ") : "—"} />
            </div>

            <div className="mt-6 pt-6 border-t border-border flex items-baseline justify-between">
              <span className="eyebrow">Total</span>
              <span className="font-display text-4xl text-primary">{totalPrice}€</span>
            </div>

            {isNewClient && totalPrice > 0 && (
              <div className="mt-4 text-xs text-muted-foreground flex items-center justify-between">
                <span>Acompte 30%</span>
                <span className="text-foreground font-medium">{deposit}€</span>
              </div>
            )}

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <CalIcon className="w-3 h-3" />
              <span>Annulation gratuite jusqu'à 48h avant.</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="eyebrow">{label}</span>
      <span className="text-right text-foreground/90 truncate">{value}</span>
    </div>
  );
}
