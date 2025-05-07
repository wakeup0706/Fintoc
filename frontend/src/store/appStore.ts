import { create } from 'zustand';

type AppState = {
  collapsed: boolean;
  toggleSidebar: () => void;
  setCollapsed: (value: boolean) => void;
};

// Create a helper to determine if it's mobile
const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

export const useAppStore = create<AppState>((set) => ({
  collapsed: typeof window !== 'undefined' ? isMobile() : false, // Default false for SSR
  toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed })),
  setCollapsed: (value) => set({ collapsed: value }),
}));