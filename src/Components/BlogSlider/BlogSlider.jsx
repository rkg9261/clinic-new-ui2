import React, { useEffect, useState } from "react";
import "./BlogSlider.css";
import { blogData } from "./blogData";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";

const BlogSlider = () => {

  const navigate = useNavigate();

  /*====================================
    STATES
  ====================================*/

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const [pauseSlider, setPauseSlider] = useState(false);

  const [visibleCards, setVisibleCards] = useState(() => {

    if (window.innerWidth <= 768) {
      return 1;
    }

    if (window.innerWidth <= 1100) {
      return 2;
    }

    return 4;

  });


  /*====================================
    RESPONSIVE CARD COUNT
  ====================================*/

  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth <= 768) {

        setVisibleCards(1);

      } else if (window.innerWidth <= 1100) {

        setVisibleCards(2);

      } else {

        setVisibleCards(4);

      }

    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);


  /*====================================
    MAX SLIDER INDEX
  ====================================*/

  const maxIndex = Math.max(
    blogData.length - visibleCards,
    0
  );


  /*====================================
    NEXT
  ====================================*/

  const nextSlide = () => {

    setCurrentIndex((previousIndex) => {

      if (previousIndex >= maxIndex) {
        return 0;
      }

      return previousIndex + 1;

    });

  };


  /*====================================
    PREVIOUS
  ====================================*/

  const prevSlide = () => {

    setCurrentIndex((previousIndex) => {

      if (previousIndex <= 0) {
        return maxIndex;
      }

      return previousIndex - 1;

    });

  };


  /*====================================
    FIX INDEX AFTER RESIZE
  ====================================*/

  useEffect(() => {

    if (currentIndex > maxIndex) {

      setCurrentIndex(maxIndex);

    }

  }, [visibleCards, maxIndex, currentIndex]);


  /*====================================
    AUTO SLIDER
  ====================================*/

  useEffect(() => {

    if (pauseSlider) {
      return;
    }

    const interval = setInterval(() => {

      setCurrentIndex((previousIndex) => {

        if (previousIndex >= maxIndex) {
          return 0;
        }

        return previousIndex + 1;

      });

    }, 3500);

    return () => {
      clearInterval(interval);
    };

  }, [pauseSlider, maxIndex]);


  /*====================================
    CARD WIDTH
  ====================================*/

  const slidePercentage = 100 / visibleCards;


  /*====================================
    OPEN BLOG POPUP
  ====================================*/

  const openBlogPopup = (blog) => {

    setPauseSlider(true);

    setSelectedBlog(blog);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

  };


  /*====================================
    CLOSE BLOG POPUP
  ====================================*/

  const closePopup = () => {

    setSelectedBlog(null);

    setPauseSlider(false);

    // Restore scrolling
    document.body.style.overflow = "";

  };


  /*====================================
    BOOK APPOINTMENT
  ====================================*/

  const goToAppointment = () => {

    closePopup();

    navigate("/book-appointment");

  };


  /*====================================
    CLEANUP BODY SCROLL
  ====================================*/

  useEffect(() => {

    return () => {

      document.body.style.overflow = "";

    };

  }, []);


  return (

    <section className="blog-section">

      {/*====================================
        BACKGROUND BLOBS
      ====================================*/}

      <div className="blog-blob blog-blob-1"></div>

      <div className="blog-blob blog-blob-2"></div>


      {/*====================================
        HEADER
      ====================================*/}

      <div className="blog-header">

        <div>

          <p className="blog-subtitle">
            LATEST BLOGS
          </p>

          <h2 className="blog-title">
            Health Tips &amp; Insights
          </h2>

        </div>

      </div>


      {/*====================================
        SLIDER
      ====================================*/}

      <div
        className="blog-slider-wrapper"

        onMouseEnter={() => setPauseSlider(true)}

        onMouseLeave={() => {

          if (!selectedBlog) {
            setPauseSlider(false);
          }

        }}
      >

        {/*====================================
          LEFT ARROW
        ====================================*/}

        <button
          type="button"
          className="slider-arrow left-arrow"

          onClick={prevSlide}

          aria-label="Previous blog"
        >

          <FaArrowLeft />

        </button>


        {/*====================================
          SLIDER WINDOW
        ====================================*/}

        <div className="blog-slider">

          <div
            className="blog-track"

            style={{
              transform: `translateX(-${
                currentIndex * slidePercentage
              }%)`,
            }}
          >

            {blogData.map((blog) => (

              <div
                className="blog-card"

                key={blog.id}

                style={{
                  minWidth: `${slidePercentage}%`,
                  flex: `0 0 ${slidePercentage}%`,
                }}
              >

                <div className="blog-card-inner">


                  {/*====================================
                    IMAGE
                  ====================================*/}

                  <div className="blog-image-box">

                    <span className="shine"></span>

                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="blog-image"
                    />

                    <span className="blog-category">
                      {blog.category}
                    </span>

                  </div>


                  {/*====================================
                    CONTENT
                  ====================================*/}

                  <div className="blog-content">

                    <div className="blog-date">

                      <FaCalendarAlt />

                      <span>
                        {blog.date}
                      </span>

                    </div>


                    <h3>
                      {blog.title}
                    </h3>


                    {/*====================================
                      READ MORE
                    ====================================*/}

           <button
  type="button"
  className="read-more-btn"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Read More clicked:", blog);

    setPauseSlider(true);
    setSelectedBlog(blog);

    document.body.style.overflow = "hidden";
  }}
>
  Read More →
</button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/*====================================
          RIGHT ARROW
        ====================================*/}

        <button
          type="button"

          className="slider-arrow right-arrow"

          onClick={nextSlide}

          aria-label="Next blog"
        >

          <FaArrowRight />

        </button>

      </div>


      {/*================================================
        BLOG POPUP
      =================================================*/}

      {selectedBlog && (

        <div
          className="blog-popup-overlay"

          onClick={closePopup}
        >

          <div
            className="blog-popup"

            onClick={(event) => {

              event.stopPropagation();

            }}
          >

            {/*====================================
              CLOSE BUTTON
            ====================================*/}

            <button
              type="button"

              className="blog-close"

              onClick={closePopup}

              aria-label="Close blog"
            >

              ×

            </button>


            {/*====================================
              POPUP IMAGE
            ====================================*/}

            <div className="blog-popup-left">

              <img
                src={selectedBlog.image}

                alt={selectedBlog.title}

                className="blog-popup-image"
              />

            </div>


            {/*====================================
              POPUP CONTENT
            ====================================*/}

            <div className="blog-popup-right">

              {/* CATEGORY */}

              <span className="popup-category">

                {selectedBlog.category}

              </span>


              {/* DATE */}

              <div className="popup-date">

                <FaCalendarAlt />

                <span>
                  {selectedBlog.date}
                </span>

              </div>


              {/* TITLE */}

              <h2>

                {selectedBlog.title}

              </h2>


              {/* DESCRIPTION */}

              <p>

                {selectedBlog.description ||
                  "Discover useful physiotherapy tips, healthy lifestyle guidance, exercises and expert insights to help you maintain better health and improve your overall wellbeing."}

              </p>


              {/* BOOK APPOINTMENT */}

           <button
            type="button"
            className="popup-btn"
           onClick={() => {
             closePopup();
             navigate("/book-appointment");
            }}> Book Appointment →</button>

            </div>

          </div>

        </div>

      )}

    </section>

  );

};

export default BlogSlider;