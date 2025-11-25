"use client";

import FeaturedGamesCarousel from "@/components/FeaturedGamesCarousel/FeaturedGamesCarousel";
import GameCard from "@/components/GameCard/GameCard";
import { Game } from "@/types/Game";
import { useGames } from "@/store/useGames";

export default function Home() {
  const allGames: Game[] = useGames((state) => state?.allGames);

  return (
    <main className="p-6 ">
      {/* Featured games carousel */}
      <section className="surface mb-12 p-6 border rounded-2xl shadow-lg  xl:w-2/3 m-auto">
        <h1 className="text-3xl font-bold mb-4">Featured Games</h1>
        <FeaturedGamesCarousel
          slides={allGames?.filter((game) => game.isFeatured) || []}
        />
      </section>

      {/* Featured games */}
      <h1 className="text-3xl font-bold mb-4">All Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allGames?.map((game: Game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
