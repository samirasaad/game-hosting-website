import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { games } from "../data/games";
import { Game } from "@/types/Game";
import { Genre } from "@/types/Genre";
import { genres } from "@/data/genrs";



interface GamesStore {
  allGames: Game[];
  filteredGames: Game[];
  filteredGenres: Genre[];
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
  updateSelectedGenres: (selectedGenres: Genre[]) => void;
  filterGames: (selectedGenres: string[], searchQuery?: string) => void;
  updateFavourite: (gameId: string) => void;
}

export const useGames = create<GamesStore>()(
  devtools(
    persist(
      (set) => ({
        allGames: games.map(game => ({
          ...game,
          reviews: game.reviews ?? [],
        })),
        filteredGames: games.map(game => ({
          ...game,
          reviews: game.reviews ?? [],
        })),
        filteredGenres: [...genres],
        searchQuery: "",
        updateSearchQuery: (query: string) =>
          set(
            () => ({
              searchQuery: query,
            }),
            false,
            { type: "games/updateSearchQuery" }
          ),
        updateSelectedGenres: (selectedGenres: Genre[]) =>
          set(
            () => ({
              filteredGenres: [...selectedGenres],
            }),
            false,
            { type: "games/updateSelectedGenres" }
          ),
        filterGames: (selectedGenres: string[], searchQuery?: string) =>
          set(
            ({ allGames }: { allGames: Game[] }) => {
              // Clean up filters
              const genresSet = Array.from(new Set(selectedGenres));
              const query = (searchQuery ?? "").trim().toLowerCase();

              // Filter logic
              let filtered = allGames;

              if (genresSet.length > 0) {
                filtered = filtered.filter((game: Game) =>
                  genresSet.some((g) =>
                    game.genre.toLowerCase().includes(g.toLowerCase())
                  )
                );
              }

              if (query) {
                filtered = filtered.filter((game: Game) =>
                  game.title.toLowerCase().includes(query)
                );
              }

              return { filteredGames: filtered };
            },
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
