import { Course, Player } from "./types";
import { SavedGame } from "./components/SavedGameModal";

// ─── Mock Game đã lưu ─────────────────────────────────────────────────────────
export const MOCK_SAVED_GAMES: SavedGame[] = [
  {
    id: "sg1",
    name: "Giải giao lưu ae F4",
    gameTypes: ["Everything", "Team xoay"],
    settings: {
      selectedSection: "everything",
      everythingFilter: "nothing",
      teamXoaySettings: {
        holeCount: 3,
        comparison: "best",
        byMonth: false,
        playBest: true,
        restrictions: false,
      },
      teamCoDefinedSettings: { holeCount: 3, comparison: "best" },
      contractSettings: { skinsOut: "", skinsIn: "", skinsTotal: "" },
      quyGaSettings: { skinsPerHole: "", condition: "" },
    },
  },
  {
    id: "sg2",
    name: "Giải giao ae F5",
    gameTypes: ["Team cố định", "Hợp đồng"],
    settings: {
      selectedSection: "teamcodefined",
      everythingFilter: "nothing",
      teamXoaySettings: {
        holeCount: 3,
        comparison: "best",
        byMonth: false,
        playBest: true,
        restrictions: false,
      },
      teamCoDefinedSettings: { holeCount: 6, comparison: "all" },
      contractSettings: { skinsOut: "50", skinsIn: "50", skinsTotal: "100" },
      quyGaSettings: { skinsPerHole: "", condition: "" },
    },
  },
  {
    id: "sg3",
    name: "Giải giao lưu ae F4",
    gameTypes: ["Team cố định", "Hợp đồng"],
    settings: {
      selectedSection: "teamcodefined",
      everythingFilter: "nothing",
      teamXoaySettings: {
        holeCount: 3,
        comparison: "best",
        byMonth: false,
        playBest: true,
        restrictions: false,
      },
      teamCoDefinedSettings: { holeCount: 3, comparison: "weakest" },
      contractSettings: { skinsOut: "30", skinsIn: "30", skinsTotal: "60" },
      quyGaSettings: { skinsPerHole: "", condition: "" },
    },
  },
  {
    id: "sg4",
    name: "Giải giao lưu ae F4",
    gameTypes: ["Team cố định", "Hợp đồng"],
    settings: {
      selectedSection: "hopdong",
      everythingFilter: "nothing",
      teamXoaySettings: {
        holeCount: 3,
        comparison: "best",
        byMonth: false,
        playBest: true,
        restrictions: false,
      },
      teamCoDefinedSettings: { holeCount: 9, comparison: "best" },
      contractSettings: { skinsOut: "100", skinsIn: "100", skinsTotal: "200" },
      quyGaSettings: { skinsPerHole: "", condition: "" },
    },
  },
];

// ─── Mock Sân đấu ────────────────────────────────────────────────────────────
export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    name: "Sân Golf Vân Trì",
    address: "Kim Nỗ, Đông Anh, Hà Nội",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=200&h=120&fit=crop",
  },
  {
    id: "2",
    name: "Sân Vĩnh Phúc",
    address: "Vĩnh Phúc, Việt Nam",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=200&h=120&fit=crop",
  },
  {
    id: "3",
    name: "Sân Long Biên",
    address: "Long Biên, Hà Nội",
    image: "https://images.unsplash.com/photo-1592919505780-303950717480?w=200&h=120&fit=crop",
  },
  {
    id: "4",
    name: "Sân Đồng Mô",
    address: "Sơn Tây, Hà Nội",
    image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=200&h=120&fit=crop",
  },
  {
    id: "5",
    name: "Sân Tràng An",
    address: "Ninh Bình, Việt Nam",
    image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=200&h=120&fit=crop",
  },
];

// ─── Mock Người chơi ─────────────────────────────────────────────────────────
export const MOCK_ALL_PLAYERS: Player[] = [
  {
    id: "1",
    name: "Nguyễn Văn Anh",
    avatar: "https://i.pravatar.cc/150?img=3",
    index: 21.8,
    hdc: 30,
    vga: 99999,
    isOwner: true,
  },
  {
    id: "2",
    name: "Nguyễn Văn Trung",
    avatar: "https://i.pravatar.cc/150?img=5",
    index: 21.8,
    hdc: 30,
    vga: 99999,
    isOwner: false,
  },
  {
    id: "3",
    name: "Tuấn Anh",
    avatar: "https://i.pravatar.cc/150?img=7",
    index: 21.8,
    hdc: 30,
    vga: 99999,
    isOwner: false,
  },
  {
    id: "4",
    name: "Trần Minh Quân",
    avatar: "https://i.pravatar.cc/150?img=11",
    index: 18.5,
    hdc: 24,
    vga: 88888,
    isOwner: false,
  },
  {
    id: "5",
    name: "Lê Hoàng Nam",
    avatar: "https://i.pravatar.cc/150?img=12",
    index: 15.2,
    hdc: 20,
    vga: 77777,
    isOwner: false,
  },
];

// ─── Mock Tee Times ──────────────────────────────────────────────────────────
export const MOCK_TEE_TIMES = [
  "6:00", "6:30", "7:00", "7:30", "8:00", "8:30",
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
];
