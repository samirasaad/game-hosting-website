import Link from "next/link";
import { Game } from "@/Types/Game";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <Link
      href={`/games/${game.id}`}
      className="cursor-pointer block group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-all border border-gray-200"
    >
      {/* game iframe */}
      <iframe
        src={game.iframeUrl}
        className="w-full h-48"
        title={game.title}
        allow="fullscreen"
      />
      {/* game content */}
      <div className="p-4 flex flex-col space-y-2 h-48 align-baseline ">
        <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
          {game.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {game.shortDescription || ""}
        </p>

        <div className=" mt-auto ">
          <span className=" bg-blue-100 text-blue-700  text-xs font-medium rounded-full py-3 px-6">
            {game.genre || "Unknown"}
          </span>
        </div>
      </div>
    </Link>
  );
}
