export interface ChickenPlayer {
  id: string;
  name: string;
  avatar: string;
  points: number;
  isWinner?: boolean;
}

export interface ChickenHole {
  holeNumber: number;
  scores: Record<string, number | string>; // Mapping Player ID -> Score
  currentPot: number;
  isHighlighted?: boolean;
}

export const fundPlayers: ChickenPlayer[] = [
  { id: 'p1', name: 'N.Linh', avatar: 'https://i.pravatar.cc/150?img=11', points: 46, isWinner: true },
  { id: 'p2', name: 'N.Nam', avatar: 'https://i.pravatar.cc/150?img=12', points: 16 },
  { id: 'p3', name: 'N.Huy', avatar: 'https://i.pravatar.cc/150?img=13', points: 0 },
  { id: 'p4', name: 'N.Long', avatar: 'https://i.pravatar.cc/150?img=14', points: 0 },
];

export const chickenHoles: ChickenHole[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((h) => ({
  holeNumber: h,
  scores: { p1: -2, p2: -2, p3: -2, p4: -2 },
  currentPot: h * -8, // Demo logic giảm dần
  isHighlighted: h === 6, // Hố 6 đặc biệt trong ảnh
}));

// Gán riêng điểm cho hố 6 để hiện vương miện
chickenHoles[5].scores['p1'] = 2; 
chickenHoles[5].currentPot = -46;