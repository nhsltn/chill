import React, { useState, useEffect } from "react";
import HeroSection from "../components/sections/HeroSection";
import MovieSection from "../components/sections/MovieSection";
import MoviesCard from "../components/cards/MoviesCard";
import ContinueCard from "../components/cards/ContinueCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWatchlist,
  toggleWatchlist,
  clearWatchlist,
} from "../store/redux/watchlistSlice";
import {
  getTopRatedMovies,
  getTrendingMovies,
  getNewReleaseMovies,
  getTrendingAll,
  getPopularMovies,
  getDataById,
  getTrailerById,
  getAgeRating,
} from "../services/api/tmdb";
import { pickTrailerKey, parseAgeRating } from "../utils/heroHelpers";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";

const mapMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  thumbnail: `${POSTER_BASE_URL}${movie.poster_path}`,
  backdrop: movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : null,
  isNew: false,
  mediaType: "movie",
  voteAverage: movie.vote_average,
  releaseDate: movie.release_date,
  genreIds: movie.genre_ids,
});

function Movies() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { watchlist } = useSelector((state) => state.watchlist);

  const isInWatchlist = (movieId) =>
    watchlist.some((w) => w.movieId === String(movieId));

  const [allTrending, setAllTrending] = useState([]);
  const [continueMovies, setContinueMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [popular, setPopular] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn && user?.userId) {
      dispatch(fetchWatchlist(user.userId));
    } else {
      dispatch(clearWatchlist());
    }
  }, [isLoggedIn, user?.userId, dispatch]);

  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [
          topRatedRes,
          trendingRes,
          newReleaseRes,
          trendingAllRes,
          popularRes,
        ] = await Promise.all([
          getTopRatedMovies(),
          getTrendingMovies(),
          getNewReleaseMovies(),
          getTrendingAll(),
          getPopularMovies(),
        ]);

        if (cancelled) return;

        setTopRated(topRatedRes.data.results.map(mapMovie).slice(0, 10));
        setTrending(trendingRes.data.results.map(mapMovie).slice(0, 10));
        setNewRelease(newReleaseRes.data.results.map(mapMovie).slice(0, 10));
        setPopular(popularRes.data.results.map(mapMovie).slice(0, 10));

        const trendingMovies = trendingAllRes.data.results.filter(
          (m) => m.media_type === "movie",
        );
        setAllTrending(trendingMovies);

        const randomMovie =
          trendingMovies[Math.floor(Math.random() * trendingMovies.length)];

        const [detailRes, videoRes, ratingRes] = await Promise.all([
          getDataById(randomMovie.id, "movie"),
          getTrailerById(randomMovie.id, "movie"),
          getAgeRating(randomMovie.id, "movie"),
        ]);

        if (cancelled) return;

        const trailerKey = pickTrailerKey(videoRes.data.results);
        const ageRating = parseAgeRating(
          ratingRes.data.results || [],
          randomMovie.media_type,
        );

        setHeroData({
          title: detailRes.data.title || detailRes.data.name,
          overview: detailRes.data.overview || "",
          backdrop: randomMovie.backdrop_path
            ? `${BACKDROP_BASE_URL}${randomMovie.backdrop_path}`
            : null,
          trailerKey: trailerKey,
          ageRating: ageRating || null,
        });
      } catch (err) {
        if (!cancelled) console.error("Gagal fetch movies:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMovies();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (allTrending.length === 0) return;

    const watchlistMovies = watchlist
      .filter((m) => m.mediaType === "movie")
      .slice(0, 8)
      .map((m) => ({
        id: m.movieId,
        title: m.title,
        thumbnail: m.backdropPath || m.posterPath,
        isNew: m.isNew || false,
        progress: Math.floor(Math.random() * 80) + 10,
      }));

    if (watchlistMovies.length < 8) {
      const needed = 8 - watchlistMovies.length;
      const watchlistIds = new Set(watchlistMovies.map((m) => m.id));
      const randomFill = allTrending
        .filter((m) => !watchlistIds.has(m.id) && m.backdrop_path)
        .sort(() => Math.random() - 0.5)
        .slice(0, needed)
        .map((m) => ({
          id: m.id,
          title: m.title,
          thumbnail: `${BACKDROP_BASE_URL}${m.backdrop_path}`,
          isNew: false,
          progress: Math.floor(Math.random() * 80) + 10,
        }));
      setContinueMovies([...watchlistMovies, ...randomFill]);
    } else {
      setContinueMovies(watchlistMovies);
    }
  }, [watchlist, allTrending]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const handleToggleWatchlist = (movie) => {
    if (!isLoggedIn) return;
    dispatch(toggleWatchlist({ userId: user.userId, movie }));
  };

  return (
    <>
      <HeroSection movie={heroData} />
      {isLoggedIn && (
        <MovieSection
          title="Melanjutkan Tonton Film"
          movies={continueMovies}
          CardComponent={ContinueCard}
          itemsPerPage={4}
        />
      )}
      <MovieSection
        title="Film Persembahan Chill"
        movies={popular}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
      <MovieSection
        title="Top Rating Film"
        movies={topRated}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
      <MovieSection
        title="Film Trending"
        movies={trending}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
      <MovieSection
        title="Film Baru"
        movies={newRelease}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
    </>
  );
}

export default Movies;
