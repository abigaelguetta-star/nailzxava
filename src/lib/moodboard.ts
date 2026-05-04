import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { POSES, type Pose } from "@/lib/poses";
import { toast } from "sonner";

const LOCAL_KEY = "nailz-moodboard-local";

export function useMoodboard() {
  const { user } = useAuth();
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // load
  useEffect(() => {
    let active = true;
    (async () => {
      if (user) {
        const { data } = await supabase
          .from("moodboard_items")
          .select("pose_id")
          .eq("user_id", user.id);
        if (active && data) setLikedIds(new Set(data.map((d) => d.pose_id)));
      } else {
        const local = typeof window !== "undefined" ? localStorage.getItem(LOCAL_KEY) : null;
        if (active && local) {
          try { setLikedIds(new Set(JSON.parse(local))); } catch { /* ignore */ }
        }
      }
      if (active) setLoading(false);
    })();
    return () => { active = false; };
  }, [user]);

  const persistLocal = (set: Set<string>) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(Array.from(set)));
    }
  };

  const toggle = useCallback(async (pose: Pose) => {
    const isLiked = likedIds.has(pose.id);
    const next = new Set(likedIds);
    if (isLiked) next.delete(pose.id); else next.add(pose.id);
    setLikedIds(next);

    if (!user) {
      persistLocal(next);
      if (!isLiked) toast("Sauvegardé. Connecte-toi pour le retrouver partout ♡");
      return;
    }

    if (isLiked) {
      await supabase.from("moodboard_items").delete().eq("user_id", user.id).eq("pose_id", pose.id);
    } else {
      await supabase.from("moodboard_items").insert({
        user_id: user.id,
        pose_id: pose.id,
        pose_name: pose.name,
        vibe: pose.vibe,
        image_url: pose.image,
      });
      toast("Ajouté à ton moodboard ♥");
    }
  }, [likedIds, user]);

  const liked = POSES.filter((p) => likedIds.has(p.id));

  return { likedIds, liked, toggle, loading };
}
