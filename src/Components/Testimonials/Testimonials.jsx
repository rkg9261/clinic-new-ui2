import React, { useEffect, useState } from "react";
import "./Testimonials.css";
import { testimonialData } from "./TestimonialData";

import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const Testimonials = () => {

  const [current, setCurrent] = useState(0);

  const total = testimonialData.length;

  // Auto Slider
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === total - 1 ? 0 : prev + 1
      );

    }, 4000);

    return () => clearInterval(interval);

  }, [total]);

  // Previous
  const previousSlide = () => {

    setCurrent(
      current === 0 ? total - 1 : current - 1
    );

  };

  // Next
  const nextSlide = () => {

    setCurrent(
      current === total - 1 ? 0 : current + 1
    );

  };

  return (

    <section className="testimonial-section">
       

      <div className="testimonial-heading">

        <p className="testimonial-subtitle">
          PATIENT TESTIMONIALS
        </p>

        <h2 className="testimonial-title">
          What Our Patients Say
        </h2>

      </div>

     <div
  className="testimonial-slider"
  onMouseEnter={() => clearInterval(window.testimonialInterval)}
>

        <button
          className="testimonial-arrow left-arrow"
          onClick={previousSlide}
        >
          <FaChevronLeft />
        </button>

        <div className="testimonial-card">

          <FaQuoteLeft className="quote-icon" />

          <p className="testimonial-message">

            {testimonialData[current].message}

          </p>

          <div className="testimonial-user">

            <img
              src={testimonialData[current].image}
              alt={testimonialData[current].name}
            />

            <div>

              <h4>
                {testimonialData[current].name}
              </h4>

              <span>
                {testimonialData[current].treatment}
              </span>

              <div className="testimonial-stars">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

              </div>

            </div>

          </div>

        </div>

        <button
          className="testimonial-arrow right-arrow"
          onClick={nextSlide}
        >
          <FaChevronRight />
        </button>

      </div>

      <div className="testimonial-dots">

        {testimonialData.map((item, index) => (

          <span

            key={index}

            className={
              current === index
                ? "dot active-dot"
                : "dot"
            }

            onClick={() => setCurrent(index)}

          />

        ))}

      </div>

    </section>

  );

};

export default Testimonials;