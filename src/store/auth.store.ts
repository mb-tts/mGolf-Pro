import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/auth.types";

const KEYS = {
  USER: "auth.user",
  TOKEN: "auth.token",
} as const;

export const AuthStorage = {
  getUser: async (): Promise<User | null> => {
    const raw = await AsyncStorage.getItem(KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  },
  setUser: async (user: User) =>
    AsyncStorage.setItem(KEYS.USER, JSON.stringify(user)),
  getToken: async (): Promise<string | null> =>
    AsyncStorage.getItem(KEYS.TOKEN),
  setToken: async (token: string) => AsyncStorage.setItem(KEYS.TOKEN, token),
  clear: async () => AsyncStorage.multiRemove([KEYS.USER, KEYS.TOKEN]),
};
