import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

type Store = {
  authUser: any;
  hydrated: boolean;
  requestLoading: boolean;
  loginWithToken: (token: string) => void;
  getUser: () => void;
  logout: () => void;
  setRequestLoading: (isLoading: boolean) => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  hydrated: false,
  loginWithToken: (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const user = {
        id: decoded.id,
        email: decoded.email,
        first_name: decoded.first_name,
        // Add more fields from token if needed
      };
      console.log(user);
      localStorage.setItem("auth_token", token);
      set(() => ({ authUser: user }));
    } catch {
      localStorage.removeItem("auth_token");
      set(() => ({ authUser: null }));
    }
  },

  getUser: () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      const user = {
        id: decoded.id,
        email: decoded.email,
        first_name: decoded.first_name,
      };
      set(() => ({ authUser: user, hydrated: true }));
      console.log(user);
    } catch {
      localStorage.removeItem("auth_token");
      set(() => ({ authUser: null, hydrated: false }));
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    set(() => ({ authUser: null }));
  },

  setRequestLoading: (isLoading: boolean) =>
    set(() => ({ requestLoading: isLoading })),
}));

export default useStore;
