import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Conditions.css";
import { conditionsData } from "./ConditionsData";

const Conditions = () => {
  const navigate = useNavigate();

  const [showAll, setShowAll] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);

  /* VISIBLE CONDITIONS */
   
 

  const visibleConditions = showAll
    ? conditionsData
    : conditionsData.slice(0, 6);

  /*CLOSE POPUP */
    
 

  const handleClosePopup = () => {
    setSelectedCondition(null);
  };

  /* POPUP OPEN */
    
 

  useEffect(() => {
    if (selectedCondition) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCondition]);

  /* ESCAPE KEY */
   
 

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedCondition(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /*
    BOOK APPOINTMENT
  */

  const handleBookAppointment = () => {
    setSelectedCondition(null);

    navigate("/book-appointment");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="conditions-section"
      id="conditions"
    >

      {/*
          HEADER
      */}

      <div className="conditions-header">

        <div className="conditions-header-content">

          <p className="conditions-subtitle">
            CONDITIONS WE TREAT
          </p>

          <h2 className="conditions-title">
            We Treat the
            <span> Root Cause,</span>
            <br />
            Not Just the Pain
          </h2>

        </div>


        {/*
            VIEW ALL BUTTON
        */}

        <button
          type="button"
          className="view-all-btn"
          onClick={() =>
            setShowAll((previous) => !previous)
          }
        >
          {showAll
            ? "SHOW LESS ←"
            : "VIEW ALL CONDITIONS →"}
        </button>

      </div>


      {/*
          CONDITIONS GRID
      */}

      <div className="conditions-grid">

        {visibleConditions.map((item) => (

          <div
            key={item.id}
            className="condition-card"
            onClick={() =>
              setSelectedCondition(item)
            }
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();

                setSelectedCondition(item);
              }

            }}
          >

            {/* Shine animation */}

            <span className="shine"></span>


            {/* Image */}

            <div className="condition-image-wrapper">

              <img
                src={item.image}
                alt={item.title}
                className="condition-image"
              />

            </div>


            {/* Title */}

            <h4>
              {item.title}
            </h4>


            {/* View details */}

            <span className="condition-card-link">
              View Details →
            </span>

          </div>

        ))}

      </div>


      {/*
          CONDITION POPUP
      */}

      {selectedCondition && (

        <div
          className="condition-modal-overlay"
          onClick={handleClosePopup}
        >

          <div
            className="condition-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/*
                CLOSE BUTTON
            */}

            <button
              type="button"
              className="condition-modal-close"
              onClick={handleClosePopup}
              aria-label="Close condition details"
            >
              ×
            </button>


            {/*
                SCROLLABLE MODAL
            */}

            <div className="condition-modal-scroll">


              {/*
                  LEFT IMAGE AREA
              */}

              <div className="condition-modal-image-area">

                <div className="condition-modal-image-circle"></div>

                <img
                  src={selectedCondition.image}
                  alt={selectedCondition.title}
                  className="condition-modal-image"
                />

              </div>


              {/*
                  RIGHT CONTENT
              */}

              <div className="condition-modal-details">


                {/* Label */}

                <span className="condition-modal-label">
                  CONDITION WE TREAT
                </span>


                {/* Heading */}

                <h2 className="condition-modal-title">
                  {selectedCondition.title}
                </h2>


                {/* Subtitle */}

                <p className="condition-modal-subtitle">
                  {selectedCondition.subtitle}
                </p>


                {/* Decorative line */}

                <div className="condition-modal-line"></div>


                {/*
                    DESCRIPTION
                */}

                <div className="condition-info-block">

                  <h3>
                    Understanding{" "}
                    {selectedCondition.title}
                  </h3>

                  <p>
                    {selectedCondition.description}
                  </p>

                </div>


                {/*
                    SYMPTOMS
                */}

                <div className="condition-info-block">

                  <h3>
                    Common Symptoms
                  </h3>

                  <div className="condition-symptoms">

                    {selectedCondition.symptoms.map(
                      (symptom, index) => (

                        <div
                          className="condition-symptom"
                          key={index}
                        >

                          <span className="symptom-check">
                            ✓
                          </span>

                          <span>
                            {symptom}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>


                {/*
                    PHYSIOTHERAPY TREATMENT
                */}

                <div className="condition-treatment-box">

                  <div className="treatment-icon">
                    +
                  </div>

                  <div>

                    <h3>
                      How Physiotherapy Helps
                    </h3>

                    <p>
                      {selectedCondition.treatment}
                    </p>

                  </div>

                </div>


                {/*
                    FOOTER / APPOINTMENT
                */}

                <div className="condition-modal-footer">

                  <span>
                    Individual treatment plans are
                    based on your assessment and
                    clinical needs.
                  </span>


                  <button
                    type="button"
                    className="condition-appointment-btn"
                    onClick={handleBookAppointment}
                  >
                    Book Appointment

                    <span>
                      →
                    </span>

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </section>
  );
};

export default Conditions;