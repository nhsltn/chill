import React from "react";

const LoadingSpinner = ({ 
  wrapperClass = "min-h-screen", 
  sizeClass = "w-12 h-12" 
}) => {
  return (
    <div className={`flex items-center justify-center w-full text-white ${wrapperClass}`}>
      <div className={`${sizeClass} border-4 border-white/20 border-t-primary-3 rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;
