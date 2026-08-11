import React, { useState } from "react";
import "./AppointmentForm.css";

import {
  FaUser,
  FaPhoneAlt,
  FaCalendarAlt,
  FaClock,
  FaVenusMars
} from "react-icons/fa";

const AppointmentForm = () => {
    const [errors, setErrors] = useState({});

const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    mobile: "",
    gender: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

const today = new Date().toISOString().split("T")[0];
const handleSubmit = (e) => {

    e.preventDefault();

    let newErrors = {};

    if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
    }

    if (!formData.age) {
        newErrors.age = "Age is required";
    }
    else if (formData.age < 1 || formData.age > 120) {
        newErrors.age = "Enter a valid age";
    }

    if (!formData.mobile) {
        newErrors.mobile = "Mobile number is required";
    }
    else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
        newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.gender) {
        newErrors.gender = "Please select gender";
    }

    if (!formData.date) {
        newErrors.date = "Please select appointment date";
    }

    if (!formData.time) {
        newErrors.time = "Please select available time";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
        return;
    }

    console.log(formData);

    setSuccess("Appointment booked successfully!");

    setFormData({
        fullName:"",
        age:"",
        mobile:"",
        gender:"",
        date:"",
        time:""
    });

    setTimeout(() => {
        setSuccess("");
    },3000);

};

  return (

    <section className="appointment-section">
      <div className="appointment-heading">

    <p className="appointment-subtitle">
        SCHEDULE YOUR VISIT
    </p>

    <h2 className="appointment-title">
        Book Your <span>Appointment</span> Today
    </h2>

    <p className="appointment-description">
        Begin your journey toward a pain-free and healthier life with expert physiotherapy care. Schedule your appointment in just a few simple steps.
    </p>

</div>
   
           {/* Appointment card */}
      <div className="appointment-card">

        <h2>
          Take First Step Towards Recovery!
        </h2>

        <p>
          Book Appointment Now
        </p>

        {success &&

<div className="success-message">

    {success}

</div>

}

        <form onSubmit={handleSubmit}>

          {/* Row 1 */}

          <div className="appointment-row">

            <div className="appointment-input">

              {/* <FaUser /> */}

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName &&
             <p className="error-text">
              {errors.fullName}</p>
              }


            </div>

            <div className="appointment-input">

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
                 {errors.age &&
               <p className="error-text">
             {errors.age}</p>}


            </div>

          </div>

          {/* Row 2 */}

          <div className="appointment-row">

            <div className="appointment-input">

              {/* <FaPhoneAlt /> */}

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number (WhatsApp Only)"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile &&
          <p className="error-text">
           {errors.mobile}</p>
           } 

            </div>

            <div className="appointment-input">

              {/* <FaVenusMars /> */}

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >

                <option value="">
                  Gender
                </option>

                <option>
                  Male
                </option>

                <option>
                  Female
                </option>

                <option>
                  Other
                </option>

              </select>
          {errors.gender &&
           <p className="error-text">
           {errors.gender}</p>
           }


            </div>

          </div>

          {/* Row 3 */}

          <div className="appointment-input full-width">

            {/* <FaCalendarAlt /> */}

            <input
              type="date"
              name="date"
              placeholder="Date"
              min={today}
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date &&
              <p className="error-text">
             {errors.date}</p>}

          </div>

          {/* Row 4 */}

          <div className="appointment-input full-width">

            <FaClock />

            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
            >

              <option value="">
                Select Available Time
              </option>

              <option>
                09:00 AM
              </option>

              <option>
                10:00 AM
              </option>

              <option>
                11:00 AM
              </option>

              <option>
                12:00 PM
              </option>

              <option>
                02:00 PM
              </option>

              <option>
                03:00 PM
              </option>

              <option>
                04:00 PM
              </option>

              <option>
                05:00 PM
              </option>

            </select>

          </div>

          <button
            type="submit"
            className="appointment-btn"
          >
            SUBMIT
          </button>

        </form>

      </div>

    </section>

  );

};

export default AppointmentForm;