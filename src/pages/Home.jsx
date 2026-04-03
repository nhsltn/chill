import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

  const [watchlist, setWatchlist] = useState(() => {
    if (!auth.user?.id) return [];
    const stored = localStorage.getItem(`watchlist_${auth.user.id}`);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (auth.user?.id) {
      localStorage.setItem(
        `watchlist_${auth.user.id}`,
        JSON.stringify(watchlist),
      );
    }
  }, [watchlist, auth.user?.id]);

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("currentUser");
      const user = stored ? JSON.parse(stored) : null;
      setAuth({
        isLoggedIn: !!user,
        user: user,
      });

      if (user?.id) {
        const userWatchlist = localStorage.getItem(`watchlist_${user.id}`);
        setWatchlist(userWatchlist ? JSON.parse(userWatchlist) : []);
      } else {
        setWatchlist([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleWatchlist = (movie) => {
    if (!auth.isLoggedIn) {
      toast.error("Silakan login lebih dulu untuk menambahkan watchlist");
      return;
    }

    const exists = watchlist.find((item) => item.id === movie.id); // ⬅️ cek di luar

    if (exists) {
      toast.success(`${movie.title} dihapus dari watchlist`);
      setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));
    } else {
      toast.success(`${movie.title} ditambahkan ke watchlist`);
      setWatchlist((prev) => [
        ...prev,
        {
          id: movie.id,
          thumbnail: movie.thumbnail,
          isNew: movie.isNew,
          title: movie.title,
        },
      ]);
    }
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((item) => item.id === movieId);
  };

  return (
    <div className="bg-page-header-bg">
      <Navbar isLoggedIn={auth.isLoggedIn} username={auth.user?.username} />
      <HeroSection />
      {auth.isLoggedIn && (
        <MovieSection
          title="Melanjutkan Tonton Film"
          movies={continueWatchingMovies}
          CardComponent={ContinueCard}
        />
      )}
      <MovieSection
        title="Top Rating Film dan Series Hari Ini"
        movies={topRatingMovies}
        CardComponent={MoviesCard}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
      <MovieSection
        title="Film Trending"
        movies={trendingMovies}
        CardComponent={MoviesCard}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
      <MovieSection
        title="Film Baru"
        movies={newReleaseMovies}
        CardComponent={MoviesCard}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
      <Footer />
    </div>
  );
}

export default Home;
