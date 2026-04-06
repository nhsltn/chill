import React from "react";

function ContinueCard({ title, thumbnail, isNew, progress }) {
  return (
    <div className="continue-card relative rounded-[4.37px] lg:rounded-lg w-77.25 h-37.75 lg:w-full lg:h-40.5 overflow-hidden cursor-pointer">
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-linear-to-b from-transparent from-37% to-black/70" />

      {isNew && (
        <div className="absolute top-2 left-2 bg-primary-3 text-white text-sm font-bold px-2.5 py-1 rounded-3xl">
          Episode Baru
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1.5 px-3 pb-2">
        <p className="text-white font-bold text-sm lg:text-base">{title}</p>
        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-3 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ContinueCard;
