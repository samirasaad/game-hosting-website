"use client";

import { useParams, useRouter } from "next/navigation";
import SimilarGames from "@/components/SimilarGames/SimilarGames";
import GameDetailsCard from "@/components/GameDetailsCard/GameDetailsCard";
import { useGames } from "@/store/useGames";
import { Game } from "@/types/Game";
import GameReviewCard from "@/components/GameReviewes/GameReviewes";
import ReviewCard from "@/components/GameReviewes/ReviewCard";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
// export async function generateMetadata({ params }): Promise<Metadata> {
//   const game = games.find((g) => g.id === params.id);

//   return {
//     title: game?.title,
//     description: game?.shortDescription,
//     openGraph: {
//       title: game?.title,
//       description: game?.shortDescription,
//       url: `${game?.url}`,
//       images: [
//         {
//           url: `${game?.url}`,
//           width: 1200,
//           height: 630,
//           alt: game?.title,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: game?.title,
//       description: game?.shortDescription,
//       images: [`${game?.url}`],
//     },
//   };
// }

export default function GameDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const games: Game[] = useGames((state) => state?.allGames);
  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Game Not Found</h1>
        <button
          onClick={() => router.push("/games")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Games
        </button>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen flex flex-col  items-center">
        <BreadCrumb gameTitle={game.title} />
        {/* Back Button */}
        <div className="flex mx-13 mt-5 mb-2 w-2/3">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition cursor-pointer"
          >
            Back
          </button>
        </div>
        {/* details card */}
        <div className="mx-5   w-2/3 border rounded-2xl p-3">
          <GameDetailsCard game={game} />
        </div>
        {/* Reviews */}
        <GameReviewCard title="Game Reviews">
          {game.reviews && game.reviews.length > 0 ? (
            <ul className="space-y-4">
              {game.reviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </ul>
          ) : (
            <p>No reviews available for this game.</p>
          )}
        </GameReviewCard>
        {/* Similar Games */}
        <SimilarGames
          games={games.filter(
            (gm) => gm.genre === game.genre && gm.id !== game.id
          )}
        />
      </main>
    </>
  );
}
