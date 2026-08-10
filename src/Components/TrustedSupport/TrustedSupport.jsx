import React, { useEffect, useRef, useState } from "react";
import "./TrustedSupport.css";

import {
  FaArrowRight,
  FaCircle,
} from "react-icons/fa";

import support1 from "../../assets/support1.jpg";
import support2 from "../../assets/support2.jpeg"
import support3 from '../../assets/support3.jpeg'

export default function TrustedSupport() {

  const sectionRef = useRef(null);

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {

    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {
          setShowAnimation(true);
        }

      },

      {
        threshold: 0.25,
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
      className="trusted-support-section"
      ref={sectionRef}
    >

      <div className="trusted-support-wrapper">

        {/*=========================
            LEFT SIDE
        ==========================*/}

        <div className="trusted-support-images">

          {/* Large Image */}

          <div
            className={`support-big-image ${
              showAnimation ? "big-image-active" : ""
            }`}
          >

            <img
              src={support1}
              alt="Physiotherapy"
            />

          </div>

          {/* Circle */}

          <div className="support-circle">

            <h1>18+</h1>

            <span>
              YEARS OF
              <br />
              EXPERTISE
            </span>

          </div>

          {/* Right Images */}

          <div className="support-small-images">

            <div
              className={`support-image-top ${
                showAnimation ? "top-image-active" : ""
              }`}
            >

              <img
                src={support2}
                alt=""
              />

            </div>

            <div
              className={`support-image-bottom ${
                showAnimation ? "bottom-image-active" : ""
              }`}
            >

              <img
                src={support3}
                alt=""
              />

            </div>

          </div>

        </div>

        {/*=========================
            RIGHT CONTENT
        ==========================*/}

        <div
          className={`trusted-support-content ${
            showAnimation ? "content-active" : ""
          }`}
        >

          <div className="trusted-support-title">

            <div className="title-line"></div>

            <FaCircle className="title-dot" />

            <span>
              OUR TRUSTED SUPPORT
            </span>

          </div>

          <h2>

            Passionate About Providing

            <span>
              Expert Care
            </span>

            And Support

          </h2>

          <p>

            Behind every successful recovery is a physiotherapist's
            passion for care, relentless support, and expert guidance.

            We believe healing is more than treatment—it's about
            understanding every patient's journey and helping them
            regain confidence, mobility, and strength.

          </p>

          <p>

            Our dedicated physiotherapy team combines modern
            techniques with compassionate care to deliver
            personalized rehabilitation programs that truly
            transform lives and improve overall well-being.

          </p>

         

        </div>

      </div>

    </section>

  );
}