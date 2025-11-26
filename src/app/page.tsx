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

  const filterGames: (selectedGenres: string[], q: string) => void = useGames(
    (state) => state?.filterGames
  );

  const updateSearchQuery: (query: string) => void = useGames(
    (state) => state?.updateSearchQuery
  );
  const searchQuery: string = useGames((state) => state?.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim().toLowerCase();
    updateSearchQuery(query);

    // Only search if query is at least 2 characters
    // Reset category filters
    updateSelectedGenres(
      filteredGenres.map((gn) => ({ ...gn, isChecked: false }))
    );
    filterGames(
      filteredGenres.map((genre: Genre) => genre.name),
      query
    );
  };

  const clearFilters = () => {
    const activeGenres = filteredGenres.filter((genre) => genre.isChecked);
    if (activeGenres.length > 0) {
      updateSelectedGenres(
        filteredGenres.map((gn) => ({ ...gn, isChecked: false }))
      );
      filterGames(
        filteredGenres.map((genre: Genre) => genre.name),
        searchQuery
      );
    }
  };

  const applyFilters = () => {
    const activeGenres = filteredGenres.filter((genre) => genre.isChecked);
    if (activeGenres.length > 0) {
      // If there are active genres, we can filter the games based on them
      updateSelectedGenres(filteredGenres);
      filterGames(
        activeGenres.map((genre: Genre) => genre.name),
        searchQuery
      );
    }
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
      <section className="surface mb-12 p-6 border rounded-2xl shadow-lg  container m-auto">
        <h1 className="text-3xl font-bold mb-4">Featured Games</h1>
        <FeaturedGamesCarousel
          slides={allGames?.filter((game) => game.isFeatured) || []}
        />
      </section>

      {/* Search for games */}
      <div className="w-3/4 m-auto mb-10">
        <input
          onChange={handleSearchChange}
          value={searchQuery}
          className="-inset-0.5 bg-white border flex justify-center m-auto mb-4 px-2 py-3 rounded-xl  text-base text-black w-3/4"
          placeholder="Search for games"
        />
      </div>
      <section className="gap-8 grid md:grid-cols-3 m-auto container">
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
            <div className="sm:col-span-3 md:col-span-2 flex flex-col gap-6">
              {filteredGames?.map((game: Game) => (
                <GameCard key={game.id} game={game} isFrameFullHeight={false} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <NoDataFoundLottie />
              <p className="text-center">No Games Found</p>
            </div>
          )}
        </>
      </section>
    </main>
  );
}
