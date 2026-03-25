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
  value: number;
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

import { User } from "../types/auth.types";

export const MOCK_USER: User = {
  id: "usr_001",
  fullName: "Nguyễn Văn An",
  vgaCode: "a",
  phone: "0901234567",
  token: "mock-jwt-token-xyz",
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
