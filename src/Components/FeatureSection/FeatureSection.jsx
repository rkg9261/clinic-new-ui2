import React from "react";
import "./FeatureSection.css";

import clinicIcon from "../../assets/clinics.svg";
import homeIcon from "../../assets/home.svg";
import teleIcon from "../../assets/remotesessions.svg";

const FeatureSection = () => {
  const features = [
    {
      icon: clinicIcon,
      title: "Advanced Clinics",
      description:
        "Modern Infrastructure, Latest Technology & Top Physiotherapy Experts",
    },
    {
      icon: homeIcon,
      title: "Professional Home Care",
      description:
        "Physiotherapy at home with expert oversight & Strong quality checks",
    },
    {
      icon: teleIcon,
      title: "Tele / Remote Rehab",
      description:
        "Personalized Physio exercises at home with Continuous guidance & mentoring",
    },
  ];

  return (
    <div className="features-web">
      {features.map((item, index) => (
        <div className="feature-card-web" key={index}>
          <div className="icon-box-web">
            <img src={item.icon} alt={item.title} />
          </div>

          <div className="content-web">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;