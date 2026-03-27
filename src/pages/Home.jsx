import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ContinueWatching from "../components/ContinueWatching";
import TopRating from "../components/TopRating";

function Home() {
  return (
    <div className="bg-page-header-bg">
      <Navbar />
      <HeroSection />
      <ContinueWatching />
      <TopRating />
      <Footer />
    </div>
  );
}

export default Home;
