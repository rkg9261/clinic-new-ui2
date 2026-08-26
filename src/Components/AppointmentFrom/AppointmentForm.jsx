import React, { useState } from "react";
import "./AppointmentForm.css";

import {
  FaClock
} from "react-icons/fa";

import { API } from "../../config/api";


const AppointmentForm = () => {

  /*====================================
    TIME SLOTS

  ====================================*/

  const TIME_SLOTS = [

    {
      label: "09:00 AM - 01:00 PM",
      from: "09:00 AM",
      to: "01:00 PM"
    },

    {
      label: "04:00 PM - 08:00 PM",
      from: "04:00 PM",
      to: "08:00 PM"
    }

  ];


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
    SUCCESS / ERROR MESSAGE
  ====================================*/

  const [success, setSuccess] = useState("");


  /*====================================
    LOADING
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


    /*====================================
      MOBILE NUMBER
    ====================================*/

    if (
      name === "whatsapp_number"
    ) {

      const numericValue =
        value.replace(/\D/g, "");


      setFormData(
        (previousData) => ({

          ...previousData,

          whatsapp_number:
            numericValue.substring(
              0,
              10
            )

        })
      );

    }

    else {

      setFormData(
        (previousData) => ({

          ...previousData,

          [name]: value

        })
      );

    }


    /*====================================
      REMOVE FIELD ERROR
    ====================================*/

    setErrors(
      (previousErrors) => ({

        ...previousErrors,

        [name]: ""

      })
    );


    /*====================================
      REMOVE OLD MESSAGE
    ====================================*/

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
    GET SELECTED TIME SLOT
  ====================================*/

  const getSelectedSlot = () => {

    return TIME_SLOTS.find(
      (slot) =>
        slot.label ===
        formData.appointment_time
    );

  };


  /*====================================
    VALIDATION
  ====================================*/

  const validateForm = () => {

    const newErrors = {};


    /*----------------------------------
      NAME
    ----------------------------------*/

    if (
      !formData.name.trim()
    ) {

      newErrors.name =
        "Full name is required.";

    }


    /*----------------------------------
      AGE
    ----------------------------------*/

    if (
      !formData.age
    ) {

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

    if (
      !formData.gender
    ) {

      newErrors.gender =
        "Please select gender.";

    }


    /*----------------------------------
      WHATSAPP NUMBER
    ----------------------------------*/

    if (
      !formData.whatsapp_number
    ) {

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

    if (
      !formData.appointment_date
    ) {

      newErrors.appointment_date =
        "Please select appointment date.";

    }


    /*----------------------------------
      APPOINTMENT TIME
    ----------------------------------*/

    if (
      !formData.appointment_time
    ) {

      newErrors.appointment_time =
        "Please select available time.";

    }


    setErrors(
      newErrors
    );


    return (
      Object.keys(newErrors).length === 0
    );

  };


  /*====================================
    SUBMIT FORM
  ====================================*/

  const handleSubmit = async (e) => {

    e.preventDefault();


    /*====================================
      CLEAR OLD MESSAGE
    ====================================*/

    setSuccess("");


    /*====================================
      VALIDATE
    ====================================*/

    const isValid =
      validateForm();


    if (!isValid) {

      return;

    }


    /*====================================
      GET SELECTED SLOT
    ====================================*/

    const selectedSlot =
      getSelectedSlot();


    if (!selectedSlot) {

      setSuccess(
        "❌ Please select a valid appointment time."
      );

      return;

    }


    /*====================================
      START LOADING
    ====================================*/

    setLoading(true);


    try {


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
          selectedSlot.from,

        appointment_time_to:
          selectedSlot.to

      };


      /*====================================
        CONSOLE REQUEST
      ====================================*/

      console.log(
        "===================================="
      );

      console.log(
        "APPOINTMENT API REQUEST"
      );

      console.log(
        "===================================="
      );

      console.log(
        "API URL:",
        API.APPOINTMENT
      );

      console.log(
        "SELECTED SLOT:",
        selectedSlot.label
      );

      console.log(
        "APPOINTMENT FROM:",
        selectedSlot.from
      );

      console.log(
        "APPOINTMENT TO:",
        selectedSlot.to
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

      const response =
        await fetch(
          API.APPOINTMENT,
          {

            method:
              "POST",

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




      const responseText =
        await response.text();


      let responseData =
        null;


      if (
        responseText
      ) {

        try {

          responseData =
            JSON.parse(
              responseText
            );

        }

        catch (jsonError) {

          console.log(
            "Response is not JSON:",
            jsonError
          );


          responseData =
            responseText;

        }

      }


      /*====================================
        CONSOLE RESPONSE
      ====================================*/

      console.log(
        "===================================="
      );

      console.log(
        "APPOINTMENT API RESPONSE"
      );

      console.log(
        "===================================="
      );

      console.log(
        "STATUS:",
        response.status
      );

      console.log(
        "RESPONSE:",
        responseData
      );

      console.log(
        "===================================="
      );


      /*====================================
        API ERROR
      ====================================*/

      if (
        !response.ok
      ) {

        let errorMessage =
          "Unable to book appointment. Please try again.";


        if (
          responseData &&
          typeof responseData === "object"
        ) {

          errorMessage =
            responseData.error ||
            responseData.message ||
            responseData.title ||
            errorMessage;

        }

        else if (
          typeof responseData === "string"
        ) {

          /* Remove HTML error page */

          if (
            responseData.includes(
              "<!DOCTYPE"
            ) ||
            responseData.includes(
              "<html"
            )
          ) {

            errorMessage =
              `Server returned status ${response.status}.`;

          }

          else {

            errorMessage =
              responseData;

          }

        }


        throw new Error(
          errorMessage
        );

      }


      /*====================================
        SUCCESS RESPONSE
      ====================================*/

      const successMessage =
        responseData?.message ||
        "Appointment booked successfully! Our clinic team will contact you shortly.";


      console.log(
        "===================================="
      );

      console.log(
        "APPOINTMENT CREATED SUCCESSFULLY"
      );

      console.log(
        "APPOINTMENT ID:",
        responseData?.appointmentId
      );

      console.log(
        "SUCCESS MESSAGE:",
        successMessage
      );

      console.log(
        "===================================="
      );


      /*====================================
        SHOW SUCCESS
      ====================================*/

      setSuccess(
        `🎉 ${successMessage}`
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


      /*====================================
        CLEAR ERRORS
      ====================================*/

      setErrors({});

    }

    catch (error) {

      /*====================================
        ERROR CONSOLE
      ====================================*/

      console.error(
        "===================================="
      );

      console.error(
        "APPOINTMENT API ERROR:",
        error
      );

      console.error(
        "===================================="
      );


      /*====================================
        SHOW ERROR
      ====================================*/

      setSuccess(
        `❌ ${
          error.message ||
          "Something went wrong. Please try again."
        }`
      );

    }

    finally {

      setLoading(false);

    }

  };


  /*====================================
    RETURN
  ====================================*/

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
          SUCCESS / ERROR
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
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
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
                value={
                  formData.age
                }
                onChange={
                  handleChange
                }
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


            {/* WHATSAPP */}

            <div className="appointment-input">

              <input
                type="tel"
                name="whatsapp_number"
                placeholder="Mobile Number (WhatsApp Only)"
                value={
                  formData.whatsapp_number
                }
                onChange={
                  handleChange
                }
                maxLength="10"
                inputMode="numeric"
                autoComplete="tel"
              />


              {errors.whatsapp_number && (

                <p className="error-text">

                  {
                    errors.whatsapp_number
                  }

                </p>

              )}

            </div>


            {/* GENDER */}

            <div className="appointment-input">

              <select
                name="gender"
                value={
                  formData.gender
                }
                onChange={
                  handleChange
                }
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

                  {
                    errors.gender
                  }

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
              value={
                formData.appointment_date
              }
              onChange={
                handleChange
              }
              min={today}
            />


            {errors.appointment_date && (

              <p className="error-text">

                {
                  errors.appointment_date
                }

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
              value={
                formData.appointment_time
              }
              onChange={
                handleChange
              }
            >

              <option value="">

                Select Available Time

              </option>


              {TIME_SLOTS.map(
                (slot) => (

                  <option
                    key={
                      slot.label
                    }
                    value={
                      slot.label
                    }
                  >

                    {slot.label}

                  </option>

                )
              )}

            </select>


            {errors.appointment_time && (

              <p className="error-text">

                {
                  errors.appointment_time
                }

              </p>

            )}

          </div>


          {/*====================================
            SUBMIT
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