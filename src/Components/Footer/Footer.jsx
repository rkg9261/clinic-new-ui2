import React from "react";
import "./Footer.css";
import { footerData } from "./footerData";

import logo from "../../assets/logofooter.png";
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

  /*====================================
    WHATSAPP MESSAGE
  ====================================*/

  const whatsappMessage =
    "Hello! I’m interested in your clinics services. Could you please help me get started and guide me through the process? Thank you.";


  /*====================================
    WHATSAPP LINK
  ====================================*/

  const whatsappLink =
    `https://wa.me/917467067466?text=${encodeURIComponent(
      whatsappMessage
    )}`;


  /*====================================
    PHONE NUMBER
    REMOVE SPACES FOR TEL LINK
  ====================================*/

  const phoneNumber =
    footerData.phone.replace(/\s+/g, "");


  /*====================================
    EMAIL LINK
  ====================================*/

  const emailLink =
    `mailto:${footerData.email}`;


  return (

    <footer className="footer">

      {/*====================================
        PREMIUM BACKGROUND
      ====================================*/}

      <div className="footer-wave wave-left"></div>

      <div className="footer-wave wave-right"></div>

      <div className="footer-bubble footer-b1"></div>

      <div className="footer-bubble footer-b2"></div>

      <div className="footer-bubble footer-b3"></div>

      <div className="footer-bubble footer-b4"></div>

      <div className="footer-bubble footer-b5"></div>

      <div className="footer-bubble footer-b6"></div>


      {/*====================================
        BACKGROUND SHAPES
      ====================================*/}

      <div className="footer-bg-circle circle-one"></div>

      <div className="footer-bg-circle circle-two"></div>


      <div className="footer-container">


        {/*====================================
          LOGO
        ====================================*/}

        <div className="footer-column">

          <img
            src={logo}
            alt="Clinic Logo"
            className="footer-logo"
          />


          <p className="footer-description">

            {footerData.description}

          </p>


          {/*====================================
            SOCIAL MEDIA
          ====================================*/}

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


            {/*====================================
              WHATSAPP
            ====================================*/}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
            >

              <FaWhatsapp />

            </a>

          </div>

        </div>


        {/*====================================
          CONTACT INFORMATION
        ====================================*/}

        <div className="footer-column">

          <h3>
            CONTACT INFORMATION
          </h3>


          <ul>

            {/*====================================
              PHONE
            ====================================*/}

            <li>

              <FaPhoneAlt />

              <a
                href={`tel:${phoneNumber}`}
                className="footer-contact-link"
                aria-label={`Call ${footerData.phone}`}
              >

                <span className="footer-phone">
                  {footerData.phone}
                </span>

              </a>

            </li>


            {/*====================================
              EMAIL
            ====================================*/}

            <li>

              <FaEnvelope />

              <a
                href={emailLink}
                className="footer-contact-link"
                aria-label={`Email ${footerData.email}`}
              >

                {footerData.email}

              </a>

            </li>


            {/*====================================
              WEBSITE
            ====================================*/}

            <li>

              <FaGlobe />

              {footerData.website}

            </li>


            {/*====================================
              ADDRESS
            ====================================*/}

            <li>

              <FaMapMarkerAlt />

              {footerData.address}

            </li>

          </ul>

        </div>


        {/*====================================
          CLINIC TIMINGS
        ====================================*/}

        <div className="footer-column">

          <h3>
            CLINIC TIMINGS
          </h3>


          <div className="timing-box">

            <h4>
              For New Patients
            </h4>

            <span>
              10:30 AM to 12:30 PM
            </span>

            <span>
              05:00 PM to 06:30 PM
            </span>

          </div>


          <div className="timing-box">

            <h4>
              Physiotherapy Sessions
            </h4>

            <span>
              10:00 AM to 01:00 PM
            </span>

            <span>
              05:00 PM to 08:00 PM
            </span>

          </div>

        </div>


        {/*====================================
          GOOGLE MAP
        ====================================*/}

        <div className="footer-column">

          <h3>
            CLINIC LOCATION
          </h3>


          <a
            href="https://www.google.com/maps/search/?api=1&query=Krishna+Advance+Physio+Clinic+Hakikat+Nagar+Saharanpur"
            target="_blank"
            rel="noopener noreferrer"
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
            rel="noopener noreferrer"
            className="direction-btn"
          >

            <FaLocationArrow />

            GET DIRECTIONS

          </a>

        </div>

      </div>


      {/*====================================
        RED STRIP
      ====================================*/}

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


      {/*====================================
        COPYRIGHT
      ====================================*/}

      <div className="footer-bottom">

        ©️ 2026 Krishna Advanced Physio Clinic.
        All Rights Reserved.

      </div>

    </footer>

  );

};

export default Footer;