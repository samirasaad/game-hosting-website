import FeaturedGamesCarousel from "@/omponents/FeaturedGamesCarousel/FeaturedGamesCarousel";
import GameCard from "@/omponents/GameCard/GameCard";
import { games } from "@/data/games";
import { Game } from "@/types/game";

export default function Home() {
  return (
    <main className="p-6 ">
      {/* Featured games carousel */}
     <section className="surface mb-12 p-6 border rounded-2xl shadow-lg  xl:w-2/3 m-auto">
      <h1 className="text-3xl font-bold mb-4">Featured Games</h1>
       <FeaturedGamesCarousel
        slides={games.filter((game) => game.isFeatured) || []}
      />
     </section>

      {/* All games */}
      <h1 className="text-3xl font-bold mb-4">All Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map((game: Game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
