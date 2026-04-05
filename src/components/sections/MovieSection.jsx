/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ArrowButton from "../ui/ArrowButton";

const ITEMS_PER_PAGE = 5;

function MovieSection({
  title,
  movies,
  CardComponent,
  onToggleWatchlist,
  isInWatchlist,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const visibleMovies = movies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => setStartIndex((i) => Math.max(i - 1, 0));
  const handleNext = () =>
    setStartIndex((i) => Math.min(i + 1, movies.length - ITEMS_PER_PAGE));

  return (
    <div className="flex flex-col w-full items-center text-white lg:px-20 lg:py-10 px-0 py-5">
      <div className="w-full max-w-7xl container flex flex-col gap-5 lg:gap-8 pl-5 lg:pl-0">
        <h3 className="lg:text-[32px] text-[20px] font-bold">{title}</h3>

        {isMobile ? (
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-4">
              {movies.map((movie) => (
                <div key={movie.id} className="flex-none">
                  <CardComponent
                    {...movie}
                    onToggleWatchlist={onToggleWatchlist}
                    isInWatchlist={isInWatchlist}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative flex gap-7">
            <ArrowButton
              direction="left"
              onClick={handlePrev}
              disabled={startIndex === 0}
            />

            <ArrowButton
              direction="right"
              onClick={handleNext}
              disabled={startIndex === movies.length - ITEMS_PER_PAGE}
            />

            {visibleMovies.map((movie) => (
              <div key={movie.id} className="flex-1">
                <CardComponent
                  {...movie}
                  onToggleWatchlist={onToggleWatchlist}
                  isInWatchlist={isInWatchlist}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieSection;
