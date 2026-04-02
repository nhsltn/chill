import React from "react";
import MoviesCard from "../cards/MoviesCard";
import ArrowButton from "./ArrowButton";

function TrendingMovie() {
  const movies = [
    {
      id: 6,
      thumbnail: "/assets/images/movie-6.png",
      title: "The Tomorrow War",
    },
    {
      id: 7,
      thumbnail: "/assets/images/movie-7.png",
      title: "Ant-Man and the Wasp: Quantumania",
    },
    {
      id: 8,
      thumbnail: "/assets/images/movie-8.png",
      title: "Guardians of the Galaxy Vol. 3",
    },
    {
      id: 9,
      thumbnail: "/assets/images/movie-9.png",
      title: "A Man Called Otto",
    },
    {
      id: 10,
      thumbnail: "/assets/images/movie-10.png",
      title: "The Little Mermaid",
    },
  ];
  return (
    <div className="trending-movie-section flex flex-col w-full items-center text-white lg:px-20 lg:py-10 px-0 py-5">
      <div className="w-full max-w-7xl container flex flex-col gap-5 lg:gap-8 pl-5 lg:pl-0">
        <h3 className="lg:text-[32px] text-[20px] font-bold">Film Trending</h3>

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

export default TrendingMovie;
