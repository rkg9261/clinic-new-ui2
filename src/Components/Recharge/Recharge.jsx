import React, { useState } from "react";
import "./Recharge.css";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { FaTimes } from "react-icons/fa";
import { BASE_URL } from "../../config/api";
const Recharge = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ================================
  // GET PATIENT DATA FROM HOMEPAGE
  // ================================

  const patient =
    location.state?.patient ||
    location.state?.selectedPatient ||
    null;

  const patientId =
    location.state?.patientId ||
    patient?._id ||
    patient?.id ||
    "";

    const patientName =
  patient?.name ||
  patient?.full_name ||
  "Unknown Patient";

const patientCode =
  patient?.patientCode ||
  patient?.patient_code ||
  "";

const fileNo =
  patient?.fileNo ||
  patient?.file_number ||
  "";

  console.log("Recharge Patient:", patient);
  console.log("Recharge Patient ID:", patientId);

  // ================================
  // STATE
  // ================================

  const [rechargeData, setRechargeData] = useState({
    package: "",
    additionalSessions: "",
    amountPaid: "",
  });

  // ================================
  // PACKAGE SELECT
  // ================================

  const handlePackageSelect = (e) => {
    setRechargeData((prev) => ({
      ...prev,
      package: e.target.value,
    }));
  };

  // ================================
  // INPUT CHANGE
  // ================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRechargeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================================
  // CALCULATE TOTAL
  // ================================

  const calculateTotal = () => {
    let total = 0;

    if (rechargeData.package) {
      const match = rechargeData.package.match(/₹(\d+)/);

      if (match) {
        total += Number(match[1]);
      }
    }

    return total;
  };

  // ================================
  // GET PACKAGE SESSIONS
  // ================================

  const getPackageSessions = () => {
    if (!rechargeData.package) {
      return 0;
    }

    if (
      rechargeData.package.includes(
        "Customized Exercise Plan"
      )
    ) {
      return 1;
    }

    const sessionMatch =
      rechargeData.package.match(/(\d+)\s+Session/);

    if (sessionMatch) {
      return Number(sessionMatch[1]);
    }

    return 0;
  };

  // ================================
  // CALCULATE TOTAL SESSIONS
  // ================================

  const calculateSessionsAdded = () => {
    const packageSessions = getPackageSessions();

    const additionalSessions = Number(
      rechargeData.additionalSessions || 0
    );

    return packageSessions + additionalSessions;
  };

  // ================================
  // SUBMIT RECHARGE
  // ================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId) {
      alert(
        "Patient ID not found. Please open recharge from patient details."
      );

      return;
    }

    if (!rechargeData.package) {
      alert("Please select at least one service");

      return;
    }

    if (!rechargeData.amountPaid) {
      alert("Please enter amount paid");

      return;
    }

    const sessionsAdded =
      calculateSessionsAdded();

    if (sessionsAdded < 1) {
      alert(
        "Sessions added must be at least 1"
      );

      return;
    }

    const token =
      localStorage.getItem("token");

    console.log("Token:", token);

    if (!token) {
      alert("Please login again");

      return;
    }

    // ================================
    // API PAYLOAD
    // ================================

    const rechargePayload = {
      patientId: patientId,

      sessionsAdded: sessionsAdded,

      package: rechargeData.package,

      additionalSessions: Number(
        rechargeData.additionalSessions || 0
      ),

      totalAmount: calculateTotal(),

      amountPaid: Number(
        rechargeData.amountPaid
      ),
    };

    console.log(
      "Recharge Payload:",
      rechargePayload
    );

    try {
     const response = await fetch(
  `${BASE_URL}/api/clinic/patients/recharge`,
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(rechargePayload),
  }
);

      const data = await response.json();

      console.log(
        "Recharge Response:",
        data
      );

      if (!response.ok) {
        alert(
          data.message ||
            "Recharge Failed"
        );

        return;
      }

      alert(
        "Recharge Submitted Successfully!"
      );

      setRechargeData({
        package: "",
        additionalSessions: "",
        amountPaid: "",
      });

      navigate("/homepage", {
        state: {
          openPatientPopup: true,

          patient: patient,
        },
      });
    } catch (error) {
      console.error(
        "Recharge Error:",
        error
      );

      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="recharge-container">
        <div className="recharge-card">
          {/* CLOSE BUTTON */}

          <FaTimes
            className="close-icon-recharge"
            onClick={() =>
              navigate("/homepage", {
                state: {
                  openPatientPopup: true,

                  patient: patient,
                },
              })
            }
          />

        <div className="recharge-patient-header">
  <h2>{patientName}</h2>

  <div className="recharge-patient-details">
    <span>
      <strong>File No:</strong> {fileNo || "-"}
    </span>

    <span>
      <strong>Patient Code:</strong> {patientCode || "-"}
    </span>
  </div>

  <h3>Select Services / Packages</h3>
</div>

          <form onSubmit={handleSubmit}>
      
            {/* STANDARD PHYSIOTHERAPY */}
      

            <div className="package-section standard">
              <h3>
                Standard Physiotherapy
              </h3>

              <label>
                <input
                  type="radio"
                  name="package"
                  value="Standard 1 Session - ₹250"
                  checked={
                    rechargeData.package ===
                    "Standard 1 Session - ₹250"
                  }
                  onChange={
                    handlePackageSelect
                  }
                />

                <span>1 Session</span>

                <b>₹250</b>
              </label>

              <label>
                <input
                  type="radio"
                  name="package"
                  value="Standard 5 Sessions - ₹1125"
                  checked={
                    rechargeData.package ===
                    "Standard 5 Sessions - ₹1125"
                  }
                  onChange={
                    handlePackageSelect
                  }
                />

                <span>5 Sessions</span>

                <b>₹1125</b>
              </label>

              <label>
                <input
                  type="radio"
                  name="package"
                  value="Standard 20 Sessions - ₹4000"
                  checked={
                    rechargeData.package ===
                    "Standard 20 Sessions - ₹4000"
                  }
                  onChange={
                    handlePackageSelect
                  }
                />

                <span>20 Sessions</span>

                <b>₹4000</b>
              </label>
            </div>

      
            {/* ADVANCE PHYSIOTHERAPY */}
      

            <div className="package-section advance">
              <h3>
                Advance Physiotherapy
              </h3>

              <label>
                <input
                  type="radio"
                  name="package"
                  value="Advance 1 Session - ₹350"
                  checked={
                    rechargeData.package ===
                    "Advance 1 Session - ₹350"
                  }
                  onChange={
                    handlePackageSelect
                  }
                />

                <span>1 Session</span>

                <b>₹350</b>
              </label>

              <label>
                <input
                  type="radio"
                  name="package"
                  value="Advance 5 Sessions - ₹1575"
                  checked={
                    rechargeData.package ===
                    "Advance 5 Sessions - ₹1575"
                  }
                  onChange={
                    handlePackageSelect
                  }
                />

                <span>5 Sessions</span>

                <b>₹1575</b>
              </label>

              <label>
                <input
                  type="radio"
                  name="package"
                  value="Advance 20 Sessions - ₹5600"
                  checked={
                    rechargeData.package ===
                    "Advance 20 Sessions - ₹5600"
                  }
                  onChange={
                    handlePackageSelect
                  }
                />

                <span>20 Sessions</span>

                <b>₹5600</b>
              </label>
            </div>

      
            {/* HOME PHYSIOTHERAPY */}
      

            <div className="package-section home-package">
              <h3>
                Home Physiotherapy
              </h3>

              <label>
                <input
                  type="radio"
                  name="package"
                  value="Home 1 Session - ₹600"
                  checked={
                    rechargeData.package ===
                    "Home 1 Session - ₹600"
                  }
                  onChange={
                    handlePackageSelect
                  }
                />

                <span>1 Session</span>

                <b>₹600</b>
              </label>

              <label>
                <input
                  type="radio"
                  name="package"
                  value="Home 5 Sessions - ₹3000"
                  checked={
                    rechargeData.package ===
                    "Home 5 Sessions - ₹3000"
                  }
                  onChange={
                    handlePackageSelect
                  }
                />

                <span>5 Sessions</span>

                <b>₹3000</b>
              </label>

              <label>
                <input
                  type="radio"
                  name="package"
                  value="Home 20 Sessions - ₹12000"
                  checked={
                    rechargeData.package ===
                    "Home 20 Sessions - ₹12000"
                  }
                  onChange={
                    handlePackageSelect
                  }
                />

                <span>20 Sessions</span>

                <b>₹12000</b>
              </label>
            </div>

      
            {/* EXERCISE PLAN */}
      

            <div className="single-package exercise-package">
              <label>
                <input
                  type="radio"
                  name="package"
                  value="Customized Exercise Plan - ₹4500"
                  checked={
                    rechargeData.package ===
                    "Customized Exercise Plan - ₹4500"
                  }
                  onChange={
                    handlePackageSelect
                  }
                />

                <span>
                  Customized Exercise Plan
                </span>

                <b>₹4500</b>
              </label>
            </div>

      
            {/* ADDITIONAL SESSIONS */}
      

            <div className="additional-section">
              <h3>
                Additional Sessions
              </h3>

              <input
                type="number"
                name="additionalSessions"
                min="0"
                value={
                  rechargeData.additionalSessions
                }
                onChange={handleChange}
                placeholder="Enter No. of Sessions"
              />
            </div>

      
            {/* TOTAL SESSIONS */}
      

            <div className="total-section">
              <label>
                Total Sessions
              </label>

              <input
                type="text"
                value={
                  calculateSessionsAdded()
                }
                readOnly
                className="total-input"
              />
            </div>

      
                         {/* TOTAL AMOUNT */}
      

            <div className="total-section">
              <label>Total Amount</label>

              <input type="text"
                 value={`₹${calculateTotal()}`}
               readOnly
                className="total-input"/>
            </div>

      
                      {/* AMOUNT PAID */}
      
            <div className="amount-section">
              <label> Amount Paid *  </label>
              <input  type="number"   name="amountPaid"
               min="0"
               value={ rechargeData.amountPaid }
                onChange={handleChange}
                placeholder="Enter Amount Paid"
              />
            </div>

      
            {/* SUBMIT BUTTON */}

            <button   type="submit" className="submit-recharge-btn">
           Submit Recharge             
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Recharge;