import { createMMKV } from "react-native-mmkv";
import type { MMKV } from "react-native-mmkv";
import type { User } from "@/types/auth.types";

// Khởi tạo MMKV instance cho auth — dùng createMMKV() (v4 API)
const storage: MMKV = createMMKV({ id: "auth-storage" });

const KEYS = {
  USER: "auth.user",
  TOKEN: "auth.token",
} as const;

/**
 * AuthStorage dùng MMKV (đồng bộ, nhanh hơn AsyncStorage ~30x).
 * Không cần await vì MMKV là synchronous.
 */
export const AuthStorage = {
  getUser: (): User | null => {
    const raw = storage.getString(KEYS.USER);
    return raw ? (JSON.parse(raw) as User) : null;
  },

  setUser: (user: User): void => {
    storage.set(KEYS.USER, JSON.stringify(user));
  },

  getToken: (): string | null => {
    return storage.getString(KEYS.TOKEN) ?? null;
  },

  setToken: (token: string): void => {
    storage.set(KEYS.TOKEN, token);
  },

  clear: (): void => {
    storage.remove(KEYS.USER);
    storage.remove(KEYS.TOKEN);
  },
};
