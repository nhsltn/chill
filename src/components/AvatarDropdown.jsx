// components/navbar/AvatarDropdown.jsx
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { FaUserLarge, FaStar } from "react-icons/fa6";

import Avatar from "/assets/images/avatar.png";

function AvatarDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={Avatar}
          alt="Avatar"
          className="size-5 lg:size-10 object-cover rounded-full"
        />
        <MdKeyboardArrowDown
          className={`size-4 lg:size-7 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <div
        className={`
          absolute right-0 top-full mt-1 lg:mt-6 w-30.5 lg:w-52
          bg-page-header-bg rounded-sm py-1
          transition-all duration-300 ease-in-out origin-top text-white hover:text-primary text-[10px] lg:text-lg
          ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"}
        `}
      >
        <button className="flex items-center py-2 px-3 gap-1.25 ">
          <FaUserLarge className="size-4" />
          Profil Saya
        </button>
        <button className="flex items-center py-2 px-3 gap-1.25 ">
          <FaStar className="size-4" />
          Ubah Premium
        </button>
        <button className="flex items-center py-2 px-3 gap-1.25 ">
          <HiArrowRightOnRectangle className="size-4" />
          Keluar
        </button>
      </div>
    </div>
  );
}

export default AvatarDropdown;
