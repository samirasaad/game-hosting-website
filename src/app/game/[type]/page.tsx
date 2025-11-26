"use client";

import GameCard from "@/components/GameCard/GameCard";
import { useGames } from "@/store/useGames";
import { Game } from "@/types/Game";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NoDataFoundLottie from "../../../components/Lotties/NoDataFoundLottie";

function Games() {
  const { type } = useParams();
  const allGames: Game[] = useGames((state) => state?.allGames);

  const [favs, setFavs] = useState<Game[]>([]);

  // useEffect(() => {
  //   setFavs(allGames.filter((game) => game.isFavourite));
  // }, [allGames]);

  useEffect(() => {
    if (type === "favourite") {
      setFavs(allGames.filter((game) => game.isFavourite));
    } else if (type === "featured") {
      setFavs(allGames.filter((game) => game.isFeatured));
    }
  }, [type,allGames]);

  return (
    <>
      <h4 className="shadow-xs text-3xl font-bold my-10 container m-auto">
        Favourite Games
      </h4>
      {favs && favs.length ? (
        <section className=" m-auto container ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
            {favs.map((game: Game) => (
              <div key={game.id} className="col-span-1">
                <GameCard game={game} isFrameFullHeight={false} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className=" container m-auto flex flex-col justify-center items-center">
          <NoDataFoundLottie />
          <p className="text-center">No Games Found</p>
        </section>
      )}
    </>
  );
}

export default Games;
