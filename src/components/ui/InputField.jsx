import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function InputField({ label, type = "text", placeholder }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col w-full gap-[3.47px] xl:gap-1.5">
      <label className="text-[10px] xl:text-lg font-medium text-text-light-primary">
        {label}
      </label>
      <div className="flex items-center rounded-xl xl:rounded-3xl py-[8.09px] xl:py-3.5 px-[11.55px] xl:px-5 border-[0.58px] xl:border border-outline-border">
        <input
          type={inputType}
          placeholder={placeholder}
          className="outline-none text-text-light-secondary text-[9.24px] xl:text-base w-full bg-transparent"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <IoMdEye className="text-text-light-secondary size-3 xl:size-6" />
            ) : (
              <IoMdEyeOff className="text-text-light-secondary size-3 xl:size-6" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
