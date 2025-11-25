import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useTheme = create(
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
