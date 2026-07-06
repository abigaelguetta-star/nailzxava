import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/lib/poses";
import { Instagram } from "lucide-react";

export const Route = createFileRoute("/booking")({
  component: Booking,
  head: () => ({
    meta: [
      { title: "Tarifs & RDV — nailzxava" },
      { name: "description", content: "Tarifs et prise de rendez-vous nail art Paris 12e." },
    ],
  }),
});

const INSTAGRAM_URL = "https://www.instagram.com/nailzxava/";
const TIKTOK_URL = "https://www.tiktok.com/@nailzxava";

function Booking() {
  const semi = SERVICES.filter((s) => s.id.startsWith("sp-"));
  const gelx = SERVICES.filter((s) => s.id.startsWith("gx-"));

  return (
    <div className="relative">
      <div className="bg-decor-text top-20 right-0 text-right" aria-hidden>
        BOOK
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24">
        <p className="eyebrow">— Tarifs & RDV</p>
        <h1 className="headline mt-4">
          Prendre <span className="headline-italic">rendez-vous</span>.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          Toutes les prestations durent 3h. Pour réserver, envoie-moi un DM sur Instagram.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          {/* Semi permanent */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl mb-6">Semi permanent</h2>
            <div className="space-y-px">
              {semi.map((s, i) => (
                <div
                  key={s.id}
                  className="flex items-baseline justify-between py-5 border-b border-border"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-condensed text-primary text-lg">0{i + 1}</span>
                    <p className="font-display text-xl md:text-2xl">{s.name.replace("Semi permanent — ", "")}</p>
                  </div>
                  <span className="font-display text-2xl">{s.price}€</span>
                </div>
              ))}
            </div>
            <p className="eyebrow mt-3">3h · Créneau fixe</p>
          </div>

          {/* Gel-X */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl mb-6">Gel-X / pose américaine</h2>
            <div className="space-y-px">
              {gelx.map((s, i) => (
                <div
                  key={s.id}
                  className="flex items-baseline justify-between py-5 border-b border-border"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-condensed text-primary text-lg">0{i + 1}</span>
                    <p className="font-display text-xl md:text-2xl">{s.name.replace("Gel-X / pose américaine — ", "")}</p>
                  </div>
                  <span className="font-display text-2xl">{s.price}€</span>
                </div>
              ))}
            </div>
            <p className="eyebrow mt-3">3h · Créneau fixe</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 border border-border p-8 md:p-12 bg-surface max-w-3xl">
          <p className="font-display text-3xl md:text-4xl">
            Réserve par <span className="italic text-primary">DM Instagram</span>.
          </p>
          <p className="text-muted-foreground mt-3 max-w-lg">
            Envoie-moi un message avec le type de pose souhaité et tes disponibilités. Je te confirmerai le créneau et les détails.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-pink inline-flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>DM @nailzxava</span>
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost inline-flex items-center gap-2"
            >
              <span>TikTok</span>
            </a>
          </div>
          <div className="mt-8 pt-6 border-t border-border">
            <p className="eyebrow mb-2">Localisation</p>
            <p className="text-foreground/90">
              12e arrondissement, Paris — proche métro Cour Saint-Émilion (ligne 14)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
