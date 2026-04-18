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
  getTopRatedMovies,
  getTopRatedTV,
  getTrendingMovies,
  getNewReleaseMovies,
  getTrendingAll,
} from "../services/api/tmdb";
import { mapMovie } from "../utils/mediaMapper";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function Home() {
  const { watchlist, isInWatchlist, handleToggleWatchlist, isLoggedIn } =
    useWatchlist();
  const { handleOpenDetail } = useModal();

  const { allTrending, topRated, trending, newRelease, heroData, loading } =
    usePageData(async () => {
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

      const trendingAll = trendingAllRes.data.results;

      const topRatedCombined = [
        ...topRatedMovieRes.data.results.map((m) => mapMovie(m, "movie")),
        ...topRatedTVRes.data.results.map((m) => mapMovie(m, "tv")),
      ]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      return {
        lists: {
          topRated: topRatedCombined,
          trending: trendingRes.data.results
            .map((m) => mapMovie(m, "movie"))
            .slice(0, 10),
          newRelease: newReleaseRes.data.results
            .map((m) => mapMovie(m, "movie"))
            .slice(0, 10),
        },
        trendingRaw: trendingAll,
      };
    }, "movie");

  const mappedTrending = allTrending.map((m) =>
    mapMovie(m, m.media_type || "movie"),
  );
  const continueMovies = useContinueWatching(watchlist, mappedTrending);

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
    </>
  );
}

export default Home;
