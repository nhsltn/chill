/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    const user = stored ? JSON.parse(stored) : null;
    return {
      isLoggedIn: !!user,
      user: user,
    };
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("currentUser");
      const user = stored ? JSON.parse(stored) : null;
      setAuth({
        isLoggedIn: !!user,
        user: user,
      });
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="bg-page-header-bg">
      <Navbar isLoggedIn={auth.isLoggedIn} username={auth.user?.username} />
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
