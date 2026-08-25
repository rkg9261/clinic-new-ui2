import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  FaThLarge,
  FaPlusCircle,
  FaHospital,
  FaUserCircle,
  FaKey,
  FaSignOutAlt,
  FaChartLine,
  FaBars,
} from "react-icons/fa";

import "./Sidebar1.css";

const Sidebar1 = () => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  // =============================
  // LOAD USER
  // =============================

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (!token || !storedUser) {
      navigate("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      console.log("Logged User:", parsedUser);
    } catch (error) {
      console.log(error);

      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("user");

      navigate("/");
    }
  }, [navigate]);

  // =============================
  // CLOSE PROFILE ON OUTSIDE CLICK
  // =============================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, []);

  // =============================
  // CLOSE SIDEBAR ON MOBILE
  // =============================

  useEffect(() => {
    const handleSidebarOutside = (event) => {
      if (
        window.innerWidth <= 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleSidebarOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleSidebarOutside
      );
    };
  }, []);

  // =============================
  // LOGOUT
  // =============================

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("user");

    setUser(null);

    console.clear();

    navigate("/");
  };

  return (
    <>
    {/* =========================
          TOP NAVBAR
      ========================= */}

      <div className="top-navbar-sidebar-admin">

        <FaBars
          className="mobile-menu-icon"
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <h3 className="admin-title">
          Admin Panel
        </h3>

        {/* =========================
            PROFILE
        ========================= */}

        <div
          className="profile-wrapper"
          ref={dropdownRef}
        >
          <FaUserCircle
            className="profile-icon-sidebar-admin"
            onClick={(e) => {
              e.stopPropagation();
              setShowProfile(!showProfile);
            }}
          />

          {showProfile && (
            <div className="profile-dropdown">

              <div className="profile-info">

                <h4>
                  {user?.name || "No Name"}
                </h4>

                <p>
                  {user?.email || "No Email"}
                </p>

                <p>
                  Role : {user?.role}
                </p>

                <p>
                  ID : {user?.id}
                </p>

              </div>

              <hr />

              <button>
                <FaUserCircle />
                Profile
              </button>

              <button>
                <FaKey />
                Change Password
              </button>

              <button onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <div
        ref={sidebarRef}
        className={`sidebar-admin ${
          sidebarOpen
            ? "sidebar-open"
            : "sidebar-close"
        }`}
      >

        {/* =========================
            LOGO
        ========================= */}

        <div className="logo-section-sidebar-admin">

          <img
            src="/logo.png"
            alt="Logo"
            className="logo-sidebar-sidebar-admin"
          />

          <div className="logo-text-sidebar-admin">

            <h2>Krishna</h2>

            <p>ADVANCE PHYSIO</p>

          </div>

        </div>

        {/* =========================
            MENU
        ========================= */}

        <nav className="navbar-sidebar-admin">

{/* Dashboard */}

          <NavLink
            to="/dashboard-admin"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar-admin active"
                : "menu-btn-sidebar-admin"
            }
          >
            <FaThLarge />
            Dashboard
          </NavLink>

          {/* Add Clinic */}

          <NavLink
            to="/add-clinic"
            state={{ isEdit: false }}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar-admin active"
                : "menu-btn-sidebar-admin"
            }
          >
            <FaPlusCircle />
            Add Clinic
          </NavLink>

          {/* Running Clinic */}

          <NavLink
            to="/running-clinic"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar-admin active"
                : "menu-btn-sidebar-admin"
            }
          >
            <FaHospital />
            Running Clinic
          </NavLink>

          {/* Suspended Clinic */}

          <NavLink
            to="/suspended-clinic"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar-admin active"
                : "menu-btn-sidebar-admin"
            }
          >
            <FaHospital />
            Suspended Clinic
          </NavLink>

          {/* Financial Report */}

          <NavLink
            to="/financial-report"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar-admin active"
                : "menu-btn-sidebar-admin"
            }
          >
            <FaChartLine />
            View Financial Report
          </NavLink>

        </nav>

      </div>

    </>
  );
};

export default Sidebar1;


      
    
    
    
    
  