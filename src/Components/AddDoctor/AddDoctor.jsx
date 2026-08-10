import React, { useState } from "react";
import "./AddDoctor.css";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config/api";

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    doctorName: "",
    mobile: "",
    hospitalName: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers in mobile field
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.doctorName.trim() ||
      !formData.mobile.trim() ||
      !formData.hospitalName.trim() ||
      !formData.address.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);

      // Get JWT Token
      const token =
        Cookies.get("token") || localStorage.getItem("token");

      if (!token) {
        alert("Login session expired. Please login again.");
        return;
      }

      // ===========================
      // Console Logs
      // ===========================
      console.log("========== ADD DOCTOR REQUEST ==========");
      console.log("API URL:", BASE_URL);
      console.log("JWT Token:", token);

      const requestBody = {
        doctorName: formData.doctorName,
        mobile: formData.mobile,
        hospitalName: formData.hospitalName,
        address: formData.address,
      };

      console.log("Request Body:", requestBody);

      // ===========================
      // API Call
      // ===========================
     const response = await fetch(`${BASE_URL}/api/doctor`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(requestBody),
});

      console.log("Response Status:", response.status);

      const data = await response.json();

      console.log("API Response:", data);
      console.log("===================================");

      if (response.ok && data.success) {
        alert(data.message || "Doctor added successfully.");

        setFormData({
          doctorName: "",
          mobile: "",
          hospitalName: "",
          address: "",
        });
      } else {
        alert(data.message || "Unable to add doctor.");
      }
    } catch (error) {
      console.error("========== ADD DOCTOR ERROR ==========");
      console.error("Error:", error);
      console.log("Form Data:", formData);
      console.log("=====================================");
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-doctor-form">
      <div className="card-doctor-form">
        <h2 className="heading-doctor-form">Add Doctor</h2>

        <form className="form-doctor-form" onSubmit={handleSubmit}>
          {/* Doctor Name */}
          <div className="group-doctor-form">
            <label className="label-doctor-form">Doctor Name</label>

            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Enter doctor name"
              className="input-doctor-form"
              required
            />
          </div>

          {/* Mobile */}
          <div className="group-doctor-form">
            <label className="label-doctor-form">Mobile</label>

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="input-doctor-form"
              maxLength={10}
              required
            />
          </div>

          {/* Hospital Name */}
          <div className="group-doctor-form">
            <label className="label-doctor-form">Hospital Name</label>

            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Enter hospital name"
              className="input-doctor-form"
              required
            />
          </div>

          {/* Address */}
          <div className="group-doctor-form">
            <label className="label-doctor-form">Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="textarea-doctor-form"
              rows={4}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="button-doctor-form"
            disabled={loading}
          >
            {loading ? "Adding Doctor..." : "Add Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
}