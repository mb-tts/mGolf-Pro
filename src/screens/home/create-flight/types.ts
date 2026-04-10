// ─── Types cho Create Flight ──────────────────────────────────────────────────

export interface Course {
  id: string;
  name: string;
  address: string;
  image: string; // URL ảnh sân golf
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  index: number;
  hdc: number;
  vga: string;
  phone?: string;
  isOwner: boolean;
}

export type HoleCount = 9 | 18;
export type Route = "A" | "B";
