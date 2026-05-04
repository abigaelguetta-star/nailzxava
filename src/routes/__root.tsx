import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { IntroPanels } from "@/components/IntroPanels";
import { Toaster } from "@/components/ui/sonner";
import { Link } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="text-center">
        <p className="giant text-primary/30">404</p>
        <p className="font-display text-3xl italic mt-4">Page <span className="text-primary">introuvable</span></p>
        <Link to="/" className="btn-pink mt-8 inline-block"><span>Retour à l'accueil</span></Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "nailzxava — Editorial Nails by Ava" },
      { name: "description", content: "Pose gel, nail art éditorial, vibe streetwear luxe. Réservation en ligne." },
      { property: "og:title", content: "nailzxava — Editorial Nails by Ava" },
      { property: "og:description", content: "Pose gel, nail art éditorial, vibe streetwear luxe. Réservation en ligne." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "nailzxava — Editorial Nails by Ava" },
      { name: "twitter:description", content: "Pose gel, nail art éditorial, vibe streetwear luxe. Réservation en ligne." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/94d6ab9e-24b0-4245-a491-1ca7f14df946/id-preview-88d3a218--ba69f41b-5c8b-4f27-9921-087c569d64b8.lovable.app-1777886357837.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/94d6ab9e-24b0-4245-a491-1ca7f14df946/id-preview-88d3a218--ba69f41b-5c8b-4f27-9921-087c569d64b8.lovable.app-1777886357837.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <IntroPanels />
        <CustomCursor />
        <Nav />
        <main className="pt-16">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
