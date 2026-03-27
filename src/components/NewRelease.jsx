import React from "react";
import MoviesCard from "./MoviesCard";
import ArrowButton from "./ArrowButton";

function NewRelease() {
  const movies = [
    {
      id: 11,
      thumbnail: "/assets/images/movie-11.png",
      title: "The Little Mermaid",
    },
    {
      id: 12,
      thumbnail: "/assets/images/movie-12.png",
      title: "Duty After School",
      isNew: true,
    },
    {
      id: 13,
      thumbnail: "/assets/images/movie-13.png",
      title: "Big Hero 6",
    },
    {
      id: 14,
      thumbnail: "/assets/images/movie-14.png",
      isNew: true,
      title: "All of Us Are Dead",
    },
    {
      id: 15,
      thumbnail: "/assets/images/movie-15.png",
      title: "Missing",
    },
  ];
  return (
    <div className="new-release-section flex flex-col w-full items-center text-white lg:px-20 lg:py-10 px-0 py-5">
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

export default NewRelease;
