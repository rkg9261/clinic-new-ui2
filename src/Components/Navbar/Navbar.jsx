import React, { useEffect, useState } from "react";
import "./Navbar.css";
import cliniclogo from "../../assets/cliniclogo.png";
import menu_icon from "../../assets/menu-icon.png";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Sticky Navbar
  useEffect(() => {

    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  // Toggle Menu
  const toggleMenu = () => {
    setMobileMenu((prev) => !prev);
  };

  // Close Menu
  const closeMenu = () => {
    setMobileMenu(false);
  };

  return (
    <>

      {/* Overlay */}

      {mobileMenu && (
        <div
          className="mobile-overlay-web-navbar"
          onClick={closeMenu}
        ></div>
      )}

      <nav
        className={`container ${
          sticky ? "dark-nav-web-navbar" : ""
        }`}
      >

        {/* Logo */}

        <img
          src={cliniclogo}
          alt="Clinic Logo"
          className="logo-web-navbar"
        />

        {/* Menu */}

        <ul
          className={
            mobileMenu
              ? "show-mobile-menu-web-navbar"
              : "hide-mobile-menu-web-navbar"
          }
        >

          <li>
            <Link
              to="hero"
              smooth={true}
              duration={500}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="facilities"
              smooth={true}
              duration={500}
              offset={-90}
              onClick={closeMenu}
            >
              Facilities
            </Link>
          </li>

          <li>
            <Link
              to="about"
              smooth={true}
              duration={500}
              offset={-90}
              onClick={closeMenu}
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              to="gallery"
              smooth={true}
              duration={500}
              offset={-90}
              onClick={closeMenu}
            >
              Clinic Photos
            </Link>
          </li>

          <li>
            <button
              className="btn-web-navbar"
              onClick={closeMenu}
            >
              BOOK APPOINTMENT
            </button>
          </li>

          <li>
            <button
              className="btn-web-navbar"
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
            >
              LOGIN
            </button>
          </li>

        </ul>

        {/* Menu Icon */}

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