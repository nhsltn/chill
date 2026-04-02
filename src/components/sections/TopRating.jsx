import React from "react";
import MoviesCard from "../cards/MoviesCard";
import ArrowButton from "./ArrowButton";

function TopRating() {
  const movies = [
    {
      id: 1,
      thumbnail: "/assets/images/movie-1.png",
      isNew: true,
      title: "Suzume",
    },
    {
      id: 2,
      thumbnail: "/assets/images/movie-2.png",
      title: "Jurassic World Dominion",
    },
    {
      id: 3,
      thumbnail: "/assets/images/movie-3.png",
      title: "Sonic the Hedgehog 2",
    },
    {
      id: 4,
      thumbnail: "/assets/images/movie-4.png",
      isNew: true,
      title: "All of Us Are Dead",
    },
    {
      id: 5,
      thumbnail: "/assets/images/movie-5.png",
      title: "Big Hero 6",
    },
  ];

  return (
    <div className="top-rating-section flex flex-col w-full items-center text-white lg:px-20 lg:py-10 px-0 py-5">
      <div className="w-full max-w-7xl container flex flex-col gap-5 lg:gap-8 pl-5 lg:pl-0">
        <h3 className="lg:text-[32px] text-[20px] font-bold">
          Top Rating Film dan Series Hari Ini
        </h3>

        <div className="lg:hidden w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="flex-none">
                <MoviesCard {...movie} />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:block hidden movie-cards relative flex gap-7">
          <div className="flex gap-7">
            <ArrowButton direction="left" />
            <ArrowButton direction="right" />
            {movies.map((movie) => (
              <div key={movie.id}>
                <MoviesCard {...movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopRating;
