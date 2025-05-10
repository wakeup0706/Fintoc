import { create } from 'zustand';

type AppState = {
  collapsed: boolean;
  toggleSidebar: () => void;
  setCollapsed: (value: boolean) => void;
};

type ActiveIndex = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};


// Create a helper to determine if it's mobile
const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

export const useAppStore = create<AppState>((set) => ({
  collapsed: typeof window !== 'undefined' ? isMobile() : false,
  toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed })),
  setCollapsed: (value) => set({ collapsed: value }),
}));

export const menuButton = create<ActiveIndex>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));