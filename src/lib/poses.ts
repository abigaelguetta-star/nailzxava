import nailChrome from "@/assets/nail-chrome.jpg";
import nailDark from "@/assets/nail-dark.jpg";
import nailCyber from "@/assets/nail-cyber.jpg";
import nailRed from "@/assets/nail-red.jpg";
import nailGlam from "@/assets/nail-glam.jpg";
import nailBaddie from "@/assets/nail-baddie.jpg";

export type Vibe = "Full Glam" | "Cyber Y2K" | "Quiet Luxury" | "Baddie Pack" | "Dark" | "Chrome";

export interface Pose {
  id: string;
  name: string;
  vibe: Vibe;
  colors: string[];
  image: string;
}

export const VIBES: Vibe[] = ["Full Glam", "Cyber Y2K", "Quiet Luxury", "Baddie Pack", "Dark", "Chrome"];

export const POSES: Pose[] = [
  { id: "p1", name: "Liquid Mirror", vibe: "Chrome", colors: ["Silver", "Dark"], image: nailChrome },
  { id: "p2", name: "Black Widow", vibe: "Dark", colors: ["Black"], image: nailDark },
  { id: "p3", name: "Y2K Princess", vibe: "Cyber Y2K", colors: ["Pink", "Holo"], image: nailCyber },
  { id: "p4", name: "Cherry Noir", vibe: "Dark", colors: ["Red"], image: nailRed },
  { id: "p5", name: "Crystal Empire", vibe: "Full Glam", colors: ["Crystal"], image: nailGlam },
  { id: "p6", name: "Wild Cat", vibe: "Baddie Pack", colors: ["Brown", "Animal"], image: nailBaddie },
  { id: "p7", name: "Midnight Chrome", vibe: "Chrome", colors: ["Silver"], image: nailChrome },
  { id: "p8", name: "Stiletto Soul", vibe: "Dark", colors: ["Black"], image: nailDark },
  { id: "p9", name: "Holo Dream", vibe: "Cyber Y2K", colors: ["Holo", "Pink"], image: nailCyber },
  { id: "p10", name: "Tarantino Red", vibe: "Full Glam", colors: ["Red"], image: nailRed },
  { id: "p11", name: "Diamond Rain", vibe: "Full Glam", colors: ["Crystal"], image: nailGlam },
  { id: "p12", name: "Leopard Queen", vibe: "Baddie Pack", colors: ["Animal"], image: nailBaddie },
];

export const SERVICES = [
  { id: "sp-couleur", name: "Semi permanent — Couleur simple", duration: 180, price: 20 },
  { id: "sp-art-simple", name: "Semi permanent — Nail art simple", duration: 180, price: 25 },
  { id: "sp-art-medium", name: "Semi permanent — Nail art medium", duration: 180, price: 30 },
  { id: "sp-art-avancee", name: "Semi permanent — Nail art avancée", duration: 180, price: 35 },
  { id: "gx-couleur", name: "Gel-X / pose américaine — Couleur simple", duration: 180, price: 30 },
  { id: "gx-art-simple", name: "Gel-X / pose américaine — Nail art simple", duration: 180, price: 35 },
  { id: "gx-art-medium", name: "Gel-X / pose américaine — Nail art medium", duration: 180, price: 40 },
  { id: "gx-art-avancee", name: "Gel-X / pose américaine — Nail art avancée", duration: 180, price: 45 },
];

export const ADDONS: { id: string; name: string; duration: number; price: number }[] = [];

export const VIBES_RDV = [
  { id: "silence", emoji: "🤫", title: "Mode silence", sub: "Je veux me reposer" },
  { id: "film", emoji: "🎬", title: "Regarder un film", sub: "Netflix / YouTube" },
  { id: "music", emoji: "🎵", title: "R&B / Hip-hop", sub: "On met l'ambiance" },
  { id: "talk", emoji: "💬", title: "On discute", sub: "Vibe girl talk" },
];
