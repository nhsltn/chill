import React from "react";
import { IoMdEyeOff } from "react-icons/io";

function InputField({ label, type = "text", placeholder }) {
  const isPassword = type === "password";

  return (
    <div className="flex flex-col w-full gap-1.5">
      <label className="body-lg-medium text-text-light-primary">{label}</label>

      {isPassword ? (
        <div className="flex items-center justify-between rounded-3xl py-3.5 px-5 border border-outline-border">
          <input
            type={type}
            placeholder={placeholder}
            className="bg-transparent outline-none text-text-light-secondary body-md-regular w-full"
          />
          <IoMdEyeOff className="text-text-light-secondary size-6" />
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="rounded-3xl py-3.5 px-5 border border-outline-border text-text-light-secondary body-md-regular"
        />
      )}
    </div>
  );
}

export default InputField;
