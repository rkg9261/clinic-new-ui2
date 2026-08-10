import React from "react";
import "./Footer.css";
import { footerData } from "./footerData";

import logo from "../../assets/logo.png";
import mapImage from "../../assets/google-map.jpg";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaLocationArrow,
  FaHeartbeat,
  FaWalking,
  FaHandsHelping
} from "react-icons/fa";

const Footer = () => {

  return (

    <footer className="footer">

      {/* Premium Background */}

<div className="footer-wave wave-left"></div>
<div className="footer-wave wave-right"></div>

<div className="footer-bubble footer-b1"></div>
<div className="footer-bubble footer-b2"></div>
<div className="footer-bubble footer-b3"></div>
<div className="footer-bubble footer-b4"></div>
<div className="footer-bubble footer-b5"></div>
<div className="footer-bubble footer-b6"></div>

      {/* Background Shapes */}

      <div className="footer-bg-circle circle-one"></div>
      <div className="footer-bg-circle circle-two"></div>

      <div className="footer-container">

        {/*================ LOGO ================*/}

        <div className="footer-column">

          <img
            src={logo}
            alt="Clinic Logo"
            className="footer-logo"
          />

          <p className="footer-description">

            {footerData.description}

          </p>

          <div className="footer-social">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaYoutube />
            </a>

            <a
              href="https://wa.me/917467067646"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>

          </div>

        </div>

        {/*================ CONTACT ================*/}

        <div className="footer-column">

          <h3>

            CONTACT INFORMATION

          </h3>

          <ul>

            <li>

              <FaPhoneAlt />

              {footerData.phone}

            </li>

            <li>

              <FaEnvelope />

              {footerData.email}

            </li>

            <li>

              <FaGlobe />

              {footerData.website}

            </li>

            <li>

              <FaMapMarkerAlt />

              {footerData.address}

            </li>

          </ul>

        </div>

        {/*================ TIMING ================*/}

        <div className="footer-column">

          <h3>

            CLINIC TIMINGS

          </h3>

          <div className="timing-box">

            <h4>

              For New Patients

            </h4>

            <p>

              Mon - Sat

            </p>

            <span>

              10:30 AM - 12:30 PM

            </span>

          </div>

          <div className="timing-box">

            <h4>

              Physiotherapy Sessions

            </h4>

            <p>

              Mon - Sat

            </p>

            <span>

              10:00 AM - 08:00 PM

            </span>

          </div>

          <small>

            Sunday : Closed

          </small>

        </div>

        {/*================ GOOGLE MAP ================*/}

        <div className="footer-column">

          <h3>

            CLINIC LOCATION

          </h3>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Krishna+Advance+Physio+Clinic+Hakikat+Nagar+Saharanpur"
            target="_blank"
            rel="noreferrer"
          >

            <img
              src={mapImage}
              alt="Clinic Map"
              className="footer-map"
            />

          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Krishna+Advance+Physio+Clinic+Hakikat+Nagar+Saharanpur"
            target="_blank"
            rel="noreferrer"
            className="direction-btn"
          >

            <FaLocationArrow />

            GET DIRECTIONS

          </a>

        </div>

      </div>

      {/*================ RED STRIP ================*/}

      <div className="footer-strip">

        <div className="strip-item">

          <FaHeartbeat />

          <span>

            Treat the Cause.

          </span>

        </div>

        <div className="strip-item">

          <FaWalking />

          <span>

            Restore Movement.

          </span>

        </div>

        <div className="strip-item">

          <FaHandsHelping />

          <span>

            Transform Lives.

          </span>

        </div>

      </div>

      {/*================ COPYRIGHT ================*/}

      <div className="footer-bottom">

        © 2026 Krishna Advance Physio Clinic.
        All Rights Reserved.

      </div>

    </footer>

  );

};

export default Footer;