"use client";

import { useParams, useRouter } from "next/navigation";
import { games } from "@/data/games";
import SimilarGames from "@/omponents/SimilarGames/SimilarGames";
import GameDetailsCard from "@/omponents/GameDetailsCard/GameDetailsCard";

export default function GameDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Game Not Found</h1>
        <button
          onClick={() => router.push("/games")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Games
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Back Button */}
      <div className="flex mx-5 my-2">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Back
        </button>
      </div>
      <main className="min-h-screen flex flex-col justify-center items-center  p-6">
        {/* details card */}
        <GameDetailsCard game={game} />

        {/* Similar Games */}
        <SimilarGames
          games={games.filter(
            (gm) => gm.genre === game.genre && gm.id !== game.id
          )}
        />
      </main>
    </>
  );
}
