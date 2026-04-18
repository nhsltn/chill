/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import ArrowButton from "../ui/ArrowButton";

function MovieSection({
  title,
  movies,
  CardComponent,
  onToggleWatchlist,
  isInWatchlist,
  onOpenDetail,
  itemsPerPage = 5,
  simple = false,
}) {
  const [startIndex, setStartIndex] = useState(0);

  const isMobile = useIsMobile();

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const visibleMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setStartIndex((i) => Math.max(i - 1, 0));
  const handleNext = () =>
    setStartIndex((i) => Math.min(i + 1, movies.length - itemsPerPage));

  return (
    <section className="movie-section flex flex-col w-full items-center text-white lg:px-20 lg:py-10 px-0 py-5">
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
                    onOpenDetail={onOpenDetail}
                    simple={simple}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative flex gap-7">
            {!simple && (
              <ArrowButton
                direction="left"
                onClick={handlePrev}
                disabled={startIndex === 0}
              />
            )}
            {!simple && (
              <ArrowButton
                direction="right"
                onClick={handleNext}
                disabled={startIndex === movies.length - itemsPerPage}
              />
            )}

            {visibleMovies.map((movie) => (
              <div key={movie.id} className="flex-1">
                <CardComponent
                  {...movie}
                  onToggleWatchlist={onToggleWatchlist}
                  isInWatchlist={isInWatchlist}
                  onOpenDetail={onOpenDetail}
                  simple={simple}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MovieSection;
