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
  getTopRatedTV,
  getTrendingTV,
  getNewReleaseTV,
  getPopularTV,
  getDataById,
  getTrailerById,
  getAgeRating,
} from "../services/api/tmdb";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";

const mapSeries = (series) => ({
  id: series.id,
  title: series.name,
  thumbnail: `${POSTER_BASE_URL}${series.poster_path}`,
  backdrop: series.backdrop_path
    ? `${BACKDROP_BASE_URL}${series.backdrop_path}`
    : null,
  isNew: false,
  mediaType: "tv",
  voteAverage: series.vote_average,
  releaseDate: series.first_air_date,
  genreIds: series.genre_ids,
});

function Series() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { watchlist } = useSelector((state) => state.watchlist);

  const isInWatchlist = (movieId) =>
    watchlist.some((w) => w.movieId === String(movieId));

  const [allTrending, setAllTrending] = useState([]);
  const [continueMovies, setContinueMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
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

    const fetchSeries = async () => {
      setLoading(true);
      try {
        const [topRatedRes, trendingRes, newReleaseRes, popularRes] =
          await Promise.all([
            getTopRatedTV(),
            getTrendingTV(),
            getNewReleaseTV(),
            getPopularTV(),
          ]);

        if (cancelled) return;

        setTopRated(topRatedRes.data.results.map(mapSeries).slice(0, 10));

        const trendingList = trendingRes.data.results;
        setTrending(trendingList.map(mapSeries).slice(0, 10));
        setAllTrending(trendingList);
        setNewRelease(newReleaseRes.data.results.map(mapSeries).slice(0, 10));
        setPopular(popularRes.data.results.map(mapSeries).slice(0, 10));

        const randomSeries =
          trendingList[Math.floor(Math.random() * trendingList.length)];

        const [detailRes, videoRes, ratingRes] = await Promise.all([
          getDataById(randomSeries.id, "tv"),
          getTrailerById(randomSeries.id, "tv"),
          getAgeRating(randomSeries.id, "tv"),
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
        const ratingData =
          ratingResults.find((r) => r.iso_3166_1 === "ID") ||
          ratingResults.find((r) => r.iso_3166_1 === "US") ||
          ratingResults[0];
        ageRating = ratingData?.rating || "";

        setHeroData({
          title: detailRes.data.name,
          overview: detailRes.data.overview || "",
          backdrop: randomSeries.backdrop_path
            ? `${BACKDROP_BASE_URL}${randomSeries.backdrop_path}`
            : null,
          trailerKey: trailer?.key || null,
          ageRating: ageRating || null,
        });
      } catch (err) {
        if (!cancelled) console.error("Gagal fetch series:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchSeries();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (allTrending.length === 0) return;

    const watchlistSeries = watchlist
      .filter((m) => m.mediaType === "tv")
      .slice(0, 8)
      .map((m) => ({
        id: m.movieId,
        title: m.title,
        thumbnail: m.backdropPath || m.posterPath,
        isNew: m.isNew || false,
        progress: Math.floor(Math.random() * 80) + 10,
      }));

    if (watchlistSeries.length < 8) {
      const needed = 8 - watchlistSeries.length;
      const watchlistIds = new Set(watchlistSeries.map((m) => m.id));
      const randomFill = allTrending
        .filter((m) => !watchlistIds.has(m.id) && m.backdrop_path)
        .sort(() => Math.random() - 0.5)
        .slice(0, needed)
        .map((m) => ({
          id: m.id,
          title: m.name,
          thumbnail: `${BACKDROP_BASE_URL}${m.backdrop_path}`,
          isNew: false,
          progress: Math.floor(Math.random() * 80) + 10,
        }));
      setContinueMovies([...watchlistSeries, ...randomFill]);
    } else {
      setContinueMovies(watchlistSeries);
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
          title="Melanjutkan Tonton Series"
          movies={continueMovies}
          CardComponent={ContinueCard}
          itemsPerPage={4}
        />
      )}
      <MovieSection
        title="Series Persembahan Chill"
        movies={popular}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
      <MovieSection
        title="Top Rating Series"
        movies={topRated}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
      <MovieSection
        title="Series Trending"
        movies={trending}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
      <MovieSection
        title="Series Terbaru"
        movies={newRelease}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
    </>
  );
}

export default Series;
