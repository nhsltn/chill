import React from "react";
import { Link } from "react-router-dom";
import ChillLogo from "/assets/images/logo-chill.png";
import FooterDropdown from "./FooterDropdown";
import { genreLinks, helpLinks } from "../../data/links";

function Footer() {
  const renderLinks = (links) =>
    links.map((link) => (
      <Link
        key={link.href}
        to={link.href}
        className="text-text-light-secondary hover:text-white"
      >
        {link.label}
      </Link>
    ));

  const genreLinksDesktop = (
    <div className="genre-list flex flex-row gap-7">
      {[0, 4, 8, 12].map((start) => (
        <div key={start} className="flex flex-col gap-3.25">
          {renderLinks(genreLinks.slice(start, start + 4))}
        </div>
      ))}
    </div>
  );

  const genreLinksMobile = (
    <div className="genre-list grid grid-cols-2 gap-x-7">
      {[0, 4, 8, 12].map((start) => (
        <div
          key={start}
          className={`flex flex-col gap-3.25 ${start >= 8 ? "mt-3.25" : ""}`}
        >
          {renderLinks(genreLinks.slice(start, start + 4))}
        </div>
      ))}
    </div>
  );

  const helpLinksJSX = (
    <div className="help-section flex flex-col gap-3.25">
      {renderLinks(helpLinks)}
    </div>
  );

  return (
    <footer className="footer bg-page-header-bg w-full border-t border-outline-border p-5 lg:py-15 lg:px-20 font-poppins text-text-light-secondary text-xs lg:text-base font-medium">
      <div className="footer-content flex justify-center lg:justify-between flex-col lg:flex-row xs:gap-10">
        <div className="footer-logo flex flex-col gap-6.5">
          <img
            src={ChillLogo}
            className="w-21 h-[24.75px] lg:h-11 lg:w-41"
            alt="Chill Logo"
          />
          <p>@2023 Chill All Rights Reserved.</p>
        </div>

        {/* Desktop */}
        <div className="footer-nav hidden lg:flex gap-40">
          <div className="footer-nav-genre flex flex-col gap-3.75">
            <p className="text-base text-white font-bold">Genre</p>
            {genreLinksDesktop}
          </div>
          <div className="footer-nav-help flex flex-col gap-3.75">
            <p className="text-base text-white font-bold">Bantuan</p>
            {helpLinksJSX}
          </div>
        </div>

        {/* Mobile */}
        <div className="footer-nav-mobile flex md:hidden flex-col w-full mt-6">
          <FooterDropdown title="Genre">{genreLinksMobile}</FooterDropdown>
          <FooterDropdown title="Bantuan">{helpLinksJSX}</FooterDropdown>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
