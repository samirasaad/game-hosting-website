import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ThemeStore {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useTheme = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        theme: "light", 
        setTheme: (payload) =>
          set(() => ({ theme: payload }), false, "setTheme"),
      }),
      { name: "theme" }
    )
  )
);
