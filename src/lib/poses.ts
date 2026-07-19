import camoPiercing from "@/assets/camopiercing.png";
import cyberOrchid from "@/assets/cyberorchid.png";
import gothicOcean from "@/assets/gothicocean.png";
import silverCatEye from "@/assets/silvercateye.png";
import spiderPunk from "@/assets/spiderpunk.png";
import wildOrchid from "@/assets/wildorchid.png";
import abyssalGlow from "@/assets/abyssalglow.png";
import baroqueJewelry from "@/assets/baroquejewelry.png";
import gothCoquette from "@/assets/gothcoquette.png";
import pinkhibiscus from "@/assets/pinkhibiscus.png";
import lacePiercing from "@/assets/lacepiercing.png";
import pinkgeodeCateye from "@/assets/pinkgeodecateye.png";
import blobBaroque from "@/assets/blobbaroque.png";
import kakiTartan from "@/assets/kakitartan.png";
import glazedLemon from "@/assets/glazedlemon.png";
import digitalCircus from "@/assets/digitalcircus.png";
import bloomingFrench from "@/assets/bloomingfrench.png";
import frenchCoquette from "@/assets/frenchcoquette.png";
import bordeauxStars from "@/assets/bordeauxstars.png";
import glitteryDaisy from "@/assets/glitterydaisy.png";
import fullLace from "@/assets/fulllace.png";
import cyberStar from "@/assets/cyberstar.png";
import rubyFrench from "@/assets/rubyfrench.png";
import laceSpiral from "@/assets/lacespiral.png";
import viviennePink from "@/assets/viviennepink.png";

export type Vibe = 
  | "Amande court - Gel-X"
  | "Amande medium - Gel-X"
  | "Amande long - Gel-X"
  | "Carré court - Gel-X"
  | "Carré medium - Gel-X"
  | "Carré long - Gel-X"
  | "Amande court - Semi-permanent"
  | "Amande medium - Semi-permanent"
  | "Amande long - Semi-permanent"
  | "Carré court - Semi-permanent"
  | "Carré medium - Semi-permanent"
  | "Carré long - Semi-permanent";

export interface Pose {
  id: string;
  name: string;
  vibe: Vibe;
  colors: string[];
  image: string;
}

export const VIBES: Vibe[] = [
  "Amande court - Gel-X",
  "Amande medium - Gel-X",
  "Amande long - Gel-X",
  "Carré court - Gel-X",
  "Carré medium - Gel-X",
  "Carré long - Gel-X",
  "Amande court - Semi-permanent",
  "Amande medium - Semi-permanent",
  "Amande long - Semi-permanent",
  "Carré court - Semi-permanent",
  "Carré medium - Semi-permanent",
  "Carré long - Semi-permanent"
];

