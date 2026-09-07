import React, { useState } from "react";
import {
  FaLock,
  FaKey,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { toast } from "react-toastify";

import "./AdminChangePassword.css";

const AdminChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //====================================================
  // HANDLE INPUT CHANGE
  //====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  //====================================================
  // VALIDATE PASSWORD
  //====================================================

  const validatePassword = () => {
    if (!formData.currentPassword.trim()) {
      toast.error("Current password is required.");
      return false;
    }

    if (!formData.newPassword.trim()) {
      toast.error("New password is required.");
      return false;
    }

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return false;
    }

    if (!formData.confirmPassword.trim()) {
      toast.error("Please confirm your new password.");
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return false;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error(
        "New password must be different from current password."
      );
      return false;
    }

    return true;
  };

  //====================================================
  // SAVE / CHANGE PASSWORD
  //====================================================

  const handleSave = () => {
    const isValid = validatePassword();

    if (!isValid) {
      return;
    }

    /*
      API CALL WILL BE ADDED HERE LATER.

      Example:

      await changeAdminPassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
    */

    toast.success("Password changed successfully!");

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  //====================================================
  // CANCEL
  //====================================================

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    toast.info("Password change cancelled.");
  };

  return (
    <div className="admin-change-password-page">

      {/*================================================
          PAGE HEADER
      =================================================*/}

      <div className="admin-change-password-header">

        <div className="admin-change-password-header-content">

          <h1>
            Change Password
          </h1>

          <p>
            Update your administrator account password
          </p>

        </div>

      </div>


      {/*================================================
          MAIN PASSWORD CARD
      =================================================*/}

      <div className="admin-change-password-card">

        {/*================================================
            CARD HEADER
        =================================================*/}

        <div className="admin-change-password-card-header">

          <div className="admin-change-password-icon">
            <FaLock />
          </div>

          <div className="admin-change-password-title">

            <h2>
              Admin Password
            </h2>

            <p>
              Keep your administrator account secure
            </p>

          </div>

        </div>


        {/*================================================
            PASSWORD FORM
        =================================================*/}

        <div className="admin-change-password-form">

          {/* CURRENT PASSWORD */}

          <div className="admin-change-password-form-group">

            <label>
              Current Password
            </label>

            <div className="admin-change-password-input-wrapper">

              <FaLock className="admin-change-password-input-icon" />

              <input
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
              />

              <button
                type="button"
                className="admin-change-password-eye-button"
                onClick={() =>
                  setShowCurrentPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showCurrentPassword
                    ? "Hide current password"
                    : "Show current password"
                }
              >
                {showCurrentPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>


          {/* NEW PASSWORD */}

          <div className="admin-change-password-form-group">

            <label>
              New Password
            </label>

            <div className="admin-change-password-input-wrapper">

              <FaKey className="admin-change-password-input-icon" />

              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />

              <button
                type="button"
                className="admin-change-password-eye-button"
                onClick={() =>
                  setShowNewPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showNewPassword
                    ? "Hide new password"
                    : "Show new password"
                }
              >
                {showNewPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <small>
              Password must contain at least 6 characters.
            </small>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="admin-change-password-form-group">

            <label>
              Confirm New Password
            </label>

            <div className="admin-change-password-input-wrapper">

              <FaShieldAlt className="admin-change-password-input-icon" />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />

              <button
                type="button"
                className="admin-change-password-eye-button"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>


          {/*================================================
              PASSWORD SECURITY INFORMATION
          =================================================*/}

          <div className="admin-change-password-security">

            <div className="admin-change-password-security-icon">
              <FaShieldAlt />
            </div>

            <div>

              <h3>
                Password Security
              </h3>

              <p>
                Use a strong password that you do not use
                on another website or application.
              </p>

            </div>

          </div>


          {/*================================================
              ACTION BUTTONS
          =================================================*/}

          <div className="admin-change-password-actions">

            <button
              type="button"
              className="admin-change-password-cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="button"
              className="admin-change-password-save-button"
              onClick={handleSave}
            >
              <FaLock />
              Change Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminChangePassword;