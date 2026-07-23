export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-12 grid md:grid-cols-3 gap-8 items-end">
        <div>
          <p className="font-condensed text-3xl tracking-[0.08em]">
            NAILZ<span className="text-primary">X</span>AVA
          </p>
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground mt-3">
            Editorial nails · By appointment
          </p>
        </div>
        <div className="md:text-center space-y-2">
          <p className="eyebrow">Contact</p>
          <a
            href="https://www.instagram.com/nailzxava/"
            target="_blank"
            rel="noreferrer"
            className="block font-display text-xl italic mt-2 text-foreground hover:text-primary transition-colors"
          >
            instagram : @nailzxava
          </a>
          <a
            href="https://www.tiktok.com/@nailzxava"
            target="_blank"
            rel="noreferrer"
            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            TikTok
          </a>
          <p className="text-xs text-muted-foreground mt-2">
            12e arrondissement, Paris — proche métro {" "}
            <a
              href="https://www.google.com/maps/place/Cour+Saint-%C3%89milion/@48.8336726,2.3835342,17z/data=!3m1!4b1!4m6!3m5!1s0x47e6723f862bd209:0x97f5211d39909f08!8m2!3d48.8336691!4d2.3861091!16zL20vMDJmYnQx?entry=ttu&g_ep=EgoyMDI2MDcyMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              Cour Saint-Emilion
            </a>{" "}
            (ligne 14)
          </p>
        </div>
        <div className="md:text-right">
          <p className="eyebrow">© 2026</p>
          <p className="text-xs text-muted-foreground mt-2">Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
