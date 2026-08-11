import React, { useState } from "react";
import "./Therapy.css";
import { therapyData } from "./therapyData";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaCog,
  FaArrowRight,
  FaTimes
} from "react-icons/fa";

const Therapy = () => {

  const navigate = useNavigate();

  const [showAll, setShowAll] = useState(false);

  const [selectedTherapy, setSelectedTherapy] = useState(null);

  const visibleTherapies = showAll
    ? therapyData
    : therapyData.slice(0, 6);

  return (

    <section className="therapy-section">

      {/* Heading */}

      <div className="therapy-heading">

        <p className="therapy-subtitle">
          ADVANCED MODALITIES AVAILABLE
        </p>

        <h2 className="therapy-title">
          Healing Through Advanced Technology
        </h2>

      </div>

      {/* Cards */}

      <div
    className={`therapy-grid ${
        showAll ? "therapy-grid-open" : ""
    }`}
>

        {visibleTherapies.map((item) => (

          <div
            key={item.id}
            className="therapy-card"
            onClick={() => setSelectedTherapy(item)}
          >
        
         <span className="therapy-ripple"></span>

            <div className="therapy-image-box">

              <img
                src={item.icon}
                alt={item.name}
                className="therapy-icon"
              />

            </div>

            <h3>{item.name}</h3>

            <p>{item.shortName}</p>

          </div>

        ))}

      </div>

      {/* Explore */}

      <div className="therapy-btn-area">

        <button
          className="therapy-btn"
          onClick={() => setShowAll(!showAll)}
        >

          {showAll
            ? "SHOW LESS"
            : "EXPLORE ALL THERAPIES"}

        </button>

      </div>

      {/* Popup */}

      {selectedTherapy && (

        <div
          className="therapy-popup-overlay"
          onClick={() => setSelectedTherapy(null)}
        >

          <div
            className="therapy-popup"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="therapy-close"
              onClick={() => setSelectedTherapy(null)}
            >
              <FaTimes />
            </button>

            <div className="therapy-popup-left">

              <span className="therapy-tag">
                ADVANCED THERAPY MODALITY
              </span>

              <h1>
                {selectedTherapy.name}
              </h1>

              <h3>
                {selectedTherapy.shortName}
              </h3>

              <div className="therapy-info-box">

                <h4>

                  <FaCalendarAlt />

                  WHEN TO USE

                </h4>

                <ul>

                  {selectedTherapy.uses.map((item, index) => (

                    <li key={index}>

                      <FaCheckCircle />

                      {item}

                    </li>

                  ))}

                </ul>

              </div>

              <div className="therapy-info-box">

                <h4>

                  <FaCog />

                  HOW IT WORKS

                </h4>

                <p>

                  {selectedTherapy.description}

                </p>

              </div>

             <button  type="button"  className="book-btn"
            onClick={() => navigate("/book-appointment")}>
             <FaCalendarAlt />
            <span>Book Appointment</span>
               <FaArrowRight />
            </button>

            </div>

            <div className="therapy-popup-right">

              <img
                src={selectedTherapy.image}
                alt={selectedTherapy.name}
              />

            </div>

          </div>

        </div>

      )}

    </section>

  );

};

export default Therapy;