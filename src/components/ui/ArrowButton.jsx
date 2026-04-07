import { GoArrowLeft, GoArrowRight } from "react-icons/go";

function ArrowButton({ direction = "left", onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center absolute top-1/2 -translate-y-1/2 bg-body-bg p-2.5 rounded-3xl size-11 z-10 transition-opacity duration-200
        ${direction === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"}
        ${disabled ? "opacity-30 cursor-not-allowed" : "text-white cursor-pointer"}
      `}
    >
      {direction === "left" ? (
        <GoArrowLeft size={24} />
      ) : (
        <GoArrowRight size={24} />
      )}
    </button>
  );
}

export default ArrowButton;
