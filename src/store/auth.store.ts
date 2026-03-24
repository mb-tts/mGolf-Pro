import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/auth.types';

// Key lưu trữ trong AsyncStorage
const KEYS = {
  USER:  'auth.user',
  TOKEN: 'auth.token',
} as const;

// AuthStorage sử dụng AsyncStorage (async) thay cho MMKV (sync)
// Tất cả các hàm đều trả về Promise
export const AuthStorage = {
  // Lấy thông tin user đã lưu
  getUser: async (): Promise<User | null> => {
    const raw = await AsyncStorage.getItem(KEYS.USER);
    return raw ? (JSON.parse(raw) as User) : null;
  },

  // Lưu thông tin user
  setUser: async (user: User): Promise<void> => {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  // Lấy token đã lưu
  getToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(KEYS.TOKEN);
  },

  // Lưu token
  setToken: async (token: string): Promise<void> => {
    await AsyncStorage.setItem(KEYS.TOKEN, token);
  },

  // Xoá toàn bộ dữ liệu auth
  clear: async (): Promise<void> => {
    await AsyncStorage.multiRemove([KEYS.USER, KEYS.TOKEN]);
  },
};
