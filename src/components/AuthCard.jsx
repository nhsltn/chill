import React from "react";
import { FcGoogle } from "react-icons/fc";

function AuthCard({ title, subtitle, submitLabel, children, onSubmit }) {
  return (
    <form className="flex w-76.5 xl:w-132.25 bg-auth-card rounded-lg xl:rounded-2xl p-6 xl:p-10 flex-col items-center gap-5 xl:gap-9">
      <img
        src="../../public/assets/images/logo-chill.png"
        alt="logo"
        className="w-23.6 xl:w-auto h-6 xl:h-auto"
      />
      <div className="flex flex-col items-center xl:gap-2 gap-[4.62px] text-text-light-primary">
        <h3 className="text-lg xl:text-[32px] font-bold">{title}</h3>
        <p className="text-[10ox] xl:text-lg">{subtitle}</p>
      </div>
      {children}
      <div className="button-group w-full flex flex-col items-center gap-1 xl:gap-2">
        <button
          className="text-[10px] xl:text-base font-semibold px-[11.55px] xl:px-5 py-[8.09px] xl:py-2 bg-extra border-outline-border text-text-light-primary rounded-[13.86px] xl:rounded-3xl border-[0.58px] xl:border w-full"
          onClick={onSubmit}
        >
          {submitLabel}
        </button>
        <p className="text-[10px] xl:text-sm text-center text-text-light-disabled">
          Atau
        </p>
        <button className="text-[10px] xl:text-base font-semibold px-[11.55px] xl:px-5 py-[8.09px] xl:py-2 border-outline-border text-text-light-primary rounded-[13.86px] xl:rounded-3xl border-[0.58px] xl:border w-full flex items-center justify-center gap-5">
          <FcGoogle size={18} />
          <span>{submitLabel} dengan Google</span>
        </button>
      </div>
    </form>
  );
}

export default AuthCard;
