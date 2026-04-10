/**
 * Custom navigation hooks — giúp giảm generic khi dùng navigation trong từng screen.
 *
 * Thay vì mỗi screen phải viết:
 *   const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
 *
 * Chỉ cần:
 *   const navigation = useAppNavigation();
 */
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type {
  AppStackParamList,
  AuthStackParamList,
  MainTabParamList,
} from "@/types/navigation.types";

// ─── App Stack ────────────────────────────────────────────────────────────────

/** Navigation cho toàn bộ App Stack (sau khi đăng nhập) */
export const useAppNavigation = () =>
  useNavigation<NativeStackNavigationProp<AppStackParamList>>();

/** Route params cho 1 screen cụ thể trong App Stack */
export const useAppRoute = <T extends keyof AppStackParamList>() =>
  useRoute<RouteProp<AppStackParamList, T>>();

// ─── Auth Stack ───────────────────────────────────────────────────────────────

/** Navigation cho Auth Stack (trước khi đăng nhập) */
export const useAuthNavigation = () =>
  useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

/** Route params cho 1 screen cụ thể trong Auth Stack */
export const useAuthRoute = <T extends keyof AuthStackParamList>() =>
  useRoute<RouteProp<AuthStackParamList, T>>();

// ─── Main Tab ─────────────────────────────────────────────────────────────────

/** Navigation cho Bottom Tab (Home, History, Club, Tournament, Account) */
export const useTabNavigation = () =>
  useNavigation<NativeStackNavigationProp<MainTabParamList>>();
