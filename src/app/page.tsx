import GameCard from "@/Components/GameCard/GameCard";
import { games } from "@/data/games";
import { Game } from "@/types/game";


export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Games</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map((game: Game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
