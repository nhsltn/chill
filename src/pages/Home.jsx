import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import MovieSection from "../components/sections/MovieSection";
import {
  topRatingMovies,
  trendingMovies,
  newReleaseMovies,
  continueWatchingMovies,
} from "../data/movies";
import MoviesCard from "../components/cards/MoviesCard";
import ContinueCard from "../components/cards/ContinueCard";

function Home() {
  return (
    <div className="bg-page-header-bg">
      <Navbar />
      <HeroSection />
      <MovieSection
        title="Melanjutkan Tonton Film"
        movies={continueWatchingMovies}
        CardComponent={ContinueCard}
      />
      <MovieSection
        title="Top Rating Film dan Series Hari Ini"
        movies={topRatingMovies}
        CardComponent={MoviesCard}
      />
      <MovieSection
        title="Film Trending"
        movies={trendingMovies}
        CardComponent={MoviesCard}
      />
      <MovieSection
        title="Film Baru"
        movies={newReleaseMovies}
        CardComponent={MoviesCard}
      />
      <Footer />
    </div>
  );
}

export default Home;
