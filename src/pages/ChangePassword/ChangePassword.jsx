import React, { useState } from "react";
import "./ChangePassword.css";
import { toast } from "react-toastify";

const ChangePassword = () => {

  
  // FORM DATA
  

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  
  // ERRORS
  

  const [errors, setErrors] = useState({});


  
  // PASSWORD VISIBILITY
  

  const [showCurrentPassword, setShowCurrentPassword] =  useState(false);
  

  const [showNewPassword, setShowNewPassword] = useState(false);
   

  const [showConfirmPassword, setShowConfirmPassword] =    useState(false);



  
  // HANDLE CHANGE
  

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

  };


  
  // VALIDATION
  

  const validateForm = () => {

    const newErrors = {};


    if (!formData.currentPassword.trim()) {

      newErrors.currentPassword =
        "Current password is required.";

    }


    if (!formData.newPassword.trim()) {

      newErrors.newPassword =
        "New password is required.";

    } else if (formData.newPassword.length < 6) {

      newErrors.newPassword =
        "Password must be at least 6 characters.";

    }


    if (!formData.confirmPassword.trim()) {

      newErrors.confirmPassword =
        "Confirm password is required.";

    } else if (
      formData.newPassword !==
      formData.confirmPassword
    ) {

      newErrors.confirmPassword =
        "Passwords do not match.";

    }


    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword ===
      formData.newPassword
    ) {

      newErrors.newPassword =
        "New password must be different from current password.";

    }


    return newErrors;

  };


  
  // SUBMIT
  

  const handleSubmit = (e) => {

    e.preventDefault();

    const validation = validateForm();


    if (Object.keys(validation).length > 0) {

      setErrors(validation);

      return;

    }


    setErrors({});




    console.log("Change Password Data:", {
      currentPassword:
        formData.currentPassword,

      newPassword:
        formData.newPassword,
    });


    toast.success("Password changed successfully!");


    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  };


  
  // CANCEL
  

  const handleCancel = () => {

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setErrors({});

  };


  
  // BACK
  

  const handleBack = () => {

    window.history.back();

  };

  

  return (

    <div className="change-password-page">


      {/* ======================================
          HEADER
      ====================================== */}

      <div className="change-password-header">

        <button
          type="button"
          className="back-button"
          onClick={handleBack}
        >
          ← Back
        </button>


        <div>

          <h1>
            Change Password
          </h1>

          <p>
            Update your account password
          </p>

        </div>

      </div>


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="change-password-container">


        {/* ====================================
            LEFT INFORMATION
        ==================================== */}

        <div className="password-info">

          <div className="security-icon">
            🔐
          </div>


          <h2>
            Keep Your Account Secure
          </h2>


          <p>
            Change your password regularly to
            keep your account secure.
          </p>


          <div className="password-rules">

            <div>
              ✓ Minimum 6 characters
            </div>

            <div>
              ✓ Use a unique password
            </div>

            <div>
              ✓ Do not share your password
            </div>

          </div>

        </div>


        {/* ====================================
            FORM
        ==================================== */}

        <div className="password-card">


          <div className="password-card-header">

            <div className="lock-icon">
              🔒
            </div>

            <div>

              <h2>
                Password Settings
              </h2>

              <p>
                Enter your current password and
                create a new password.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleSubmit}
            className="password-form"
          >


            {/* =================================
                CURRENT PASSWORD
            ================================= */}

            <div className="form-group">

              <label>
                Current Password <span>*</span>
              </label>


              <div className="password-input">

                <input
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  name="currentPassword"
                  value={
                    formData.currentPassword
                  }
                  onChange={handleChange}
                  placeholder="Enter current password"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      !showCurrentPassword
                    )
                  }
                >

                  {showCurrentPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>


              {errors.currentPassword && (

                <small className="error">
                  {errors.currentPassword}
                </small>

              )}

            </div>


            {/* =================================
                NEW PASSWORD
            ================================= */}

            <div className="form-group">

              <label>
                New Password <span>*</span>
              </label>


              <div className="password-input">

                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  name="newPassword"
                  value={
                    formData.newPassword
                  }
                  onChange={handleChange}
                  placeholder="Enter new password"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                >

                  {showNewPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>


              {errors.newPassword && (

                <small className="error">
                  {errors.newPassword}
                </small>

              )}

            </div>


            {/* =================================
                CONFIRM PASSWORD
            ================================= */}

            <div className="form-group">

              <label>
                Confirm Password <span>*</span>
              </label>


              <div className="password-input">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >

                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>


              {errors.confirmPassword && (

                <small className="error">
                  {errors.confirmPassword}
                </small>

              )}

            </div>


            {/* =================================
                BUTTONS
            ================================= */}

            <div className="password-buttons">

              <button
                type="submit"
                className="save-password-button"
              >
                Change Password
              </button>


              <button
                type="button"
                className="cancel-password-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

            </div>


          </form>

        </div>

      </div>

    </div>

  );

};

export default ChangePassword;