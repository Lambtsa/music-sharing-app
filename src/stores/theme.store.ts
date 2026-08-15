import { create } from "zustand";

interface ThemeState {
  isLight: boolean
  toggleIsLight: () => void
}

export const useTheme = create<ThemeState>()((set) => ({
  isLight: false,
  toggleIsLight: () => set((state) => ({
    isLight: !state.isLight
  })),
}));

