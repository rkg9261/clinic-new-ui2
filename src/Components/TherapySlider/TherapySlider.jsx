import React from "react";
import "./TherapySlider.css";

import { FaStarOfLife } from "react-icons/fa";

export default function TherapySlider() {

  const therapies = [

    "Brain And Nerve Therapy",

    "Sports Injury Therapy",

    "Joint Care Therapy",

    "Neurological Rehabilitation",

    "Bone And Muscle Therapy",

  ];

  return (

    <section className="therapy-slider-section-therapy-slider">

      <div className="therapy-slider-wrapper-therapy-slider">

        <div className="therapy-slider-track-therapy-slider">

          {[...therapies, ...therapies].map((therapy, index) => (

            <React.Fragment key={index}>

              <div className="therapy-slider-item-therapy-slider">

                <span className="therapy-slider-text-therapy-slider">

                  {therapy}

                </span>

              </div>

              <div className="therapy-slider-star-box-therapy-slider">

                <FaStarOfLife className="therapy-slider-star-therapy-slider" />

              </div>

            </React.Fragment>

          ))}

        </div>

      </div>

    </section>

  );

}