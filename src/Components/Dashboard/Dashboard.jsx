import React from "react";
import "./Dashboard.css";
import logo from "../../assets/logo.png";

import {
  FaThLarge,
  FaPlusCircle,
  FaClinicMedical,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dashboard-layout">

     

     
      {/* Main Content */}
      <main className="main-content">

        {/* Topbar */}
        <div className="topbar">

          <div className="status-badge">
            ● All branches active
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search patients, files..."
            />
          </div>

        </div>

        {/* Welcome */}
        <div className="welcome-section">

          <div>
            <h1>Welcome back, Krishna</h1>
            <p>
              Here's what's happening across your clinics today.
            </p>
          </div>

          <button className="new-patient-btn"  onClick={() =>
                navigate("/add-clinic")
              }>
            <FaPlus />
            New Clinic
          </button>

        </div>

        {/* Cards */}
        <div className="stats-grid">

          <div className="stat-card">
            <h4>TOTAL PATIENTS</h4>
            <h2>0</h2>
          </div>

          <div className="stat-card">
            <h4>ACTIVE PATIENTS</h4>
            <h2>0</h2>
          </div>

          <div className="stat-card">
            <h4>BRANCHES</h4>
            <h2>0</h2>
          </div>

          <div className="stat-card">
            <h4>PENDING APPOINTMENTS</h4>
            <h2>0</h2>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="bottom-section">

          <div className="patients-card">

            <h2>Patients by Branch</h2>
            <p>Total registered patients per active branch</p>

            <div className="empty-box">
              <h3>No branches yet</h3>
              <p>
                Add your first branch to start tracking
                performance.
              </p>
            </div>

          </div>

          <div className="quick-actions">

            <h2>Quick Actions</h2>

            <div className="action-card">
              <h4>Register Patient</h4>
              <p>Create file with auto QR</p>
            </div>

            <div className="action-card">
              <h4>Search Patients</h4>
              <p>By file no., mobile, or name</p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}