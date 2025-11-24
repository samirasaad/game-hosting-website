import { Games } from "@/data/games";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation"; // Add this import

interface Props {
  params: { id: string };
}

export default function GameDetailsPage({ params }: Props) {
  const game = Games.find((g) => g.id === params?.id) || null;
  const router = useRouter();

  if (!game) return notFound();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{game.title}</h1>
      <p className="text-gray-500">{game.shortDescription}</p>

      <div className="w-full aspect-video rounded overflow-hidden border">
        <iframe
          src={game.iframeUrl}
          title={game.title} // Accessibility
          className="w-full h-full"
          allow="fullscreen"
        />
      </div>

      <button
        onClick={() => router.back()} 
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
      >
        Back
      </button>
    </main>
  );
}