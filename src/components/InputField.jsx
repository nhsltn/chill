import React from "react";
import { IoMdEyeOff } from "react-icons/io";

function InputField({ label, type = "text", placeholder }) {
  const isPassword = type === "password";

  return (
    <div className="flex flex-col w-full gap-[3.47px] xl:gap-1.5">
      <label className="text-[10px] xl:text-lg font-medium text-text-light-primary">
        {label}
      </label>

      {isPassword ? (
        <div className="flex items-center justify-between rounded-xl xl:rounded-3xl py-[8.09px] xl:py-3.5 px-[11.55px] xl:px-5 border-[0.58px] xl:border border-outline-border">
          <input
            type={type}
            placeholder={placeholder}
            className=" outline-none text-text-light-secondary text-[9.24px] xl:text-base w-full"
          />
          <IoMdEyeOff className="text-text-light-secondary size-3 xl:size-6" />
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="rounded-xl xl:rounded-3xl py-[8.09px] xl:py-3.5 px-[11.55px] xl:px-5 border-[0.58px] xl:border border-outline-border text-text-light-secondary text-[9.24px] xl:text-base w-full"
        />
      )}
    </div>
  );
}

export default InputField;
