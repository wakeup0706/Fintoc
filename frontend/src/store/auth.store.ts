import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { IUser } from "./types";
interface AuthState {
  authUser: IUser | null;
  hydrated: boolean;
  requestLoading: boolean;
  loginWithToken: (token: string) => void;
  getUser: () => void;
  logout: () => void;
  setRequestLoading: (isLoading: boolean) => void;
}
export const authStore = create<AuthState>((set) => ({
  authUser: null,
  requestLoading: false,
  hydrated: false,
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
      set({ authUser: user, hydrated: true });
    } catch {
      localStorage.removeItem("auth_token");
      set({ authUser: null, hydrated: false });
    }
  },
  getUser: () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      set({ hydrated: true });
      return;
    }
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
      set({ authUser: user, hydrated: true });
    } catch {
      localStorage.removeItem("auth_token");
      set({ authUser: null, hydrated: true });
    }
  },
  logout: () => {
    localStorage.removeItem("auth_token");
    set({ authUser: null });
  },
  setRequestLoading: (isLoading: boolean) => set({ requestLoading: isLoading }),
}));
