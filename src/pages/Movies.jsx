import React, { useState, useEffect } from "react";
import HeroSection from "../components/sections/HeroSection";
import MovieSection from "../components/sections/MovieSection";
import MoviesCard from "../components/cards/MoviesCard";
import ContinueCard from "../components/cards/ContinueCard";
import { useModal } from "../hooks/useModal";
import { useWatchlist } from "../hooks/useWatchlist";
import { useContinueWatching } from "../hooks/useContinueWatching";
import {
  getTopRatedMovies,
  getTrendingMovies,
  getNewReleaseMovies,
  getPopularMovies,
  getDataById,
  getTrailerById,
  getAgeRating,
} from "../services/api/tmdb";
import { pickTrailerKey, parseAgeRating } from "../utils/heroHelpers";
import {
  mapMovie,
  POSTER_BASE_URL,
  BACKDROP_BASE_URL,
} from "../utils/mediaMapper";

function Movies() {
  const { watchlist, isInWatchlist, handleToggleWatchlist, isLoggedIn } =
    useWatchlist();
  const [allTrending, setAllTrending] = useState([]);
  const continueMovies = useContinueWatching(watchlist, allTrending, "movie");
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [popular, setPopular] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleOpenDetail } = useModal();

  const toMovie = (m) => mapMovie(m, "movie");
  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [topRatedRes, trendingRes, newReleaseRes, popularRes] =
          await Promise.all([
            getTopRatedMovies(),
            getTrendingMovies(),
            getNewReleaseMovies(),
            getPopularMovies(),
          ]);

        if (cancelled) return;

        setTopRated(topRatedRes.data.results.map(toMovie).slice(0, 10));
        setTrending(trendingRes.data.results.map(toMovie).slice(0, 10));
        setNewRelease(newReleaseRes.data.results.map(toMovie).slice(0, 10));
        setPopular(popularRes.data.results.map(toMovie).slice(0, 10));

        const trendingMovies = trendingRes.data.results.filter(
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

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
        onOpenDetail={handleOpenDetail}
      />
      <MovieSection
        title="Top Rating Film"
        movies={topRated}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
        onOpenDetail={handleOpenDetail}
      />
      <MovieSection
        title="Film Trending"
        movies={trending}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
        onOpenDetail={handleOpenDetail}
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
