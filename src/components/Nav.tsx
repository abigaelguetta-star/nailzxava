import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Sun, Moon, LogOut, Home } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "./AuthModal";

const NAV = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/selector", label: "Explore" },
  { to: "/booking", label: "Booking" },
  { to: "/aftercare", label: "Guide" },
] as const;

const ADMIN_NAV = { to: "/admin", label: "Admin" } as const;

export function Nav() {
  const { theme, toggle } = useTheme();
  const { user, profile, isAdmin, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navItems = isAdmin ? [...NAV, ADMIN_NAV] : NAV;

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">

          {/* LOGO cliquable = Home */}
          <Link to="/" className="font-condensed text-2xl tracking-[0.08em] cursor-hover hover:opacity-80 transition-opacity">
            NAILZ<span className="text-primary">X</span>AVA
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`link-underline text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-1.5 ${
                  path === n.to ? "text-primary" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {"icon" in n && <Home className="w-3.5 h-3.5" />}
                {n.label}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-9 h-9 grid place-items-center rounded-full border border-border hover:border-primary transition-colors cursor-hover"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              /* SI CONNECTÉE : affiche "You" à la place du bouton connecter */
              <div className="flex items-center gap-2">
                <Link
                  to="/portal"
                  className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors text-xs uppercase tracking-[0.16em] ${
                    path === "/portal"
                      ? "border-primary text-primary"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <span className="dot" />
                  You — {profile?.first_name || "Baddie"}
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
              /* SI NON CONNECTÉE : bouton You → ouvre modal connexion */
              <button
                onClick={() => setAuthOpen(true)}
                className="btn-outline-pink text-xs uppercase tracking-[0.2em]"
              >
                You
              </button>
            )}
          </div>
        </div>
      </nav>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}
