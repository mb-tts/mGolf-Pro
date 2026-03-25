import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import {
  AuthContextType,
  AuthState,
  LoginPayload,
  RegisterPayload,
  SetPasswordPayload,
} from "../types/auth.types";
import { AuthStorage } from "../store/auth.store";
import { MOCK_USERS } from "../constants/mock-data"; 
import { User } from "../types/auth.types";

// ─── Reducer ──────────────────────────────────────────────────────────────────
type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | {
      type: "LOGIN_SUCCESS";
      payload: { user: User; token: string };
    }
  | {
      type: "RESTORE_SESSION";
      payload: { user: User | null; token: string | null };
    }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "RESTORE_SESSION":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: !!action.payload.token,
        isLoading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session khi app khởi động
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const [user, token] = await Promise.all([
          AuthStorage.getUser(),
          AuthStorage.getToken(),
        ]);
        console.log("--- Auth: Khôi phục session:", {
          user: user?.vgaCode ?? null,
          hasToken: !!token,
        });
        dispatch({ type: "RESTORE_SESSION", payload: { user, token } });
      } catch (err) {
        console.error("--- Auth: Lỗi khôi phục session:", err);
        dispatch({
          type: "RESTORE_SESSION",
          payload: { user: null, token: null },
        });
      }
    };
    restoreSession();
  }, []);

  // Login
  const login = useCallback(async (payload: LoginPayload) => {
    console.log("--- Auth: Bắt đầu login với payload:", payload);
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await new Promise((r) => setTimeout(r, 1000)); // TODO: replace with API
      
      const user = MOCK_USERS[payload.vgaCode];
      if (!user || payload.password !== "123456") {
        throw new Error("Sai mã VGA hoặc mật khẩu");
      }

      console.log("--- Auth: Login thành công cho user:", user.vgaCode);
      await AuthStorage.setUser(user);
      await AuthStorage.setToken(user.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token: user.token },
      });
    } catch (err) {
      console.error("--- Auth: Lỗi login:", err);
      dispatch({ type: "SET_LOADING", payload: false });
      throw err;
    }
  }, []);

  // Register
  const register = useCallback(async (_payload: RegisterPayload) => {
    dispatch({ type: "SET_LOADING", payload: true });
    await new Promise((r) => setTimeout(r, 800)); // TODO: replace with API
    dispatch({ type: "SET_LOADING", payload: false });
    return { success: true };
  }, []);

  // Set Password
  const setPassword = useCallback(async (_payload: SetPasswordPayload) => {
    dispatch({ type: "SET_LOADING", payload: true });
    await new Promise((r) => setTimeout(r, 800)); // TODO: replace with API
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  // Logout
  const logout = useCallback(async () => {
    await AuthStorage.clear();
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, setPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải dùng trong AuthProvider");
  return ctx;
};
