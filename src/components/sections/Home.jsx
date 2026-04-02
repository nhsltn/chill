import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import HeroSection from "../components/HeroSection";
import ContinueWatching from "../components/ContinueWatching";
import TopRating from "../components/TopRating";
import TrendingMovie from "../components/TrendingMovie";
import NewRelease from "../components/NewRelease";

function Home() {
  return (
    <div className="bg-page-header-bg">
      <Navbar />
      <HeroSection />
      <ContinueWatching />
      <TopRating />
      <TrendingMovie />
      <NewRelease />
      <Footer />
    </div>
  );
}

export default Home;
