"use client";

import Link from "next/link";
import PreviewGameModal from "../PreviewGameModal/PreviewGameModal";
import { useEffect, useState } from "react";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useGames } from "@/store/useGames";
import { Game } from "@/types/Game";
import ShareOptions from "../ShareOptions/ShareOptions";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { validateIframeUrl } from "@/utilis/validateIFrameUrl.helper";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import BrokenUrlLottie from "../Lotties/BrokenUrlLottie";

interface Props {
  game: Game;
  isFrameFullHeight: boolean;
}

export default function GameCard({ game, isFrameFullHeight }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const updateFavourite = useGames((state) => state.updateFavourite);

  const handleToggleFavourite = (gameId: string) => {
    updateFavourite(gameId);
  };

  useEffect(() => {
    const validate = async () => {
      const isValid = await validateIframeUrl(game.iframeUrl);
      setIsValidUrl(isValid);
    };
    validate();
  }, [game]);

  return (
    <>
      <div
        className={`
        relative justify-between  group rounded-xl overflow-hidden surface 
        shadow transition-all border border-gray-200 
        hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
        flex flex-col  ${isFrameFullHeight ? "h-full" : "h-40"}
      `}
        style={{ minHeight: 350 }}
      >
        {/* Game iframe */}
        <div
          className={` w-full  bg-gray-100 overflow-hidden ${
            !isValidUrl && " h-38"
          }`}
        >
          <div className="relative group/iframe h-full">
            {isValidUrl ? (
              <iframe
                src={game.iframeUrl}
                className={`
                ${isFrameFullHeight ? "h-full" : "h-40"}
                w-full  object-cover pointer-events-none`}
                title={game.title}
                allow="fullscreen"
                tabIndex={-1}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <BrokenUrlLottie/>
                <p className="text-gray-500">Unable to load game preview</p>
              </div>
            )}

            {/* Overlay and Preview Button */}
            <div
              className="
              absolute inset-0 bg-black/50 opacity-0
              group-hover/iframe:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              flex items-center justify-center
            "
            >
              <button
                onClick={() => setIsOpen(true)}
                className="
                bg-white text-black font-medium px-4 py-2 rounded-lg
                opacity-0 scale-90 translate-y-6
                group-hover/iframe:opacity-100 group-hover/iframe:cursor-pointer group-hover/iframe:scale-100 group-hover/iframe:translate-y-0
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
        </div>

        {/* Game content */}
        <div className="p-4 flex flex-col space-y-2 min-h-[180px]">
          <h3 className="flex items-center justify-between font-semibold  transition-colors text-sm">
            {game.title}
            {/* Mark game as fav/unfav */}
            {game?.isFavourite ? (
              <HeartSolidIcon
                className="w-5 h-5 text-red-600 cursor-pointer"
                onClick={() => handleToggleFavourite(game.id)}
              />
            ) : (
              <HeartIcon
                className="w-5 h-5 text-red-600 cursor-pointer"
                onClick={() => handleToggleFavourite(game.id)}
              />
            )}
          </h3>

          <p
            className={`text-sm text-gray-500 line-clamp-2 ${
              isFrameFullHeight ? "max-w-80" : ""
            }
           `}
          >
            {game.shortDescription || ""}
          </p>

          <div className="mt-auto flex  items-center gap-2">
            {/* Game genre */}
            <span className="mb-0 bg-blue-100 text-blue-700 text-xs font-medium rounded-full py-1 px-3">
              {game.genre || "Unknown"}
            </span>
            {/* Game rating */}

            <div className=" items-center flex">
              <p> {game.rating || ""}</p>
              <StarSolid className="w-3 h-3 text-yellow-300" />
            </div>
          </div>
          <div className=" flex justify-end items-end space-y-2 border-t pt-2">
            {/* Redirection to game details */}
            <Link href={`/games/${game.id}`} className="mb-0">
              <span
                className="flex items-center mx-2 font-medium text-transparent bg-clip-text 
             bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 
             animate-fancy transition-transform duration-500 hover:scale-110 hover:rotate-3 hover:tracking-wider"
              >
                Play
              </span>
            </Link>

            {/* Share options */}
            <ShareOptions title={game.title} url={game.url} />
          </div>
        </div>

        {/* Preview modal */}
      </div>
      <PreviewGameModal isOpen={isOpen} setIsOpen={setIsOpen} game={game} />
    </>
  );
}
