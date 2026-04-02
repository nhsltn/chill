import { GoArrowLeft, GoArrowRight } from "react-icons/go";

function ArrowButton({ direction = "left" }) {
  return (
    <button
      className={`flex items-center justify-center absolute top-1/2 -translate-y-1/2 bg-body-bg p-2.5 rounded-3xl size-11 text-white z-10
        ${direction === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"}
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
