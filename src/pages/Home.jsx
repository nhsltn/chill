import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
function Home() {
  return (
    <div className="bg-page-header-bg">
      <Navbar />
      <HeroSection />
      <h1 className="heading-1">Ini Homepage</h1>
      <Footer />
    </div>
  );
}

export default Home;
