export interface PlayerHdc {
  id: string;
  name: string;
  avatarUrl: string;
  hdc: number;
}

export interface HandicapMatchup {
  id: string;
  playersLeft: string[];
  playersRight: string[]; 
  holes: number[]; 
}

export const hdcPlayers: PlayerHdc[] = [
  { id: 'p1', name: 'N.Linh', hdc: 5, avatarUrl: 'https://i.pravatar.cc/150?img=11' },
  { id: 'p2', name: 'N.Anh', hdc: 10, avatarUrl: 'https://i.pravatar.cc/150?img=12' },
  { id: 'p3', name: 'N.Anh', hdc: 15, avatarUrl: 'https://i.pravatar.cc/150?img=13' },
  { id: 'p4', name: 'N.Anh', hdc: 20, avatarUrl: 'https://i.pravatar.cc/150?img=14' },
];

export const personalMatchups: HandicapMatchup[] = [
  { id: 'm1', playersLeft: ['p1'], playersRight: ['p2'], holes: [1, 3, 6] },
  { id: 'm2', playersLeft: ['p1'], playersRight: ['p3'], holes: [1, 3, 4, 6] },
  { id: 'm3', playersLeft: ['p1'], playersRight: ['p4'], holes: [1, 3, 4, 6, 8] },
];

export const teamMatchups: HandicapMatchup[] = [
  { id: 't1', playersLeft: ['p1'], playersRight: ['p2', 'p3', 'p4'], holes: [1, 3, 4, 6, 8] },
  { id: 't2', playersLeft: ['p1', 'p2'], playersRight: ['p3', 'p4'], holes: [1, 3, 4, 6, 7, 9] },
];