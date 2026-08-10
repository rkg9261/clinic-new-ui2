import React, { useState } from "react";
import "./Appointment.css";
import { BASE_URL } from "../../config/api";

const Appointment = () => {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  // Handle Input Change

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

  // Validation

  const validateForm = () => {

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile =
        "Mobile number must be 10 digits";
    }

if (!formData.appointmentDate) {
  newErrors.appointmentDate = "Date is required";
}

if (!formData.appointmentTime) {
  newErrors.appointmentTime = "Time is required";
}
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit

const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {

    setLoading(true);
    console.log("Sending data:", formData)

 const response = await fetch(
  `${BASE_URL}/api/appointment/create`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }
);

    const data = await response.json();

    if (response.ok) {

      console.log("Appointment Created:", data);

      alert("Appointment Submitted Successfully!");

      setFormData({
        name: "",
        age: "",
        gender: "",
        mobile: "",
        appointmentDate: "",
    appointmentTime: "",
      });

    } else {

      alert(
        data.message ||
        "Failed to create appointment"
      );
    }

  } catch (error) {

    console.error("API Error:", error);

    alert(
      "Something went wrong. Please try again."
    );

  } finally {

    setLoading(false);
  }
};

  // // Cancel

  // const handleCancel = () => {

  //   const confirmCancel =
  //     window.confirm(
  //       "Are you sure you want to cancel?"
  //     );

  //   if (confirmCancel) {

  //     setFormData({
  //       name: "",
  //       age: "",
  //       gender: "",
  //       mobile: "",
  //       address: "",
  //       problem: "",
  //     });

  //     alert("Appointment Cancelled");
  //   }
  // };

  return (

    <div
      className="appointment-container" id="appointment">
    
      <div className="appointment-form">

        <h2>Book Appointment</h2>

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <div className="input-group">

            <input   type="text"  name="name"   value={formData.name} onChange={handleChange} 
             placeholder=""/>
            <label>Name</label>
             {errors.name && (
              <span className="error">
                {errors.name}
              </span>
            )}

          </div>

                     {/* Age */}

          <div className="input-group">

            <input  type="number" name="age"   value={formData.age}
              onChange={handleChange} placeholder=""/>
             <label>Age</label>
              {errors.age && (
              <span className="error">
                {errors.age}
              </span>
            )}

          </div>
                    
                      {/* Gender */}

          <div className="input-group">

            <select  name="gender"    value={formData.gender}
               onChange={handleChange}>
               <option value="" disabled hidden></option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <label className="select-label-gender"> Gender</label>
             {errors.gender && (
              <span className="error">
                {errors.gender}
              </span>
            )}

          </div>
                  
                    {/* Mobile */}

          <div className="input-group">

            <input  type="tel"  name="mobile"  
              maxLength="10" value={formData.mobile} onChange={handleChange}  placeholder=""/>
            <label>Whatsapp Number</label>
             {errors.mobile && (
              <span className="error">
                {errors.mobile}
              </span>
            )}

          </div>
          
                 {/* Date */}

        <div className="input-group">

           <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} />
        <label className="date-label">Appointment Date</label>
            {errors.appointmentDate && (
             <span className="error">
              {errors.appointmentDate}
         </span>
      )}

  </div>

                  {/* Time */}

               <div className="input-group">

             <select  name="appointmentTime"  value={formData.appointmentTime}  onChange={handleChange} className="input-group-time" >


          <option value="">Select Time Slot</option>

            <option value="09:00 AM">09:00 AM</option>
            <option value="09:30 AM">09:30 AM</option>
           <option value="10:00 AM">10:00 AM</option>
            <option value="10:30 AM">10:30 AM</option>
            <option value="11:00 AM">11:00 AM</option>
          <option value="11:30 AM">11:30 AM</option>
          <option value="12:00 PM">12:00 PM</option>
             <option value="12:30 PM">12:30 PM</option>

             <option value="02:00 PM">02:00 PM</option>
          <option value="02:30 PM">02:30 PM</option>
           <option value="03:00 PM">03:00 PM</option>
            <option value="03:30 PM">03:30 PM</option>
             <option value="04:00 PM">04:00 PM</option>
             <option value="04:30 PM">04:30 PM</option>
           <option value="05:00 PM">05:00 PM</option>
               <option value="05:30 PM">05:30 PM</option>
               <option value="06:00 PM">06:00 PM</option>
  </select>

  <label className="date-label">
    Appointment Time
  </label>

  {errors.appointmentTime && (
    <span className="error">
      {errors.appointmentTime}
    </span>
  )}

</div>                                     
  
          {/* Buttons */}

          <div className="button-group">

            {/* <button  type="button"  className="cancel-btn"   onClick={handleCancel}> Cancel </button> */}
    
      <button  type="submit"  className="submit-btn-appointment"  disabled=       {loading}>
         {loading ? "Submitting...": "SUBMIT"}
       </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Appointment;