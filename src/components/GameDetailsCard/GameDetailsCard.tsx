"use client";
import { useEffect, useRef, useState } from "react";
import { Game } from "@/types/Game";
import ShareOptions from "../ShareOptions/ShareOptions";
import { validateIframeUrl } from "@/utilis/validateIFrameUrl.helper";

interface Props {
  game: Game;
}

function GameDetailsCard(props: Props) {
  const { game } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    const validate = async () => {
      const isValid = await validateIframeUrl(game.iframeUrl);
      setIsValidUrl(isValid);
    };
    validate();
  }, [game]);

  const handleFullscreen = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Extend the type for vendor-prefixed fullscreen methods
    const el = iframe as HTMLIFrameElement & {
      webkitRequestFullscreen?: () => void;
      msRequestFullscreen?: () => void;
      mozRequestFullScreen?: () => void;
    };

    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
  };

  const handleIframeLoad = () => {
    // This fires when the browser receives *any* document, even an error page.
    // However, since we have the timeout running, this also clears the timeout
    // and allows the game to be visible, provided it fully loaded the content
    // before the timeout hit.
    setIsLoading(false);
    console.log("Iframe successfuly loaded its main document. Now visible.");
  };

  return (
    <>
      {/* Game Details */}
      {/* Title */}
      <h1 className="text-3xl font-bold text-center">{game.title}</h1>

      {/* Description */}
      <p className="text-gray-600 text-center">{game.shortDescription}</p>

      {/* Category */}
      <div className="flex justify-center">
        <span className="inline-block text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {game.genre}
        </span>
      </div>

      {/* Actions buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handleFullscreen}
          disabled={!isValidUrl || isLoading}
          className={`px-4 py-2 rounded text-white transition  
              ${
                isValidUrl && !isLoading
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          aria-label="Enter fullscreen mode"
          title="Fullscreen"
        >
          Fullscreen
        </button>
        {isValidUrl && <ShareOptions title={game.title} url={game.url} />}
      </div>

      {/* Iframe container */}
      <div className="relative w-full aspect-video border rounded overflow-hidden shadow bg-black">
        <iframe
          title={game.title}
          allow="fullscreen"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          ref={iframeRef}
          src={game.iframeUrl}
          onLoad={handleIframeLoad}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/60 text-white"
            aria-live="polite"
          >
            <span className="animate-pulse">Loading game...</span>
          </div>
        )}

        {/* Error Overlay */}
        {!isValidUrl && !isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-700 text-center p-4"
            aria-live="assertive"
          >
            Failed to load game. Please try again later.
          </div>
        )}
      </div>
    </>
  );
}

export default GameDetailsCard;
