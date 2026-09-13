import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaUserTag,
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import "./Profile.css";
import { toast } from "react-toastify";

const Profile = () => {

  // USER STATE


  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    id: "",
  });


  // EDIT MODE


  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });


  // LOAD USER


  useEffect(() => {
    loadUser();
  }, []);


  // LOAD USER FROM LOCAL STORAGE


  const loadUser = () => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        return;
      }

      const parsedUser =
        JSON.parse(storedUser);

      console.log(
        "PROFILE USER:",
        parsedUser
      );

      const userData = {
        name:
          parsedUser.name ??
          parsedUser.fullName ??
          parsedUser.userName ??
          "",

        email:
          parsedUser.email ??
          "",

        mobile:
          parsedUser.mobile ??
          parsedUser.mobileNumber ??
          parsedUser.phone ??
          "",

        role:
          parsedUser.role ??
          "",

        id:
          parsedUser.id ??
          parsedUser.userId ??
          parsedUser.userID ??
          "",
      };

      setUser(userData);

      setFormData({
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
      });

    } catch (error) {

      console.error(
        "PROFILE LOAD ERROR:",
        error
      );

    }
  };


  // HANDLE CHANGE


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // SAVE PROFILE


  const handleSave = () => {

    try {

      const storedUser =
        localStorage.getItem("user");

      let oldUser = {};

      if (storedUser) {
        oldUser = JSON.parse(storedUser);
      }

      const updatedUser = {
        ...oldUser,

        name:
          formData.name.trim(),

        email:
          formData.email.trim(),

        mobile:
          formData.mobile.trim(),
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser((previous) => ({
        ...previous,

        name:
          formData.name.trim(),

        email:
          formData.email.trim(),

        mobile:
          formData.mobile.trim(),
      }));

      setEditMode(false);

      toast.success(
        "Profile updated successfully!"
      );

    } catch (error) {

      console.error(
        "PROFILE UPDATE ERROR:",
        error
      );

      toast.error(
        "Failed to update profile."
      );

    }
  };


  // CANCEL EDIT


  const handleCancel = () => {

    setFormData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });

    setEditMode(false);

  };


  // GO BACK


  const handleBack = () => {

    window.history.back();

  };


  // GET INITIAL


  const getInitial = () => {

    if (!user.name) {
      return "U";
    }

    return user.name
      .charAt(0)
      .toUpperCase();

  };





  return (

    <div className="profile-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="profile-page-header">

        <button
          type="button"
          className="profile-back-button"
          onClick={handleBack}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <div>

          <h1>
            My Profile
          </h1>

          <p>
            View and manage your profile information
          </p>

        </div>

      </div>


      {/* =================================================
          PROFILE CONTAINER
      ================================================= */}

      <div className="profile-container">

        {/* =================================================
            PROFILE TOP
        ================================================= */}

        <div className="profile-top-card">

          <div className="profile-avatar">

            {getInitial()}

          </div>

          <div className="profile-main-info">

            <h2>
              {user.name || "User"}
            </h2>

            <p>
              {user.email || "Email not available"}
            </p>

            <span className="profile-role-badge">

              {user.role || "USER"}

            </span>

          </div>


          {/* EDIT BUTTON */}

          {!editMode && (

            <button
              type="button"
              className="profile-edit-button"
              onClick={() =>
                setEditMode(true)
              }
            >

              <FaEdit />

              Edit Profile

            </button>

          )}

        </div>


        {/* =================================================
            DETAILS CARD
        ================================================= */}

        <div className="profile-details-card">

          <div className="profile-card-title">

            <div>

              <h3>
                Personal Information
              </h3>

              <p>
                Your registered account details
              </p>

            </div>

          </div>


          {/* =================================================
              DETAILS GRID
          ================================================= */}

          <div className="profile-details-grid">


            {/* NAME */}

            <div className="profile-detail-item">

              <div className="profile-detail-icon">

                <FaUser />

              </div>

              <div className="profile-detail-content">

                <label>
                  Full Name
                </label>

                {editMode ? (

                  <input
                    type="text"
                    name="name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter full name"
                  />

                ) : (

                  <span>
                    {user.name || "-"}
                  </span>

                )}

              </div>

            </div>


            {/* EMAIL */}

            <div className="profile-detail-item">

              <div className="profile-detail-icon">

                <FaEnvelope />

              </div>

              <div className="profile-detail-content">

                <label>
                  Email Address
                </label>

                {editMode ? (

                  <input
                    type="email"
                    name="email"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter email"
                  />

                ) : (

                  <span>
                    {user.email || "-"}
                  </span>

                )}

              </div>

            </div>


            {/* MOBILE */}

            <div className="profile-detail-item">

              <div className="profile-detail-icon">

                <FaPhone />

              </div>

              <div className="profile-detail-content">

                <label>
                  Mobile Number
                </label>

                {editMode ? (

                  <input
                    type="text"
                    name="mobile"
                    value={
                      formData.mobile
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter mobile number"
                  />

                ) : (

                  <span>
                    {user.mobile || "-"}
                  </span>

                )}

              </div>

            </div>


            {/* ROLE */}

            <div className="profile-detail-item">

              <div className="profile-detail-icon">

                <FaUserTag />

              </div>

              <div className="profile-detail-content">

                <label>
                  Role
                </label>

                <span>
                  {user.role || "-"}
                </span>

              </div>

            </div>


            {/* USER ID */}

            <div className="profile-detail-item">

              <div className="profile-detail-icon">

                <FaIdCard />

              </div>

              <div className="profile-detail-content">

                <label>
                  User ID
                </label>

                <span>
                  {user.id || "-"}
                </span>

              </div>

            </div>


          </div>


          {/* =================================================
              EDIT BUTTONS
          ================================================= */}

          {editMode && (

            <div className="profile-action-buttons">

              <button
                type="button"
                className="profile-save-button"
                onClick={handleSave}
              >

                <FaSave />

                Save Changes

              </button>


              <button
                type="button"
                className="profile-cancel-button"
                onClick={handleCancel}
              >

                <FaTimes />

                Cancel

              </button>

            </div>

          )}

        </div>


        {/* =================================================
            ACCOUNT INFORMATION
        ================================================= */}

        <div className="profile-account-card">

          <div className="profile-account-icon">

            <FaUser />

          </div>

          <div className="profile-account-content">

            <h3>
              Account Information
            </h3>

            <p>
              Your profile information is connected
              with your clinic account.
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;