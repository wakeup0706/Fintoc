import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { IUser } from "./types";
interface AuthState {
  authUser: IUser | null;
  requestLoading: boolean;
  loginWithToken: (token: string) => void;
  getUser: () => any;
  logout: () => void;
  setRequestLoading: (isLoading: boolean) => void;
}
export const authStore = create<AuthState>((set) => ({
  authUser: null,
  requestLoading: false,
  loginWithToken: (token: string) => {
    try {
      const decoded = jwtDecode(token) as any;
      const user = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        photo: decoded.photo,
        provider: decoded.provider,
        verified: decoded.verified,
      };
      localStorage.setItem("auth_token", token);
      set({ authUser: user });
    } catch {
      localStorage.removeItem("auth_token");
      set({ authUser: null });
    }
  },
  getUser: () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      return null;
    }
    const decoded = jwtDecode(token) as any;
    const user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      photo: decoded.photo,
      provider: decoded.provider,
      verified: decoded.verified,
    };
    set({ authUser: user });
    return token;
  },
  logout: () => {
    localStorage.removeItem("auth_token");
    set({ authUser: null });
  },
  setRequestLoading: (isLoading: boolean) => set({ requestLoading: isLoading }),
}));

