import { Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { type Pose } from "@/lib/poses";
import { useMoodboard } from "@/lib/moodboard";

interface Props {
  pose: Pose;
  showActions?: boolean;
}

export function PoseCard({ pose, showActions = true }: Props) {
  const { likedIds, toggle } = useMoodboard();
  const liked = likedIds.has(pose.id);

  return (
    <div className="vibe-card group">
      <img src={pose.image} alt={pose.name} loading="lazy" />

      <button
        onClick={(e) => { e.preventDefault(); toggle(pose); }}
        aria-label="Ajouter au moodboard"
        className={`heart-btn cursor-hover ${liked ? "liked" : ""}`}
      >
        <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
      </button>

      <div className="vibe-overlay">
        <p className="eyebrow text-cream/70">{pose.vibe}</p>
        <p className="font-display text-2xl italic mt-1 text-cream">{pose.name}</p>
        {showActions && (
          <Link to="/booking" className="mt-4 inline-block">
            <button className="btn-outline-pink !border-cream/40 !text-cream hover:!bg-primary hover:!border-primary">
              Réserver ce style →
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
