import React, {
  useEffect,
  useRef,
  useState
} from "react";

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

  const [selectedTherapy, setSelectedTherapy] =
    useState(null);


  /*====================================
    THERAPY SECTION REF
  ====================================*/

  const therapySectionRef = useRef(null);


  /*====================================
    FIRST VISIT STATE
  ====================================*/

  const [therapyFirstVisit, setTherapyFirstVisit] =
    useState(false);


  /*====================================
    FIRST VISIT ANIMATION
  ====================================*/

  useEffect(() => {

    const section =
      therapySectionRef.current;

    if (!section) return;


    const observer =
      new IntersectionObserver(

        ([entry]) => {

          if (entry.isIntersecting) {

            setTherapyFirstVisit(true);

          

            observer.disconnect();

          }

        },

        {
        

          threshold: 0.15,

          rootMargin:
            "0px 0px -40px 0px"
        }

      );


    observer.observe(section);


    return () => {

      observer.disconnect();

    };

  }, []);


  /*====================================
    VISIBLE THERAPIES
  ====================================*/

  const visibleTherapies = showAll
    ? therapyData
    : therapyData.slice(0, 6);


  /*====================================
    CLOSE POPUP
  ====================================*/

  const closeTherapyPopup = () => {

    setSelectedTherapy(null);

  };


  /*====================================
    BOOK APPOINTMENT
  ====================================*/

  const handleBookAppointment = () => {

    setSelectedTherapy(null);

    navigate("/book-appointment");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  /*====================================
    ESCAPE KEY
  ====================================*/

  useEffect(() => {

    const handleEscape = (event) => {

      if (event.key === "Escape") {

        setSelectedTherapy(null);

      }

    };


    window.addEventListener(
      "keydown",
      handleEscape
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, []);


  /*====================================
    BODY SCROLL LOCK
  ====================================*/

  useEffect(() => {

    if (selectedTherapy) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "";

    }


    return () => {

      document.body.style.overflow =
        "";

    };

  }, [selectedTherapy]);


  return (

    <section
      ref={therapySectionRef}
      className={`therapy-section ${
        therapyFirstVisit
          ? "therapy-first-visit"
          : ""
      }`}
    >


      {/*====================================
        HEADING
      ====================================*/}

      <div className="therapy-heading">

        <p className="therapy-subtitle">
          ADVANCED MODALITIES AVAILABLE
        </p>

        <h2 className="therapy-title">
          Healing Through Advanced Technology
        </h2>

      </div>



      {/*====================================
        THERAPY GRID
      ====================================*/}

      <div
        className={`therapy-grid ${
          showAll
            ? "therapy-grid-open"
            : ""
        }`}
      >

        {visibleTherapies.map((item) => (

          <div
            key={item.id}
            className="therapy-card"
            onClick={() =>
              setSelectedTherapy(item)
            }
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {

                event.preventDefault();

                setSelectedTherapy(item);

              }

            }}
          >


            {/* Shine */}

            <span className="therapy-ripple"></span>


            {/* Icon */}

            <div className="therapy-image-box">

              <img
                src={item.icon}
                alt={item.name}
                className="therapy-icon"
              />

            </div>


            {/* Name */}

            <h3>
              {item.name}
            </h3>


            {/* Short name */}

            <p>
              {item.shortName}
            </p>

          </div>

        ))}

      </div>



      {/*====================================
        EXPLORE BUTTON
      ====================================*/}

      <div className="therapy-btn-area">

        <button
          type="button"
          className="therapy-btn"
          onClick={() =>
            setShowAll((previous) => !previous)
          }
        >

          {showAll
            ? "SHOW LESS"
            : "EXPLORE ALL THERAPIES"}

        </button>

      </div>



      {/*====================================
        POPUP
      ====================================*/}

      {selectedTherapy && (

        <div
          className="therapy-popup-overlay"
          onClick={closeTherapyPopup}
        >


          <div
            className="therapy-popup"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/*====================================
              CLOSE BUTTON
            ====================================*/}

            <button
              type="button"
              className="therapy-close"
              onClick={closeTherapyPopup}
              aria-label="Close therapy"
            >

              <FaTimes />

            </button>



            {/*====================================
              LEFT CONTENT
            ====================================*/}

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



              {/*====================================
                WHEN TO USE
              ====================================*/}

              <div className="therapy-info-box">

                <h4>

                  <FaCalendarAlt />

                  WHEN TO USE

                </h4>


                <ul>

                  {selectedTherapy.uses.map(
                    (item, index) => (

                      <li
                        key={index}
                      >

                        <FaCheckCircle />

                        <span>
                          {item}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              </div>



              {/*====================================
                HOW IT WORKS
              ====================================*/}

              <div className="therapy-info-box">

                <h4>

                  <FaCog />

                  HOW IT WORKS

                </h4>


                <p>

                  {selectedTherapy.description}

                </p>

              </div>



              {/*====================================
                BOOK APPOINTMENT
              ====================================*/}

              <button
                type="button"
                className="book-btn"
                onClick={handleBookAppointment}
              >

                <FaCalendarAlt />

                <span>
                  Book Appointment
                </span>

                <FaArrowRight />

              </button>

            </div>



            {/*====================================
              RIGHT IMAGE
            ====================================*/}

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