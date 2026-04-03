import React, { useState } from "react";
import { FaPlay, FaCheck, FaChevronDown } from "react-icons/fa";

function MoviesCard({
  id,
  thumbnail,
  isNew,
  title,
  onToggleWatchlist,
  isInWatchlist,
}) {
  const [hovered, setHovered] = useState(false);
  const inWatchlist = isInWatchlist(id);
  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    onToggleWatchlist({ id, thumbnail, isNew, title });
  };

  return (
    <div
      className="movie-card relative w-28 h-42 lg:w-full lg:h-91.25 overflow-hidden cursor-pointer lg:rounded-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={thumbnail}
        alt={title}
        className={`object-cover w-full h-full transition-transform duration-300 ${hovered ? "scale-105" : "scale-100"}`}
      />

      {isNew && (
        <div className="absolute top-2 left-2 bg-primary-3 text-white text-[5.74px] lg:text-sm font-bold px-[4.78px] py-[1.91px] lg:px-2.5 lg:py-1 rounded-xl lg:rounded-3xl z-10">
          Episode Baru
        </div>
      )}

      <div
        className={`hidden lg:flex absolute bottom-0 left-0 right-0 flex-col gap-2 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center bg-white rounded-full size-8 hover:bg-white/80">
            <FaPlay className="text-black size-3 ml-0.5" />
          </button>
          <button
            className={`flex items-center justify-center border rounded-full size-8 transition-colors duration-200 ${
              inWatchlist
                ? "bg-white border-white text-black"
                : "border-white/60 hover:border-white text-white"
            }`}
            onClick={handleWatchlistClick}
          >
            <FaCheck className=" size-3" />
          </button>
          <button className="flex items-center justify-center border border-white/60 rounded-full size-8 hover:border-white ml-auto">
            <FaChevronDown className="text-white size-3" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-white text-xs">
          <span className="border border-white/60 px-1.5 py-0.5 rounded text-[10px]">
            13+
          </span>
          <span className="font-medium">16 Episode</span>
        </div>

        <div className="flex items-center gap-1.5 text-white/80 text-[10px]">
          <span>Misteri</span>
          <span className="size-1 rounded-full bg-white/60" />
          <span>Kriminal</span>
          <span className="size-1 rounded-full bg-white/60" />
          <span>Fantasi</span>
        </div>
      </div>
    </div>
  );
}

export default MoviesCard;
