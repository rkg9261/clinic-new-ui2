import React, { useState } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaEnvelope,
  FaUserShield,
  FaIdCard,
} from "react-icons/fa";

import { toast } from "react-toastify";

import "./AdminProfile.css";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [adminProfile, setAdminProfile] = useState({
    name: "System Admin",
    email: "admin@clinic.com",
    role: "ADMIN",
    id: "1",
  });

  const [formData, setFormData] = useState({
    name: "System Admin",
    email: "admin@clinic.com",
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
  // EDIT ADMIN PROFILE
  //====================================================

  const handleEdit = () => {
    setFormData({
      name: adminProfile.name,
      email: adminProfile.email,
    });

    setIsEditing(true);
  };

  //====================================================
  // CANCEL
  //====================================================

  const handleCancel = () => {
    setFormData({
      name: adminProfile.name,
      email: adminProfile.email,
    });

    setIsEditing(false);

    toast.info("Profile editing cancelled.");
  };

  //====================================================
  // SAVE ADMIN PROFILE
  //====================================================

  const handleSave = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name) {
      toast.error("Admin name is required.");
      return;
    }

    if (!email) {
      toast.error("Admin email is required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setAdminProfile((previous) => ({
      ...previous,
      name,
      email,
    }));

    setIsEditing(false);

    toast.success("Admin profile updated successfully!");
  };

  return (
    <div className="admin-profile-page">

      {/*================================================
          PAGE HEADER
      =================================================*/}

      <div className="admin-profile-header">

        <div className="admin-profile-header-content">

          <h1>
            Admin Profile
          </h1>

          <p>
            Manage administrator account information
          </p>

        </div>

        {!isEditing && (
          <button
            type="button"
            className="admin-profile-edit-button"
            onClick={handleEdit}
          >
            <FaEdit />
            Edit Profile
          </button>
        )}

      </div>


      {/*================================================
          MAIN PROFILE CARD
      =================================================*/}

      <div className="admin-profile-card">

        {/*================================================
            PROFILE HEADER
        =================================================*/}

        <div className="admin-profile-card-header">

          <div className="admin-profile-avatar">
            <FaUserCircle />
          </div>

          <div className="admin-profile-main-info">

            <h2>
              {adminProfile.name}
            </h2>

            <p>
              {adminProfile.email}
            </p>

            <span className="admin-profile-role">
              {adminProfile.role}
            </span>

          </div>

        </div>


        {/*================================================
            VIEW MODE
        =================================================*/}

        {!isEditing && (

          <div className="admin-profile-information">

            {/* NAME */}

            <div className="admin-profile-info-item">

              <div className="admin-profile-info-icon">
                <FaUserCircle />
              </div>

              <div className="admin-profile-info-text">

                <span>
                  Admin Name
                </span>

                <strong>
                  {adminProfile.name}
                </strong>

              </div>

            </div>


            {/* EMAIL */}

            <div className="admin-profile-info-item">

              <div className="admin-profile-info-icon">
                <FaEnvelope />
              </div>

              <div className="admin-profile-info-text">

                <span>
                  Email Address
                </span>

                <strong>
                  {adminProfile.email}
                </strong>

              </div>

            </div>


            {/* ROLE */}

            <div className="admin-profile-info-item">

              <div className="admin-profile-info-icon">
                <FaUserShield />
              </div>

              <div className="admin-profile-info-text">

                <span>
                  Admin Role
                </span>

                <strong>
                  {adminProfile.role}
                </strong>

              </div>

            </div>


            {/* ID */}

            <div className="admin-profile-info-item">

              <div className="admin-profile-info-icon">
                <FaIdCard />
              </div>

              <div className="admin-profile-info-text">

                <span>
                  Admin ID
                </span>

                <strong>
                  {adminProfile.id}
                </strong>

              </div>

            </div>

          </div>

        )}


        {/*================================================
            EDIT MODE
        =================================================*/}

        {isEditing && (

          <div className="admin-profile-form">

            {/* ADMIN NAME */}

            <div className="admin-profile-form-group">

              <label>
                Admin Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter admin name"
              />

            </div>


            {/* EMAIL */}

            <div className="admin-profile-form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />

            </div>


            {/* ROLE */}

            <div className="admin-profile-form-group">

              <label>
                Admin Role
              </label>

              <input
                type="text"
                value={adminProfile.role}
                disabled
              />

              <small>
                Admin role cannot be changed.
              </small>

            </div>


            {/* ADMIN ID */}

            <div className="admin-profile-form-group">

              <label>
                Admin ID
              </label>

              <input
                type="text"
                value={adminProfile.id}
                disabled
              />

              <small>
                Admin ID cannot be changed.
              </small>

            </div>


            {/* ACTION BUTTONS */}

            <div className="admin-profile-actions">

              <button
                type="button"
                className="admin-profile-cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-profile-save-button"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>

          </div>

        )}

      </div>


      {/*================================================
          ADMIN ACCOUNT INFORMATION
      =================================================*/}

      <div className="admin-profile-account-card">

        <div className="admin-profile-account-icon">
          <FaUserShield />
        </div>

        <div className="admin-profile-account-content">

          <h3>
            Administrator Account
          </h3>

          <p>
            This account has administrator access to the
            clinic management system.
          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminProfile;