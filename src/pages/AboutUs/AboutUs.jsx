import React from "react";
import "./AboutUs.css";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import {
  FaHeart,
  FaUserMd,
  FaHandHoldingHeart,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

import aboutImage from "../../assets/cliniclogo.png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {

  const navigate = useNavigate();

  /*====================================
    BOOK APPOINTMENT NAVIGATION
    HASH ROUTER
  ====================================*/

  const handleBookAppointment = () => {

    navigate("/book-appointment");

    // Make sure appointment page opens from top
    setTimeout(() => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

    }, 100);

  };


  return (
    <>

      {/* ================================
          ABOUT PAGE
      ================================= */}

      <main className="about-page-about-us">


        {/* ================================
            HERO
        ================================= */}

        <section className="about-hero-about-us">

          <div className="about-hero-content-about-us">

            <span className="about-small-title-about-us">
              ABOUT KRISHNA ADVANCE PHYSIO CLINIC
            </span>

            <h1>
              Caring For Your
              <span> Health & Recovery</span>
            </h1>

            <p>
              At Krishna Advance Physio Clinic, we believe that every patient
              deserves personalized care, expert guidance and a comfortable
              environment to recover and live a healthier life.
            </p>

          </div>

        </section>


        {/* ================================
            INTRO SECTION
        ================================= */}

        <section className="about-intro-about-us">

          <div className="about-intro-container-about-us">


            {/* LEFT IMAGE */}

            <div className="about-image-wrapper-about-us">

              <div className="about-image-card-about-us">

                <img
                  src={aboutImage}
                  alt="Krishna Advance Physio Clinic"
                  className="about-main-image-about-us"
                />

              </div>


              <div className="about-experience-card-about-us">

                <FaHeart />

                <div>

                  <strong>
                    Patient First
                  </strong>

                  <span>
                    Care & Comfort
                  </span>

                </div>

              </div>

            </div>


            {/* RIGHT CONTENT */}

            <div className="about-content-about-us">

              <span className="about-section-label-about-us">
                WHO WE ARE
              </span>

              <h2>
                Your Recovery Is
                <span> Our Priority</span>
              </h2>

              <p>
                Krishna Advance Physio Clinic is dedicated to providing
                professional physiotherapy and rehabilitation care designed
                around the individual needs of every patient.
              </p>

              <p>
                Our approach combines expert assessment, personalized
                treatment plans and modern physiotherapy techniques to help
                patients improve mobility, reduce pain and regain confidence
                in their everyday activities.
              </p>


              {/* FEATURES */}

              <div className="about-feature-list-about-us">


                <div className="about-feature-about-us">

                  <FaCheckCircle />

                  <div>

                    <h4>
                      Personalized Treatment
                    </h4>

                    <p>
                      Treatment plans designed according to your specific
                      needs and recovery goals.
                    </p>

                  </div>

                </div>


                <div className="about-feature-about-us">

                  <FaCheckCircle />

                  <div>

                    <h4>
                      Expert Physiotherapy Care
                    </h4>

                    <p>
                      Professional guidance focused on safe and effective
                      recovery.
                    </p>

                  </div>

                </div>


                <div className="about-feature-about-us">

                  <FaCheckCircle />

                  <div>

                    <h4>
                      Patient-Centered Approach
                    </h4>

                    <p>
                      Your comfort, progress and wellbeing remain at the
                      center of our care.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================================
            WHY CHOOSE US
        ================================= */}

        <section className="about-values-about-us">

          <div className="about-values-header-about-us">

            <span className="about-section-label-about-us">
              WHY CHOOSE US
            </span>

            <h2>
              Care That Makes
              <span> A Difference</span>
            </h2>

            <p>
              We focus on creating a positive recovery experience through
              personalized attention, professional care and continuous
              support.
            </p>

          </div>


          <div className="about-values-grid-about-us">


            {/* CARD 1 */}

            <div className="about-value-card-about-us">

              <div className="about-value-icon-about-us">
                <FaUserMd />
              </div>

              <h3>
                Professional Care
              </h3>

              <p>
                Receive dedicated physiotherapy care with attention to your
                individual condition and recovery journey.
              </p>

            </div>


            {/* CARD 2 */}

            <div className="about-value-card-about-us">

              <div className="about-value-icon-about-us">
                <FaHeart />
              </div>

              <h3>
                Personalized Therapy
              </h3>

              <p>
                We create treatment approaches that are tailored to your
                needs, lifestyle and recovery objectives.
              </p>

            </div>


            {/* CARD 3 */}

            <div className="about-value-card-about-us">

              <div className="about-value-icon-about-us">
                <FaHandHoldingHeart />
              </div>

              <h3>
                Complete Support
              </h3>

              <p>
                From your first assessment to your recovery journey, we are
                committed to supporting you every step of the way.
              </p>

            </div>

          </div>

        </section>


        {/* ================================
            MISSION SECTION
        ================================= */}

        <section className="about-mission-about-us">

          <div className="about-mission-container-about-us">


            <div className="about-mission-content-about-us">

              <span className="about-section-label-about-us">
                OUR MISSION
              </span>

              <h2>
                Helping You Move
                <span> Better & Live Better</span>
              </h2>

              <p>
                Our mission is to help people overcome physical limitations,
                manage pain and improve their quality of life through
                professional physiotherapy and compassionate care.
              </p>

              <p>
                We believe recovery is not just about treating a condition.
                It is about helping every patient return to the activities
                and lifestyle they love.
              </p>


              {/*====================================
                BOOK APPOINTMENT
              ====================================*/}

              <button
                type="button"
                className="about-book-button-about-us"
                onClick={handleBookAppointment}
              >

                Book Appointment

                <FaArrowRight />

              </button>

            </div>


            <div className="about-mission-icon-box-about-us">

              <div className="about-big-heart-about-us">
                <FaHeart />
              </div>

              <h3>
                Your Health.
                <br />
                Our Commitment.
              </h3>

              <p>
                Better care. Better movement. Better recovery.
              </p>

            </div>

          </div>

        </section>


        {/* ================================
            CTA
        ================================= */}

        <section className="about-cta-about-us">

          <div className="about-cta-content-about-us">

            <span>
              READY TO START YOUR RECOVERY?
            </span>

            <h2>
              Take The First Step
              <strong> Towards Better Health</strong>
            </h2>

            <p>
              Schedule your appointment with Krishna Advance Physio Clinic
              and begin your journey towards better movement and wellbeing.
            </p>


            {/*====================================
              BOOK YOUR APPOINTMENT
            ====================================*/}

            <button
              type="button"
              className="about-cta-button-about-us"
              onClick={handleBookAppointment}
            >

              Book Your Appointment

              <FaArrowRight />

            </button>

          </div>

        </section>

      </main>

    </>
  );
};

export default AboutUs;