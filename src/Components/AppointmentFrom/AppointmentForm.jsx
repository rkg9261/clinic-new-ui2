import React, { useState } from "react";
import "./AppointmentForm.css";

import {
  FaClock
} from "react-icons/fa";

import { API } from "../../config/api";


const AppointmentForm = () => {

  /*====================================
    FORM STATE
  ====================================*/

  const [formData, setFormData] = useState({

    name: "",

    age: "",

    gender: "",

    whatsapp_number: "",

    appointment_date: "",

    appointment_time: ""

  });


  /*====================================
    ERROR STATE
  ====================================*/

  const [errors, setErrors] = useState({});


  /*====================================
    SUCCESS STATE
  ====================================*/

  const [success, setSuccess] = useState("");


  /*====================================
    API LOADING STATE
  ====================================*/

  const [loading, setLoading] = useState(false);


  /*====================================
    HANDLE INPUT CHANGE
  ====================================*/

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData((previousData) => ({

      ...previousData,

      [name]: value

    }));


    /* Remove error when user starts typing */

    setErrors((previousErrors) => ({

      ...previousErrors,

      [name]: ""

    }));


    /* Remove old success message */

    setSuccess("");

  };


  /*====================================
    TODAY DATE
  ====================================*/

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  /*====================================
    VALIDATION
  ====================================*/

  const validateForm = () => {

    const newErrors = {};


    /*----------------------------------
      NAME
    ----------------------------------*/

    if (!formData.name.trim()) {

      newErrors.name =
        "Full name is required.";

    }


    /*----------------------------------
      AGE
    ----------------------------------*/

    if (!formData.age) {

      newErrors.age =
        "Age is required.";

    }

    else if (
      Number(formData.age) < 1 ||
      Number(formData.age) > 120
    ) {

      newErrors.age =
        "Please enter a valid age.";

    }


    /*----------------------------------
      GENDER
    ----------------------------------*/

    if (!formData.gender) {

      newErrors.gender =
        "Please select gender.";

    }


    /*----------------------------------
      WHATSAPP NUMBER
    ----------------------------------*/

    if (!formData.whatsapp_number) {

      newErrors.whatsapp_number =
        "WhatsApp number is required.";

    }

    else if (
      !/^[6-9]\d{9}$/.test(
        formData.whatsapp_number
      )
    ) {

      newErrors.whatsapp_number =
        "Please enter a valid 10-digit mobile number.";

    }


    /*----------------------------------
      APPOINTMENT DATE
    ----------------------------------*/

    if (!formData.appointment_date) {

      newErrors.appointment_date =
        "Please select appointment date.";

    }


    /*----------------------------------
      APPOINTMENT TIME
    ----------------------------------*/

    if (!formData.appointment_time) {

      newErrors.appointment_time =
        "Please select available time.";

    }


    setErrors(newErrors);


    return (
      Object.keys(newErrors).length === 0
    );

  };


  /*====================================
    SUBMIT FORM
  ====================================*/

  const handleSubmit = async (e) => {

    e.preventDefault();


    /* Clear previous messages */

    setSuccess("");


    /* Validate */

    const isValid =
      validateForm();


    if (!isValid) {

      return;

    }


    /* Start loading */

    setLoading(true);


    try {

      /*====================================
        API REQUEST BODY
      ====================================*/

      const appointmentData = {

        name:
          formData.name.trim(),

        age:
          Number(formData.age),

        gender:
          formData.gender,

        whatsapp_number:
          `+91${formData.whatsapp_number}`,

        appointment_date:
          formData.appointment_date,

        appointment_time:
          formData.appointment_time

      };


      /*====================================
        CONSOLE REQUEST DATA
      ====================================*/

      console.log(
        "===================================="
      );

      console.log(
        "APPOINTMENT API REQUEST"
      );

      console.log(
        "API URL:",
        API.APPOINTMENT
      );

      console.log(
        "REQUEST BODY:",
        appointmentData
      );

      console.log(
        "===================================="
      );


      /*====================================
        CALL API
      ====================================*/

      const response = await fetch(

        API.APPOINTMENT,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            "Accept":
              "application/json"

          },

          body:
            JSON.stringify(
              appointmentData
            )

        }

      );


      /*====================================
        GET API RESPONSE
      ====================================*/

      let responseData = null;

      try {

        responseData =
          await response.json();

      }

      catch (jsonError) {

        console.log(
          "Response is not JSON:",
          jsonError
        );

      }


      /*====================================
        CONSOLE API RESPONSE
      ====================================*/

      console.log(
        "===================================="
      );

      console.log(
        "APPOINTMENT API RESPONSE"
      );

      console.log(
        "Status:",
        response.status
      );

      console.log(
        "Response:",
        responseData
      );

      console.log(
        "===================================="
      );


      /*====================================
        API ERROR
      ====================================*/

      if (!response.ok) {

        const errorMessage =
          responseData?.message ||
          responseData?.error ||
          "Unable to book appointment. Please try again.";

        throw new Error(
          errorMessage
        );

      }


      /*====================================
        SUCCESS
      ====================================*/

      setSuccess(
        "🎉 Appointment booked successfully! Our clinic team will contact you shortly."
      );


      /*====================================
        CLEAR FORM
      ====================================*/

      setFormData({

        name: "",

        age: "",

        gender: "",

        whatsapp_number: "",

        appointment_date: "",

        appointment_time: ""

      });


      /* Clear errors */

      setErrors({});


    }

    catch (error) {

      /*====================================
        API ERROR CONSOLE
      ====================================*/

      console.error(
        "Appointment API Error:",
        error
      );


      /*====================================
        ERROR MESSAGE
      ====================================*/

      setSuccess(
        `❌ ${error.message || "Something went wrong. Please try again."}`
      );

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <section className="appointment-section">


      {/*====================================
        HEADING
      ====================================*/}

      <div className="appointment-heading">

        <p className="appointment-subtitle">

          SCHEDULE YOUR VISIT

        </p>


        <h2 className="appointment-title">

          Book Your{" "}

          <span>
            Appointment
          </span>{" "}

          Today

        </h2>


        <p className="appointment-description">

          Begin your journey toward a
          pain-free and healthier life
          with expert physiotherapy care.
          Schedule your appointment in
          just a few simple steps.

        </p>

      </div>



      {/*====================================
        APPOINTMENT CARD
      ====================================*/}

      <div className="appointment-card">


        <h2>

          Take First Step Towards Recovery!

        </h2>


        <p>

          Book Appointment Now

        </p>



        {/*====================================
          SUCCESS / ERROR MESSAGE
        ====================================*/}

        {success && (

          <div
            className={
              success.startsWith("❌")
                ? "success-message api-error-message"
                : "success-message"
            }
          >

            {success}

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
            ROW 1
          ====================================*/}

          <div className="appointment-row">


            {/* NAME */}

            <div className="appointment-input">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />


              {errors.name && (

                <p className="error-text">

                  {errors.name}

                </p>

              )}

            </div>



            {/* AGE */}

            <div className="appointment-input">

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
              />


              {errors.age && (

                <p className="error-text">

                  {errors.age}

                </p>

              )}

            </div>


          </div>



          {/*====================================
            ROW 2
          ====================================*/}

          <div className="appointment-row">


            {/* WHATSAPP NUMBER */}

            <div className="appointment-input">

              <input
                type="tel"
                name="whatsapp_number"
                placeholder="Mobile Number (WhatsApp Only)"
                value={formData.whatsapp_number}
                onChange={handleChange}
                maxLength="10"
                inputMode="numeric"
                autoComplete="tel"
              />


              {errors.whatsapp_number && (

                <p className="error-text">

                  {errors.whatsapp_number}

                </p>

              )}

            </div>



            {/* GENDER */}

            <div className="appointment-input">

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >

                <option value="">

                  Gender

                </option>


                <option value="Male">

                  Male

                </option>


                <option value="Female">

                  Female

                </option>


                <option value="Other">

                  Other

                </option>

              </select>


              {errors.gender && (

                <p className="error-text">

                  {errors.gender}

                </p>

              )}

            </div>


          </div>



          {/*====================================
            APPOINTMENT DATE
          ====================================*/}

          <div className="appointment-input full-width">

            <input
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              min={today}
            />


            {errors.appointment_date && (

              <p className="error-text">

                {errors.appointment_date}

              </p>

            )}

          </div>



          {/*====================================
            APPOINTMENT TIME
          ====================================*/}

          <div className="appointment-input full-width">

            <FaClock />


            <select
              name="appointment_time"
              value={formData.appointment_time}
              onChange={handleChange}
            >

              <option value="">

                Select Available Time

              </option>


              <option value="09:00 AM">

                09:00 AM

              </option>


              <option value="10:00 AM">

                10:00 AM

              </option>


              <option value="10:30 AM">

                10:30 AM

              </option>


              <option value="11:00 AM">

                11:00 AM

              </option>


              <option value="12:00 PM">

                12:00 PM

              </option>


              <option value="02:00 PM">

                02:00 PM

              </option>


              <option value="03:00 PM">

                03:00 PM

              </option>


              <option value="04:00 PM">

                04:00 PM

              </option>


              <option value="05:00 PM">

                05:00 PM

              </option>


              <option value="06:00 PM">

                06:00 PM

              </option>


              <option value="07:00 PM">

                07:00 PM

              </option>


              <option value="08:00 PM">

                08:00 PM

              </option>

            </select>


            {errors.appointment_time && (

              <p className="error-text">

                {errors.appointment_time}

              </p>

            )}

          </div>



          {/*====================================
            SUBMIT BUTTON
          ====================================*/}

          <button
            type="submit"
            className="appointment-btn"
            disabled={loading}
          >

            {loading
              ? "SUBMITTING..."
              : "SUBMIT"}

          </button>


        </form>

      </div>

    </section>

  );

};


export default AppointmentForm;