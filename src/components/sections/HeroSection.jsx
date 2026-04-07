import React, { useState, useEffect, useRef } from "react";
import { MdInfoOutline, MdVolumeOff, MdVolumeUp } from "react-icons/md";

function HeroSection({ movie }) {
  const [isMuted, setIsMuted] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setShowTrailer(false);
    setIsMuted(true);

    if (movie?.trailerKey) {
      timerRef.current = setTimeout(() => {
        setShowTrailer(true);
      }, 3000);
    }

    return () => clearTimeout(timerRef.current);
  }, [movie]);

  if (!movie) return null;

  const trailerActive = showTrailer && isVisible;

  const trailerSrc = movie.trailerKey
    ? `https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&loop=1&playlist=${movie.trailerKey}&modestbranding=1`
    : null;

  return (
    <section
      ref={heroRef}
      className="hero-section relative w-full h-120 lg:h-screen overflow-hidden"
    >
      {movie.backdrop && (
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${trailerActive ? "opacity-0" : "opacity-100"}`}
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
      )}
      {trailerActive && trailerSrc && (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[calc(100%+400px)] h-[calc(100%+200px)] min-w-[177.78vh] min-h-[56.25vw]"
            src={trailerSrc}
            title="Hero Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

      <div className="absolute inset-0 z-20 flex items-center justify-center pt-8 lg:pt-56">
        <div className="hero-content w-[88.89%] lg:w-7xl flex flex-col items-start text-white gap-3 lg:gap-5">
          <h4 className="text-2xl lg:text-5xl font-bold">{movie.title}</h4>
          <p className="font-medium text-xs w-full lg:w-160 lg:text-lg line-clamp-2 lg:line-clamp-3">
            {movie.overview}
          </p>
          <div className="watch-function flex flex-row justify-between w-full mt-0 lg:mt-5">
            <div className="movie-info flex gap-2 items-center">
              <button className="start-button rounded-[48px] bg-primary-3 text-xs lg:text-base font-bold text-white py-1 lg:py-2.5 px-3 lg:px-7 gap-2 flex items-center">
                Mulai
              </button>
              <button className="movie-details rounded-[48px] bg-paper-bg text-xs lg:text-base font-bold text-white py-1 lg:py-2.5 px-3 lg:px-7 gap-2 flex items-center">
                <MdInfoOutline size={18} />
                <span>Selengkapnya</span>
              </button>
              {movie.ageRating && (
                <div className="age-rating border border-text-light-secondary rounded-3xl p-1 lg:p-2.5 flex items-center justify-center">
                  <p className="font-bold text-xs lg:text-base text-text-light-secondary">
                    {movie.ageRating}
                  </p>
                </div>
              )}
            </div>

            {trailerActive && (
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="volume-control flex items-center border rounded-[19px] lg:rounded-3xl border-text-light-secondary text-text-light-secondary p-1.5 lg:p-2.5"
              >
                {isMuted ? (
                  <MdVolumeOff className="size-6 lg:size-7" />
                ) : (
                  <MdVolumeUp className="size-6 lg:size-7" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
