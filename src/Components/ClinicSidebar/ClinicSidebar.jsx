import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
  FaBars,
  FaUserCircle,
  FaKey,
  FaSignOutAlt,
  FaHome,
  FaUserPlus,
  FaCog,
  FaClipboardList,
  FaFileDownload,
  FaQuestionCircle,
  FaNotesMedical,
  FaFolder,
  FaChevronDown,
  FaHistory,
  FaSearch,
  FaCamera,
  FaThLarge,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";

import "./ClinicSidebar.css";
import { BASE_URL } from "../../config/api";

const ClinicSidebar = () => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettingMenu, setShowSettingMenu] = useState(false);

  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const [user, setUser] = useState(null);
  const[searchText, setSearchText]= useState("");
   const fileInputRef = useRef(null);
     const [showCameraPopup, setShowCameraPopup] = useState(false);

    //  api states for search patient
    const [searchResults, setSearchResults] = useState([]);
const [searchLoading, setSearchLoading] = useState(false);
const [searchError, setSearchError] = useState("");




// search functiom 
const searchPatientByFileNo = async (fileNumber) => {
  if (!fileNumber.trim()) {
    setSearchResults([]);
    setSearchError("");
    return;
  }

  try {
    setSearchLoading(true);
    setSearchError("");

    const token = Cookies.get("token");

const response = await axios.get(
  `${BASE_URL}/api/clinic/patients/search/${fileNumber}`,
  {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }
);

console.log(response.data);

const patient = response.data.data.patient;

setSearchResults(patient ? [patient] : []);
   
  } catch (error) {
    console.log(error);

    setSearchResult(null);

    if (error.response?.status === 404) {
      setSearchError("Patient not found");
    } else {
      setSearchError("Something went wrong");
    }
  } finally {
    setSearchLoading(false);
  }
};

    //  empty screen sidebar is closed
    useEffect(() => {
  const handleOutsideClick = (e) => {
    if (
      sidebarOpen &&
      window.innerWidth <= 1400 &&
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target)
    ) {
      setSidebarOpen(false);
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, [sidebarOpen]);

  useEffect(() => {
    const token = Cookies.get("token");
    const userCookie = Cookies.get("user");

    if (!token || !userCookie) {
      navigate("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(userCookie);
      setUser(parsedUser);
    } catch (error) {
      console.log(error);

      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("user");

      navigate("/");
    }
  }, [navigate]);

//when click outside then sidebar is close
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

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside
      );
  }, []);

  //sidebar for mobile view
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

    return () =>
      document.removeEventListener(
        "mousedown",
        handleSidebarOutside
      );
  }, []);

  //logout function

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("user");

    navigate("/");
  };

     //camera function
const openCamera = () => {
  setShowCameraPopup((prev) => !prev);
};

const handleOpenCamera = () => {
  setShowCameraPopup(false);

  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};
const handleCameraCapture = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  console.log("Captured Image:", file);

  // Close popup after selecting image
  setShowCameraPopup(false);

  // Optional: clear input so the same image can be selected again
  e.target.value = "";
};

  //menu close after clicking 
const handleMenuClick = () => {
  setSidebarOpen(false);
};

  return (
    <>
      {/* TOP NAVBAR */}

      <div className="top-navbar-sidebar1-clinic">

        <FaBars  className="mobile-menu-icon"
          onClick={() => setSidebarOpen(!sidebarOpen)} />

        <h3 className="clinic-title">Clinic Panel </h3>
            
                 {/* Center Search Box */}
<div className="navbar-search-clinic">

  <div className="search-box-wrapper-clinic">

 <div className="search-input-wrapper-clinic">

  <input
    type="text"
    placeholder="Search File Number..."
    value={searchText}
    onChange={(e) => {
      const value = e.target.value;
      setSearchText(value);
      searchPatientByFileNo(value);
    }}
    className="navbar-search-input-clinic"
  />

  <div className="camera-wrapper-clinic">
    <button
      className="search-camera-btn-clinic"
      onClick={searchText ? undefined : openCamera}
    >
      {searchText ? (
        <FaSearch className="search-left-icon-clinic" />
      ) : (
        <FaCamera className="camera-left-icon-clinic" />
      )}
    </button>

    {!searchText && showCameraPopup && (
      <div className="camera-popup-clinic">
        <button
          className="camera-open-btn-clinic"
          onClick={handleOpenCamera}
        >
          📷 Open Camera
        </button>
      </div>
    )}
  </div>

</div>

    {searchLoading && (
      <div className="patient-search-card">
        Searching...
      </div>
    )}

{searchResults.length > 0 && (
  <div className="patient-search-card">

    {searchResults.map((patient) => (

      <div
        key={patient.id}
        className="patient-search-item"
        onClick={() => {
          navigate("/homepage", {
            state: {
              openPatientPopup: true,
              patient: patient,
            },
          });

          setSearchText("");
          setSearchResults([]);
        }}
      >

        <div className="patient-search-name">
          {patient.full_name}
        </div>

        <div className="patient-search-file">
          {patient.file_number}
        </div>

      </div>

    ))}

  </div>
)}

    {searchError && (
      <div className="patient-search-card">
        {searchError}
      </div>
    )}

  </div>



  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    capture="environment"
    style={{ display: "none" }}
    onChange={handleCameraCapture}
  />

</div>
       
                 {/* profile */}
        <div className="profile-wrapper" ref={dropdownRef}>
          <FaUserCircle
            className="profile-icon-sidebar1-clinic"
            onClick={(e) => {
              e.stopPropagation();
              setShowProfile(!showProfile); }}/>
           
                     {/* show profile data */}
          {showProfile && (
            <div className="profile-dropdown">

              <div className="profile-info">

                <h4> {user?.name || "No Name"}</h4>
                <p>{user?.email || "No Email"}</p>
                <p> Mobile : {user?.mobile}</p>
                <p>Role : {user?.role}</p>
                <p> ID : {user?.id} </p>
              </div>   
                <hr />

                    {/* profile button */}
              <button
                onClick={() =>navigate("/clinic-profile")}>
                <FaUserCircle /> Profile  
               </button>  

              <button onClick={() => navigate("/change-password") }>
                <FaKey /> Change Password 
               </button>
             

              <button onClick={handleLogout} >
               <FaSignOutAlt />Logout
              </button>
 

            </div>
          )}
        </div>
      </div>

                       {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div  className="sidebar-overlay-clinic-sidebar"
          onClick={() => setSidebarOpen(false)}/>
       )} 
           


                         {/* SIDEBAR */}

      <div
        ref={sidebarRef}
        className={`sidebar1-clinic ${
          sidebarOpen
            ? "sidebar-open"
            : "sidebar-close"
        }`}
      >
        <div className="logo-section-sidebar1-clinic">

          <img
            src="/logo.png"
            alt="Logo"
            className="logo-sidebar-sidebar1-clinic"
          />

          <div className="logo-text-sidebar1-clinic">
            <h2>Krishna</h2>
            <p>ADVANCE PHYSIO</p>
          </div>

        </div>

        <nav className="navbar-sidebar1-clinic">

                         
                         
                         
                           {/* Dashbord Clinic*/}
        <NavLink
  to="/dashboard-clinic"
  onClick={handleMenuClick}
  className={({ isActive }) =>
    isActive
      ? "menu-btn-sidebar1-clinic active"
      : "menu-btn-sidebar1-clinic"
  }
