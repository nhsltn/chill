import React from "react";
import { useWatchlist } from "../hooks/useWatchlist";
import MoviesCard from "../components/cards/MoviesCard";

function MyList() {
  const { watchlist, isInWatchlist, handleToggleWatchlist } = useWatchlist();

  return (
    <section className="my-list-section px-5 lg:px-20 pt-20 lg:pt-40 min-h-screen pb-20 flex flex-col gap-8">
      <h1 className="font-bold text-[32px] text-white">Daftar Saya</h1>
      {watchlist.length === 0 ? (
        <p className="text-white/50">Belum ada film di Watch list Kamu.</p>
      ) : (
        <div className="my-list-cards grid grid-cols-3 lg:grid-cols-6 gap-4">
          {watchlist.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              id={movie.movieId}
              title={movie.title}
              thumbnail={movie.posterPath}
              backdrop={movie.backdropPath}
              isNew={movie.isNew}
              mediaType={movie.mediaType}
              voteAverage={parseFloat(movie.voteAverage)}
              releaseDate={movie.releaseDate}
              genreIds={movie.genreIds || []}
              onToggleWatchlist={handleToggleWatchlist}
              isInWatchlist={isInWatchlist}
              className="h-60 lg:h-110"
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MyList;
