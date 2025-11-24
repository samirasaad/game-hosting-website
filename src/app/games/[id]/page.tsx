"use client"; // Required because we use hooks for fullscreen

import { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { games } from "@/data/games";

export default function GameDetailsPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { id } = useParams();
  const game = games.find((g) => g.id === id) || null;
  const router = useRouter();

  if (!game) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Game Not Found</h1>
        <button
          onClick={() => router.push("/games")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Games
        </button>
      </div>
    );
  }

  // External fullscreen button handler
  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (
        (
          iframeRef.current as HTMLElement & {
            webkitRequestFullscreen?: () => void;
          }
        ).webkitRequestFullscreen
      ) {
        (
          iframeRef.current as HTMLElement & {
            webkitRequestFullscreen?: () => void;
          }
        ).webkitRequestFullscreen!();
      }
    }
  };

  return (
    <main className="p-6 space-y-6">
      {/* Title  */}
      <h1 className="text-3xl font-bold">{game.title}</h1>
      {/* Description */}
      <p className="text-gray-500">
        {game.shortDescription || game.shortDescription}
      </p>
      {/* Genre/catgeory */}
      <span className="inline-block mt-1 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
        {game.genre}
      </span>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={handleFullscreen}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Fullscreen
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Share
        </button>
      </div>

      {/* Game iframe */}
      <div className="relative w-full aspect-video rounded overflow-hidden border border-gray-200 shadow">
        <iframe
          ref={iframeRef}
          src={game.iframeUrl}
          allowFullScreen
          className="absolute top-0 left-0  w-full h-full"
        />
      </div>

      {/* Back Buttons */}

      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
      >
        Back
      </button>
    </main>
  );
}
