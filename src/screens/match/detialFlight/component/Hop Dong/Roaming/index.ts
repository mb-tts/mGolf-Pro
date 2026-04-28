export interface Player {
  id: string;
  name: string;
  VGA: string;
  HDC: string;
  image: string;
}

export interface Flight {
  id: string;
  name: string;
  players: Player[];
}

export type SelectionStep = 1 | 2;

export interface SelectedPlayers {
  player1: Player | null;
  player2: Player | null;
}
