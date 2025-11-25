import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { games } from "../data/games";
import { Game } from "@/types/Game";

export const useGames = create(
  devtools(
    persist(
      (set) => ({
        allGames: [...games],
        updateFavourite: (gameId: string) =>
          set(({ allGames }: { allGames: Game[] }) => ({
            allGames: allGames.map((game: Game) =>
              game.id === gameId
                ? { ...game, isFavourite: !game.isFavourite }
                : game
            ),
          })),
      }),
      { name: "games" }
    )
  )
);
