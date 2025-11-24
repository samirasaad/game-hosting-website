import GameCard from "@/Components/GameCard/GameCard";
import { Games } from "@/data/games";
import { Game } from "@/Types/Game";

export default function GamesPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Games</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Games.map((game: Game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
