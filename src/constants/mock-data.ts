export interface Match {
  id: string;
  title: string;
  status: "live" | "finished" | "upcoming";
  location: string;
  club: string;
  datetime: string;
  scores: {
    hdc: number;
    net: number;
    gross: number;
    ranking: number;
    skins: number;
  };
}

export interface Achievement {
  id: string;
  type: "ranking" | "net" | "gross";
  value: number | string; // Cho phép dùng "-" khi chưa có data
  label: string;
}

export const MOCK_MATCHES: Match[] = [
  {
    id: "1",
    title: "Trận bán kết giải MBF 2024",
    status: "live",
    location: "Sân Golf Đại Lại",
    club: "MBF Club",
    datetime: "8:00 12/12/2024",
    scores: { hdc: 30, net: 20, gross: 25, ranking: 2, skins: 92 },
  },
  {
    id: "2",
    title: "Trận bán kết giải MBF 2024",
    status: "finished",
    location: "Sân Golf Đại Lại",
    club: "MBF Club",
    datetime: "8:00 12/12/2024",
    scores: { hdc: 30, net: 20, gross: 25, ranking: 2, skins: 92 },
  },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: "1", type: "ranking", value: 5, label: "Hạng tốt nhất" },
  { id: "2", type: "net", value: 20, label: "NET tốt nhất" },
  { id: "3", type: "gross", value: 10, label: "GROSS tốt nhất" },
];

export interface Player {
  id: string;
  name: string;
  avatar: string;
  index: number;
  hdc: number;
  voa: number;
  isVerified?: boolean;
}

export const MOCK_PLAYERS: Player[] = [
  {
    id: "p1",
    name: "Nguyễn Văn Trung",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    index: 21.8,
    hdc: 30,
    voa: 99999,
    isVerified: true,
  },
  {
    id: "p2",
    name: "Nguyễn Văn Trung",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    index: 21.8,
    hdc: 30,
    voa: 99999,
    isVerified: true,
  },
  {
    id: "p3",
    name: "Nguyễn Văn Trung",
    avatar: "https://images.unsplash.com/photo-1501746074465-4cebaf45b800?w=100&h=100&fit=crop",
    index: 21.8,
    hdc: 30,
    voa: 99999,
    isVerified: true,
  },
  {
    id: "p4",
    name: "Nguyễn Văn Trung",
    avatar: "https://images.unsplash.com/photo-1493247527751-218270055e9d?w=100&h=100&fit=crop",
    index: 21.8,
    hdc: 30,
    voa: 99999,
    isVerified: true,
  },
  {
    id: "p5",
    name: "Nguyễn Văn Trung",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop",
    index: 21.8,
    hdc: 30,
    voa: 99999,
    isVerified: true,
  }
];

import { User } from "../types/auth.types";

export const MOCK_USERS: Record<string, User> = {
  a: {
    id: "usr_001",
    fullName: "Nguyễn Văn An",
    vgaCode: "a",
    phone: "0901234567",
    token: "mock-jwt-token-xyz-a",
  },
  b: {
    id: "usr_002",
    fullName: "Nguyễn Văn Anh",
    vgaCode: "b",
    phone: "0908888888",
    token: "mock-jwt-token-xyz-b",
  },
};

export const MOCK_CREDENTIALS = {
  vgaCode: "a", // ← đổi
  password: "123456", // ← đổi
};

export const MOCK_HISTORY_MATCHES: Match[] = [
  {
    id: "h1",
    title: "Trận bán kết giải MBF 2024",
    status: "finished",
    location: "Sân Golf Đại Lải",
    club: "MBF Club",
    datetime: "8:00 12/12/2024",
    scores: { hdc: 30, net: 20, gross: 25, ranking: 2, skins: 92 },
  },
  {
    id: "h2",
    title: "Sân Golf Đại Lải",
    status: "finished",
    location: "Sân Golf Đại Lải",
    club: "MBF Club",
    datetime: "8:00 12/12/2024",
    scores: { hdc: 30, net: 20, gross: 25, ranking: 2, skins: 92 },
  },
  {
    id: "h3",
    title: "Trận bán kết giải MBF 2024",
    status: "finished",
    location: "Sân Golf Đại Lải",
    club: "MBF Club",
    datetime: "8:00 12/12/2024",
    scores: { hdc: 30, net: 20, gross: 25, ranking: 2, skins: 92 },
  },
];
