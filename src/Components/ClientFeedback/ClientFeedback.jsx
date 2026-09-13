import React, { useEffect, useMemo, useState } from "react";
import "./ClientFeedback.css";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCircle,
  FaStar,
} from "react-icons/fa";

import feedbackImage from "../../assets/client-feedback-2.jpg"

export default function ClientFeedback() {

  const feedbackData = useMemo(
    () => [
      {
        name: "Varun Sharma",
        role: "Sports Recovery",
        feedback:
          "I worried I'd never return to sports after my injury. The therapy sessions, expert guidance and constant encouragement completely transformed my recovery. Today I'm back on the basketball court stronger and more confident than ever.",
      },
      {
        name: "Mohit Patel",
        role: "Back Pain Recovery",
        feedback:
          "For years I struggled with severe lower back pain. After only a few weeks of personalized physiotherapy, I noticed incredible improvement. The team was supportive, knowledgeable and genuinely cared about my progress.",
      },
      {
        name: "Vidhi",
        role: "Post Surgery Care",
        feedback:
          "Every session was carefully planned according to my recovery stage. The therapists motivated me throughout the process and helped me regain mobility much faster than I expected.",
      },
      {
        name: "Ansh Vashistha",
        role: "Neck & Shoulder Care",
        feedback:
          "Professional treatment, friendly staff and modern equipment made every visit comfortable. My neck pain has almost disappeared and I can work for long hours without discomfort.",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const section = document.querySelector(
      ".client-feedback-section-feedback"
    );

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();

  }, []);

  const nextFeedback = () => {

    setAnimate(false);

    setTimeout(() => {

      setActiveIndex((prev) =>
        prev === feedbackData.length - 1 ? 0 : prev + 1
      );

      setAnimate(true);

    }, 120);

  };

  const previousFeedback = () => {

    setAnimate(false);

    setTimeout(() => {

      setActiveIndex((prev) =>
        prev === 0 ? feedbackData.length - 1 : prev - 1
      );

      setAnimate(true);

    }, 120);

  };

  useEffect(() => {

    setAnimate(true);

  }, []);

  return (

    <section className="client-feedback-section-feedback">

      <div className="client-feedback-overlay-feedback"></div>

      <div className="client-feedback-container-feedback">

        {/*==========================
             LEFT IMAGE
        ==========================*/}

        <div className="client-feedback-left-feedback">

          <img
            src={feedbackImage}
            alt="Client Feedback"
          />

        </div>

        {/*==========================
             RIGHT CONTENT
        ==========================*/}

        <div className="client-feedback-right-feedback">

          <div
            className={`client-feedback-heading-wrapper-feedback ${
              visible
                ? "client-feedback-show-feedback"
                : ""
            }`}
          >

            <div className="client-feedback-top-feedback">

              <div className="client-feedback-line-feedback"></div>

              <FaCircle className="client-feedback-dot-feedback" />

              <span>

                CLIENT FEEDBACK

              </span>

            </div>

            <h2>

              Hear Our Clients
              <span> Share True </span>

              <br />

              Stories Of Health
              <span> And Healing</span>

            </h2>

          </div>

          <div
            className={`client-feedback-content-feedback ${
              animate
                ? "client-feedback-up-feedback"
                : ""
            }`}
          >

            <p>

              {feedbackData[activeIndex].feedback}

            </p>

            <div className="client-feedback-stars-feedback">

              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

            </div>

            <div className="client-feedback-person-feedback">

              <h3>

                {feedbackData[activeIndex].name}

              </h3>

              <h5>

                {feedbackData[activeIndex].role}

              </h5>

            </div>
            <div className="client-feedback-navigation-feedback">

              <button
                className="client-feedback-arrow-feedback"
                onClick={previousFeedback}
                aria-label="Previous Feedback"
              >
                <FaArrowLeft />
              </button>

              <button
                className="client-feedback-arrow-feedback"
                onClick={nextFeedback}
                aria-label="Next Feedback"
              >
                <FaArrowRight />
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}