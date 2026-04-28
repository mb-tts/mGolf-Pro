
export interface Player {
  id: string;
  name: string;
  shortName: string;   
  avatarUrl: string;
  hdc: number;       
  vga: string;         
  strokesHdc: string;  
  netScore: number;
  skins: number;
  isMe?: boolean;
  isSelected?: boolean;
  isOwner?: boolean;
  isWinner?: boolean;
}

export const MOCK_PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Nguyễn Linh',
    shortName: 'N.Linh',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    hdc: 5,
    vga: 'VGA001',
    strokesHdc: '+5/30',
    netScore: 5,
    skins: 2,
    isMe: true,
    isSelected: true,
    isOwner: true,
    isWinner: true,
  },
  {
    id: 'p2',
    name: 'Hoàng Anh',
    shortName: 'H.Anh',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    hdc: 10,
    vga: 'VGA002',
    strokesHdc: '+10/30',
    netScore: 10,
    skins: -1,
    isSelected: true,
  },
  {
    id: 'p3',
    name: 'Xuân Anh',
    shortName: 'X.Anh',
    avatarUrl: 'https://i.pravatar.cc/150?img=13',
    hdc: 15,
    vga: 'VGA003',
    strokesHdc: '+15/30',
    netScore: 15,
    skins: -1,
    isSelected: true,
  },
  {
    id: 'p4',
    name: 'Minh Anh',
    shortName: 'M.Anh',
    avatarUrl: 'https://i.pravatar.cc/150?img=14',
    hdc: 20,
    vga: 'VGA004',
    strokesHdc: '+20/30',
    netScore: 20,
    skins: -1,
    isSelected: true,
  },
];

// ─── 2. TEAM XOAY – 6 cặp đấu (dùng cho headerTeamxoay) ────
export interface TeamXoayData {
  id: string;
  players: { name: string; avatar: string }[];
  score: string;
  isWinner?: boolean;
}

export const MOCK_TEAM_XOAY: TeamXoayData[] = [
  {
    id: '1',
    isWinner: true,
    players: [
      { name: MOCK_PLAYERS[0].shortName, avatar: MOCK_PLAYERS[0].avatarUrl },
      { name: MOCK_PLAYERS[1].shortName, avatar: MOCK_PLAYERS[1].avatarUrl },
    ],
    score: '+2UP/ +6',
  },
  {
    id: '2',
    players: [
      { name: MOCK_PLAYERS[2].shortName, avatar: MOCK_PLAYERS[2].avatarUrl },
      { name: MOCK_PLAYERS[3].shortName, avatar: MOCK_PLAYERS[3].avatarUrl },
    ],
    score: '-2UP/ -6',
  },
  {
    id: '3',
    players: [
      { name: MOCK_PLAYERS[0].shortName, avatar: MOCK_PLAYERS[0].avatarUrl },
      { name: MOCK_PLAYERS[2].shortName, avatar: MOCK_PLAYERS[2].avatarUrl },
    ],
    score: '+1UP/ +3',
  },
  {
    id: '4',
    players: [
      { name: MOCK_PLAYERS[1].shortName, avatar: MOCK_PLAYERS[1].avatarUrl },
      { name: MOCK_PLAYERS[3].shortName, avatar: MOCK_PLAYERS[3].avatarUrl },
    ],
    score: '-1UP/ -3',
  },
  {
    id: '5',
    players: [
      { name: MOCK_PLAYERS[0].shortName, avatar: MOCK_PLAYERS[0].avatarUrl },
      { name: MOCK_PLAYERS[3].shortName, avatar: MOCK_PLAYERS[3].avatarUrl },
    ],
    score: '+3UP/ +9',
  },
  {
    id: '6',
    players: [
      { name: MOCK_PLAYERS[1].shortName, avatar: MOCK_PLAYERS[1].avatarUrl },
      { name: MOCK_PLAYERS[2].shortName, avatar: MOCK_PLAYERS[2].avatarUrl },
    ],
    score: '-3UP/ -9',
  },
];

// ─── 3. BẢNG ĐIỂM TỪNG HỐ (dùng cho tableRegret / data.ts) ─
export interface PlayerScoreDetail {
  circleScore: number;
  statusValue: string;
  statusLabel: string;
  bluePoints: string;
  goldPoints: string;
}

export interface HoleRecord {
  holeNumber: number;
  isHighlighted?: boolean;
  scores: Record<string, PlayerScoreDetail>;
}

const makeScore = (
  circleScore: number,
  isPositive: boolean,
  isTeam: boolean,
  goldValue: string
): PlayerScoreDetail => ({
  circleScore,
  statusValue: isPositive ? '+1' : '-1',
  statusLabel: isTeam ? 'TEAM' : 'UP',
  bluePoints: isPositive ? '+1' : '-1',
  goldPoints: goldValue,
});

export const MOCK_HOLES: HoleRecord[] = [
  {
    holeNumber: 1,
    scores: {
      p1: makeScore(-2, true,  false, '+20'),
      p2: makeScore(-1, true,  false, '+20'),
      p3: makeScore(+1, false, false, '-20'),
      p4: makeScore(+2, false, false, '-20'),
    },
  },
  {
    holeNumber: 2,
    scores: {
      p1: makeScore(-2, true,  false, '+20'),
      p2: makeScore(-1, true,  false, '+20'),
      p3: makeScore(+1, false, false, '-20'),
      p4: makeScore(+2, false, false, '-20'),
    },
  },
  {
    holeNumber: 3,
    isHighlighted: true,
    scores: {
      p1: makeScore(-2, true,  true, '+60'),
      p2: makeScore(-1, true,  true, '+60'),
      p3: makeScore(+1, false, true, '-60'),
      p4: makeScore(+2, false, true, '-60'),
    },
  },
  {
    holeNumber: 4,
    scores: {
      p1: makeScore(-2, true,  false, '+20'),
      p2: makeScore(-1, true,  false, '+20'),
      p3: makeScore(+1, false, false, '-20'),
      p4: makeScore(+2, false, false, '-20'),
    },
  },
  {
    holeNumber: 5,
    scores: {
      p1: makeScore(-2, true,  false, '+20'),
      p2: makeScore(-1, true,  false, '+20'),
      p3: makeScore(+1, false, false, '-20'),
      p4: makeScore(+2, false, false, '-20'),
    },
  },
];