export const POSES: Pose[] = [
  { 
    id: "p1", 
    name: "Camo Piercing", 
    vibe: "Carré long - Gel-X", 
    colors: ["Green", "Silver", "White", "Kaki"], 
    image: camoPiercing 
  },
  { 
    id: "p2", 
    name: "Cyber Orchid", 
    vibe: "Amande long - Gel-X", 
    colors: ["Purple", "Black", "Silver", "White"], 
    image: cyberOrchid 
  },
  { 
    id: "p3", 
    name: "Gothic Ocean", 
    vibe: "Carré long - Gel-X", 
    colors: ["Silver", "Pink", "White", "Black"], 
    image: gothicOcean 
  },
  { 
    id: "p4", 
    name: "Silver Cat Eye", 
    vibe: "Amande medium - Gel-X", 
    colors: ["Silver", "Pink", "Cat Eye"], 
    image: silverCatEye 
  },
  { 
    id: "p5", 
    name: "Spider Punk", 
    vibe: "Amande long - Gel-X", 
    colors: ["Black", "Multicolor", "Silver"], 
    image: spiderPunk 
  },
  { 
    id: "p6", 
    name: "Wild Orchid", 
    vibe: "Amande medium - Gel-X", 
    colors: ["Purple", "Burgundy", "Pink"], 
    image: wildOrchid 
  },
  { 
    id: "p7", 
    name: "Abyssal Glow", 
    vibe: "Amande long - Gel-X", 
    colors: ["Multicolor", "Kaki", "Orange", "Blue"], 
    image: abyssalGlow 
  },
  { 
    id: "p8", 
    name: "Baroque Jewelry", 
    vibe: "Amande long - Gel-X", 
    colors: ["Gold", "Silver", "White", "Pearl"], 
    image: baroqueJewelry 
  },
  { 
    id: "p9", 
    name: "Goth Coquette", 
    vibe: "Amande long - Gel-X", 
    colors: ["Black", "Pink", "Purple", "White"], 
    image: gothCoquette 
  },
  { 
    id: "p10", 
    name: "Pink Hibiscus", 
    vibe: "Amande long - Gel-X", 
    colors: ["Pink", "White", "Fuchsia"], 
    image: pinkhibiscus
  },
  { 
    id: "p11", 
    name: "Lace Piercing", 
    vibe: "Amande medium - Gel-X", 
    colors: ["White", "Black", "Silver"], 
    image: lacePiercing
  },
  { 
    id: "p12", 
    name: "Pink Geode", 
    vibe: "Amande medium - Gel-X", 
    colors: ["Gold", "Pink", "Cat Eye"], 
    image: pinkgeodeCateye
  },
  { 
    id: "p13", 
    name: "Blob Baroque", 
    vibe: "Amande long - Gel-X", 
    colors: ["Pink", "Yellow", "Gold", "Silver", "Multicolor"], 
    image: blobBaroque
  },
  { 
    id: "p14", 
    name: "Kaki Tartan", 
    vibe: "Amande long - Gel-X", 
    colors: ["Kaki", "Gold", "Silver", "White", "Black"], 
    image: kakiTartan
  },
  { 
    id: "p15", 
    name: "Glazed Lemon", 
    vibe: "Amande long - Gel-X", 
    colors: ["Yellow", "White", "Chrome"], 
    image: glazedLemon
  },
  { 
    id: "p16", 
    name: "Digital Circus", 
    vibe: "Amande medium - Gel-X", 
    colors: ["Purple", "Red", "Yellow", "Gold"], 
    image: digitalCircus
  },
  { 
    id: "p17", 
    name: "Blooming French", 
    vibe: "Amande court - Semi-permanent", 
    colors: ["Yellow", "Red", "Pink"], 
    image: bloomingFrench
  },
  { 
    id: "p18", 
    name: "French Coquette", 
    vibe: "Amande court - Gel-X", 
    colors: ["White", "Gold", "Nude"], 
    image: frenchCoquette
  },
  { 
    id: "p19", 
    name: "Burgundy Stars", 
    vibe: "Amande medium - Gel-X", 
    colors: ["Bordeaux", "Chrome", "Nude"], 
    image: bordeauxStars
  },
  { 
    id: "p20", 
    name: "Glittery Daisy", 
    vibe: "Carré court - Gel-X", 
    colors: ["White", "Pink", "Gold", "Glitter"], 
    image: glitteryDaisy
  },
  { 
    id: "p21", 
    name: "Full Lace", 
    vibe: "Amande long - Gel-X", 
    colors: ["White", "Nude"], 
    image: fullLace
  },
  { 
    id: "p22", 
    name: "Cyber Star", 
    vibe: "Amande medium - Gel-X", 
    colors: ["Pink", "White", "Silver", "Chrome"], 
    image: cyberStar
  },
  { 
    id: "p23", 
    name: "Ruby French", 
    vibe: "Amande medium - Gel-X", 
    colors: ["Red", "White", "Nude"], 
    image: rubyFrench
  },
  { 
    id: "p24", 
    name: "Lace Spiral", 
    vibe: "Amande long - Gel-X", 
    colors: ["White", "Silver", "Gold", "Blue"], 
    image: laceSpiral
  },
  { 
    id: "p25", 
    name: "Vivienne Pink", 
    vibe: "Amande long - Gel-X", 
    colors: ["Pink", "White", "Silver", "Multicolor"], 
    image: viviennePink
  }  
];
export const SERVICES = [
  // --- Semi-permanent ---
  { id: "sp-couleur", name: "Semi permanent — Couleur simple", duration: 40, price: 20 },
  { id: "sp-art-simple", name: "Semi permanent — Nail art simple (Niveau 1)", duration: 50, price: 25 },
  { id: "sp-art-medium", name: "Semi permanent — Nail art medium (Niveau 2)", duration: 70, price: 30 }, // 1h10 = 70 min
  { id: "sp-art-avancee", name: "Semi permanent — Nail art avancée (Niveau 3)", duration: 90, price: 35 }, // 1h30 = 90 min

  // --- Gel-X / Pose Américaine ---
  { id: "gx-couleur", name: "Gel-X / pose américaine — Couleur simple", duration: 60, price: 30 }, // 1h = 60 min
  { id: "gx-art-simple", name: "Gel-X / pose américaine — Nail art simple (Niveau 1)", duration: 90, price: 35 }, // 1h30 = 90 min
  { id: "gx-art-medium", name: "Gel-X / pose américaine — Nail art medium (Niveau 2)", duration: 120, price: 40 }, // 2h = 120 min
  { id: "gx-art-avancee", name: "Gel-X / pose américaine — Nail art avancée (Niveau 3)", duration: 150, price: 45 }, // 2h30 = 150 min

  // --- Déposes ---
  { id: "depose-sp", name: "Dépose — Semi permanent seuls", duration: 30, price: 5 },
  { id: "depose-fo", name: "Dépose — Faux ongles (Gel-X / Capsules)", duration: 60, price: 10 }, // 1h = 60 min
];

export const ADDONS: { id: string; name: string; duration: number; price: number }[] = [];

export const VIBES_RDV = [
  { id: "silence", emoji: "🤫", title: "Mode silence", sub: "Je veux me reposer" },
  { id: "film", emoji: "🎬", title: "Regarder un film", sub: "Netflix / YouTube" },
  { id: "music", emoji: "🎵", title: "R&B / Hip-hop", sub: "On met l'ambiance" },
  { id: "talk", emoji: "💬", title: "On discute", sub: "Vibe girl talk" },
];
