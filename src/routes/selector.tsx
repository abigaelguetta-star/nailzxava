import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { POSES } from "@/lib/poses";
import { PoseCard } from "@/components/PoseCard";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/selector")({
  component: Selector,
  head: () => ({
    meta: [
      { title: "Nail Selector — nailzxava" },
      { name: "description", content: "Galerie éditoriale des créations d'Ava. Filtre par technique, forme, longueur et couleur pour composer ton style." },
    ],
  }),
});

interface DisplayPose { 
  id: string; 
  name: string; 
  vibe: string; 
  colors: string[]; 
  image: string; 
}

// Liste des couleurs principales
const AVAILABLE_COLORS = [
  "Black", "White", "Silver", "Chrome", "Pink", "Red", "Blue", "Green", "Kaki", "Bordeaux", "Yellow", "Brown", "Nude"
];

function Selector() {
  const [dbItems, setDbItems] = useState<DisplayPose[]>([]);

  // États pour gérer l'entonnoir de filtrage
  const [tech, setTech] = useState<"Tout" | "Gel-X" | "Semi-permanent">("Tout");
  const [forme, setForme] = useState<"Tout" | "Amande" | "Carré">("Tout");
  const [longueur, setLongueur] = useState<"Tout" | "court" | "medium" | "long">("Tout");
  
  // Gestion de la couleur et de l'affichage du menu déroulant des couleurs
  const [couleur, setCouleur] = useState<string>("Tout");
  const [showColors, setShowColors] = useState<boolean>(false);

  // Réinitialise les sous-filtres si on change de technique
  const handleTechChange = (newTech: "Tout" | "Gel-X" | "Semi-permanent") => {
    setTech(newTech);
    setForme("Tout");
    setLongueur("Tout");
  };

  // Réinitialise la longueur si on change de forme
  const handleFormeChange = (newForme: "Tout" | "Amande" | "Carré") => {
    setForme(newForme);
    setLongueur("Tout");
  };

  useEffect(() => {
    supabase.from("gallery_items").select("id,name,vibe,colors,image_url").eq("published", true)
      .order("sort_order").order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setDbItems(data.map((d) => ({ 
          id: d.id, 
          name: d.name, 
          vibe: d.vibe, 
          colors: d.colors || [], 
          image: d.image_url 
        })));
      });
  }, []);

  const all: DisplayPose[] = useMemo(() => {
    const fromStatic = POSES.map((p) => ({ 
      id: p.id, 
      name: p.name, 
      vibe: p.vibe as string, 
      colors: p.colors || [], 
      image: p.image 
    }));
    return [...dbItems, ...fromStatic];
  }, [dbItems]);

  // Logique de filtrage par étapes
  const filtered = useMemo(() => {
    return all.filter((p) => {
      const v = p.vibe.toLowerCase();
      
      // 1. Filtrer par technique
      if (tech === "Gel-X" && !v.includes("gel-x")) return false;
      if (tech === "Semi-permanent" && !v.includes("semi-permanent")) return false;
      
      // 2. Filtrer par forme (uniquement si Gel-X)
      if (tech === "Gel-X" && forme === "Amande" && !v.includes("amande")) return false;
      if (tech === "Gel-X" && forme === "Carré" && !v.includes("carré")) return false;
      
      // 3. Filtrer par longueur (uniquement si Gel-X)
      if (tech === "Gel-X" && longueur !== "Tout" && !v.includes(longueur)) return false;

      // 4. Filtrer par couleur
      if (couleur !== "Tout") {
        const poseColors = p.colors.map((c) => c.toLowerCase());
        if (!poseColors.includes(couleur.toLowerCase())) return false;
      }

      return true;
    });
  }, [tech, forme, longueur, couleur, all]);

  return (
    <div className="relative">
      <div className="bg-decor-text top-20 -left-12" aria-hidden>SELECT</div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-12 md:pt-20">
        <p className="eyebrow">— Nail Selector</p>
        <h1 className="headline mt-4 max-w-4xl">
          Pick your <span className="headline-italic">poison</span>.
        </h1>
        <p className="text-muted-foreground max-w-md mt-6">
          Chaque pose est une création unique. Filtre selon tes envies et enregistre tes préférées.
        </p>

        {/* --- CONTENEUR DES FILTRES --- */}
        <div className="space-y-4 mt-12">

          {/* --- ÉTAPE 1 : TECHNIQUE & DÉROULANT COULEUR --- */}
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => handleTechChange("Tout")} className={`pill ${tech === "Tout" ? "active" : ""}`}>
              Tout voir
            </button>
            <button onClick={() => handleTechChange("Gel-X")} className={`pill ${tech === "Gel-X" ? "active" : ""}`}>
              Gel-X
            </button>
            <button onClick={() => handleTechChange("Semi-permanent")} className={`pill ${tech === "Semi-permanent" ? "active" : ""}`}>
              Semi-Permanent
            </button>

            {/* Bouton pour ouvrir/fermer le filtre couleur */}
            <button
              onClick={() => setShowColors(!showColors)}
              className={`pill border-dashed ${couleur !== "Tout" ? "active" : ""}`}
            >
              Couleur {couleur !== "Tout" ? `: ${couleur}` : "+"}
            </button>
          </div>

          {/* --- ÉTAPE 2 : LA FORME (UNIQUEMENT POUR GEL-X) --- */}
          {tech === "Gel-X" && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40 animate-fade-in">
              <button onClick={() => handleFormeChange("Tout")} className={`pill text-xs ${forme === "Tout" ? "active" : ""}`}>
                Toutes les formes
              </button>
              <button onClick={() => handleFormeChange("Amande")} className={`pill text-xs ${forme === "Amande" ? "active" : ""}`}>
                Amande
              </button>
              <button onClick={() => handleFormeChange("Carré")} className={`pill text-xs ${forme === "Carré" ? "active" : ""}`}>
                Carré
              </button>
            </div>
          )}

          {/* --- ÉTAPE 3 : LA LONGUEUR (UNIQUEMENT POUR GEL-X SI UNE FORME EST CHOISIE) --- */}
          {tech === "Gel-X" && forme !== "Tout" && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40 animate-fade-in">
              <button onClick={() => setLongueur("Tout")} className={`pill text-xs ${longueur === "Tout" ? "active" : ""}`}>
                Toutes les longueurs
              </button>
              <button onClick={() => setLongueur("court")} className={`pill text-xs ${longueur === "court" ? "active" : ""}`}>
                Court
              </button>
              <button onClick={() => setLongueur("medium")} className={`pill text-xs ${longueur === "medium" ? "active" : ""}`}>
                Medium
              </button>
              <button onClick={() => setLongueur("long")} className={`pill text-xs ${longueur === "long" ? "active" : ""}`}>
                Long
              </button>
            </div>
          )}

          {/* --- ÉTAPE 4 : SOUS-MENU DE SÉLECTION DES COULEURS (AFFICHE QUAND SHOWCOLORS = TRUE) --- */}
          {showColors && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40 animate-fade-in">
              <button
                onClick={() => setCouleur("Tout")}
                className={`pill text-xs ${couleur === "Tout" ? "active" : ""}`}
              >
                Toutes les couleurs
              </button>
              {AVAILABLE_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCouleur(couleur === c ? "Tout" : c)}
                  className={`pill text-xs ${couleur === c ? "active" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* --- GRILLE DE RÉSULTATS --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-12 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3px]">
          {filtered.map((p) => <PoseCard key={p.id} pose={p} />)}
        </div>
        
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-24 font-display text-2xl italic">
            Aucune photo ne correspond à ces critères... pour l'instant.
          </p>
        )}
      </div>
    </div>
  );
}
