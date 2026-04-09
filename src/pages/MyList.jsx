import React, { useEffect } from "react";
import {
  fetchWatchlist,
  toggleWatchlist,
  clearWatchlist,
} from "../store/redux/watchlistSlice";
import { useSelector, useDispatch } from "react-redux";
import MoviesCard from "../components/cards/MoviesCard";

function MyList() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { watchlist } = useSelector((state) => state.watchlist);

  const isInWatchlist = (movieId) =>
    watchlist.some((w) => w.movieId === String(movieId));

  useEffect(() => {
    if (isLoggedIn && user?.userId) {
      dispatch(fetchWatchlist(user.userId));
    } else {
      dispatch(clearWatchlist());
    }
  }, [isLoggedIn, user?.userId, dispatch]);

  const handleToggleWatchlist = (movie) => {
    if (!isLoggedIn) return;
    dispatch(toggleWatchlist({ userId: user.userId, movie }));
  };

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
