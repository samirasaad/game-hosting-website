"use client";
import { useEffect, useRef, useState } from "react";
import { Game } from "@/types/game";

interface Props {
  game: Game;
}

function GameDetailsCard(props: Props) {
  const { game } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // --- Core Fallback Mechanism: Set Error if loading takes too long ---
  useEffect(() => {
    // Only set up the timeout if we are trying to load and haven't failed yet
    if (isLoading && !hasError) {
      const timeoutId = setTimeout(() => {
        // If the timer runs out AND we are still in the 'loading' state,
        // it means the iframe's content failed to fully render, likely due to SOP.
        if (isLoading) {
          console.error(
            "Iframe loading timeout reached. Assuming failure and displaying fallback."
          );
          setHasError(true);
          setIsLoading(false);
        }
      }, 30000); // 30 seconds timeout

      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [isLoading, hasError]);

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
    if (!hasError) {
      setIsLoading(false);
      console.log("Iframe successfuly loaded its main document. Now visible.");
    }
  };

  return (
    <>
      {/* Game Details */}
      <div className="m-5  space-y-6 w-full max-w-4xl">
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
            disabled={hasError || isLoading}
            className={`px-4 py-2 rounded text-white transition 
              ${
                !hasError && !isLoading
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
            aria-label="Enter fullscreen mode"
            title="Fullscreen"
          >
            Fullscreen
          </button>
          <button
            className={`px-4 py-2 rounded transition text-white ${
              !hasError && !isLoading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={hasError || isLoading}
            aria-label="Share this game"
          >
            Share
          </button>
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
          {hasError && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-700 text-center p-4"
              aria-live="assertive"
            >
              Failed to load game. Please try again later.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GameDetailsCard;
