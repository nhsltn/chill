// components/ArrowButton.jsx
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function ArrowButton({ direction = "left" }) {
  return (
    <button
      className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 bg-body-bg p-2.5 rounded-3xl size-11 text-white z-10"
      style={{ [direction === "left" ? "left" : "right"]: "-20px" }}
    >
      {direction === "left" ? (
        <MdChevronLeft size={24} />
      ) : (
        <MdChevronRight size={24} />
      )}
    </button>
  );
}

export default ArrowButton;
