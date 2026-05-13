import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "./AuthModal";

const NAV = [
  { to: "/selector", label: "Nail Selector" },
  { to: "/booking", label: "Booking" },
  { to: "/portal", label: "Mon Portal" },
] as const;

const ADMIN_NAV = { to: "/admin", label: "Admin" } as const;

export function Nav() {
  const { theme, toggle } = useTheme();
  const { user, profile, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="font-condensed text-2xl tracking-[0.08em] cursor-hover">
            NAILZ<span className="text-primary">X</span>AVA
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`link-underline text-xs uppercase tracking-[0.2em] font-medium transition-colors ${path === n.to ? "text-primary" : "text-foreground/80 hover:text-foreground"}`}
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-9 h-9 grid place-items-center rounded-full border border-border hover:border-primary transition-colors cursor-hover"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/portal"
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:border-primary transition-colors text-xs uppercase tracking-[0.16em]"
                >
                  <span className="dot" />
                  {profile?.first_name || "Baddie"}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-9 h-9 grid place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                  aria-label="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="btn-outline-pink">
                Se connecter
              </button>
            )}
          </div>
        </div>
      </nav>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}
