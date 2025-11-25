"use client";

import Link from "next/link";
import PreviewGameModal from "../PreviewGameModal/PreviewGameModal";
import { useState } from "react";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useGames } from "@/store/useGames";
import { Game } from "@/types/Game";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFavourite: (gameId: string) => void = useGames(
    (state) => state?.updateFavourite
  );

  const handleToggleFavourite = (gameId: string) => {
    updateFavourite(gameId);
  };
  
  return (
    <div
      className="
        relative  group rounded-xl overflow-hidden surface 
        shadow transition-all border border-gray-200 
        hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
        flex flex-col h-full
      "
      style={{ minHeight: 380 }}
    >
      {/* Game iframe */}
      <div className="relative w-full aspect-video min-h-[180px] bg-gray-100 overflow-hidden">
        <iframe
          src={game.iframeUrl}
          className="w-full h-full object-cover pointer-events-none"
          title={game.title}
          allow="fullscreen"
          tabIndex={-1}
        />

        {/* Hover overlay */}
        <div
          className="
            absolute inset-0 bg-black/50 opacity-0 
            group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            flex items-center justify-center
          "
        >
          <button
            onClick={() => setIsOpen(true)}
            className="
              bg-white text-black font-medium px-4 py-2 rounded-lg
              opacity-0 scale-90 translate-y-6
              group-hover:opacity-100 group-hover:cursor-pointer group-hover:scale-100 group-hover:translate-y-0
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] shadow
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              delay-150
            "
            aria-label={`Preview ${game.title}`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Game content */}
      <div className="p-4 flex flex-col space-y-2 min-h-[180px]">
        <h3 className="text-lg font-semibold  transition-colors">
          {game.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {game.shortDescription || ""}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <span className="bg-blue-100 text-blue-700 text-xs font-medium rounded-full py-1 px-3">
            {game.genre || "Unknown"}
          </span>

          <Link href={`/games/${game.id}`}>
            <span className=" hover:underline font-medium dark:text-amber-50">
              Play Now
            </span>
          </Link>
          {game?.isFavourite ? (
            <StarSolid
              className="w-5 h-5 text-yellow-400 cursor-pointer"
              onClick={() => handleToggleFavourite(game.id)}
            />
          ) : (
            <StarOutline
              className="w-5 h-5 text-yellow-400 cursor-pointer"
              onClick={() => handleToggleFavourite(game.id)}
            />
          )}
        </div>
      </div>

      {/* preview modal */}
      <PreviewGameModal isOpen={isOpen} setIsOpen={setIsOpen} game={game} />
    </div>
  );
}
