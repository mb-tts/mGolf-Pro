import type { ImageSourcePropType, ViewStyle, StyleProp } from "react-native";

// ─── Golf Scorecard / Hole ────────────────────────────────────────────────────

/** Tọa độ 1 chấm trên ảnh bản đồ hole */
export interface MapPoint {
  id: number;
  top: string;
  left: string;
  label: string;
}

/** Thông tin chi tiết 1 lỗ golf */
export interface HoleData {
  hole: number;
  par: number;
  yard?: number;
  strokeIndex?: number;
  image?: string;
  black?: number;
  blue?: number;
  white?: number;
  red?: number;
  teeTournament?: string;
  teeMen?: string;
  teeWomen?: string;
  layout?: string;
  obstacles?: string;
  greenDetail?: string;
  /** Ảnh sơ đồ bản đồ hole — có thể là require() hoặc URI string */
  layoutImage?: ImageSourcePropType;
  /** Các chấm tọa độ trên bản đồ hole */
  mapPoints?: MapPoint[];
}

// ─── Course Details ───────────────────────────────────────────────────────────

/** Thông tin chi tiết sân golf */
export interface CourseDetails {
  name: string;
  location: string;
  holes?: string;
  operatingHours?: string;
  phone?: string;
  description?: string;
  courseImages?: string[];
  scorecard: HoleData[];
}

// ─── Outing Rules ─────────────────────────────────────────────────────────────

/** 1 điều luật trong thể lệ giải */
export interface OutingRule {
  id: string;
  title: string;
  content?: string;
  subContent?: string;
  bullets?: string[];
}

// ─── Flight / Player ──────────────────────────────────────────────────────────

/** 1 người chơi trong flight */
export interface FlightPlayer {
  id: string;
  name: string;
  hdc: number;
  vgaCode: string;
  image: string;
}

/** 1 flight (nhóm chơi) */
export interface Flight {
  id: string;
  name: string;
  players: FlightPlayer[];
}

// ─── Results ──────────────────────────────────────────────────────────────────

/** Kết quả 1 người chơi */
export interface OutingResult {
  id: string;
  rank: number;
  name: string;
  hdc: number;
  vgaCode: string;
  net: number;
  points: number;
  image: string;
}

// ─── Outing Data ──────────────────────────────────────────────────────────────

/** Dữ liệu 1 outing/giải đấu */
export interface OutingData {
  id: string;
  title: string;
  time: string;
  date: string;
  places: string;
  address: string;
  participants: number;
  fly: number;
  image: ImageSourcePropType;
  courseDetails: CourseDetails;
  rules: OutingRule[];
  flights: Flight[];
  results: OutingResult[];
}

// ─── Settings Sections ────────────────────────────────────────────────────────

/** Settings dùng chung cho các section: TeamCoDefined, QuyGa, Contract */
export interface GameSettings {
  skinsUp?: string;
  comparison?: "best" | "all" | "weakest";
  compareTotalScore?: boolean;
  skinsPerScore?: string;
  accumulate?: boolean;
  holeCount?: number;
  byMonth?: boolean;
  playBest?: boolean;
  restrictions?: boolean;
  skinsPerHole?: string;
  condition?: "birdie" | "eagle" | "par" | "";
  splitFund?: boolean;
  skinsOut?: string;
  skinsIn?: string;
  skinsTotal?: string;
}

export interface SettingsSectionProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

// ─── Equipment ────────────────────────────────────────────────────────────────

/** Option item cho SelectionBottomSheet / Equipment */
export interface OptionItem {
  id: string;
  name: string;
  logo?: ImageSourcePropType;
}

export interface EquipmentItem {
  label: string;
  value: string;
  logo?: ImageSourcePropType;
}

// ─── Navigation Screen Props (typed route + navigation) ───────────────────────

/** Ionicons icon name type — dùng thay `any` cho icon prop */
export type IoniconsName = React.ComponentProps<
  typeof import("@expo/vector-icons").Ionicons
>["name"];

// ─── Component Prop Types ─────────────────────────────────────────────────────

/** Props cho SelectionCard component */
export interface SelectionCardProps {
  label?: string;
  initialChecked?: boolean;
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children?: React.ReactNode;
}

/** Props cho InfoRow component trong outingDetail */
export interface InfoRowProps {
  icon: IoniconsName;
  text: string;
  color: string;
}

/** Props cho SectionHeader local component trong outingDetail */
export interface OutingSectionHeaderProps {
  title: string;
  rightText?: string;
  hasLine?: boolean;
  onRightPress?: () => void;
}
