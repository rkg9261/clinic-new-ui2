import React, { useState, useRef } from "react";
import "./AddPatientForm.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";

export default function AddPatientForm() {
  const navigate = useNavigate();

  const formRef = useRef(null);

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================

  const handleFormKeyDown = (e) => {
    if (!formRef.current) return;

    const focusableElements = Array.from(
      formRef.current.querySelectorAll(
        'input:not([type="radio"]):not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])'
      )
    );

    const currentIndex = focusableElements.indexOf(
      document.activeElement
    );

    // DOWN ARROW - NEXT INPUT

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (currentIndex === -1) {
        focusableElements[0]?.focus();
        return;
      }

      const nextIndex =
        currentIndex < focusableElements.length - 1
          ? currentIndex + 1
          : 0;

      focusableElements[nextIndex]?.focus();
    }

    // UP ARROW - PREVIOUS INPUT

    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (currentIndex === -1) {
        focusableElements[
          focusableElements.length - 1
        ]?.focus();

        return;
      }

      const previousIndex =
        currentIndex > 0
          ? currentIndex - 1
          : focusableElements.length - 1;

      focusableElements[previousIndex]?.focus();
    }

    // ENTER - SUBMIT FORM

    if (e.key === "Enter") {
      if (e.target.tagName === "TEXTAREA") {
        return;
      }

      e.preventDefault();

      formRef.current.requestSubmit();
    }
  };

  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    problem: "",
    appointmentType: "",
    appointmentDate: "",
    appointmentTime: "",
    cash: "",
    upi: "",
    total: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================================
  // ERROR STATE
  // ==========================================

  const [errors, setErrors] = useState({});

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================================
  // PAYMENT CHANGE
  // ==========================================

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    const cash = Number( updatedData.cash || 0);

    const upi = Number( updatedData.upi || 0 );
    updatedData.total = cash + upi;

    setFormData(updatedData);

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

// ==========================================
// FOCUS FIRST ERROR FIELD
// ==========================================

const focusFirstErrorField = (errors) => {
  const fieldOrder = [
    "name",
    "age",
    "gender",
    "mobile",
    "address",
    "problem",
    "appointmentType",
    "appointmentDate",
    "appointmentTime",
    "cash",
    "upi",
  ];

  for (const field of fieldOrder) {
    if (errors[field]) {
      const element = formRef.current?.querySelector(
        `[name="${field}"]`
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setTimeout(() => {
          element.focus();
        }, 300);

        break;
      }
    }
  }
};

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    }

    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile =
        "Mobile number is required";
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile =
        "Mobile number must be 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!formData.problem.trim()) {
      newErrors.problem =
        "Problem is required";
    }

    if (!formData.appointmentType) {
      newErrors.appointmentType =
        "Appointment Type is required";
    }

    if (
      formData.appointmentType === "Standard"
    ) {
      if (!formData.appointmentDate) {
        newErrors.appointmentDate =
          "Date is required";
      }

      if (!formData.appointmentTime) {
        newErrors.appointmentTime =
          "Time Slot is required";
      }
    }

    if (
      formData.cash &&
      isNaN(formData.cash)
    ) {
      newErrors.cash =
        "Only numbers allowed";
    }

    if (
      formData.upi &&
      isNaN(formData.upi)
    ) {
      newErrors.upi =
        "Only numbers allowed";
    }

   setErrors(newErrors);

if (Object.keys(newErrors).length > 0) {
  focusFirstErrorField(newErrors);
  return false;
}

