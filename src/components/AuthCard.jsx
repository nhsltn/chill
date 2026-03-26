import React from "react";
import { FcGoogle } from "react-icons/fc";

function AuthCard({ title, subtitle, submitLabel, children, onSubmit }) {
  return (
    <form className="flex w-132.25 bg-auth-card rounded-2xl p-10 flex-col items-center gap-9 ">
      <img src="../../public/assets/images/logo-chill.png" alt="logo" />
      <div className="flex flex-col items-center gap-2 text-text-light-primary">
        <h3 className="heading-3">{title}</h3>
        <p className="body-md-regular">{subtitle}</p>
      </div>
      {children}
      <div className="w-full flex flex-col items-center gap-2">
        <button
          className="px-5 py-2 bg-extra border-outline-border text-text-light-primary rounded-3xl border w-full"
          onClick={onSubmit}
        >
          {submitLabel}
        </button>
        <p className="body-sm-medium text-center text-text-light-disabled">
          Atau
        </p>
        <button className="px-5 py-2 border-outline-border text-text-light-primary rounded-3xl border w-full flex items-center justify-center gap-5">
          <FcGoogle size={18} />
          <span>{submitLabel} dengan Google</span>
        </button>
      </div>
    </form>
  );
}

export default AuthCard;
