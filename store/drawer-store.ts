// write a zustand store for boolean value to open and close a drawer

import { create } from "zustand";

interface DrawerState {
  isDrawerOpen: boolean;
  toggleDrawer: (isDrawerOpen: boolean) => void;
}

export const useDrawerState = create<DrawerState>()((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));
