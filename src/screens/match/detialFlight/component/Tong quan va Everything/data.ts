// Định nghĩa cấu trúc dữ liệu cho một thẻ user
export interface PlayerData {
  id: string;
  name: string;
  avatarUrl: string;
  strokesHdc: string;
  netScore: number;  
  skins: number;      
  isMe?: boolean;     
}

export const mockPlayers: PlayerData[] = [
  {
    id: '1',
    name: 'Tôi',
    avatarUrl: "https://i.pravatar.cc/150?u=1", 
    strokesHdc: '+15/30',
    netScore: 5,
    skins: -1,
    isMe: true, 
  },
  {
    id: '2',
    name: 'Hoàng Anh',
    avatarUrl: "https://i.pravatar.cc/150?u=2",
    strokesHdc: '+15/30',
    netScore: 10,
    skins: -1,
  },
  {
    id: '3',
    name: 'Xuân Anh',
    avatarUrl: "https://i.pravatar.cc/150?u=3",
    strokesHdc: '+15/30',
    netScore: 15,
    skins: -1,
  },
  {
    id: '4',
    name: 'Hoàng Anh',
    avatarUrl: "https://i.pravatar.cc/150?u=4",
    strokesHdc: '+15/30',
    netScore: 20,
    skins: -1,
  },
];

// --- KIỂU DỮ LIỆU (INTERFACES) ---

export interface Player {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface PlayerScoreDetail {
  circleScore: number;   // Điểm trong vòng tròn (VD: -2)
  statusValue: string;   // Giá trị trạng thái (VD: "+1", "-1")
  statusLabel: string;   // Nhãn trạng thái (VD: "UP", "TEAM")
  bluePoints: string;    // Điểm xanh (VD: "+1")
  goldPoints: string;    // Điểm vàng (VD: "+20", "-60")
}

export interface HoleRecord {
  holeNumber: number;
  isHighlighted?: boolean; // Dùng để tô màu vàng cho hàng đặc biệt (như hố 3)
  scores: Record<string, PlayerScoreDetail>; // Record mapping giữa Player ID và Điểm
}

// --- DỮ LIỆU MẪU (MOCK DATA) ---

export const mockPlayersHeader: Player[] = [
  { id: 'p1', name: 'N.Linh', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
  { id: 'p2', name: 'H.Anh', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
  { id: 'p3', name: 'X.Anh', avatarUrl: 'https://i.pravatar.cc/150?img=13' },
  { id: 'p4', name: 'M.Anh', avatarUrl: 'https://i.pravatar.cc/150?img=14' },
];

// Tạo helper function để tái sử dụng data lặp lại trong ảnh cho nhanh
const createMockScore = (
  isNegative: boolean,
  isTeam: boolean,
  goldValue: string
): PlayerScoreDetail => ({
  circleScore: -2,
  statusValue: isNegative ? '-1' : '+1',
  statusLabel: isTeam ? 'TEAM' : 'UP',
  bluePoints: '+1',
  goldPoints: goldValue,
});

export const mockHolesData: HoleRecord[] = [
  {
    holeNumber: 1,
    scores: {
      p1: createMockScore(false, false, '+20'),
      p2: createMockScore(false, false, '+20'),
      p3: createMockScore(true, false, '-20'),
      p4: createMockScore(true, false, '-20'),
    },
  },
  {
    holeNumber: 2,
    scores: {
      p1: createMockScore(false, false, '+20'),
      p2: createMockScore(false, false, '+20'),
      p3: createMockScore(true, false, '-20'),
      p4: createMockScore(true, false, '-20'),
    },
  },
  {
    holeNumber: 3,
    isHighlighted: true, // Hố 3 có nền vàng
    scores: {
      p1: createMockScore(false, true, '+60'),
      p2: createMockScore(false, true, '+60'),
      p3: createMockScore(true, true, '-60'),
      p4: createMockScore(true, true, '-60'),
    },
  },
  {
    holeNumber: 4,
    scores: {
      p1: createMockScore(false, false, '+20'),
      p2: createMockScore(false, false, '+20'),
      p3: createMockScore(true, false, '-20'),
      p4: createMockScore(true, false, '-20'),
    },
  },
  {
    holeNumber: 5,
    scores: {
      p1: createMockScore(false, false, '+20'),
      p2: createMockScore(false, false, '+20'),
      p3: createMockScore(true, false, '-20'),
      p4: createMockScore(true, false, '-20'),
    },
  },
];