/* eslint-disable no-unused-vars */
import React from "react";
import ArrowButton from "../ui/ArrowButton";

function MovieSection({ title, movies, CardComponent }) {
  return (
    <div className="flex flex-col w-full items-center text-white lg:px-20 lg:py-10 px-0 py-5">
      <div className="w-full max-w-7xl container flex flex-col gap-5 lg:gap-8 pl-5 lg:pl-0">
        <h3 className="lg:text-[32px] text-[20px] font-bold">{title}</h3>

        {/* Mobile */}
        <div className="lg:hidden w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="flex-none">
                <CardComponent {...movie} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="lg:block hidden">
          <div className="relative flex gap-7">
            <ArrowButton direction="left" />
            <ArrowButton direction="right" />
            {movies.map((movie) => (
              <div key={movie.id} className="flex-1">
                <CardComponent {...movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieSection;
