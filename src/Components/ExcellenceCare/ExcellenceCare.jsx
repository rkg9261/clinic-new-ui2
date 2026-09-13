import React, { useEffect, useRef, useState } from "react";
import "./ExcellenceCare.css";

import {
  FaPlay,
  FaCircle,
} from "react-icons/fa";

import image1 from "../../assets/excellence1.jpeg"
import image2 from "../../assets/excellence2.jpeg"
export default function ExcellenceCare() {

  const sectionRef = useRef(null);

  const [animate, setAnimate] = useState(false);

  const [careWidth, setCareWidth] = useState(0);
  const [honestWidth, setHonestWidth] = useState(0);
  const [experienceWidth, setExperienceWidth] = useState(0);

  useEffect(() => {

    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {

          setAnimate(true);

          let care = 0;
          let honest = 0;
          let experience = 0;

          const interval = setInterval(() => {

            if (care < 93) care++;
            if (honest < 95) honest++;
            if (experience < 96) experience++;

            setCareWidth(care);
            setHonestWidth(honest);
            setExperienceWidth(experience);

            if (
              care >= 93 &&
              honest >= 95 &&
              experience >= 96
            ) {
              clearInterval(interval);
            }

          }, 20);

        }

      },

      {
        threshold: 0.35,
      }

    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {

      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }

    };

  }, []);

  return (

    <section
      className="excellence-care-section"
      ref={sectionRef}
    >

      <div className="excellence-care-container">

        {/*==============================
            LEFT SIDE
        ==============================*/}

        <div className="excellence-left">

          <div
            className={`excellence-image-left ${
              animate ? "left-show" : ""
            }`}
          >

            <img
              src={image1}
              alt=""
            />

          </div>

          <div
            className={`excellence-image-right ${
              animate ? "right-show" : ""
            }`}
          >

            <img
              src={image2}
              alt=""
            />

          </div>

          {/*==============================
              PLAY BADGE
          ==============================*/}

          <div className="play-circle">

            <div className="play-ring">

              <FaPlay />

            </div>

          </div>

          {/*==============================
             CONTINUOUS BRAND SLIDER
          ==============================*/}

          <div className="brand-slider">

            <div className="brand-track">

              <span>TTA ACADEMIA</span>
              <span>BOGONIA</span>
              <span>DXST</span>
              <span>PRADA</span>
              <span>PHYSIO CARE</span>
              <span>ADVANCE THERAPY</span>

              <span>TTA ACADEMIA</span>
              <span>BOGONIA</span>
              <span>DXST</span>
              <span>PRADA</span>
              <span>PHYSIO CARE</span>
              <span>ADVANCE THERAPY</span>

            </div>

          </div>

        </div>

        {/*==============================
            RIGHT SIDE
        ==============================*/}

        <div
          className={`excellence-right ${
            animate ? "content-show" : ""
          }`}
        >

          <div className="small-title">

            <div className="title-line"></div>

            <FaCircle className="title-dot" />

            <span>EXCELLENCE IN CARE</span>

          </div>

          <h2>

            Why Our

            <span>Physiotherapy Clinic</span>

            Stands Out

          </h2>

          <p>

            We're committed to delivering more than just care.
            Every patient receives personalized treatment,
            expert attention and advanced rehabilitation
            techniques for faster recovery.

          </p>

          {/* ==========================
              PROGRESS BAR 1
          ========================== */}

          <div className="progress-item">

            <div className="progress-header">

              <h4>Care & Patience</h4>

              <span>{careWidth}%</span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${careWidth}%`,
                }}
              >

                <div className="progress-dot"></div>

              </div>

            </div>

          </div>

          {/* ==========================
              PROGRESS BAR 2
          ========================== */}

          <div className="progress-item">

            <div className="progress-header">

              <h4>Honest Conversation</h4>

              <span>{honestWidth}%</span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${honestWidth}%`,
                }}
              >

                <div className="progress-dot"></div>

              </div>

            </div>

          </div>

          {/* ==========================
              PROGRESS BAR 3
          ========================== */}

          <div className="progress-item">

            <div className="progress-header">

              <h4>Specialized Experience</h4>

              <span>{experienceWidth}%</span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${experienceWidth}%`,
                }}
              >

                <div className="progress-dot"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}