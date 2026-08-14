import React, { useState } from "react";
import "./BranchLogin.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaTimes } from "react-icons/fa";

import logo from "../../assets/logo.png";
import { BASE_URL } from "../../config/api";

const BranchLogin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [loginType, setLoginType] =
    useState("AdminClinic");

  const [loginData, setLoginData] = useState({
    email: "",
    fileNo: "",
    password: "",
  });

  /* =========================================================
     HANDLE INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================================================
     CLOSE BUTTON
     GO TO PUBLIC WEBSITE
  ========================================================= */

  const handleClose = () => {
    navigate("/");
  };

  /* =========================================================
     LOGIN TYPE CHANGE
  ========================================================= */

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);

    setLoginData({
      email: "",
      fileNo: "",
      password: "",
    });
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      (
        loginType === "Patient"
          ? !loginData.fileNo
          : !loginData.email
      ) ||
      !loginData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    /* =====================================================
       ADMIN / CLINIC LOGIN
    ===================================================== */

    if (loginType === "AdminClinic") {
      try {
        setLoading(true);

        const response = await fetch(
          `${BASE_URL}/api/auth/login`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email: loginData.email,
              password: loginData.password,
            }),
          }
        );

        const data = await response.json();

        console.log(
          "Login Response:",
          data
        );

        /* =================================================
           API ERROR
        ================================================= */

        if (!response.ok) {
          alert(
            data.message ||
            "Login Failed"
          );

          return;
        }

        /* =================================================
           RESPONSE VALIDATION
        ================================================= */

        if (
          !data?.data?.accessToken ||
          !data?.data?.refreshToken ||
          !data?.data?.user
        ) {
          console.error(
            "Invalid login response:",
            data
          );

          alert(
            "Invalid login response from server."
          );

          return;
        }

        /* =================================================
           TOKEN EXPIRY
        ================================================= */

        let expiryDate;

        if (
          data.data.refreshExpiresAt
        ) {
          expiryDate =
            new Date(
              data.data.refreshExpiresAt
            );
        } else {
          expiryDate =
            new Date(
              Date.now() +
              7 *
              24 *
              60 *
              60 *
              1000
            );
        }

        /* =================================================
           SAVE TOKEN COOKIE
        ================================================= */

        Cookies.set(
          "token",
          data.data.accessToken,
          {
            expires: expiryDate,
            secure: true,
            sameSite: "Lax",
          }
        );

        /* =================================================
           SAVE REFRESH TOKEN COOKIE
        ================================================= */

        Cookies.set(
          "refreshToken",
          data.data.refreshToken,
          {
            expires: expiryDate,
            secure: true,
            sameSite: "Lax",
          }
        );

        /* =================================================
           SAVE USER COOKIE
        ================================================= */

        Cookies.set(
          "user",
          JSON.stringify(
            data.data.user
          ),
          {
            expires: expiryDate,
            secure: true,
            sameSite: "Lax",
          }
        );

        /* =================================================
           LOCAL STORAGE
        ================================================= */

        localStorage.setItem(
          "token",
          data.data.accessToken
        );

        localStorage.setItem(
          "refreshToken",
          data.data.refreshToken
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.data.user
          )
        );

        /* =================================================
           DEBUG
        ================================================= */

        console.log(
          "Access Token:",
          localStorage.getItem(
            "token"
          )
        );

        console.log(
          "Refresh Token:",
          localStorage.getItem(
            "refreshToken"
          )
        );

        console.log(
          "User:",
          data.data.user
        );

        /* =================================================
           ROLE
        ================================================= */

        const role =
          data.data.user.role;

        console.log(
          "Logged User Role:",
          role
        );

        /* =================================================
           NAVIGATION
        ================================================= */

        if (
          role?.toLowerCase() ===
          "admin"
        ) {
          navigate(
            "/dashboard-admin"
          );
        } else {
          navigate(
            "/dashboard-clinic"
          );
        }

      } catch (error) {

        console.error(
          "Login Error:",
          error
        );

        alert(
          "Server Error. Please try again."
        );

      } finally {

        setLoading(false);

      }

      return;
    }

    /* =====================================================
       PATIENT LOGIN
    ===================================================== */

    if (
      loginType === "Patient"
    ) {

      /*
        Temporary patient login.
        Replace with patient API later.
      */

      if (
        loginData.fileNo ===
          "P001" &&
        loginData.password ===
          "123456"
      ) {

        navigate(
          "/patientdetails"
        );

        return;
      }

      alert(
        "Invalid Patient Login"
      );
    }
  };

  return (
    <div className="login-page">

      {/* ===================================================
          MAIN LOGIN CARD
      =================================================== */}

      <div className="modern-login-card">

        {/* =================================================
            CLINIC HEADER
        ================================================= */}

        <div className="login-header">

          <img
            src={logo}
            alt="Krishna Advance Physio Clinic"
            className="login-logo"
          />

          <h2>
            Krishna Advance Physio Clinic
          </h2>

          <p>
            Physiotherapy · Scoliosis · Joint Care
          </p>

        </div>


        {/* =================================================
            WHITE WELCOME CARD
        ================================================= */}

        <div className="login-box-new">

          {/* ===============================================
              CLOSE BUTTON
              INSIDE WHITE CARD
          =============================================== */}

          <button
            type="button"
            className="close-btn-login"
            onClick={handleClose}
            aria-label="Go to website"
            title="Back to website"
          >
            <FaTimes />
          </button>


          {/* ===============================================
              WELCOME
          =============================================== */}

          <h3>
            Welcome
          </h3>

          <span className="login-subtitle">
            Choose how you want to sign in
          </span>


          {/* ===============================================
              LOGIN TYPE
          =============================================== */}

          <div className="radio-group-login">

            <label
              className={
                loginType ===
                "AdminClinic"
                  ? "active-login-type"
                  : ""
              }
            >

              <input
                type="radio"
                value="AdminClinic"
                checked={
                  loginType ===
                  "AdminClinic"
                }
                onChange={
                  handleLoginTypeChange
                }
              />

              <span>
                Admin / Clinic
              </span>

            </label>


            <label
              className={
                loginType ===
                "Patient"
                  ? "active-login-type"
                  : ""
              }
            >

              <input
                type="radio"
                value="Patient"
                checked={
                  loginType ===
                  "Patient"
                }
                onChange={
                  handleLoginTypeChange
                }
              />

              <span>
                Patient
              </span>

            </label>

          </div>


          {/* ===============================================
              FORM
          =============================================== */}

          <form
            onSubmit={handleLogin}
          >

            {/* =============================================
                EMAIL / FILE NUMBER
            ============================================= */}

            <div className="input-group-login">

              <label>
                {loginType ===
                "Patient"
                  ? "File Number"
                  : "Email"}
              </label>

              <input
                type={
                  loginType ===
                  "Patient"
                    ? "text"
                    : "email"
                }

                name={
                  loginType ===
                  "Patient"
                    ? "fileNo"
                    : "email"
                }

                placeholder={
                  loginType ===
                  "Patient"
                    ? "Enter Your File Number"
                    : "Enter Email"
                }

                value={
                  loginType ===
                  "Patient"
                    ? loginData.fileNo
                    : loginData.email
                }

                onChange={
                  handleChange
                }

                autoComplete={
                  loginType ===
                  "Patient"
                    ? "username"
                    : "email"
                }
              />

            </div>


            {/* =============================================
                PASSWORD
            ============================================= */}

            <div className="input-group-login">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={
                  loginData.password
                }
                onChange={
                  handleChange
                }
                autoComplete="current-password"
              />

            </div>


            {/* =============================================
                SIGN IN
            ============================================= */}

            <button
              type="submit"
              className="signin-btn"
              disabled={loading}
            >

              {loading
                ? "Loading..."
                : "Sign In"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default BranchLogin;