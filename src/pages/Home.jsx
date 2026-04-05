import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import MovieSection from "../components/sections/MovieSection";
import MoviesCard from "../components/cards/MoviesCard";
import ContinueCard from "../components/cards/ContinueCard";
import { useAuthStore } from "../stores/authStore";
import { useWatchlistStore } from "../stores/watchlistStore";
import {
  getTopRatedMovies,
  getTopRatedTV,
  getTrendingMovies,
  getNewReleaseMovies,
} from "../services/api/tmdb";
import { continueWatchingMovies } from "../data/movies";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";

const mapMovie = (movie, type) => ({
  id: movie.id,
  title: movie.title || movie.name,
  thumbnail: `${POSTER_BASE_URL}${movie.poster_path}`,
  backdrop: movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : null,
  isNew: false,
  mediaType: type,
  voteAverage: movie.vote_average,
  releaseDate: movie.release_date || movie.first_air_date,
  genreIds: movie.genre_ids,
});

function Home() {
  const { isLoggedIn, user } = useAuthStore();
  const { fetchWatchlist, toggleWatchlist, isInWatchlist } =
    useWatchlistStore();

  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn && user?.userId) {
      fetchWatchlist(user.userId);
    } else {
      useWatchlistStore.getState().clearWatchlist();
    }
  }, [isLoggedIn, user?.userId]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [topRatedMovieRes, topRatedTVRes, trendingRes, newReleaseRes] =
          await Promise.all([
            getTopRatedMovies(),
            getTopRatedTV(),
            getTrendingMovies(),
            getNewReleaseMovies(),
          ]);

        const topRatedCombined = [
          ...topRatedMovieRes.data.results.map((m) => mapMovie(m, "movie")),
          ...topRatedTVRes.data.results.map((m) => mapMovie(m, "tv")),
        ]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);

        setTopRated(topRatedCombined);
        setTrending(
          trendingRes.data.results
            .map((m) => mapMovie(m, "movie"))
            .slice(0, 10),
        );
        setNewRelease(
          newReleaseRes.data.results
            .map((m) => mapMovie(m, "movie"))
            .slice(0, 10),
        );
      } catch (err) {
        console.error("Gagal fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="bg-page-header-bg min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const handleToggleWatchlist = (movie) => {
    if (!isLoggedIn) return;
    toggleWatchlist(user.userId, movie);
  };

  return (
    <div className="bg-page-header-bg">
      <Navbar isLoggedIn={isLoggedIn} />
      <HeroSection />
      {isLoggedIn && (
        <MovieSection
          title="Melanjutkan Tonton Film"
          movies={continueWatchingMovies}
          CardComponent={ContinueCard}
        />
      )}
      <MovieSection
        title="Top Rating Film dan Series Hari Ini"
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
      <Footer />
    </div>
  );
}

export default Home;
