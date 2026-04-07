import React, { useState } from "react";
import { FaPlay, FaCheck, FaChevronDown, FaStar } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { MOVIE_GENRES, TV_GENRES } from "../../data/genres";

function MoviesCard({
  id,
  thumbnail,
  backdrop,
  isNew,
  title,
  mediaType,
  voteAverage,
  releaseDate,
  genreIds = [],
  onToggleWatchlist,
  isInWatchlist,
  className = "w-28 h-42 lg:w-full lg:h-91.25",
}) {
  const [hovered, setHovered] = useState(false);
  const inWatchlist = isInWatchlist(id);

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    onToggleWatchlist({
      id,
      title,
      thumbnail,
      backdrop,
      isNew,
      voteAverage,
      releaseDate,
      genreIds,
      mediaType,
    });
  };

  const genreMap = mediaType === "tv" ? TV_GENRES : MOVIE_GENRES;
  const genreNames = genreIds
    .slice(0, 3)
    .map((id) => genreMap[id])
    .filter(Boolean);
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const rating = voteAverage ? (voteAverage / 2).toFixed(1) : null;

  return (
    <div
      className={`movie-card relative overflow-visible cursor-pointer lg:rounded-lg rounded-md ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={thumbnail}
        alt={title}
        className="object-cover w-full h-full rounded-md lg:rounded-lg"
      />
      {isNew && (
        <div className="absolute top-2 left-2 bg-primary-3 text-white text-[5.74px] lg:text-sm font-bold px-[4.78px] py-[1.91px] lg:px-2.5 lg:py-1 rounded-xl lg:rounded-3xl z-10">
          Episode Baru
        </div>
      )}
      <div
        className={`
          hidden lg:block
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-102 h-auto bg-[#181818] rounded-[20px] overflow-hidden z-50
          shadow-[0_10px_40px_rgba(0,0,0,0.75)]
          transition-all duration-300 ease-out
          ${hovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}
        `}
      >
        <div className="hover-wrapper">
          <div className="hover-thumbnail w-full h-70">
            <img
              src={backdrop || thumbnail}
              alt={title}
              className="w-full h-full object-cover mask-[linear-gradient(to_top,transparent_0%,black_15%)]"
            />
          </div>
          <div className="content-header px-[29.14px] pt-4 text-lg font-bold flex flex-col gap-4 text-white">
            <p>{title}</p>
            <p>{mediaType === "tv" ? "TV Series" : "Movie"}</p>
          </div>
          <div className="hover-content flex flex-col gap-4.25 p-[29.14px]">
            <div className="content-buttons flex items-center justify-between">
              <div className="play-watchlist-button flex gap-4">
                <button className="flex size-13.75 items-center justify-center bg-white rounded-full shrink-0 ">
                  <FaPlay className="size-6 text-black ml-0.5" />
                </button>
                <button
                  className={`flex items-center justify-center border rounded-full size-13.75 transition-colors duration-200 shrink-0 ${
                    inWatchlist
                      ? "bg-white border-white text-black"
                      : "border-white/60 hover:border-white text-white"
                  }`}
                  onClick={handleWatchlistClick}
                >
                  <FaCheck className="size-6" />
                </button>
              </div>
              <button className="flex items-center justify-center border border-white/60 rounded-full size-13.75 ml-auto shrink-0">
                <FaChevronDown className="text-white size-6 mt-0.5" />
              </button>
            </div>
            {/* Maaf min, di tmbd age rating dan jumlah episode adanya di fetch per movie, kalo di call per card jadinya berat, saya ganti pake rating film dan tahun release aja jadinya */}
            <div className="rating-details flex gap-[19.43px] items-center">
              <div className="movie rating bg-info-bg px-3 py-1 rounded-[29.14px] flex items-center text-text-light-secondary text-[19.43px] font-bold gap-2">
                <FaStar />
                <p>{rating}</p>
              </div>
              <p className="release-date text-[20px] font-bold text-white">
                {year}
              </p>
            </div>
            {genreNames.length > 0 && (
              <div className="flex items-center justify-between text-lg font-bold text-text-light-secondary">
                {genreNames.map((genre, index) => (
                  <React.Fragment key={genre}>
                    <p>{genre}</p>
                    {index < genreNames.length - 1 && (
                      <BsDot className="size-5" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesCard;
