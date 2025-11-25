"use client";

import { useState } from "react";
import FeaturedGamesCarousel from "@/components/FeaturedGamesCarousel/FeaturedGamesCarousel";
import GameCard from "@/components/GameCard/GameCard";
import { Game } from "@/types/Game";
import { useGames } from "@/store/useGames";
import { Genre } from "@/types/Genre";
import Aside from "@/components/Aside/Aside";
import NoDataFoundLottie from "./../components/Lotties/NoDataFoundLottie";

export default function Home() {
  const allGames: Game[] = useGames((state) => state?.allGames);
  const filteredGenres: Genre[] = useGames((state) => state?.filteredGenres);
  const filteredGames: Game[] = useGames((state) => state?.filteredGames);

  const updateSelectedGenres: (selectedGenres: Genre[]) => void = useGames(
    (state) => state?.updateSelectedGenres
  );

  const filterGames: (selectedGenres: string[]) => void = useGames(
    (state) => state?.filterGames
  );

  // const [selectedGenres, setSelectedGenres] = useState<Genre[]>([...genres]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    updateSelectedGenres(filteredGenres.map(gn=>({ ...gn, isChecked: false })));
    filterGames(filteredGenres.map((genre: Genre) => genre.name));
  };

  const applyFilters = () => {
    const activeGenres = filteredGenres.filter((genre) => genre.isChecked);
    updateSelectedGenres(filteredGenres);
    filterGames(activeGenres.map((genre: Genre) => genre.name));
  };

  const handleSelectCategory = (id: string) => {
    const updatedGenresIdx = filteredGenres.findIndex(
      (genre) => genre.id === id
    );
    const tempArr = [...filteredGenres];
    tempArr[updatedGenresIdx].isChecked = !tempArr[updatedGenresIdx].isChecked;
    updateSelectedGenres(tempArr);
  };

  return (
    <main className="p-6 ">
      {/* Featured games carousel */}
      <section className="surface mb-12 p-6 border rounded-2xl shadow-lg  xl:w-2/3 m-auto">
        <h1 className="text-3xl font-bold mb-4">Featured Games</h1>
        <FeaturedGamesCarousel
          slides={allGames?.filter((game) => game.isFeatured) || []}
        />
      </section>

      {/* Search for games */}
      <div className="w-3/4 m-auto">
        <input
          onChange={handleSearchChange}
          value={searchQuery}
          className="border px-2 py-3 rounded-md mb-4 w-3/4 m-auto flex justify-center"
          placeholder="Search for games"
        />
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <Aside
          selectedGenres={filteredGenres}
          handleSelectCategory={handleSelectCategory}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
        {/* Game Cards Section */}
        <>
          {filteredGames.length > 0 ? (
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGames?.map((game: Game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="lg:col-span-3 grid ">
            <NoDataFoundLottie />
              <p className="text-center">No Games Found</p>
            </div>
          )}
        </>
      </section>
    </main>
  );
}
