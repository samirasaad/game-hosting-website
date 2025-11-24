import Link from "next/link";
import { Game } from "@/types/game";


interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <div className=" block group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-all border border-gray-200">
      {/* game iframe */}
      <iframe
        src={game.iframeUrl}
        className="w-full h-55 aspect-video object-cover"
        title={game.title}
        allow="fullscreen"
      />
      {/* game content */}
      <div className="p-4 flex flex-col space-y-2 h-55 align-baseline ">
        <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
          {game.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {game.shortDescription || ""}
        </p>

        <div className=" mt-auto flex justify-between items-center">
          <span className=" bg-blue-100 text-blue-700  text-xs font-medium rounded-full py-3 px-6">
            {game.genre || "Unknown"}
          </span>
          <Link href={`/games/${game.id}`}>
            <span className="text-blue-600 hover:underline">Play Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
