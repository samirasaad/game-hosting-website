import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { games } from "../data/games";
import { Game } from "@/types/Game";
import { Genre } from "@/types/Genre";
import { genres } from "@/data/genrs";

export const useGames = create(
  devtools(
    persist(
      (set) => ({
        allGames: [...games],
        filteredGames: [...games],
        filteredGenres: [...genres],
        updateSelectedGenres: (selectedGenres: Genre[]) =>
          set(
            () => ({
              filteredGenres: [...selectedGenres],
            }),
            false,
            { type: "games/updateSelectedGenres" }
          ),

        filterGames: (selectedGenres: string[]) =>
          set(
            ({
              allGames,
              filteredGames,
            }: {
              allGames: Game[];
              filteredGames: Game[];
            }) => ({
              filteredGames:
                selectedGenres.length === 0
                  ? allGames
                  : allGames.filter((game: Game) =>
                      selectedGenres.some((g) => game.genre.includes(g))
                    ),
            }),
            false,
            { type: "games/filterGames" }
          ),
        updateFavourite: (gameId: string) =>
          set(
            ({
              allGames,
              filteredGames,
            }: {
              allGames: Game[];
              filteredGames: Game[];
            }) => ({
              allGames: allGames.map((game: Game) =>
                game.id === gameId
                  ? { ...game, isFavourite: !game.isFavourite }
                  : game
              ),
              filteredGames: filteredGames.map((game: Game) =>
                game.id === gameId
                  ? { ...game, isFavourite: !game.isFavourite }
                  : game
              ),
            }),
            false,
            { type: "games/updateFavourite" }
          ),
      }),

      { name: "games" }
    )
  )
);
