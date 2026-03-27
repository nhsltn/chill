import React from "react";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

function FooterDropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 text-white font-bold"
      >
        {title}
        <MdKeyboardArrowRight
          className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mb-3" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default FooterDropdown;
