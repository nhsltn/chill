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
  getTrendingAll,
  getDataById,
  getTrailerById,
  getAgeRating,
} from "../services/api/tmdb";

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

  const [continueMovies, setContinueMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn && user?.userId) {
      fetchWatchlist(user.userId);
    } else {
      useWatchlistStore.getState().clearWatchlist();
    }
  }, [isLoggedIn, user?.userId]);

  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [
          topRatedMovieRes,
          topRatedTVRes,
          trendingRes,
          newReleaseRes,
          trendingAllRes,
        ] = await Promise.all([
          getTopRatedMovies(),
          getTopRatedTV(),
          getTrendingMovies(),
          getNewReleaseMovies(),
          getTrendingAll(),
        ]);

        if (cancelled) return;

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

        const currentWatchlist = useWatchlistStore.getState().watchlist;
        console.log("Watchlist item:", currentWatchlist[0]);
        const watchlistMovies = currentWatchlist.slice(0, 8).map((m) => ({
          id: m.movieId,
          title: m.title,
          thumbnail: m.backdropPath || m.posterPath,
          isNew: m.isNew || false,
        }));

        const allTrending = trendingAllRes.data.results;

        if (watchlistMovies.length < 8) {
          const needed = 8 - watchlistMovies.length;
          const watchlistIds = new Set(watchlistMovies.map((m) => m.id));

          const randomFill = allTrending
            .filter((m) => !watchlistIds.has(m.id) && m.backdrop_path)
            .sort(() => Math.random() - 0.5)
            .slice(0, needed)
            .map((m) => ({
              id: m.id,
              title: m.title || m.name,
              thumbnail: `${BACKDROP_BASE_URL}${m.backdrop_path}`, // pakai backdrop
              isNew: false,
            }));

          setContinueMovies([...watchlistMovies, ...randomFill]);
        } else {
          setContinueMovies(watchlistMovies);
        }

        const randomTrending =
          allTrending[Math.floor(Math.random() * allTrending.length)];

        const [detailRes, videoRes, ratingRes] = await Promise.all([
          getDataById(randomTrending.id, randomTrending.media_type),
          getTrailerById(randomTrending.id, randomTrending.media_type),
          getAgeRating(randomTrending.id, randomTrending.media_type),
        ]);

        if (cancelled) return;

        const videos = videoRes.data.results;
        const trailer =
          videos.find(
            (v) =>
              v.type === "Trailer" &&
              v.site === "YouTube" &&
              v.official === true,
          ) ||
          videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
          videos.find(
            (v) =>
              v.type === "Teaser" &&
              v.site === "YouTube" &&
              v.official === true,
          ) ||
          videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
          videos.find((v) => v.site === "YouTube");

        let ageRating = "";
        const ratingResults = ratingRes.data.results || [];

        if (randomTrending.media_type === "movie") {
          const releaseData =
            ratingResults.find((r) => r.iso_3166_1 === "ID") ||
            ratingResults.find((r) => r.iso_3166_1 === "US") ||
            ratingResults[0];
          if (releaseData?.release_dates) {
            const validCert = releaseData.release_dates.find(
              (d) => d.certification,
            );
            ageRating = validCert?.certification || "";
          }
        } else {
          const ratingData =
            ratingResults.find((r) => r.iso_3166_1 === "ID") ||
            ratingResults.find((r) => r.iso_3166_1 === "US") ||
            ratingResults[0];
          ageRating = ratingData?.rating || "";
        }

        setHeroData({
          title: detailRes.data.title || detailRes.data.name,
          overview: detailRes.data.overview || "",
          backdrop: randomTrending.backdrop_path
            ? `${BACKDROP_BASE_URL}${randomTrending.backdrop_path}`
            : null,
          trailerKey: trailer?.key || null,
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
