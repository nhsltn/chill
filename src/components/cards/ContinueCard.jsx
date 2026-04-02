import React from "react";
import { MdStar } from "react-icons/md";

function ContinueCard({ title, rating, thumbnail, isNew }) {
  return (
    <div className="continue-card relative rounded-[4.37px] lg:rounded-lg w-77.25 h-37.75 lg:w-full lg:h-40.5 overflow-hidden cursor-pointer">
      <img src={thumbnail} alt={title} className="object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 37.04%, rgba(0, 0, 0, 0.5) 100%)",
        }}
      />
      {isNew && (
        <div className="absolute top-2 left-2 bg-primary-3 text-white text-sm font-bold px-2.5 py-1 rounded-3xl">
          Episode Baru
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4">
        <p className="text-white font-bold text-sm lg:text-lg">{title}</p>
        <div className="flex items-center gap-1 text-white">
          <MdStar className="size-3 lg:size-4" />
          <span className="text-white text-xs lg:text-sm">{rating}/5</span>
        </div>
      </div>
    </div>
  );
}

export default ContinueCard;
