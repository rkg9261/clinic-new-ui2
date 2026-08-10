              

import React, { useState } from "react";
import "./BranchLogin.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../assets/logo.png"
import { BASE_URL } from "../../config/api";
const BranchLogin = ({closeMenu}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [loginType, setLoginType] = useState("AdminClinic");
  
 

  const [loginData, setLoginData] = useState({
    email: "",
    fileNo:"",
    password: "",
  });

  

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = async (e) => {

  e.preventDefault();

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

  // ADMIN Clinic LOGIN


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
    const data =
      await response.json();

    console.log(
      "Login Response:",
      data
    );

    if (!response.ok) {

      alert(
        data.message ||
        "Login Failed"
      );

      return;
    }

    const expiryDate =
      new Date(
        data.data.refreshExpiresAt
      );

    Cookies.set(
      "token",
      data.data.accessToken,
      {
        expires: expiryDate,
        secure: true,
        sameSite: "Lax",
      }
    );

    Cookies.set(
      "refreshToken",
      data.data.refreshToken,
      {
        expires: expiryDate,
        secure: true,
        sameSite: "Lax",
      }
    );

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

    // Store token in Local Storage
localStorage.setItem("token", data.data.accessToken);
localStorage.setItem("refreshToken", data.data.refreshToken);
localStorage.setItem("user", JSON.stringify(data.data.user));

console.log("Access Token:", localStorage.getItem("token"));
console.log("Refresh Token:", localStorage.getItem("refreshToken"));

    const role =
      data.data.user.role;

    console.log(
      "Logged User Role:",
      role
    );

    if (
      role?.toLowerCase() ===
      "admin"
    ) {

      navigate(
        "/dashboard-admin"
      );

    } else {

      navigate("/dashboard-clinic");

    }

  } catch (error) {

    console.log(error);

    alert("Server Error");

  } finally {

    setLoading(false);

  }

  return;
}
  // PATIENT LOGIN

  if (loginType === "Patient") {

    if (
      loginData.fileNo ==="P001"&&
         
      loginData.password ===
        "123456"
    ) {

      setShowLogin(false);

      navigate("/patientdetails");

      return;
    }

    alert("Invalid Patient Login");
  }
};

const handleLoginTypeChange = (e) => {

  setLoginType(e.target.value);

  setLoginData({
    email: "",
    fileNo:"",
    password: "",
  });

};
 return (
  <div className="login-page">

    <div className="modern-login-card">

      <div className="login-header">
        <img
          src={logo}
          alt="logo"
          className="login-logo"
        />

        <h2>Krishna Advance Physio Clinic</h2>

        <p>
          Physiotherapy · Scoliosis · Joint Care
        </p>
      </div>

      <div className="login-box-new">

        <h3>Welcome</h3>

        <span>
          Choose how you want to sign in
        </span>

        <div className="radio-group-login">

        <label>
  <input
    type="radio"
    value="AdminClinic"
    checked={
      loginType === "AdminClinic"
    }
    onChange={handleLoginTypeChange}
  />
  Admin / Clinic
</label>

<label>
  <input
    type="radio"
    value="Patient"
    checked={loginType === "Patient"}
    onChange={handleLoginTypeChange}
  />
  Patient
</label>

        </div>

        <form onSubmit={handleLogin}>

        <div className="input-group-login">

  <label>
    {loginType === "Patient"
      ? "File Number"
      : "Email"}
  </label>

  <input
    type={
      loginType === "Patient"
        ? "text"
        : "email"
    }
    name={
      loginType === "Patient"
        ? "fileNo"
        : "email"
    }
    placeholder={
      loginType === "Patient"
        ? "Enter Your File Number"
        : "Enter Email"
    }
    value={
      loginType === "Patient"
        ? loginData.fileNo
        : loginData.email
    }
    onChange={handleChange}
  />

</div>

          <div className="input-group-login">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="signin-btn"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

        </form>

      </div>

    </div>

  </div>
);
};

export default BranchLogin;