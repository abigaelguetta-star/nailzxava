import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: Props) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signin") {
      const { error } = await signIn(email, password);
      if (error) toast.error(error);
      else { toast.success("Bienvenue ♥"); onOpenChange(false); }
    } else {
      const { error } = await signUp(email, password);
      if (error) toast.error(error);
      else { toast.success("Compte créé. Tu peux te connecter."); setMode("signin"); }
    }
    setBusy(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-border max-w-md p-0 overflow-hidden">
        <div className="px-8 pt-8 pb-2">
          <DialogHeader>
            <p className="eyebrow mb-3">Baddie Portal</p>
            <DialogTitle className="font-display text-3xl font-medium">
              {mode === "signin" ? <>Bon <span className="italic text-primary">retour</span>.</> : <>Rejoins le <span className="italic text-primary">cercle</span>.</>}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="flex border-b border-border mx-8 mt-4">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors ${mode === "signin" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"}`}
          >
            Connexion
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors ${mode === "signup" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"}`}
          >
            Inscription
          </button>
        </div>

        <form onSubmit={submit} className="p-8 space-y-4">
          <div>
            <label className="eyebrow block mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-border py-2 text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="eyebrow block mb-2">Mot de passe</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-border py-2 text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <button type="submit" disabled={busy} className="btn-pink w-full mt-6 disabled:opacity-50">
            <span>{busy ? "..." : mode === "signin" ? "Se connecter" : "Créer mon compte"}</span>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
