import "./Hero.css";
import { useNavigate } from "react-router-dom";

import heroBg from "../../assets/hero-bg.avif";
import spineMan from "../../assets/spine-man1.png";
import spine1 from "../../assets/spine1.jpg";
import spine2 from "../../assets/spine2.jpeg";
import spine3 from "../../assets/spine3.jpeg";

import {
  FaUserMd,
  FaHeartbeat,
  FaCheckCircle,
  FaLaptopMedical,
  FaWhatsapp
} from "react-icons/fa";


const Hero = () => {

  const navigate = useNavigate();


  /*====================================
    WHATSAPP MESSAGE
  ====================================*/

  const whatsappMessage =
    "Hello! I’m interested in your clinic's services. Could you please help me get started and guide me through the process? Thank you.";


  /*====================================
    WHATSAPP LINK
  ====================================*/

  const whatsappLink =
    `https://wa.me/917467067466?text=${encodeURIComponent(
      whatsappMessage
    )}`;


  return (

    <section
      className="hero"
      id="hero"
      style={{
        backgroundImage: `url(${heroBg})`
      }}
    >

      <div className="hero-overlay">


        {/*====================================
          LEFT CONTENT
        ====================================*/}

        <div className="hero-left">

          <h1>

            <span>
              MOVE BETTER.
            </span>

            <br />

            <strong>
              LIVE PAIN FREE.
            </strong>

          </h1>


          <p>
            Advanced Non-Surgical Treatment
            for Spine Issues & Sports Injuries
          </p>


          {/*====================================
            FEATURES
          ====================================*/}

          <div className="hero-features">


            <div className="feature">

              <FaUserMd />

              <div>

                <h4>
                  Expert Care
                </h4>

                <p>
                  Experienced Doctors
                </p>

              </div>

            </div>


            <div className="feature">

              <FaLaptopMedical />

              <div>

                <h4> Advanced Technology</h4>

                <p> Modern Equipment  </p>
                 
              

              </div>

            </div>


            <div className="feature">

              <FaHeartbeat />

              <div>

                <h4> Personalized Therapy</h4>
                <p>Fast Recovery</p>

              </div>

            </div>


            <div className="feature">

              <FaCheckCircle />

              <div>

                <h4>Proven Results</h4>
                <p>Pain Relief</p>
                  
              </div>

            </div>


          </div>


          {/*====================================
            BUTTONS
          ====================================*/}

          <div className="hero-buttons">


            {/* BOOK APPOINTMENT */}

            <button
              type="button"
              className="appointment-btn"
              onClick={() => navigate("/book-appointment")}
            >

              BOOK APPOINTMENT

            </button>


            {/* WHATSAPP */}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
              aria-label="Chat with us on WhatsApp"
            >

              <FaWhatsapp className="whatsapp-icon" />

              <span>
                Chat on WhatsApp
              </span>

            </a>


          </div>

        </div>


        {/*====================================
          RIGHT IMAGE
        ====================================*/}

        <div className="hero-right">

          <img
            src={spineMan}
            className="main-image"
            alt="Physiotherapy treatment"
          />


          {/* OPTIONAL CIRCLE IMAGES */}

          {/*

          <div className="circle-img top">

            <img
              src={spine1}
              alt=""
            />

          </div>


          <div className="circle-img middle">

            <img
              src={spine2}
              alt=""
            />

          </div>


          <div className="circle-img bottom">

            <img
              src={spine3}
              alt=""
            />

          </div>

          */}

        </div>

      </div>

    </section>

  );

};


export default Hero;