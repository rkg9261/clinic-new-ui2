import React from "react";
import "./WhyChooseUs.css";

import {
  FaUserMd,
  FaHeartbeat,
  FaHandHoldingMedical,
  FaBullseye,
  FaChild,
} from "react-icons/fa";

import centerLogo from "../../assets/center-logo.png";

const features = [
  {
    id: 1,
    number: "20+",
    title: "Certified Experts",
    icon: <FaUserMd />,
    text: "Certified physiotherapists deliver personalized, evidence-based treatments.",
    position: "left-top",
  },

  {
    id: 2,
    number: "98%",
    title: "Individualized Care",
    icon: <FaHandHoldingMedical />,
    text: "Individualized care delivers treatment tailored to each patient's unique needs.",
    position: "right-top",
  },

  {
    id: 3,
    number: "87%",
    title: "High-End Technology",
    icon: <FaHeartbeat />,
    text: "We use advanced technology for faster, effective and precise physiotherapy.",
    position: "left-bottom",
  },

  {
    id: 4,
    number: "60+",
    title: "Therapy Accuracy",
    icon: <FaBullseye />,
    text: "Therapy accuracy ensures precise, effective and targeted treatment.",
    position: "right-bottom",
  },

  {
    id: 5,
    number: "100%",
    title: "Patient Fulfillment",
    icon: <FaChild />,
    text: "Patient fulfillment reflects our commitment to personalized outcome-driven care.",
    position: "bottom-center",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">

      <div className="why-heading">

        <span className="heading-small">
          TOTAL WELLNESS SUPPORT
        </span>

        <h2>
          Holistic Approach Addresses
          <br />
          <span>Mind And Body.</span>
        </h2>

      </div>

      <div className="why-container">

        {/* Left Side */}

        <div className="why-column">

          {features
            .filter(
              (item) =>
                item.position === "left-top" ||
                item.position === "left-bottom"
            )
            .map((item) => (
              <div className="feature-card" key={item.id}>

                <div className="feature-top">

                  <div className="icon-circle">
                    {item.icon}
                  </div>

                  <h3>{item.number}</h3>

                </div>

                <h4>{item.title}</h4>

                <p>{item.text}</p>

              </div>
            ))}
        </div>

        {/* Center */}

        <div className="center-area">

          <div className="circle one"></div>
          <div className="circle two"></div>
          <div className="circle three"></div>

          <img
            src={centerLogo}
            alt="Center Logo"
            className="center-logo"
          />

          <div className="bottom-card">

            <div className="feature-top">

              <div className="icon-circle">
                <FaChild />
              </div>

              <h3>100%</h3>

            </div>

            <h4>Patient Fulfillment</h4>

            <p>
              Patient fulfillment reflects our commitment
              to personalized outcome-driven care.
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="why-column">

          {features
            .filter(
              (item) =>
                item.position === "right-top" ||
                item.position === "right-bottom"
            )
            .map((item) => (
              <div className="feature-card" key={item.id}>

                <div className="feature-top">

                  <h3>{item.number}</h3>

                  <div className="icon-circle">
                    {item.icon}
                  </div>

                </div>

                <h4>{item.title}</h4>

                <p>{item.text}</p>

              </div>
            ))}
        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;