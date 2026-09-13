import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "WhatsApp Number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Only numbers allowed";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Enquiry Form Data:", formData);

    alert("Enquiry Submitted Successfully!");

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="contact" id="contact">

      <div className="contact-title">
        <p>CONTACT US</p>
        <h2>Get in Touch</h2>
      </div>

      <div className="contact-container">

        {/* Left Side */}

        <div className="contact-left">

          <h3>
            Send us a message
            <span className="mail-icon">📩</span>
          </h3>

          <p>
            Krishna Advance Physio Clinic is committed to providing
            professional physiotherapy care and personalized treatment
            for every patient.
          </p>

          <ul className="contact-details">

            <li>
              <span>📧</span>
              krishnaadvancephysioclinic@gmail.com
            </li>

            <li>
              <span>📞</span>
              +91 7467067466
            </li>

            <li>
              <span>📍</span>
              M-38, Shiv Mandir Road, Hakikat Nagar,
              Saharanpur, Uttar Pradesh
            </li>

            <li>
              <span>🕒</span>
              Monday - Saturday : 10:00 AM - 8:00 PM
            </li>

          </ul>

        </div>

        {/* Right Side Form */}

        <div className="contact-right">

          <h3>Enquiry Form</h3>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                maxLength="50"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <span className="error">
                  {errors.fullName}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Enter WhatsApp Number"
                maxLength="25"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="error">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                maxLength="50"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Write Your Message"
                maxLength="500"
                rows="5"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <span className="error">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="enquiry-btn"
            >
              Submit Enquiry
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default Contact;