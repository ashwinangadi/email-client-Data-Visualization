// write a zustand store for the email client, make it persistent across sessions and reloads

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmailState {
  read: string[];
  favorites: string[];
  addReadEmail: (id: string) => void;
  toggleFavoriteEmail: (id: string) => void;
}

export const useEmailState = create<EmailState>()(
  persist(
    (set) => ({
      read: [],
      favorites: [],
      addReadEmail: (id: string) =>
        set((state) => ({ read: [...state.read, id] })),
      toggleFavoriteEmail: (id: string) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: "emailState",
    }
  )
);
