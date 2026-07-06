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
            @nailzxava
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
            12e arrondissement, Paris — proche métro Cour Saint-Émilion (ligne 14)
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
