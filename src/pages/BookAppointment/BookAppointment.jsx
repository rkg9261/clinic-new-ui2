import React, { useEffect, useState } from "react";
import "./BookAppointment.css";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaBirthdayCake,
  FaWhatsapp,
  FaCalendarAlt,
  FaClock,
  FaVenusMars,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import { API } from "../../config/api";

const BookAppointment = () => {
  const navigate = useNavigate();

  /* =====================================================
     SCROLL TO TOP
  ===================================================== */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  /* =====================================================
     FORM STATE
  ===================================================== */

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    mobile: "",
    gender: "",
    date: "",
    time: "",
  });

  /* =====================================================
     ERRORS
  ===================================================== */

  const [errors, setErrors] = useState({});

  /* =====================================================
     SUCCESS
  ===================================================== */

  const [successMessage, setSuccessMessage] = useState("");

  /* =====================================================
     API ERROR
  ===================================================== */

  const [apiError, setApiError] = useState("");

  /* =====================================================
     LOADING
  ===================================================== */

  const [loading, setLoading] = useState(false);

  /* =====================================================
     TIME SLOTS


  ===================================================== */

  const TIME_SLOTS = [
    {
      label: "09:00 AM - 01:00 PM",
      from: "09:00 AM",
      to: "01:00 PM",
    },
    {
      label: "04:00 PM - 08:00 PM",
      from: "04:00 PM",
      to: "08:00 PM",
    },
  ];

  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    /* ---------------------------------------------
       MOBILE ONLY NUMBERS
    --------------------------------------------- */

    if (name === "mobile") {
      const numericValue = value.replace(/\D/g, "");

      setFormData((previousData) => ({
        ...previousData,

        mobile: numericValue.substring(0, 10),
      }));
    } else {
      setFormData((previousData) => ({
        ...previousData,

        [name]: value,
      }));
    }

    /* ---------------------------------------------
       CLEAR FIELD ERROR
    --------------------------------------------- */

    setErrors((previousErrors) => ({
      ...previousErrors,

      [name]: "",
    }));

    setSuccessMessage("");
    setApiError("");
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    /* NAME */

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

    /* GENDER */

    if (!formData.gender) {
      newErrors.gender =
        "Please select your gender.";
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

  /* =====================================================
     GET SELECTED SLOT
  ===================================================== */

  const getSelectedSlot = () => {
    return TIME_SLOTS.find(
      (slot) =>
        slot.label === formData.time
    );
  };

  /* =====================================================
     SUBMIT APPOINTMENT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setApiError("");

    /* ---------------------------------------------
       VALIDATE
    --------------------------------------------- */

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    /* ---------------------------------------------
       SELECTED TIME SLOT
    --------------------------------------------- */

    const selectedSlot =
      getSelectedSlot();

    if (!selectedSlot) {
      setApiError(
        "Please select a valid appointment time."
      );

      return;
    }

    console.log(
      "===================================="
    );

    console.log(
      "SELECTED TIME SLOT:",
      selectedSlot.label
    );

    console.log(
      "APPOINTMENT TIME:",
      selectedSlot.from
    );

    console.log(
      "APPOINTMENT TIME TO:",
      selectedSlot.to
    );



    const appointmentData = {
      name:
        formData.fullName.trim(),

      age:
        Number(formData.age),

      gender:
        formData.gender,

      whatsapp_number:
        `+91${formData.mobile}`,

      appointment_date:
        formData.date,

      appointment_time:
        selectedSlot.from,

      appointment_time_to:
        selectedSlot.to,
    };

    /* =================================================
       CONSOLE REQUEST
    ================================================= */

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
      "REQUEST BODY:",
      appointmentData
    );

    try {
      setLoading(true);

      /* =================================================
         API CALL


      ================================================= */

      const response = await fetch(
        API.APPOINTMENT,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body: JSON.stringify(
            appointmentData
          ),
        }
      );

      /* =================================================
         READ RESPONSE SAFELY
      ================================================= */

      const responseText =
        await response.text();

      let responseData = null;

      if (responseText) {
        try {
          responseData =
            JSON.parse(
              responseText
            );
        } catch (jsonError) {
          console.log(
            "Response is not JSON:",
            jsonError
          );

          responseData =
            responseText;
        }
      }

      /* =================================================
         RESPONSE LOG
      ================================================= */

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

      /* =================================================
         API ERROR
      ================================================= */

      if (!response.ok) {
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
        } else if (
          typeof responseData === "string"
        ) {
          errorMessage =
            responseData;
        }

        throw new Error(
          errorMessage
        );
      }

      /* =================================================
         SUCCESS

      ================================================= */

      const successText =
        responseData?.message ||
        "Appointment booked successfully!";

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
        "MESSAGE:",
        successText
      );

      console.log(
        "===================================="
      );

      setSuccessMessage(
        successText
      );

      /* ---------------------------------------------
         CLEAR ERRORS
      --------------------------------------------- */

      setErrors({});

      /* ---------------------------------------------
         CLEAR FORM
      --------------------------------------------- */

      setFormData({
        fullName: "",
        age: "",
        mobile: "",
        gender: "",
        date: "",
        time: "",
      });

      /* ---------------------------------------------
         SCROLL TO SUCCESS
      --------------------------------------------- */

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
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

      setApiError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     TODAY DATE
  ===================================================== */

  const today = new Date()
    .toISOString()
    .split("T")[0];

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <>
      <main className="book-appointment-page">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

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

        {/* =================================================
            FORM
        ================================================= */}

        <section className="book-form-section">

          <div className="book-form-card">

            {/* CLOSE */}

            <button
              type="button"
              className="book-close-btn"
              onClick={() =>
                navigate("/")
              }
              aria-label="Close"
            >
              ×
            </button>

            {/* HEADER */}

            <div className="book-form-header">

              <h2>
                Take First Step Towards Recovery!
              </h2>

              <p>
                Book Appointment Now
              </p>

            </div>

            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {successMessage && (
              <div className="book-api-success-message">

                <FaCheckCircle
                  className="book-api-success-icon"
                />

                <div>

                  <strong>
                    Appointment Confirmed!
                  </strong>

                  <p>
                    {successMessage}
                  </p>

                </div>

              </div>
            )}

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {apiError && (
              <div className="book-api-error-message">

                <FaExclamationCircle
                  className="book-api-error-icon"
                />

                <div>

                  <strong>
                    Appointment Not Submitted
                  </strong>

                  <p>
                    {apiError}
                  </p>

                </div>

              </div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              noValidate
            >

              {/* =================================================
                  NAME + AGE
              ================================================= */}

              <div className="book-form-row">

                {/* NAME */}

                <div className="book-input-group">

                  <div className="book-input-wrapper">

                    <FaUser />

                    <input
                      type="text"
                      name="fullName"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleChange
                      }
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
                      value={
                        formData.age
                      }
                      onChange={
                        handleChange
                      }
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

              {/* =================================================
                  WHATSAPP
              ================================================= */}

              <div className="book-input-group">

                <div className="book-input-wrapper">

                  <FaWhatsapp />

                  <input
                    type="tel"
                    name="mobile"
                    value={
                      formData.mobile
                    }
                    onChange={
                      handleChange
                    }
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

              {/* =================================================
                  GENDER
              ================================================= */}

              <div className="book-input-group">

                <div className="book-input-wrapper">

                  <FaVenusMars />

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
                      Select Gender
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

                </div>

                {errors.gender && (
                  <small>
                    {errors.gender}
                  </small>
                )}

              </div>

              {/* =================================================
                  DATE
              ================================================= */}

              <div className="book-input-group">

                <div className="book-input-wrapper">

                  <FaCalendarAlt />

                  <input
                    type="date"
                    name="date"
                    value={
                      formData.date
                    }
                    onChange={
                      handleChange
                    }
                    min={today}
                  />

                </div>

                {errors.date && (
                  <small>
                    {errors.date}
                  </small>
                )}

              </div>

              {/* =================================================
                  TIME SLOT
              ================================================= */}

              <div className="book-input-group">

                <div className="book-input-wrapper">

                  <FaClock />

                  <select
                    name="time"
                    value={
                      formData.time
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

                </div>

                {errors.time && (
                  <small>
                    {errors.time}
                  </small>
                )}

              </div>

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <button
                type="submit"
                className="book-submit-btn"
                disabled={loading}
              >

                {loading
                  ? "SUBMITTING..."
                  : "SUBMIT APPOINTMENT"}

              </button>

            </form>

          </div>

        </section>

      </main>
    </>
  );
};

export default BookAppointment;