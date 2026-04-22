/**
 * Tập trung tất cả Navigation ParamList types ở đây.
 * Giúp import dễ hơn và tránh circular dependency.
 */
import type { OutingData, HoleData, CourseDetails } from "./golf.types";

// ─── Auth Stack ───────────────────────────────────────────────────────────────
export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  SetPassword: undefined;
};

// ─── Main Tab ─────────────────────────────────────────────────────────────────
export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Club: undefined;
  Tournament: undefined;
  Account: undefined;
};

// ─── App Stack ────────────────────────────────────────────────────────────────
export type AppStackParamList = {
  MainTabs: undefined;
  AccountInformation: undefined;
  Achievements: undefined;
  GameSettings: undefined;
  UISettings: undefined;
  PaymentSettings: undefined;
  Equipment: undefined;
  NotificationSettings: undefined;
  OutingNotificationScreen: undefined;
  PersonalNotificationScreen: undefined;
  Security: undefined;
  Contact: undefined;
  About: undefined;
  Rules: undefined;
  OutingDetailScreen: { outingData: OutingData; source?: string };
  HoleListScreen: { courseDetails: CourseDetails; courseName?: string };
  HoleDetailScreen: {
    holeData: HoleData;
    scorecard?: HoleData[];
    courseName?: string;
  };
  HoleMapScreen: {
    currentHole?: HoleData;
    courseName?: string;
  };
  HoleVideoScreen: { currentHole?: HoleData; videoUrl?: string };
  CreateFlight: undefined;
  ScoreInputScreen: { teamMode?: "xoay" | "codinh" } | undefined;
  PasswordChange: undefined;
  SetPasswordForm: undefined;
  ImagesAndVideosScreen: { selectedIndex?: number };
  ClubMainScreen: { clubName: string };
  InstallGame: undefined;
  TeamCoDinh: undefined;
  Teamxoay: undefined;
  overviewScreen: { initialTab?: string; teamMode?: "xoay" | "codinh" } | undefined;
  orderRegret: undefined;
};
