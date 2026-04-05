import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { FaUserLarge, FaStar } from "react-icons/fa6";
import { useAuthStore } from "../../stores/authStore";

import Avatar from "/assets/images/avatar.png";

const LOGGED_IN_MENU = [
  { icon: FaUserLarge, label: "Profil Saya", path: "/profile" },
  { icon: FaStar, label: "Ubah Premium", path: "/premium" },
  { icon: HiArrowRightOnRectangle, label: "Keluar", action: "logout" },
];

const LOGGED_OUT_MENU = [{ icon: FaUserLarge, label: "Login", path: "/login" }];
function AvatarDropdown({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();
  const menuItems = isLoggedIn ? LOGGED_IN_MENU : LOGGED_OUT_MENU;
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const handleClick = (item) => {
    setIsOpen(false);
    if (item.action === "logout") {
      handleLogout();
    } else if (item.path) {
      navigate(item.path);
    }
  };

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
          className={`size-4 lg:size-7 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`
          absolute right-0 top-full mt-1 lg:mt-6 w-30.5 lg:w-52
          bg-page-header-bg rounded-sm py-1
          transition-all duration-300 ease-in-out origin-top text-[10px] lg:text-lg
          ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"}
        `}
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center py-2 px-3 gap-3 text-white hover:text-primary w-full"
            onClick={() => handleClick(item)}
          >
            <item.icon className="size-4" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AvatarDropdown;
