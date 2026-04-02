import React from "react";
import { MdInfoOutline, MdVolumeOff } from "react-icons/md";

function HeroSection() {
  return (
    <div className="hero-section bg-hero-mobile lg:bg-hero-desktop h-56.25 lg:h-146.75 w-full bg-cover bg-center flex items-center justify-center pt-8 lg:pt-56">
      <div className="hero-content w-[88.89%] lg:w-7xl flex flex-col items-start text-white gap-3 lg:gap-5">
        <h4 className="text-2xl lg:text-5xl font-bold">Duty After School</h4>
        <p className="font-medium text-xs w-full lg:w-160 lg:text-lg line-clamp-2 lg:line-clamp-none">
          Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan,
          Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk
          siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan
          dalam perang.
        </p>
        <div className="watch-function flex flex-row justify-between w-full mt-0 lg:mt-5">
          <div className="movie-info flex gap-2">
            <button className="start-button rounded-[48px] bg-primary-3 text-xs lg:text-base font-bold text-white py-1 lg:py-2.5 px-3 lg:px-7 gap-2 flex items-center">
              Mulai
            </button>
            <button className="movie-details rounded-[48px] bg-paper-bg text-xs lg:text-base font-bold text-white py-1 lg:py-2.5 px-3 lg:px-7 gap-2 flex items-center">
              <MdInfoOutline size={18} />
              <span>Selengkapnya</span>
            </button>
            <div className="age-rating border border-text-light-secondary rounded-3xl p-1 lg:p-2.5 flex items-center justify-center">
              <p className="font-bold text-xs lg:text-base text-text-light-secondary">
                18+
              </p>
            </div>
          </div>
          <div className="volume-control flex items-center border rounded-[19px] lg:rounded-3xl border-text-light-secondary text-text-light-secondary p-1.5 lg:p-2.5 ">
            <MdVolumeOff className="size-6 lg:size-7" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
