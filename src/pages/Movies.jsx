import React from "react";
import HeroSection from "../components/sections/HeroSection";
import MovieSection from "../components/sections/MovieSection";
import MoviesCard from "../components/cards/MoviesCard";
import ContinueCard from "../components/cards/ContinueCard";
import { useModal } from "../hooks/useModal";
import { useWatchlist } from "../hooks/useWatchlist";
import { useContinueWatching } from "../hooks/useContinueWatching";
import { usePageData } from "../hooks/usePageData";
import {
  getTopRatedMovies,
  getTrendingMovies,
  getNewReleaseMovies,
  getPopularMovies,
} from "../services/api/tmdb";
import { mapMovie } from "../utils/mediaMapper";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function Movies() {
  const { watchlist, isInWatchlist, handleToggleWatchlist, isLoggedIn } =
    useWatchlist();
  const { handleOpenDetail } = useModal();
  const toMovie = (m) => mapMovie(m, "movie");

  const { topRated, trending, newRelease, popular, heroData, loading } =
    usePageData(async () => {
      const [topRatedRes, trendingRes, newReleaseRes, popularRes] =
        await Promise.all([
          getTopRatedMovies(),
          getTrendingMovies(),
          getNewReleaseMovies(),
          getPopularMovies(),
        ]);

      return {
        lists: {
          topRated: topRatedRes.data.results.map(toMovie).slice(0, 10),
          trending: trendingRes.data.results.map(toMovie).slice(0, 10),
          newRelease: newReleaseRes.data.results.map(toMovie).slice(0, 10),
          popular: popularRes.data.results.map(toMovie).slice(0, 10),
        },
        trendingRaw: trendingRes.data.results,
      };
    }, "movie");

  const continueMovies = useContinueWatching(watchlist, trending, "movie");

  if (loading) {
    return <LoadingSpinner />;
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
        onOpenDetail={handleOpenDetail}
      />
    </>
  );
}

export default Movies;
