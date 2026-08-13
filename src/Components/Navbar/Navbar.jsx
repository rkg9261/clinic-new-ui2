import React, { useEffect, useState } from "react";
import "./Navbar.css";

import cliniclogo from "../../assets/logo.jpg";
import menu_icon from "../../assets/menu-icon.png";

import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);


  /*====================================
    STICKY NAVBAR
  ====================================*/

  useEffect(() => {

    const handleScroll = () => {

      setSticky(window.scrollY > 50);

    };

    window.addEventListener("scroll", handleScroll);

    return () => {

      window.removeEventListener("scroll", handleScroll);

    };

  }, []);


  /*====================================
    MOBILE MENU
  ====================================*/

  const toggleMenu = () => {

    setMobileMenu((prev) => !prev);

  };


  /*====================================
    CLOSE MENU
  ====================================*/

  const closeMenu = () => {

    setMobileMenu(false);

  };


  /*====================================
    LOGO
    GO HOME + SCROLL TO TOP
  ====================================*/

  const handleLogoClick = () => {

    closeMenu();

    navigate("/");

    setTimeout(() => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

    }, 100);

  };


  /*====================================
    BOOK APPOINTMENT
  ====================================*/

  const handleBookAppointment = () => {

    closeMenu();

    navigate("/book-appointment");

  };


  /*====================================
    LOGIN
  ====================================*/

  const handleLogin = () => {

    closeMenu();

    navigate("/login");

  };


  /*====================================
    HOME CLICK
  ====================================*/

  const handleHomeClick = () => {

    closeMenu();

    navigate("/");

    setTimeout(() => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

    }, 100);

  };


  return (
    <>


      {/*====================================
        MOBILE OVERLAY
      ====================================*/}

      {mobileMenu && (

        <div
          className="mobile-overlay-web-navbar"
          onClick={closeMenu}
        ></div>

      )}


      {/*====================================
        NAVBAR
      ====================================*/}

      <nav
        className={`container ${
          sticky ? "dark-nav-web-navbar" : ""
        } ${
          mobileMenu
            ? "mobile-navbar-open-web-navbar"
            : ""
        }`}
      >


        {/*====================================
          LOGO
        ====================================*/}

        <img
          src={cliniclogo}
          alt="Clinic Logo"
          className="logo-web-navbar"
          onClick={handleLogoClick}
        />


        {/*====================================
          MENU
        ====================================*/}

        <ul
          className={
            mobileMenu
              ? "show-mobile-menu-web-navbar"
              : "hide-mobile-menu-web-navbar"
          }
        >


          {/*====================================
            MOBILE CLOSE BUTTON
          ====================================*/}

          {mobileMenu && (

            <button
              type="button"
              className="mobile-close-btn-web-navbar"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>

          )}


          {/*====================================
            HOME
          ====================================*/}

          <li>

            <button
              type="button"
              className="simple-nav-link"
              onClick={handleHomeClick}
            >
              Home
            </button>

          </li>


          {/*====================================
            FACILITIES
          ====================================*/}

          <li>

            <ScrollLink
              to="facilities"
              smooth={true}
              duration={500}
              offset={-90}
              onClick={closeMenu}
            >
              Facilities
            </ScrollLink>

          </li>


          {/*====================================
            ABOUT US
          ====================================*/}

          <li>

            <button
              type="button"
              className="simple-nav-link"
              onClick={() => {

                closeMenu();

                navigate("/about-us");

              }}
            >
              About Us
            </button>

          </li>


          {/*====================================
            CLINIC PHOTOS
          ====================================*/}

          <li>

            <ScrollLink
              to="gallery"
              smooth={true}
              duration={500}
              offset={-90}
              onClick={closeMenu}
            >
              Clinic Photos
            </ScrollLink>

          </li>


          {/*====================================
            BOOK APPOINTMENT
          ====================================*/}

          <li>

            <button
              type="button"
              className="btn-web-navbar"
              onClick={handleBookAppointment}
            >
              BOOK APPOINTMENT
            </button>

          </li>


          {/*====================================
            LOGIN
          ====================================*/}

          <li>

            <button
              type="button"
              className="btn-web-navbar"
              onClick={handleLogin}
            >
              LOGIN
            </button>

          </li>


        </ul>


        {/*====================================
          MOBILE MENU ICON
        ====================================*/}

        <img
          src={menu_icon}
          alt="Menu"
          className="menu-icon-web-navbar"
          onClick={toggleMenu}
        />


      </nav>


    </>
  );

};


export default Navbar;