import React from "react";
import HeroSection from "../components/sections/HeroSection";
import MovieSection from "../components/sections/MovieSection";
import MoviesCard from "../components/cards/MoviesCard";
import ContinueCard from "../components/cards/ContinueCard";
import { useWatchlist } from "../hooks/useWatchlist";
import { useModal } from "../hooks/useModal";
import { useContinueWatching } from "../hooks/useContinueWatching";
import { usePageData } from "../hooks/usePageData";
import {
  getTopRatedTV,
  getTrendingTV,
  getNewReleaseTV,
  getPopularTV,
} from "../services/api/tmdb";
import { mapMovie } from "../utils/mediaMapper";

function Series() {
  const { watchlist, isInWatchlist, handleToggleWatchlist, isLoggedIn } =
    useWatchlist();
  const { handleOpenDetail } = useModal();

  const toSeries = (m) => mapMovie(m, "tv");

  const { topRated, trending, newRelease, popular, heroData, loading } =
    usePageData(async () => {
      const [topRatedRes, trendingRes, newReleaseRes, popularRes] =
        await Promise.all([
          getTopRatedTV(),
          getTrendingTV(),
          getNewReleaseTV(),
          getPopularTV(),
        ]);

      return {
        lists: {
          topRated: topRatedRes.data.results.map(toSeries).slice(0, 10),
          trending: trendingRes.data.results.map(toSeries).slice(0, 10),
          newRelease: newReleaseRes.data.results.map(toSeries).slice(0, 10),
          popular: popularRes.data.results.map(toSeries).slice(0, 10),
        },
        trendingRaw: trendingRes.data.results,
      };
    }, "tv");

  const continueMovies = useContinueWatching(watchlist, trending, "tv");

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
        onOpenDetail={handleOpenDetail}
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
    </>
  );
}

export default Series;
