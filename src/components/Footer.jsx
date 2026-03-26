import React from "react";
import ChillLogo from "/assets/images/logo-chill.png";
import FooterDropdown from "./FooterDropdown";

function Footer() {
  const genreLinksDesktop = (
    <div className="genre-list flex flex-row gap-7">
      <div className="genre-1 flex flex-col gap-3.25">
        <a
          href="/genre/action"
          className="text-text-light-secondary hover:text-white"
        >
          Aksi
        </a>
        <a
          href="/genre/children"
          className="text-text-light-secondary hover:text-white"
        >
          Anak-anak
        </a>

        <a
          href="/genre/anime"
          className="text-text-light-secondary hover:text-white"
        >
          Anime
        </a>

        <a
          href="/genre/britain"
          className="text-text-light-secondary hover:text-white"
        >
          Britania
        </a>
      </div>
      <div className="genre-2 flex flex-col gap-3.25">
        <a
          href="/genre/drama"
          className="text-text-light-secondary hover:text-white"
        >
          Drama
        </a>
        <a
          href="/genre/fiction"
          className="text-text-light-secondary hover:text-white"
        >
          Fantasi Ilmiah & Fantasi
        </a>

        <a
          href="/genre/crime"
          className="text-text-light-secondary hover:text-white"
        >
          Kejahatan
        </a>

        <a
          href="/genre/kdrama"
          className="text-text-light-secondary hover:text-white"
        >
          KDrama
        </a>
      </div>
      <div className="genre-3 flex flex-col gap-3.25">
        <a
          href="/genre/comedy"
          className="text-text-light-secondary hover:text-white"
        >
          Komedi
        </a>
        <a
          href="/genre/adventure"
          className="text-text-light-secondary hover:text-white"
        >
          Petualangan
        </a>

        <a
          href="/genre/war"
          className="text-text-light-secondary hover:text-white"
        >
          Perang
        </a>

        <a
          href="/genre/romance"
          className="text-text-light-secondary hover:text-white"
        >
          Romantis
        </a>
      </div>
      <div className="genre-3 flex flex-col gap-3.25">
        <a
          href="/genre/science"
          className="text-text-light-secondary hover:text-white"
        >
          Sains & Alam
        </a>
        <a
          href="/genre/thriller"
          className="text-text-light-secondary hover:text-white"
        >
          Thiriller
        </a>
      </div>
    </div>
  );

  const genreLinksMobile = (
    <div className="genre-list grid grid-cols-2 gap-x-7">
      <div className="genre-1 flex flex-col gap-3.25">
        <a
          href="/genre/action"
          className="text-text-light-secondary hover:text-white"
        >
          Aksi
        </a>
        <a
          href="/genre/children"
          className="text-text-light-secondary hover:text-white"
        >
          Anak-anak
        </a>
        <a
          href="/genre/anime"
          className="text-text-light-secondary hover:text-white"
        >
          Anime
        </a>
        <a
          href="/genre/britain"
          className="text-text-light-secondary hover:text-white"
        >
          Britania
        </a>
      </div>
      <div className="genre-2 flex flex-col gap-3.25">
        <a
          href="/genre/drama"
          className="text-text-light-secondary hover:text-white"
        >
          Drama
        </a>
        <a
          href="/genre/fiction"
          className="text-text-light-secondary hover:text-white"
        >
          Fantasi Ilmiah & Fantasi
        </a>
        <a
          href="/genre/crime"
          className="text-text-light-secondary hover:text-white"
        >
          Kejahatan
        </a>
        <a
          href="/genre/kdrama"
          className="text-text-light-secondary hover:text-white"
        >
          KDrama
        </a>
      </div>
      <div className="genre-3 flex flex-col gap-3.25 mt-3.25">
        <a
          href="/genre/comedy"
          className="text-text-light-secondary hover:text-white"
        >
          Komedi
        </a>
        <a
          href="/genre/adventure"
          className="text-text-light-secondary hover:text-white"
        >
          Petualangan
        </a>
        <a
          href="/genre/war"
          className="text-text-light-secondary hover:text-white"
        >
          Perang
        </a>
        <a
          href="/genre/romance"
          className="text-text-light-secondary hover:text-white"
        >
          Romantis
        </a>
      </div>
      <div className="genre-4 flex flex-col gap-3.25 mt-3.25">
        <a
          href="/genre/science"
          className="text-text-light-secondary hover:text-white"
        >
          Sains & Alam
        </a>
        <a
          href="/genre/thriller"
          className="text-text-light-secondary hover:text-white"
        >
          Thriller
        </a>
      </div>
    </div>
  );

  const helpLinks = (
    <div className="help-section flex flex-col gap-3.25">
      <a href="/faq" className="text-text-light-secondary hover:text-white">
        FAQ
      </a>
      <a
        href="/contact-us"
        className="text-text-light-secondary hover:text-white"
      >
        Kontak Kami
      </a>
      <a href="/privacy" className="text-text-light-secondary hover:text-white">
        Privasi
      </a>
      <a
        href="/terms&conditions"
        className="text-text-light-secondary hover:text-white"
      >
        Syarat & Ketentuan
      </a>
    </div>
  );
  return (
    <footer className="footer bg-page-header-bg w-full bt-1 border-outline-border p-5 lg:py-15 lg:px-20 font-poppins text-text-light-secondary text-xs lg:text-base font-medium">
      <div className="footer-content flex justify-center lg:justify-between flex-col lg:flex-row xs:gap-10">
        <div className="footer-logo flex flex-col gap-6.5">
          <img
            src={ChillLogo}
            className="w-21 h-[24.75px] lg:h-11 lg:w-41"
            alt="Chill Logo"
          />
          <p>@2023 Chill All Rights Reserved.</p>
        </div>
        {/* Desktop - hidden di mobile */}

        <div className="footer-nav hidden lg:flex gap-40">
          <div className="footer-nav-genre flex flex-col gap-3.75">
            <p className="text-base text-white font-bold">Genre</p>
            {genreLinksDesktop}
          </div>
          <div className="footer-nav-help flex flex-col gap-3.75">
            <p className="text-base text-white font-bold">Bantuan</p>
            {helpLinks}
          </div>
        </div>

        {/* Mobile - hidden di desktop */}
        <div className="footer-nav-mobile flex md:hidden flex-col w-full mt-6">
          <FooterDropdown title="Genre">{genreLinksMobile}</FooterDropdown>
          <FooterDropdown title="Bantuan">{helpLinks}</FooterDropdown>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
