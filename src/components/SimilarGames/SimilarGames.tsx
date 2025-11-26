"use client";

import { Game } from "@/types/Game";
import GameCard from "../GameCard/GameCard";

function SimilarGames({ games }: { games: Game[] }) {
  return (
    <>
      {games.length ? (
        <>
          <h4 className="border-b text-3xl font-bold my-10">Similar Games</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-w-2/3">
            {games.map((game: Game) => (
              <div key={game.id} className="col-span-1">
                <GameCard game={game} isFrameFullHeight={false} />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

export default SimilarGames;
