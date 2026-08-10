import React, { useEffect, useRef, useState } from "react";
import "./WhatWeDo.css";

import {
  FaClipboardCheck,
  FaBullhorn,
  FaHandsHelping,
  FaRegCalendarAlt,
} from "react-icons/fa";

export default function WhatWeDo() {
  const sectionRef = useRef(null);

  const [activeTab, setActiveTab] = useState("do");
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCards(true);
        }
      },
      {
        threshold: 0.25,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const whatWeDo = [
    {
      id: 1,
      icon: <FaClipboardCheck />,
      title: "In-Depth Evaluation",
      desc:
        "We thoroughly assess every patient through physical examination, movement analysis and detailed consultation to understand the exact cause of pain.",
    },

    {
      id: 2,
      icon: <FaBullhorn />,
      title: "Transparent Guidance",
      desc:
        "Every treatment is clearly explained before it begins, helping patients understand the process, expected outcomes and recovery timeline.",
    },

    {
      id: 3,
      icon: <FaHandsHelping />,
      title: "Compassion & Care",
      desc:
        "We provide patient-centered care with empathy, encouragement and continuous support throughout the rehabilitation journey.",
    },

    {
      id: 4,
      icon: <FaRegCalendarAlt />,
      title: "Detailed Records",
      desc:
        "Each visit is documented carefully so your progress can be tracked accurately and treatment can be improved whenever required.",
    },
  ];

  const whatWeAreNot = [
    {
      id: 1,
      icon: <FaClipboardCheck />,
      title: "Quick Guesswork",
      desc:
        "We never start treatment without proper assessment or understanding your medical condition.",
    },

    {
      id: 2,
      icon: <FaBullhorn />,
      title: "Hidden Information",
      desc:
        "No confusing medical language or hidden treatment plans. We keep everything transparent.",
    },

    {
      id: 3,
      icon: <FaHandsHelping />,
      title: "One Size Fits All",
      desc:
        "Every patient receives a customized rehabilitation plan instead of generic exercises.",
    },

    {
      id: 4,
      icon: <FaRegCalendarAlt />,
      title: "Poor Follow-up",
      desc:
        "We continuously monitor your recovery instead of stopping after a single session.",
    },
  ];

  const cards =
    activeTab === "do"
      ? whatWeDo
      : whatWeAreNot;

  return (
    <section
      className="what-section-we-do"
      ref={sectionRef}
    >
      <div className="container-we-do">

        <span className="tag-we-do">
          GUIDED BY PROVEN METHODS
        </span>

        <h2 className="heading-we-do">
          Intentional
          <span> Physiotherapy </span>
          Practicing What Heals,
          <span> Avoiding What Harms</span>
        </h2>

        <div className="toggle-we-do">

          <button
            className={
              activeTab === "do"
                ? "active-we-do"
                : ""
            }
            onClick={() =>
              setActiveTab("do")
            }
          >
            What We Do
          </button>

          <button
            className={
              activeTab === "not"
                ? "active-we-do"
                : ""
            }
            onClick={() =>
              setActiveTab("not")
            }
          >
            What We Are Not
          </button>

        </div>

        <div
          className={`grid-wrapper-we-do ${
            showCards
              ? "show-we-do"
              : ""
          }`}
        >



  {/* Top Left */}
          <div className="card-we-do top-left-we-do">
            <div className="card-inner-we-do">
              <div className="icon-we-do">
                {cards[0].icon}
              </div>

              <h3>{cards[0].title}</h3>

              <p>{cards[0].desc}</p>
            </div>

            <div className="shadow-layer-we-do"></div>
          </div>

          {/* Top Right */}
          <div className="card-we-do top-right-we-do">
            <div className="card-inner-we-do">
              <div className="icon-we-do">
                {cards[1].icon}
              </div>

              <h3>{cards[1].title}</h3>

              <p>{cards[1].desc}</p>
            </div>

            <div className="shadow-layer-we-do"></div>
          </div>

          {/* Center Circle */}
          <div className="center-box-we-do">

            <div className="center-square-we-do">

              <div className="center-circle-we-do">
                {activeTab === "do"
                  ? "What We Do"
                  : "What We Are Not"}
              </div>

            </div>

          </div>

          {/* Bottom Left */}
          <div className="card-we-do bottom-left-we-do">
            <div className="card-inner-we-do">
              <div className="icon-we-do">
                {cards[2].icon}
              </div>

              <h3>{cards[2].title}</h3>

              <p>{cards[2].desc}</p>
            </div>

            <div className="shadow-layer-we-do"></div>
          </div>

          {/* Bottom Right */}
          <div className="card-we-do bottom-right-we-do">
            <div className="card-inner-we-do">
              <div className="icon-we-do">
                {cards[3].icon}
              </div>

              <h3>{cards[3].title}</h3>

              <p>{cards[3].desc}</p>
            </div>

            <div className="shadow-layer-we-do"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
        