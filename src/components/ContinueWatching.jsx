import React from "react";
import ContinueCard from "./ContinueCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function ContinueWatching() {
  const movies = [
    {
      id: 1,
      title: "Don't Look Up",
      rating: "4.5",
      thumbnail: "/assets/images/continue-1.png",
    },
    {
      id: 2,
      title: "All of us Are Dead",
      rating: "4.2",
      thumbnail: "/assets/images/continue-2.png",
    },
    {
      id: 3,
      title: "Blue Lock",
      rating: "4.6",
      thumbnail: "/assets/images/continue-3.png",
      isNew: true,
    },
    {
      id: 4,
      title: "A Man Called Otto",
      rating: "4.4",
      thumbnail: "/assets/images/continue-4.png",
    },
  ];

  return (
    <div className="continue-section flex flex-col w-full items-center text-white pt-10 lg:pt-30">
      <div className="w-full max-w-7xl container flex flex-col gap-5 lg:gap-8 pl-5 lg:pl-0">
        <h3 className="lg:text-[32px] text-[20px] font-bold">
          Melanjutkan Tonton Film
        </h3>

        <div className="lg:hidden w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="flex-none">
                <ContinueCard {...movie} />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative">
          <button className="flex items-center absolute -left-5 top-1/2 -translate-y-1/2 bg-body-bg p-2.5 rounded-3xl size-11 text-white z-10">
            <MdChevronLeft size={24} />
          </button>
          <div className="flex gap-6">
            {movies.map((movie) => (
              <div key={movie.id}>
                <ContinueCard {...movie} />
              </div>
            ))}
          </div>
          <button className="flex items-center absolute -right-5 top-1/2 -translate-y-1/2 bg-body-bg p-2.5 rounded-3xl size-11 text-white z-10">
            <MdChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContinueWatching;