>
  <FaThLarge /> Dashboard
</NavLink>


                {/* Homepage submenu */}
         {/* <NavLink to="/homepage"
        onClick={handleMenuClick}
        className={({ isActive }) =>isActive
       ? "menu-btn-sidebar1-clinic active"
       : "menu-btn-sidebar1-clinic"
       }>
       <FaHome /> Homepage</NavLink> */}
        
 

               {/* Add Patient submenu */}
          <NavLink
            to="/addpatient"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaUserPlus />Add New Patient</NavLink>
            
          
            


   
            


                {/* Serivce submenu 
          <NavLink
            to="/services"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaClipboardList /> Services</NavLink>
           
          
               

                {/* Service-Category submenu 
          <NavLink
            to="/category"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaFolder />Service Category</NavLink>*/}
            
          
                
                 {/* Service-SubCategory submenu 
          <NavLink
            to="/sub-category"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaClipboardList />Service Sub Category </NavLink>*/}

                  {/* Menu Settings
          <NavLink
            to="/menu-settings"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
           <FaNotesMedical/>Treatment protocol </NavLink> */}
            
         
          
           {/* Setting submenu */}
         <div
  className="settings-dropdown"
  onMouseEnter={() => setShowSettingMenu(true)}
  onMouseLeave={() => setShowSettingMenu(false)}
>
  <div className="menu-btn-sidebar1-clinic settings-btn">
    <span className="settings-left">
      <FaCog /> Settings
    </span>

    <FaChevronDown
      className={`dropdown-arrow ${
        showSettingMenu ? "rotate-arrow" : ""
      }`}
    />
  </div>

  {showSettingMenu && (
    <div className="settings-submenu">

      <NavLink
        to="/setting-clinics"
        onClick={handleMenuClick}
        className={({ isActive }) =>
          isActive
            ? "submenu-link active"
            : "submenu-link"
        }
      >
        Prescription
      </NavLink>

      <NavLink
        to="/menu-settings"
        onClick={handleMenuClick}
        className={({ isActive }) =>
          isActive
            ? "submenu-link active"
            : "submenu-link"
        }
      >
        Treatment Protocol
      </NavLink>

    </div>
  )}
</div>
            
                  {/* Add doctor*/}
        <NavLink
  to="/add-doctor"
  onClick={handleMenuClick}
  className={({ isActive }) =>
    isActive
      ? "menu-btn-sidebar1-clinic active"
      : "menu-btn-sidebar1-clinic"
  }
>
  <FaUserMd /> Add Doctor
</NavLink>
          
                       {/* Add doctor list*/}
        <NavLink
  to="/add-doctor-list"
  onClick={handleMenuClick}
  className={({ isActive }) =>
    isActive
      ? "menu-btn-sidebar1-clinic active"
      : "menu-btn-sidebar1-clinic"
  }
>
  <FaUsers /> Doctor List
</NavLink>

                    {/* Recharge history */}
          {/* <NavLink
            to="/recharge-history"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaHistory />Recharge History</NavLink> */}

                    {/* Download submenu */}
          <NavLink
            to="/download-report"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaFileDownload />Download Report</NavLink>
            
          

             {/* New Query  submenu */}
          <NavLink
            to="/new-query"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaQuestionCircle /> New Query</NavLink>
           
          

        </nav>
      </div>
    </>
  );
};

export default ClinicSidebar;