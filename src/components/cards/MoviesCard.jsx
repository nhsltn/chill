import React, { useState } from "react";
import { FaPlay, FaCheck, FaChevronDown } from "react-icons/fa";

function MoviesCard({ thumbnail, isNew, title }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="movie-card relative w-28 h-42 lg:w-full lg:h-91.25 overflow-hidden cursor-pointer lg:rounded-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className={`object-cover w-full h-full transition-transform duration-300 ${hovered ? "scale-105" : "scale-100"}`}
      />

      {/* Badge Episode Baru */}
      {isNew && (
        <div className="absolute top-2 left-2 bg-primary-3 text-white text-[5.74px] lg:text-sm font-bold px-[4.78px] py-[1.91px] lg:px-2.5 lg:py-1 rounded-xl lg:rounded-3xl z-10">
          Episode Baru
        </div>
      )}

      {/* Hover Overlay — desktop only */}
      <div
        className={`hidden lg:flex absolute bottom-0 left-0 right-0 flex-col gap-2 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center bg-white rounded-full size-8 hover:bg-white/80">
            <FaPlay className="text-black size-3 ml-0.5" />
          </button>
          <button className="flex items-center justify-center border border-white/60 rounded-full size-8 hover:border-white">
            <FaCheck className="text-white size-3" />
          </button>
          <button className="flex items-center justify-center border border-white/60 rounded-full size-8 hover:border-white ml-auto">
            <FaChevronDown className="text-white size-3" />
          </button>
        </div>

        {/* Info */}
        <div className="flex items-center gap-2 text-white text-xs">
          <span className="border border-white/60 px-1.5 py-0.5 rounded text-[10px]">
            13+
          </span>
          <span className="font-medium">16 Episode</span>
        </div>

        {/* Genre */}
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
