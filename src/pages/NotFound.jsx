import React from "react";

function NotFound() {
  return (
    <div className="bg-[image:var(--bg-login)] bg-center bg-cover h-screen flex items-center justify-center">
      <div className="flex w-76.5 xl:w-132.25 bg-auth-card rounded-lg xl:rounded-2xl p-6 xl:p-10 flex-col items-center gap-5 xl:gap-9">
        <h1 className="text-5xl font-bold text-text-light-primary">404</h1>
        <p className="text-base text-text-light-secondary">
          This page is under development{" "}
        </p>
        <a href="/" className="text-base font-semibold text-primary ">
          Kembali ke beranda
        </a>
      </div>
    </div>
  );
}

export default NotFound;
