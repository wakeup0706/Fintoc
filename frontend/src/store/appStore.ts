import { create } from 'zustand';

type AppState = {
  collapsed: boolean;
  toggleSidebar: () => void;
  setCollapsed: (value: boolean) => void;
  mobileToggleSidebar: () => void; // <-- Add this line
};

type ActiveIndex = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};


// Create a helper to determine if it's mobile
const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 500;

export const useAppStore = create<AppState>((set) => ({
  collapsed: typeof window !== 'undefined' ? isMobile() : false,
  toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed })),
  mobileToggleSidebar: () => set((state) => isMobile() ? { collapsed: !state.collapsed } : { collapsed: false }),
  setCollapsed: (value) => set({ collapsed: value }),
}));

export const menuButton = create<ActiveIndex>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));