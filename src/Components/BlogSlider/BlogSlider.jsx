import React, { useEffect, useState } from "react";
import "./BlogSlider.css";
import { blogData } from "./blogData";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";

const BlogSlider = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [pauseSlider, setPauseSlider] = useState(false);

  /*====================================
    RESPONSIVE VISIBLE CARDS
  ====================================*/

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
    RESPONSIVE SCREEN
  ====================================*/

  useEffect(() => {

    const handleResize = () => {

      let newVisibleCards;

      if (window.innerWidth <= 768) {

        newVisibleCards = 1;

      } else if (window.innerWidth <= 1100) {

        newVisibleCards = 2;

      } else {

        newVisibleCards = 4;

      }

      setVisibleCards(newVisibleCards);

    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);


  /*====================================
    MAX INDEX
  ====================================*/

  const maxIndex = Math.max(
    blogData.length - visibleCards,
    0
  );


  /*====================================
    NEXT SLIDE
  ====================================*/

  const nextSlide = () => {

    setCurrentIndex((prev) => {

      if (prev >= maxIndex) {
        return 0;
      }

      return prev + 1;

    });

  };


  /*====================================
    PREVIOUS SLIDE
  ====================================*/

  const prevSlide = () => {

    setCurrentIndex((prev) => {

      if (prev <= 0) {
        return maxIndex;
      }

      return prev - 1;

    });

  };


  /*====================================
    FIX INDEX WHEN SCREEN SIZE CHANGES
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

      setCurrentIndex((prev) => {

        if (prev >= maxIndex) {
          return 0;
        }

        return prev + 1;

      });

    }, 3500);

    return () => {
      clearInterval(interval);
    };

  }, [pauseSlider, maxIndex]);


  /*====================================
    SLIDE WIDTH
  ====================================*/

  const slidePercentage = 100 / visibleCards;


  /*====================================
    CLOSE POPUP
  ====================================*/

  const closePopup = () => {
    setSelectedBlog(null);
  };


  return (

    <section className="blog-section">

      {/*====================================
        BACKGROUND SHAPES
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

        onMouseLeave={() => setPauseSlider(false)}
      >


        {/* LEFT ARROW */}

        <button
          type="button"
          className="slider-arrow left-arrow"
          onClick={prevSlide}
          aria-label="Previous blog"
        >
          <FaArrowLeft />
        </button>


        {/* SLIDER */}

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


                    <button
                      type="button"
                      className="read-more-btn"

                      onClick={() => {
                        setPauseSlider(true);
                        setSelectedBlog(blog);
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


        {/* RIGHT ARROW */}

        <button
          type="button"
          className="slider-arrow right-arrow"
          onClick={nextSlide}
          aria-label="Next blog"
        >
          <FaArrowRight />
        </button>

      </div>


      {/*====================================
        BLOG POPUP
      ====================================*/}

      {selectedBlog && (

        <div
          className="blog-popup-overlay"
          onClick={closePopup}
        >

          <div
            className="blog-popup"

            onClick={(e) => {
              e.stopPropagation();
            }}
          >


            {/* CLOSE */}

            <button
              type="button"
              className="blog-close"
              onClick={closePopup}
              aria-label="Close"
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

              <span className="popup-category">
                {selectedBlog.category}
              </span>


              <div className="popup-date">

                <FaCalendarAlt />

                <span>
                  {selectedBlog.date}
                </span>

              </div>


              <h2>
                {selectedBlog.title}
              </h2>


              <p>
                {selectedBlog.description ||
                  "Discover useful physiotherapy tips, healthy lifestyle guidance, exercises and expert insights to help you maintain better health and improve your overall wellbeing."}
              </p>


              <button
                type="button"
                className="popup-btn"
                onClick={closePopup}
              >
                Book Appointment →
              </button>

            </div>

          </div>

        </div>

      )}

    </section>

  );

};

export default BlogSlider;