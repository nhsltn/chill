import React from "react";

function MoviesCard({ thumbnail, isNew, title }) {
  return (
    <div className="movie-card relative w-23.75 h-36.25 lg:w-58.5 lg:91.25 overflow-hidden cursor-pointer lg:rounded-lg">
      <img src={thumbnail} alt={title} className="object-cover" />
      {isNew && (
        <div className="absolute top-2 left-2 bg-primary-3 text-white text-[5.74px] lg:text-sm font-bold px-[4.78px] py-[1.91px] lg:px-2.5 lg:py-1 rounded-xl lg:rounded-3xl">
          Episode Baru
        </div>
      )}
    </div>
  );
}

export default MoviesCard;
