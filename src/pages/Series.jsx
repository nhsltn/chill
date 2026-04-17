import React, { useState, useEffect } from "react";
import HeroSection from "../components/sections/HeroSection";
import MovieSection from "../components/sections/MovieSection";
import MoviesCard from "../components/cards/MoviesCard";
import ContinueCard from "../components/cards/ContinueCard";
import DetailCard from "../components/cards/DetailCard";
import { useWatchlist } from "../hooks/useWatchlist";
import { useMediaModal } from "../hooks/useMediaModal";
import { useContinueWatching } from "../hooks/useContinueWatching";
import {
  getTopRatedTV,
  getTrendingTV,
  getNewReleaseTV,
  getPopularTV,
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

function Series() {
  const { watchlist, isInWatchlist, handleToggleWatchlist, isLoggedIn } =
    useWatchlist();

  const [allTrending, setAllTrending] = useState([]);
  const continueMovies = useContinueWatching(watchlist, allTrending, "tv");
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { modalData, handleOpenDetail, handleCloseDetail } = useMediaModal();

  const toSeries = (m) => mapMovie(m, "tv");

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

        setTopRated(topRatedRes.data.results.map(toSeries).slice(0, 10));

        const trendingList = trendingRes.data.results;
        setTrending(trendingList.map(toSeries).slice(0, 10));
        setAllTrending(trendingList);
        setNewRelease(newReleaseRes.data.results.map(toSeries).slice(0, 10));
        setPopular(popularRes.data.results.map(toSeries).slice(0, 10));

        const randomSeries =
          trendingList[Math.floor(Math.random() * trendingList.length)];

        const [detailRes, videoRes, ratingRes] = await Promise.all([
          getDataById(randomSeries.id, "tv"),
          getTrailerById(randomSeries.id, "tv"),
          getAgeRating(randomSeries.id, "tv"),
        ]);

        if (cancelled) return;

        const trailerKey = pickTrailerKey(videoRes.data.results);
        const ageRating = parseAgeRating(
          ratingRes.data.results || [],
          randomSeries.media_type,
        );

        setHeroData({
          title: detailRes.data.title || detailRes.data.name,
          overview: detailRes.data.overview || "",
          backdrop: randomSeries.backdrop_path
            ? `${BACKDROP_BASE_URL}${randomSeries.backdrop_path}`
            : null,
          trailerKey: trailerKey,
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
        onOpenDetail={handleOpenDetail}
      />
      <MovieSection
        title="Series Trending"
        movies={trending}
        CardComponent={MoviesCard}
        onToggleWatchlist={handleToggleWatchlist}
        isInWatchlist={isInWatchlist}
        onOpenDetail={handleOpenDetail}
      />
      <MovieSection
        title="Series Terbaru"
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

export default Series;
