import { Player, Flight } from "./";

export const MOCK_PLAYERS: Player[] = [
  { id: "1", name: "Nguyễn Văn Anh", VGA: "123565", HDC: "20", image: 'https://i.pravatar.cc/150?img=11' },
  { id: "2", name: "Nguyễn Hải Linh", VGA: "123568", HDC: "20", image: 'https://i.pravatar.cc/150?img=12' },
  { id: "3", name: "Nguyễn Hải Linh", VGA: "123568", HDC: "20", image: 'https://i.pravatar.cc/150?img=13' },
  { id: "4", name: "Nguyễn Hải Linh", VGA: "123568", HDC: "20", image: 'https://i.pravatar.cc/150?img=14' },
  { id: "5", name: "Nguyễn Hải Linh", VGA: "123568", HDC: "20", image: 'https://i.pravatar.cc/150?img=13' },
  { id: "6", name: "Nguyễn Hải Linh", VGA: "123568", HDC: "20", image: 'https://i.pravatar.cc/150?img=13' },
  { id: "7", name: "Nguyễn Hải Linh", VGA: "123568", HDC: "20", image: 'https://i.pravatar.cc/150?img=13' },
  { id: "8", name: "Nguyễn Hải Linh", VGA: "123568", HDC: "20", image: 'https://i.pravatar.cc/150?img=13' },
];

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: "flight1",
    name: "Flight 1",
    players: MOCK_PLAYERS.slice(0, 4),
  },
  {
    id: "flight2",
    name: "Flight 2",
    players: MOCK_PLAYERS.slice(4, 8),
  },
];
