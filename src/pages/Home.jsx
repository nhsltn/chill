import React, { useState, useEffect } from "react";
import HeroSection from "../components/sections/HeroSection";
import MovieSection from "../components/sections/MovieSection";
import MoviesCard from "../components/cards/MoviesCard";
import ContinueCard from "../components/cards/ContinueCard";
import DetailCard from "../components/cards/DetailCard";
import { useWatchlist } from "../hooks/useWatchlist";
import { useContinueWatching } from "../hooks/useContinueWatching";
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
import { pickTrailerKey, parseAgeRating } from "../utils/heroHelpers";
import {
  mapMovie,
  POSTER_BASE_URL,
  BACKDROP_BASE_URL,
} from "../utils/mediaMapper";

function Home() {
  const { watchlist, isInWatchlist, handleToggleWatchlist, isLoggedIn } =
    useWatchlist();
  const [allTrending, setAllTrending] = useState([]);
  const continueMovies = useContinueWatching(watchlist, allTrending);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);

  const handleOpenDetail = ({ id, mediaType }) => {
    setModalData({ id, mediaType });
  };

  const handleCloseDetail = () => setModalData(null);

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

        const trendingAll = trendingAllRes.data.results;
        setAllTrending(trendingAll);

        const randomTrending =
          trendingAll[Math.floor(Math.random() * trendingAll.length)];

        const [detailRes, videoRes, ratingRes] = await Promise.all([
          getDataById(randomTrending.id, randomTrending.media_type),
          getTrailerById(randomTrending.id, randomTrending.media_type),
          getAgeRating(randomTrending.id, randomTrending.media_type),
        ]);

        if (cancelled) return;

        const trailerKey = pickTrailerKey(videoRes.data.results);
        const ageRating = parseAgeRating(
          ratingRes.data.results || [],
          randomTrending.media_type,
        );

        setHeroData({
          title: detailRes.data.title || detailRes.data.name,
          overview: detailRes.data.overview || "",
          backdrop: randomTrending.backdrop_path
            ? `${BACKDROP_BASE_URL}${randomTrending.backdrop_path}`
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
        title="Top Rating Film dan Series Hari Ini"
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
        onOpenDetail={handleOpenDetail}
      />

      {modalData && (
        <DetailCard
          id={modalData.id}
          mediaType={modalData.mediaType}
          onClose={handleCloseDetail}
          onToggleWatchlist={handleToggleWatchlist}
          isInWatchlist={isInWatchlist}
        />
      )}
    </>
  );
}

export default Home;
