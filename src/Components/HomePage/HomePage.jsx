import React, {
  useEffect,
  useState,
} from "react";

import "./HomePage.css";

import Cookies from "js-cookie";

import {
  BASE_URL,
  API,
} from "../../config/api";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaTimes,
  FaWallet,
  FaFolder,
  FaHome,
  FaWhatsapp,
  FaFilePrescription,
  FaClipboardList,
  FaCalendarCheck,
} from "react-icons/fa";


const HomePage = () => {

  const navigate = useNavigate();

  const location = useLocation();



  // STATES


  const [
    currentPatient,
    setCurrentPatient,
  ] = useState(null);


  const [
    showPatientCard,
    setShowPatientCard,
  ] = useState(false);


  const [
    attendanceMarked,
    setAttendanceMarked,
  ] = useState(false);


  const [
    attendanceDate,
    setAttendanceDate,
  ] = useState("Not Marked");


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    patientList,
    setPatientList,
  ] = useState([]);


  const [
    showProfileModal,
    setShowProfileModal,
  ] = useState(false);


  const [
    userData,
    setUserData,
  ] = useState(null);


  const [
    attendanceLoading,
    setAttendanceLoading,
  ] = useState(false);



  // FORMAT DATE


  const formatAppointmentDate = (
    dateValue
  ) => {

    if (!dateValue) {
      return "-";
    }

    const date =
      new Date(dateValue);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return dateValue;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  };



  // CHECK TODAY ATTENDANCE


  const isAttendanceMarkedToday = (
    attendanceValue
  ) => {

    if (!attendanceValue) {
      return false;
    }

    const attendanceDateValue =
      new Date(
        attendanceValue
      );

    if (
      Number.isNaN(
        attendanceDateValue.getTime()
      )
    ) {
      return false;
    }

    const today =
      new Date();

    return (
      attendanceDateValue.getFullYear() ===
        today.getFullYear() &&

      attendanceDateValue.getMonth() ===
        today.getMonth() &&

      attendanceDateValue.getDate() ===
        today.getDate()
    );

  };



  // SET ATTENDANCE STATUS


  const setPatientAttendanceStatus = (
    patient
  ) => {

    const lastAttendance =
      patient?.lastAttendanceDate ||
      patient?.last_attendance_date ||
      "";

    const markedToday =
      isAttendanceMarkedToday(
        lastAttendance
      );


    console.log(
      "LAST ATTENDANCE:",
      lastAttendance
    );


    console.log(
      "ATTENDANCE MARKED TODAY:",
      markedToday
    );


    setAttendanceMarked(
      markedToday
    );


    setAttendanceDate(
      lastAttendance
        ? new Date(
            lastAttendance
          ).toLocaleDateString(
            "en-IN"
          )
        : "Not Marked"
    );

  };



  // FORMAT APPOINTMENT


  const formatPatient = (
    item
  ) => {

    return {

      ...item,


      
      // ID
      

      id:
        item.id ||
        item._id ||
        "",


      _id:
        item.id ||
        item._id ||
        "",


      
      //  API FIELDS
      

      name:
        item.name ||
        "",


      age:
        item.age ??
        "",


      gender:
        item.gender ||
        "",


      whatsapp_number:
        item.whatsapp_number ||
        "",


      appointment_date:
        item.appointment_date ||
        "",


      appointment_time:
        item.appointment_time ||
        "",


      appointment_time_to:
        item.appointment_time_to ||
        "",


      
      // FRONTEND DISPLAY ALIASES
      

      mobileNumber:
        item.whatsapp_number ||
        "",


      appointmentDate:
        item.appointment_date ||
        "",


      appointmentTime:
        item.appointment_time ||
        "",


      appointmentTimeTo:
        item.appointment_time_to ||
        "",


      
      //  PATIENT FIELDS
      

      patientCode:
        item.patient_code ||
        item.patientCode ||
        "",


      address:
        item.address ||
        "",


      problem:
        item.problem ||
        item.disease_problem ||
        "",


      appointmentType:
        item.appointment_type ||
        item.appointmentType ||
        "",


      fileNo:
        item.file_number ||
        item.fileNo ||
        "",


      lastAttendanceDate:
        item.last_attendance_date ||
        item.lastAttendanceDate ||
        "",

    };

  };



  // PROFILE DATA


  useEffect(() => {

    const userCookie =
      Cookies.get("user");

    const localUser =
      localStorage.getItem(
        "user"
      );


    try {

      if (userCookie) {

        const user =
          JSON.parse(
            userCookie
          );

        setUserData(
          user
        );

      }

      else if (localUser) {

        const user =
          JSON.parse(
            localUser
          );

        setUserData(
          user
        );

      }

    }

    catch (error) {

      console.error(
        "User Parse Error:",
        error
      );

    }

  }, []);



  // GET ALL APPOINTMENTS API


  const fetchAppointments =
    async () => {

      try {

        setLoading(
          true
        );


        
        // TOKEN
        

        const token =
          localStorage.getItem(
            "token"
          );


        if (!token) {

          alert(
            "Token not found. Please login again."
          );

          navigate(
            "/login"
          );

          return [];

        }


        
        // API URL
        

        const appointmentListUrl =
          API.APPOINTMENT_LIST ||
          `${BASE_URL}/api/appointment/list`;


        console.log(
          "===================================="
        );

        console.log(
          "GET APPOINTMENT LIST API"
        );

        console.log(
          "API URL:",
          appointmentListUrl
        );

        console.log(
          "===================================="
        );


        
        // GET API
        

        const response =
          await fetch(
            appointmentListUrl,
            {

              method:
                "GET",

              headers: {

                Authorization:
                  `Bearer ${token}`,

                Accept:
                  "application/json",

              },

            }
          );


        
        // RESPONSE TEXT
        

        const responseText =
          await response.text();


        let data =
          {};


        try {

          data =
            responseText
              ? JSON.parse(
                  responseText
                )
              : {};

        }

        catch (error) {

          console.error(
            "APPOINTMENT JSON ERROR:",
            error
          );

          data =
            {};

        }


        
        // CONSOLE RESPONSE
        

        console.log(
          "===================================="
        );

        console.log(
          "APPOINTMENT GET STATUS:",
          response.status
        );

        console.log(
          "APPOINTMENT GET RESPONSE:",
          data
        );

        console.log(
          "===================================="
        );


        
        // 401
        

        if (
          response.status ===
          401
        ) {

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );


          alert(
            "Session expired. Please login again."
          );


          navigate(
            "/login"
          );


          return [];

        }


        
        // 403
        

        if (
          response.status ===
          403
        ) {

          alert(
            data?.message ||
            "You do not have permission to view appointments."
          );

          return [];

        }


        
        // OTHER ERROR
        

        if (
          !response.ok
        ) {

          alert(
            data?.message ||
            data?.error ||
            "Failed to get appointments."
          );

          return [];

        }


        
        // EXTRACT APPOINTMENT ARRAY
        

        let appointments =
          [];


      

        if (
          Array.isArray(
            data
          )
        ) {

          appointments =
            data;

        }


     
        else if (
          Array.isArray(
            data.data
          )
        ) {

          appointments =
            data.data;

        }


       

        else if (
          Array.isArray(
            data.appointments
          )
        ) {

          appointments =
            data.appointments;

        }


    

        else if (
          Array.isArray(
            data.data?.appointments
          )
        ) {

          appointments =
            data.data.appointments;

        }


      

        else if (
          Array.isArray(
            data.result
          )
        ) {

          appointments =
            data.result;

        }


        else if (
          Array.isArray(
            data.result?.data
          )
        ) {

          appointments =
            data.result.data;

        }


      
        else if (
          Array.isArray(
            data.result?.appointments
          )
        ) {

          appointments =
            data.result.appointments;

        }


        console.log(
          "ACTUAL APPOINTMENT ARRAY:",
          appointments
        );


        
        // FORMAT
        

        const formattedAppointments =
          appointments.map(
            (
              item
            ) =>
              formatPatient(
                item
              )
          );


        console.log(
          "FORMATTED APPOINTMENTS:",
          formattedAppointments
        );


        
        // SET LIST
        

        setPatientList(
          formattedAppointments
        );


        return formattedAppointments;

      }

      catch (error) {

        console.error(
          "GET APPOINTMENT ERROR:",
          error
        );


        alert(
          "Something went wrong while loading appointments!"
        );


        return [];

      }

      finally {

        setLoading(
          false
        );

      }

    };



  // CALL GET API


  useEffect(() => {

    fetchAppointments();

  }, []);



  // OPEN PATIENT FROM LOCATION


  useEffect(() => {

    if (
      location.state?.openPatientPopup &&
      location.state?.patient
    ) {

      const patient =
        formatPatient(
          location.state.patient
        );


      setCurrentPatient(
        patient
      );


      setPatientAttendanceStatus(
        patient
      );


      setShowPatientCard(
        true
      );

    }

  }, [
    location
  ]);



  // OPEN APPOINTMENT


  const openPatient = (
    appointmentData
  ) => {

    const patient =
      formatPatient(
        appointmentData
      );


    setCurrentPatient(
      patient
    );


    setPatientAttendanceStatus(
      patient
    );


    setShowPatientCard(
      true
    );

  };



  // MARK ATTENDANCE API


  const handleMarkAttendance =
    async () => {

      try {

        if (
          attendanceMarked
        ) {

          alert(
            "Attendance already marked for today."
          );

          return;

        }


        const token =
          localStorage.getItem(
            "token"
          );


        if (!token) {

          alert(
            "Token not found. Please login again."
          );

          navigate(
            "/login"
          );

          return;

        }


        if (!currentPatient) {

          alert(
            "Patient data not found"
          );

          return;

        }


        const patientId =
          currentPatient.id ||
          currentPatient._id;


        if (!patientId) {

          alert(
            "Patient ID not found"
          );

          return;

        }


        setAttendanceLoading(
          true
        );


        const attendancePayload = {

          patientId:
            Number(
              patientId
            ),

        };


        console.log(
          "ATTENDANCE PAYLOAD:",
          attendancePayload
        );


        const response =
          await fetch(
            `${BASE_URL}/api/clinic/patients/attendance`,
            {

              method:
                "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,

              },

              body:
                JSON.stringify(
                  attendancePayload
                ),

            }
          );


        const responseText =
          await response.text();


        let data =
          {};


        try {

          data =
            responseText
              ? JSON.parse(
                  responseText
                )
              : {};

        }

        catch (error) {

          console.error(
            "ATTENDANCE JSON ERROR:",
            error
          );

        }


        console.log(
          "ATTENDANCE STATUS:",
          response.status
        );


        console.log(
          "ATTENDANCE RESPONSE:",
          data
        );


        
        // 401
        

        if (
          response.status ===
          401
        ) {

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );


          alert(
            "Session expired. Please login again."
          );


          navigate(
            "/login"
          );


          return;

        }


        
        // 403
        

        if (
          response.status ===
          403
        ) {

          alert(
            data.message ||
            "You do not have permission to mark attendance."
          );

          return;

        }


        
        // ERROR
        

        if (
          !response.ok
        ) {

          alert(
            data.message ||
            data.error ||
            `Attendance failed. Status: ${response.status}`
          );

          return;

        }


        
        // ATTENDANCE DATE
        

        const attendanceDateFromApi =
          data.attendance_date ||
          data.data?.attendance_date ||
          data.last_attendance_date ||
          data.data?.last_attendance_date ||
          new Date().toISOString();


        
        // UPDATE CURRENT APPOINTMENT
        

        const updatedPatient = {

          ...currentPatient,

          lastAttendanceDate:
            attendanceDateFromApi,

          last_attendance_date:
            attendanceDateFromApi,

        };


        setCurrentPatient(
          updatedPatient
        );


        setPatientAttendanceStatus(
          updatedPatient
        );


        alert(
          data.message ||
          "Attendance Marked Successfully"
        );


        
        // REFRESH APPOINTMENT LIST
        

        await fetchAppointments();

      }

      catch (error) {

        console.error(
          "MARK ATTENDANCE ERROR:",
          error
        );


        alert(
          "Something went wrong while marking attendance!"
        );

      }

      finally {

        setAttendanceLoading(
          false
        );

      }

    };



  // RENDER


  return (

    <div className="container-homepage">


      {/*  APPOINTMENT RECORDS */}
        
     

      {loading ? (

        <h3 className="loading-text">

          Loading Appointment Records...

        </h3>

      ) : (

        <div className="records-section">


          {patientList.length === 0 ? (

            <p>
              No Appointment Found
            </p>

          ) : (

            <div className="table-container">


              <h2 className="heading-patient-appointment">

                Patient Appointment

              </h2>


              <table className="appointment-table">


                <thead>

                  <tr>

                    <th>
                      S.No
                    </th>

                    <th>
                      Name
                    </th>

                    <th>
                      Age
                    </th>

                    <th>
                      Gender
                    </th>

                    <th>
                      WhatsApp Number
                    </th>

                    <th>
                      Appointment Date
                    </th>

                    <th>
                      Appointment From
                    </th>

                    <th>
                      Appointment To
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>


                  {patientList.map(
                    (
                      item,
                      index
                    ) => (

                      <tr
                        key={
                          item.id ||
                          item._id ||
                          index
                        }
                      >


                        {/* S.NO */}

                        <td>

                          {index + 1}

                        </td>


                        {/* NAME */}

                        <td>

                          {item.name ||
                            "-"}

                        </td>


                        {/* AGE */}

                        <td>

                          {item.age ??
                            "-"}

                        </td>


                        {/* GENDER */}

                        <td>

                          {item.gender ||
                            "-"}

                        </td>


                        {/* WHATSAPP NUMBER */}

                        <td>

                          {item.whatsapp_number ||
                            "-"}

                        </td>


                        {/* APPOINTMENT DATE */}

                        <td>

                          {
                            formatAppointmentDate(
                              item.appointment_date
                            )
                          }

                        </td>


                        {/* APPOINTMENT FROM */}

                        <td>

                          {item.appointment_time ||
                            "-"}

                        </td>


                        {/* APPOINTMENT TO */}

                        <td>

                          {item.appointment_time_to ||
                            "-"}

                        </td>


                        {/* ACTION */}

                        <td>

                          <button
                            className="enter-btn"

                            onClick={() =>
                              openPatient(
                                item
                              )
                            }
                          >

                            Enter

                          </button>

                        </td>


                      </tr>

                    )
                  )}


                </tbody>


              </table>


            </div>

          )}


        </div>

      )}


      {/*
          PATIENT / APPOINTMENT MODAL
      */}

      {showPatientCard &&
        currentPatient && (

          <div className="modal-overlay">


            <div className="patient-card">


              <FaTimes
                className="close-icon"

                onClick={() =>
                  setShowPatientCard(
                    false
                  )
                }
              />


              {/*
                  HEADER
              */}

              <div className="patient-header">


                <h2>

                  {
                    currentPatient.name ||
                    "Patient"
                  }

                  {" ("}

                  {
                    currentPatient.age ??
                    "-"
                  }

                  {" / "}

                  {
                    currentPatient.gender ||
                    "-"
                  }

                  {")"}

                </h2>


                <div className="patient-info-table-wrapper">


                  <table className="patient-info-table">


                    <tbody>


                      {/* NAME / MOBILE */}

                      <tr>

                        <th>
                          Name
                        </th>

                        <td>
                          {
                            currentPatient.name ||
                            "-"
                          }
                        </td>


                        <th>
                          WhatsApp
                        </th>

                        <td>
                          {
                            currentPatient.whatsapp_number ||
                            "-"
                          }
                        </td>

                      </tr>


                      {/* AGE / GENDER */}

                      <tr>

                        <th>
                          Age
                        </th>

                        <td>
                          {
                            currentPatient.age ??
                            "-"
                          }
                        </td>


                        <th>
                          Gender
                        </th>

                        <td>
                          {
                            currentPatient.gender ||
                            "-"
                          }
                        </td>

                      </tr>


                      {/* APPOINTMENT DATE */}

                      <tr>

                        <th>
                          Appointment Date
                        </th>

                        <td>

                          {
                            formatAppointmentDate(
                              currentPatient.appointment_date
                            )
                          }

                        </td>


                        <th>
                          Appointment From
                        </th>

                        <td>
                          {
                            currentPatient.appointment_time ||
                            "-"
                          }
                        </td>

                      </tr>


                      {/* APPOINTMENT TO */}

                      <tr>

                        <th>
                          Appointment To
                        </th>

                        <td>
                          {
                            currentPatient.appointment_time_to ||
                            "-"
                          }
                        </td>


                        <th>
                          Last Attendance
                        </th>

                        <td>
                          {
                            attendanceDate
                          }
                        </td>

                      </tr>


                      {/* OPTIONAL PATIENT CODE */}

                      <tr>

                        <th>
                          Patient Code
                        </th>

                        <td>
                          {
                            currentPatient.patientCode ||
                            "-"
                          }
                        </td>


                        <th>
                          File No
                        </th>

                        <td>
                          {
                            currentPatient.fileNo ||
                            "-"
                          }
                        </td>

                      </tr>


                    </tbody>


                  </table>


                </div>


              </div>


              {/*
                  DAILY ATTENDANCE
              */}

              <div className="attendance-box">


                {!attendanceMarked ? (

                  <button
                    className="attendance-btn"

                    onClick={
                      handleMarkAttendance
                    }

                    disabled={
                      attendanceLoading
                    }
                  >

                    {attendanceLoading
                      ? "Marking Attendance..."
                      : "Mark Attendance"}

                  </button>

                ) : (

                  <div className="attendance-success">

                    <h3>

                      ✅ Today's Attendance Marked

                    </h3>

                  </div>

                )}


              </div>


              {/*
                  FEATURE CARDS
              */}

              <div className="feature-row">


                {/* RECHARGE */}

                <div
                  className="feature-card"

                  onClick={() =>
                    navigate(
                      "/recharge",
                      {
                        state: {

                          returnToPopup:
                            true,

                          patient:
                            currentPatient,

                        },

                      }
                    )
                  }
                >

                  <FaWallet
                    size={35}
                  />

                  <p>
                    Recharge
                  </p>

                </div>


                {/* OPEN PATIENT FILE */}

                <div
                  className="feature-card"

                  onClick={() =>
                    navigate(
                      "/openpatientlist",
                      {
                        state: {

                          returnToPopup:
                            true,

                          patient:
                            currentPatient,

                        },

                      }
                    )
                  }
                >

                  <FaFolder
                    size={35}
                  />

                  <p>
                    Open Patient File
                  </p>

                </div>


                {/* HOMEPAGE */}

                <div
                  className="feature-card"

                  onClick={() =>
                    navigate("/")
                  }
                >

                  <FaHome
                    size={35}
                  />

                  <p>
                    Homepage
                  </p>

                </div>


                {/* PRESCRIPTION */}

                <div
                  className="feature-card"

                  onClick={() =>
                    navigate(
                      "/prescription",
                      {
                        state: {

                          patient:
                            currentPatient,

                        },

                      }
                    )
                  }
                >

                  <FaFilePrescription
                    size={35}
                  />

                  <p>
                    Prescription
                  </p>

                </div>


                {/* TREATMENT PROTOCOL */}

                <div
                  className="feature-card"

                  onClick={() =>
                    navigate(
                      "/treatment-protocol",
                      {
                        state: {

                          patient:
                            currentPatient,

                        },

                      }
                    )
                  }
                >

                  <FaClipboardList
                    size={35}
                  />

                  <p>
                    Treatment Protocol
                  </p>

                </div>


                {/* ATTENDANCE */}

                <div
                  className="feature-card"

                  onClick={() =>
                    navigate(
                      "/attendance",
                      {
                        state: {

                          patient:
                            currentPatient,

                        },

                      }
                    )
                  }
                >

                  <FaCalendarCheck
                    size={35}
                  />

                  <p>
                    Attendance Sheet
                  </p>

                </div>


              </div>


              {/*
                  STATS
              */}

              <div className="stats-row">


                <div>

                  <h3>
                    Attendance
                  </h3>

                  <h2>
                    72%
                  </h2>

                  <p>
                    Good
                  </p>

                </div>


                <div>

                  <h3>
                    Punctuality
                  </h3>

                  <h2>
                    85%
                  </h2>

                  <p>
                    Excellent
                  </p>

                </div>


              </div>


              {/*
                  WHATSAPP
              */}

              <button
                className="whatsapp-btn"
              >

                <FaWhatsapp />

                Share ID on WhatsApp

              </button>


            </div>

          </div>

        )}


      {/*
          PROFILE MODAL
      */}

      {showProfileModal && (

        <div className="modal-overlay">


          <div className="profile-modal">


            <FaTimes
              className="close-icon"

              onClick={() =>
                setShowProfileModal(
                  false
                )
              }
            />


            <h2>
              Clinic Profile
            </h2>


            <p>

              <strong>
                ID:
              </strong>{" "}

              {
                userData?.id ||
                "-"
              }

            </p>


            <p>

              <strong>
                Name:
              </strong>{" "}

              {
                userData?.name ||
                "-"
              }

            </p>


            <p>

              <strong>
                Email:
              </strong>{" "}

              {
                userData?.email ||
                "-"
              }

            </p>


            <p>

              <strong>
                Mobile:
              </strong>{" "}

              {
                userData?.mobile ||
                "-"
              }

            </p>


            <p>

              <strong>
                Role:
              </strong>{" "}

              {
                userData?.role ||
                "-"
              }

            </p>


          </div>

        </div>

      )}


    </div>

  );

};


export default HomePage;