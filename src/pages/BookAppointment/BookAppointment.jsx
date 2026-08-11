import React, { useState } from "react";
import "./BookAppointment.css";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import {
  FaUser,
  FaBirthdayCake,
  FaWhatsapp,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle
} from "react-icons/fa";

const BookAppointment = () => {

  /*====================================
    FORM STATE
  ====================================*/

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    mobile: "",
    date: "",
    time: ""
  });

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");


  /*====================================
    HANDLE INPUT
  ====================================*/

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: ""
    }));

    setSuccessMessage("");

  };


  /*====================================
    VALIDATION
  ====================================*/

  const validateForm = () => {

    const newErrors = {};


    /* FULL NAME */

    if (!formData.fullName.trim()) {

      newErrors.fullName =
        "Please enter your full name.";

    }


    /* AGE */

    if (!formData.age) {

      newErrors.age =
        "Please enter your age.";

    } else if (
      Number(formData.age) < 1 ||
      Number(formData.age) > 100
    ) {

      newErrors.age =
        "Please enter a valid age.";

    }


    /* MOBILE */

    if (!formData.mobile) {

      newErrors.mobile =
        "Please enter your WhatsApp number.";

    } else if (
      !/^[6-9]\d{9}$/.test(formData.mobile)
    ) {

      newErrors.mobile =
        "Please enter a valid 10-digit mobile number.";

    }


    /* DATE */

    if (!formData.date) {

      newErrors.date =
        "Please select an appointment date.";

    }


    /* TIME */

    if (!formData.time) {

      newErrors.time =
        "Please select an available time.";

    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };


  /*====================================
    SUBMIT
  ====================================*/

  const handleSubmit = (e) => {

    e.preventDefault();

    setSuccessMessage("");


    const isValid = validateForm();


    if (!isValid) {
      return;
    }


    /*====================================
      APPOINTMENT DATA
    ====================================*/

    console.log(
      "Appointment Data:",
      formData
    );


    /*====================================
      SUCCESS MESSAGE
    ====================================*/

    setSuccessMessage(
      "Your appointment request has been submitted successfully!"
    );


    /*====================================
      WHATSAPP MESSAGE
    ====================================*/

    const message =
      `Hello Krishna Advance Physio Clinic,\n\n` +
      `I would like to book an appointment.\n\n` +
      `Name: ${formData.fullName}\n` +
      `Age: ${formData.age}\n` +
      `WhatsApp Number: ${formData.mobile}\n` +
      `Date: ${formData.date}\n` +
      `Time: ${formData.time}`;


    console.log(
      "WhatsApp Message:",
      message
    );


    /*====================================
      CLEAR FORM
    ====================================*/

    setFormData({
      fullName: "",
      age: "",
      mobile: "",
      date: "",
      time: ""
    });

  };


  /*====================================
    TODAY DATE
  ====================================*/

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  return (
    <>

      {/*====================================
        NAVBAR
      ====================================*/}

      {/* <Navbar /> */}


      {/*====================================
        BOOK APPOINTMENT PAGE
      ====================================*/}

      <main className="book-appointment-page">


        {/*====================================
          PAGE HERO
        ====================================*/}

        <section className="book-appointment-heading">

          <div className="book-heading-content">

            <span className="book-subtitle">
              SCHEDULE YOUR VISIT
            </span>


            <h1>
              Book Your{" "}
              <span>
                Appointment
              </span>{" "}
              Today
            </h1>


            <p className="book-description">

              Begin your journey toward a
              pain-free and healthier life
              with expert physiotherapy care.
              Schedule your appointment in
              just a few simple steps.

            </p>

          </div>

        </section>


        {/*====================================
          FORM SECTION
        ====================================*/}

        <section className="book-form-section">

          <div className="book-form-card">


            {/*====================================
              FORM HEADER
            ====================================*/}

            <div className="book-form-header">

              <h2>
                Take First Step Towards Recovery!
              </h2>

              <p>
                Book Appointment Now
              </p>

            </div>


            {/*====================================
              SUCCESS MESSAGE
            ====================================*/}

            {successMessage && (

              <div className="book-success-message">

                <FaCheckCircle />

                <span>
                  {successMessage}
                </span>

              </div>

            )}


            {/*====================================
              FORM
            ====================================*/}

            <form
              onSubmit={handleSubmit}
              noValidate
            >


              {/*====================================
                FULL NAME + AGE
              ====================================*/}

              <div className="book-form-row">


                {/* FULL NAME */}

                <div className="book-input-group">

                  <div className="book-input-wrapper">

                    <FaUser />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      autoComplete="name"
                    />

                  </div>


                  {errors.fullName && (

                    <small>
                      {errors.fullName}
                    </small>

                  )}

                </div>


                {/* AGE */}

                <div className="book-input-group">

                  <div className="book-input-wrapper">

                    <FaBirthdayCake />

                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Age"
                      min="1"
                      max="100"
                    />

                  </div>


                  {errors.age && (

                    <small>
                      {errors.age}
                    </small>

                  )}

                </div>

              </div>


              {/*====================================
                WHATSAPP NUMBER
              ====================================*/}

              <div className="book-input-group">

                <div className="book-input-wrapper">

                  <FaWhatsapp />

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number (WhatsApp)"
                    maxLength="10"
                    inputMode="numeric"
                    autoComplete="tel"
                  />

                </div>


                {errors.mobile && (

                  <small>
                    {errors.mobile}
                  </small>

                )}

              </div>


              {/*====================================
                DATE
              ====================================*/}

              <div className="book-input-group">

                <div className="book-input-wrapper">

                  <FaCalendarAlt />

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                  />

                </div>


                {errors.date && (

                  <small>
                    {errors.date}
                  </small>

                )}

              </div>


              {/*====================================
                AVAILABLE TIME
              ====================================*/}

              <div className="book-input-group">

                <div className="book-input-wrapper">

                  <FaClock />

                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Available Time
                    </option>

                    <option value="10:30 AM - 12:30 PM">
                      10:30 AM - 12:30 PM
                    </option>

                    <option value="3:00 PM - 6:30 PM">
                      3:00 PM - 6:30 PM
                    </option>

                    <option value="5:00 PM - 8:00 PM">
                      5:00 PM - 8:00 PM
                    </option>

                  </select>

                </div>


                {errors.time && (

                  <small>
                    {errors.time}
                  </small>

                )}

              </div>


              {/*====================================
                SUBMIT
              ====================================*/}

              <button
                type="submit"
                className="book-submit-btn"
              >

                SUBMIT APPOINTMENT

              </button>


            </form>

          </div>

        </section>

      </main>


      {/*====================================
        FOOTER
      ====================================*/}

      {/* <Footer /> */}

    </>
  );

};

export default BookAppointment;