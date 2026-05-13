import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { POSES, type Pose } from "@/lib/poses";
import { toast } from "sonner";

const LOCAL_KEY = "nailz-moodboard-local";

export interface LikedItem {
  id: string;
  name: string;
  vibe: string;
  image: string;
}

export function useMoodboard() {
  const { user } = useAuth();
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (user) {
        const { data } = await supabase
          .from("moodboard_items")
          .select("pose_id, pose_name, vibe, image_url")
          .eq("user_id", user.id);
        if (active && data) {
          setLikedIds(new Set(data.map((d) => d.pose_id)));
          setLikedItems(data.map((d) => ({
            id: d.pose_id,
            name: d.pose_name || "",
            vibe: d.vibe || "",
            image: d.image_url || "",
          })));
        }
      } else {
        const local = typeof window !== "undefined" ? localStorage.getItem(LOCAL_KEY) : null;
        if (active && local) {
          try {
            const ids: string[] = JSON.parse(local);
            setLikedIds(new Set(ids));
            setLikedItems(POSES.filter((p) => ids.includes(p.id)).map((p) => ({ id: p.id, name: p.name, vibe: p.vibe, image: p.image })));
          } catch { /* ignore */ }
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

  const toggle = useCallback(async (pose: { id: string; name: string; vibe: string; image: string }) => {
    const isLiked = likedIds.has(pose.id);
    const next = new Set(likedIds);
    if (isLiked) next.delete(pose.id); else next.add(pose.id);
    setLikedIds(next);
    setLikedItems((prev) => isLiked
      ? prev.filter((p) => p.id !== pose.id)
      : [...prev, { id: pose.id, name: pose.name, vibe: pose.vibe as string, image: pose.image }]);

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
        vibe: pose.vibe as string,
        image_url: pose.image,
      });
      toast("Ajouté à ton moodboard ♥");
    }
  }, [likedIds, user]);

  return { likedIds, liked: likedItems, toggle, loading };
}
