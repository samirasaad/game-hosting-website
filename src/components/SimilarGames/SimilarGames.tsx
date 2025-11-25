"use client";

import { Game } from "@/types/Game";
import GameCard from "../GameCard/GameCard";

function SimilarGames({ games }: { games: Game[] }) {
  return (
    <>
      <h1 className="text-3xl font-bold my-10">Similar Games</h1>
      {games.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game: Game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SimilarGames;
