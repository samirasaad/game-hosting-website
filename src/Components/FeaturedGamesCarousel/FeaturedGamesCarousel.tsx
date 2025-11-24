"use client";

import { Game } from "@/types/game";
import Carousel from "react-multi-carousel";
import GameCard from "../GameCard/GameCard";
import "react-multi-carousel/lib/styles.css";

// interface Props {}

function FeaturedGamesCarousel({ slides }: { slides: Game[] }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="transform 2s cubic-bezier(0.57, 0, 0.2, 1)"
      transitionDuration={1800}
      containerClass="carousel-container mb-2 pb-10"
      removeArrowOnDeviceType={[]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {slides.map((game: Game) => (
        <div key={game.id} className="p-2">
          <GameCard game={game} />
        </div>
      ))}
    </Carousel>
  );
}

export default FeaturedGamesCarousel;
