export type AuthScreen = 'Login' | 'Register' | 'SetPassword';

export interface User {
  id: string;
  fullName: string;
  vgaCode: string;
  phone: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean }>;
  setPassword: (payload: SetPasswordPayload) => Promise<void>;
  logout: () => void;
}

export interface LoginPayload {
  vgaCode: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  vgaCode: string;
  phone: string;
}

export interface SetPasswordPayload {
  password: string;
  confirmPassword: string;
}