return true;
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const token =
        localStorage.getItem("token");

      const user =
        localStorage.getItem("user");

      console.log("Token:", token);

      console.log("User:", user);

      if (!token) {
        alert(
          "Token not found. Please login again."
        );

        navigate("/login");

        return;
      }

 const patientData = {
  name: formData.name,

  age: Number(formData.age),

  gender: formData.gender,

  mobileNumber: formData.mobile,

  address: formData.address,

  problem: formData.problem,

  appointmentType: formData.appointmentType,

  availableDate:
    formData.appointmentType === "Standard"
      ? formData.appointmentDate
      : null,

  availableTimeSlot:
    formData.appointmentType === "Standard"
      ? formData.appointmentTime
      : null,

  cash: Number(formData.cash || 0),

  upi: Number(formData.upi || 0),

  total: Number(formData.total || 0),
};
         

      console.log(
        "Sending Data:",
        patientData
      );

   const response = await fetch(
  `${BASE_URL}/api/clinic/patients`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(patientData),
  }
);

      const data = await response.json();

      console.log(
        "Status Code:",
        response.status
      );

      console.log(
        "API Response:",
        data
      );

      // ==========================================
      // 401 ERROR
      // ==========================================

      if (response.status === 401) {
        localStorage.removeItem("token");

        localStorage.removeItem("user");

        alert( "Session expired. Please login again.");
 
        navigate("/login");

        return;
      }

      // ==========================================
      // 403 ERROR
      // ==========================================

      if (response.status === 403) {
        alert(
          data.message ||
            "You do not have permission to add patient. Please login with Clinic account."
        );

        return;
      }

      // ==========================================
      // API ERROR
      // ==========================================

      if (!response.ok) {
        alert(
          data.message ||
            data.error ||
            "Failed to save patient"
        );

        return;
      }

      alert(
        "Patient Saved Successfully!"
      );

      // ==========================================
      // RESET FORM
      // ==========================================

      setFormData({
        name: "",
        age: "",
        gender: "",
        mobile: "",
        address: "",
        problem: "",
        appointmentType: "",
        appointmentDate: "",
        appointmentTime: "",
        cash: "",
        upi: "",
        total: "",
      });

      setErrors({});
    } catch (error) {
      console.error(
        "Add Patient Error:",
        error
      );

      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <>
      <div className="page-wrapper-addpatient">

                    {/* FORM */}

        <div className="patient-container-addpatient">

          <div className="patient-card">

            <h2>Add Patient</h2>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              onKeyDown={handleFormKeyDown}
            >

              {/* NAME */}

              <div className="form-group">

                <label>  Name <span>*</span> </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter Patient Name"
                  value={formData.name}
                  onChange={handleChange}
                />

                {errors.name && (
                  <p className="error-text">
                    {errors.name}
                  </p>
                )}

              </div>

              {/* AGE */}

              <div className="form-group">

                <label> Age <span>*</span> </label>

                <input
                  type="number"
                  name="age"
                  placeholder="Enter Age"
                  value={formData.age}
                  onChange={handleChange}
                />

                {errors.age && (
                  <p className="error-text">
                    {errors.age}
                  </p>
                )}

              </div>

              {/* GENDER */}

              <div className="form-group">

                <label> Gender <span>*</span>  </label>

                <select  name="gender"
                 value={formData.gender}
                  onChange={handleChange} >

                  <option value="">  Select Gender </option>

                  <option value="Male"> Male </option>

                  <option value="Female"> Female</option>

                  <option value="Other">Other </option>

                </select>

                {errors.gender && (
                  <p className="error-text">
                    {errors.gender}
                  </p>
                )}

              </div>

              {/* MOBILE */}

              <div className="form-group">

                <label>Mobile Number <span>*</span> </label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  maxLength="10"
                  value={formData.mobile}
                  onChange={handleChange}
                />

                {errors.mobile && (
                  <p className="error-text">
                    {errors.mobile}
                  </p>
                )}

              </div>

              {/* ADDRESS */}

              <div className="form-group full-width">

                <label>    Address <span>*</span> </label>

                <textarea
                  name="address"
                  rows="3"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                />

                {errors.address && (
                  <p className="error-text">
                    {errors.address}
                  </p>
                )}

              </div>

              {/* PROBLEM */}

              <div className="form-group full-width">

                <label>  Problem <span>*</span></label>

                <textarea
                  name="problem"
                  rows="4"
                  placeholder="Describe Patient Problem"
                  value={formData.problem}
                  onChange={handleChange}
                />

                {errors.problem && (
                  <p className="error-text">
                    {errors.problem}
                  </p>
                )}

              </div>

              {/* APPOINTMENT TYPE */}

              <div className="form-group">

                <label>   Appointment Type{" "}<span>*</span> </label>

                <div className="radio-group">

                  <label>

                    <input
                      type="radio"
                      name="appointmentType"
                      value="Standard"
                      checked={
                        formData.appointmentType ===
                        "Standard"
                      }
                      onChange={handleChange}
                    />

                    Standard

                  </label>

                  <label>

                    <input
                      type="radio"
                      name="appointmentType"
                      value="Instant"
                      checked={
                        formData.appointmentType ===
                        "Instant"
                      }
                      onChange={handleChange}
                    />

                    Instant

                  </label>

                </div>

                {errors.appointmentType && (
                  <p className="error-text">
                    {errors.appointmentType}
                  </p>
                )}

              </div>

              {/* STANDARD OPTIONS */}

              {formData.appointmentType ===
                "Standard" && (
                <>

                  {/* DATE */}

                  <div className="form-group">

                    <label>
                      Available Date{" "}
                      <span>*</span>
                    </label>

                    <input
                      type="date"
                      name="appointmentDate"
                      value={
                        formData.appointmentDate
                      }
                      onChange={handleChange}
                    />

                    {errors.appointmentDate && (
                      <p className="error-text">
                        {
                          errors.appointmentDate
                        }
                      </p>
                    )}

                  </div>

                  {/* TIME SLOT */}

                  <div className="form-group">

                    <label>
                      Available Time Slot{" "}
                      <span>*</span>
                    </label>

                    <select
                      name="appointmentTime"
                      value={
                        formData.appointmentTime
                      }
                      onChange={handleChange}>

                      <option value=""> Select Time  </option>

                      <option value="09:00 AM"> 09:00 AM</option>

                      <option value="10:00 AM"> 10:00 AM</option>

                      <option value="11:00 AM">11:00 AM </option>
 
                      <option value="12:00 PM"> 12:00 PM </option>

                      <option value="01:00 PM">01:00 PM </option>
    
                      <option value="02:00 PM"> 02:00 PM</option>

                      <option value="03:00 PM">03:00 PM</option>

                      <option value="04:00 PM"> 04:00 PM</option>
 
                      <option value="05:00 PM"> 05:00 PM </option>

                      <option value="06:00 PM">06:00 PM </option>

                      <option value="07:00 PM">07:00 PM  </option>
 
                      <option value="08:00 PM">08:00 PM</option>

                      <option value="09:00 PM">  09:00 PM   </option>

                    </select>

                    {errors.appointmentTime && (
                      <p className="error-text">
                        {
                          errors.appointmentTime
                        }
                      </p>
                    )}

                  </div>

                </>
              )}

              {/* ==========================================
                  PAYMENT SECTION
              ========================================== */}

              <div className="payment-section">

                <h3>Payment Details</h3>

                {/* AMOUNT - ONLY HEADING */}

                <div className="form-group">
                  <label>Amount</label>
                </div>

                {/* CASH */}

                <div className="form-group">

                  <label>Cash</label>

                  <input
                    type="number"
                    name="cash"
                    placeholder="Enter Cash Amount"
                    value={formData.cash}
                    onChange={
                      handlePaymentChange
                    }
                  />

                  {errors.cash && (
                    <p className="error-text">
                      {errors.cash}
                    </p>
                  )}

                </div>

                {/* UPI */}

                <div className="form-group">

                  <label>UPI</label>

                  <input
                    type="number"
                    name="upi"
                    placeholder="Enter UPI Amount"
                    value={formData.upi}
                    onChange={
                      handlePaymentChange
                    }
                  />

                  {errors.upi && (
                    <p className="error-text">
                      {errors.upi}
                    </p>
                  )}

                </div>

                {/* TOTAL */}

                <div className="form-group">

                  <label>Total</label>

                  <input
                    type="number"
                    value={formData.total}
                    readOnly
                  />

                </div>

              </div>

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Patient"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}