// ─── 4. TEAM XOAY – BẢNG KẾT QUẢ (dùng cho tableRegretTeamxoay) ─
export interface PlayerMatch {
  playerId: string;
  score: number;
  isWinner?: boolean;
}

export interface HoleMatch {
  id: string;
  team1: PlayerMatch[];
  team2: PlayerMatch[];
}

export interface MatchGroup {
  holes: HoleMatch[];
  result: {
    playerIds: string[];
    score: string;
    isWinner: boolean;
  };
}

export const MOCK_MATCH_GROUPS: MatchGroup[] = [
  {
    holes: [
      {
        id: '1',
        team1: [
          { playerId: 'p1', score: -1, isWinner: true },
          { playerId: 'p2', score: 0,  isWinner: true },
        ],
        team2: [
          { playerId: 'p3', score: 2 },
          { playerId: 'p4', score: 1 },
        ],
      },
      {
        id: '2',
        team1: [
          { playerId: 'p1', score: -2, isWinner: true },
          { playerId: 'p2', score: -1, isWinner: true },
        ],
        team2: [
          { playerId: 'p3', score: 1 },
          { playerId: 'p4', score: 2 },
        ],
      },
      {
        id: '3',
        team1: [
          { playerId: 'p1', score: -1, isWinner: true },
          { playerId: 'p2', score: 0,  isWinner: true },
        ],
        team2: [
          { playerId: 'p3', score: 2 },
          { playerId: 'p4', score: 1 },
        ],
      },
    ],
    result: { playerIds: ['p1', 'p2'], score: '+2UP/ +6', isWinner: true },
  },
  {
    holes: [
      {
        id: '4',
        team1: [
          { playerId: 'p1', score: -1, isWinner: true },
          { playerId: 'p3', score: 0,  isWinner: true },
        ],
        team2: [
          { playerId: 'p2', score: 2 },
          { playerId: 'p4', score: 1 },
        ],
      },
      {
        id: '5',
        team1: [
          { playerId: 'p1', score: -2, isWinner: true },
          { playerId: 'p3', score: -1, isWinner: true },
        ],
        team2: [
          { playerId: 'p2', score: 1 },
          { playerId: 'p4', score: 2 },
        ],
      },
    ],
    result: { playerIds: ['p1', 'p3'], score: '+1UP/ +3', isWinner: true },
  },
];

// ─── 5. HANDICAP (dùng cho handicapData / handicapSection) ──
export interface HandicapMatchup {
  id: string;
  playersLeft: string[];
  playersRight: string[];
  holes: number[];
}

export const PERSONAL_MATCHUPS: HandicapMatchup[] = [
  { id: 'm1', playersLeft: ['p1'], playersRight: ['p2'], holes: [1, 3, 6] },
  { id: 'm2', playersLeft: ['p1'], playersRight: ['p3'], holes: [1, 3, 4, 6] },
  { id: 'm3', playersLeft: ['p1'], playersRight: ['p4'], holes: [1, 3, 4, 6, 8] },
];

export const TEAM_MATCHUPS: HandicapMatchup[] = [
  { id: 't1', playersLeft: ['p1'], playersRight: ['p2', 'p3', 'p4'], holes: [1, 3, 4, 6, 8] },
  { id: 't2', playersLeft: ['p1', 'p2'], playersRight: ['p3', 'p4'], holes: [1, 3, 4, 6, 7, 9] },
];

// ─── 6. QUỸ GÀ (dùng cho dataquyga / tablequyga / totalquyga) ─
export interface ChickenHole {
  holeNumber: number;
  scores: Record<string, number | string>;
  currentPot: number;
  isHighlighted?: boolean;
}

export const CHICKEN_HOLES: ChickenHole[] = [1,2,3,4,5,6,7,8,9].map((h) => ({
  holeNumber: h,
  scores: { p1: -2, p2: -2, p3: -2, p4: -2 },
  currentPot: h * -8,
  isHighlighted: h === 6,
}));
// Hố 6: p1 thắng
CHICKEN_HOLES[5].scores['p1'] = 2;
CHICKEN_HOLES[5].currentPot = -46;

// ─── 7. KẾT QUẢ TỪNG HỐ (dùng cho valueRegret) ─────────────
export interface HoleResult {
  id: string;
  holeNumber: number;
  primaryPlayerId: string;
  otherPlayerIds: { playerId: string; score: number }[];
  total: number;
}

export const MOCK_HOLE_RESULTS: HoleResult[] = [1,2,3,4,5,6,7].map((num) => ({
  id: num.toString(),
  holeNumber: num,
  primaryPlayerId: 'p1',
  otherPlayerIds: [
    { playerId: 'p2', score: 1 },
    { playerId: 'p3', score: 2 },
    { playerId: 'p4', score: -1 },
  ],
  total: 2,
}));

// ─── Helper: lấy player theo id ─────────────────────────────
export const getPlayer = (id: string): Player | undefined =>
  MOCK_PLAYERS.find((p) => p.id === id);