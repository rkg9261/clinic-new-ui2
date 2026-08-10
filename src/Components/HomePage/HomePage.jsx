import React, {
  useEffect,
  useState,
} from "react";

import "./HomePage.css";

import Cookies from "js-cookie";
import { BASE_URL } from "../../config/api";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  // FaCamera,
  FaTimes,
  FaWallet,
  FaFolder,
  FaHome,
  FaWhatsapp,
  FaFilePrescription,
  FaClipboardList,
  FaCalendarCheck,
  // FaSearch,
} from "react-icons/fa";



const HomePage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  // ================= STATES =================

  // const [
  //   showAppointments,
  //   setShowAppointments,
  // ] = useState(false);

  const [
    currentPatient,
    setCurrentPatient,
  ] = useState(null);

  // const [
  //   searchValue,
  //   setSearchValue,
  // ] = useState("");

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
    searchLoading,
    setSearchLoading,
  ] = useState(false);

  const [
    attendanceLoading,
    setAttendanceLoading,
  ] = useState(false);

  // ================= CHECK TODAY ATTENDANCE =================

  const isAttendanceMarkedToday = (
    attendanceValue
  ) => {
    if (!attendanceValue) {
      return false;
    }

    const attendanceDateValue =
      new Date(attendanceValue);

    if (
      Number.isNaN(
        attendanceDateValue.getTime()
      )
    ) {
      return false;
    }

    const today = new Date();

    return (
      attendanceDateValue.getFullYear() ===
        today.getFullYear() &&
      attendanceDateValue.getMonth() ===
        today.getMonth() &&
      attendanceDateValue.getDate() ===
        today.getDate()
    );
  };

  // ================= SET ATTENDANCE STATUS =================

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

    setAttendanceMarked(markedToday);

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

  // ================= FORMAT PATIENT =================

  const formatPatient = (item) => {
    const payableAmount = Number(
      item.amount ??
        item.payable_amount ??
        item.package_amount ??
        700
    );

    const cashPaid = Number(
      item.cash_amount ??
        item.cash ??
        0
    );

    const upiPaid = Number(
      item.upi_amount ??
        item.online_amount ??
        item.upi ??
        0
    );

    const totalPaid =
      cashPaid + upiPaid;

    return {
      ...item,

      _id:
        item.id ||
        item._id ||
        "",

      name:
        item.full_name ||
        item.name ||
        "",

      age:
        item.age ?? "",

      gender:
        item.gender ||
        item.sex ||
        "",

      mobileNumber:
        item.mobile_number ||
        item.mobileNumber ||
        item.mobile ||
        "",

      address:
        item.address || "",

      problem: "",
        // item.problem ||
        // item.disease_problem ||
       

      appointmentType:
        item.appointment_type ||
        item.appointmentType ||
        "",

 appointmentDate:
  item.appointment_type === "STANDARD"
    ? (item.available_date ||
       item.availableDate)
    : (item.appointment_date ||
       item.appointmentDate ||
       item.created_date),

appointmentTime:
  item.appointment_type === "STANDARD"
    ? (item.available_time_slot ||
       item.availableTimeSlot)
    : (item.appointment_time ||
       item.appointmentTime ||
       ""),

      amount: payableAmount,

      cash: cashPaid,

      upi: upiPaid,

      total: totalPaid,

      backendTotalAmount: Number(
        item.total_amount ?? 0
      ),

      fileNo:
        item.file_number ||
        item.fileNo ||
        "",

      patientCode:
        item.patient_code ||
        item.patientCode ||
        "",

      lastAttendanceDate:
        item.last_attendance_date ||
        item.lastAttendanceDate ||
        "",

      paymentMethod:
        item.payment_method ||
        "",

      packageName:
        item.package_name ||
        "",

      sessionsRemaining:
        item.sessions_remaining ??
        0,

      reportType:
        item.report_type ||
        "",

      startDate:
        item.start_date || "",

      createdDate:
        item.created_date ||
        "",

      branchId:
        item.branch_id || "",

      documentFile:
        item.document_file ||
        null,
    };
  };

  // ================= PROFILE DATA =================

  useEffect(() => {
    const userCookie =
      Cookies.get("user");

    const localUser =
      localStorage.getItem("user");

    try {
      if (userCookie) {
        const user =
          JSON.parse(userCookie);

        setUserData(user);
      } else if (localUser) {
        const user =
          JSON.parse(localUser);

        setUserData(user);
      }
    } catch (error) {
      console.error(
        "User Parse Error:",
        error
      );
    }
  }, []);

  // ================= GET ALL PATIENTS API =================

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Token not found. Please login again."
        );

        navigate("/login");

        return [];
      }

      const response = await fetch(
        `${BASE_URL}/api/clinic/patients`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const responseText =
        await response.text();

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch (error) {
        console.error(
          "PATIENT JSON ERROR:",
          error
        );
      }

      console.log(
        "GET STATUS:",
        response.status
      );

      console.log(
        "COMPLETE GET RESPONSE:",
        data
      );

      if (response.status === 401) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        alert(
          "Session expired. Please login again."
        );

        navigate("/login");

        return [];
      }

      if (response.status === 403) {
        alert(
          data.message ||
            "You do not have permission to view patients."
        );

        return [];
      }

      if (!response.ok) {
        alert(
          data.message ||
            data.error ||
            "Failed to get patients"
        );

        return [];
      }

      let patients = [];

      if (Array.isArray(data)) {
        patients = data;
      } else if (
        Array.isArray(data.data)
      ) {
        patients = data.data;
      } else if (
        Array.isArray(data.patients)
      ) {
        patients = data.patients;
      } else if (
        Array.isArray(
          data.data?.patients
        )
      ) {
        patients =
          data.data.patients;
      } else if (
        Array.isArray(data.result)
      ) {
        patients = data.result;
      }

      const formattedPatients =
        patients.map((item) =>
          formatPatient(item)
        );

      console.log(
        "FORMATTED PATIENT DATA:",
        formattedPatients
      );

      setPatientList(
        formattedPatients
      );

      return formattedPatients;
    } catch (error) {
      console.error(
        "Fetch Patient Error:",
        error
      );

      alert(
        "Something went wrong while loading patients!"
      );

      return [];
    } finally {
      setLoading(false);
    }
  };

  // ================= CALL GET API =================

  useEffect(() => {
    fetchPatients();
  }, []);

  // ================= OPEN PATIENT FROM LOCATION =================

useEffect(() => {
  if (
    location.state?.openPatientPopup &&
    location.state?.patient
  ) {
    const patient = formatPatient(location.state.patient);

    setCurrentPatient(patient);

    setPatientAttendanceStatus(patient);

    setShowPatientCard(true);
  }
}, [location]);

  // ================= OPEN PATIENT =================

  const openPatient = (
    patientData
  ) => {
    const patient =
      formatPatient(patientData);

    setCurrentPatient(patient);

    setPatientAttendanceStatus(
      patient
    );

    setShowPatientCard(true);
  };

  // ================= SEARCH PATIENT API =================

  // const handleSubmit = async () => {
  //   try {
  //     const fileNumber =
  //       searchValue.trim();

  //     if (!fileNumber) {
  //       return;
  //     }

  //     const token =
  //       localStorage.getItem("token");

  //     if (!token) {
  //       alert(
  //         "Token not found. Please login again."
  //       );

  //       navigate("/login");

  //       return;
  //     }

  //     setSearchLoading(true);

  //     const response = await fetch(
  //       `${BASE_URL}/api/clinic/patients/search?file_number=${encodeURIComponent(
  //         fileNumber
  //       )}`,
  //       {
  //         method: "GET",

  //         headers: {
  //           Authorization:
  //             `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const responseText =
  //       await response.text();

  //     let data = {};

  //     try {
  //       data = responseText
  //         ? JSON.parse(responseText)
  //         : {};
  //     } catch (error) {
  //       console.error(
  //         "SEARCH JSON ERROR:",
  //         error
  //       );
  //     }

  //     console.log(
  //       "SEARCH STATUS:",
  //       response.status
  //     );

  //     console.log(
  //       "SEARCH RESPONSE:",
  //       data
  //     );

  //     if (response.status === 401) {
  //       localStorage.removeItem(
  //         "token"
  //       );

  //       localStorage.removeItem(
  //         "user"
  //       );

  //       alert(
  //         "Session expired. Please login again."
  //       );

  //       navigate("/login");

  //       return;
  //     }

  //     if (response.status === 403) {
  //       alert(
  //         data.message ||
  //           "You do not have permission to search patients."
  //       );

  //       return;
  //     }

  //     if (response.status === 404) {
  //       alert(
  //         data.message ||
  //           "Patient Not Found"
  //       );

  //       return;
  //     }

  //     if (!response.ok) {
  //       alert(
  //         data.message ||
  //           data.error ||
  //           `Patient search failed. Status: ${response.status}`
  //       );

  //       return;
  //     }

  //     let patient = null;

  //     if (
  //       data &&
  //       !Array.isArray(data) &&
  //       (
  //         data.id ||
  //         data._id ||
  //         data.file_number ||
  //         data.patient_code
  //       )
  //     ) {
  //       patient = data;
  //     } else if (
  //       data.data &&
  //       !Array.isArray(data.data)
  //     ) {
  //       patient =
  //         data.data.patient ||
  //         data.data;
  //     } else if (
  //       data.patient &&
  //       !Array.isArray(data.patient)
  //     ) {
  //       patient = data.patient;
  //     } else if (
  //       Array.isArray(data) &&
  //       data.length > 0
  //     ) {
  //       patient = data[0];
  //     } else if (
  //       Array.isArray(data.data) &&
  //       data.data.length > 0
  //     ) {
  //       patient = data.data[0];
  //     } else if (
  //       Array.isArray(
  //         data.patients
  //       ) &&
  //       data.patients.length > 0
  //     ) {
  //       patient =
  //         data.patients[0];
  //     } else if (
  //       Array.isArray(data.result) &&
  //       data.result.length > 0
  //     ) {
  //       patient =
  //         data.result[0];
  //     }

  //     if (!patient) {
  //       alert("Patient Not Found");

  //       return;
  //     }

  //     openPatient(patient);
  //   } catch (error) {
  //     console.error(
  //       "SEARCH PATIENT ERROR:",
  //       error
  //     );

  //     alert(
  //       "Something went wrong while searching patient!"
  //     );
  //   } finally {
  //     setSearchLoading(false);
  //   }
  // };

  // ================= CAMERA =================

  // const handleCameraClick = () => {
  //   alert(
  //     "Camera Scanner Opened Successfully"
  //   );
  // };

  // ================= ENTER KEY =================

  // const handleEnterKey = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();

  //     handleSubmit();
  //   }
  // };

  // ================= MARK ATTENDANCE API =================

  const handleMarkAttendance =
    async () => {
      try {
        if (attendanceMarked) {
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

          navigate("/login");

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

        setAttendanceLoading(true);

        const attendancePayload = {
          patientId:
            Number(patientId),
        };

        console.log(
          "ATTENDANCE PAYLOAD:",
          attendancePayload
        );

        const response = await fetch(
          `${BASE_URL}/api/clinic/patients/attendance`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              attendancePayload
            ),
          }
        );

        const responseText =
          await response.text();

        let data = {};

        try {
          data = responseText
            ? JSON.parse(responseText)
            : {};
        } catch (error) {
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

        if (response.status === 401) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          alert(
            "Session expired. Please login again."
          );

          navigate("/login");

          return;
        }

        if (response.status === 403) {
          alert(
            data.message ||
              "You do not have permission to mark attendance."
          );

          return;
        }

        if (!response.ok) {
          alert(
            data.message ||
              data.error ||
              `Attendance failed. Status: ${response.status}`
          );

          return;
        }

        const attendanceDateFromApi =
          data.attendance_date ||
          data.data
            ?.attendance_date ||
          data.last_attendance_date ||
          data.data
            ?.last_attendance_date ||
          new Date().toISOString();

        const fileNumberFromApi =
          data.file_number ||
          data.fileNo ||
          data.data?.file_number ||
          data.data?.fileNo ||
          currentPatient.file_number ||
          currentPatient.fileNo ||
          "";

        const updatedPatient = {
          ...currentPatient,

          lastAttendanceDate:
            attendanceDateFromApi,

          last_attendance_date:
            attendanceDateFromApi,

          fileNo:
            fileNumberFromApi,

          file_number:
            fileNumberFromApi,
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

        const updatedPatients =
          await fetchPatients();

        const refreshedPatient =
          updatedPatients.find(
            (item) =>
              String(
                item.id ||
                  item._id
              ) ===
              String(patientId)
          );

        if (refreshedPatient) {
          setCurrentPatient(
            refreshedPatient
          );

          setPatientAttendanceStatus(
            refreshedPatient
          );
        }
      } catch (error) {
        console.error(
          "MARK ATTENDANCE ERROR:",
          error
        );

        alert(
          "Something went wrong while marking attendance!"
        );
      } finally {
        setAttendanceLoading(false);
      }
    };

  return (
    <div className="container-homepage">

      {/* ================= SEARCH BOX ================= */}

      {/* <div className="search-box">
        <input
          type="text"
          placeholder="Enter File No"
          value={searchValue}
          onChange={(e) =>
            setSearchValue(
              e.target.value
            )
          }
          onKeyDown={handleEnterKey}
          disabled={searchLoading}
        />

        {searchValue.trim().length >
        0 ? (
          <button
            className="search-icon-btn"
            onClick={handleSubmit}
            disabled={searchLoading}
          >
            <FaSearch size={20} />
          </button>
        ) : (
          <button
            className="search-icon-btn"
            onClick={
              handleCameraClick
            }
          >
            <FaCamera size={20} />
          </button>
        )}
      </div> */}

    

     {/* ================= PATIENT RECORDS ================= */}

{loading ? (
  <h3 className="loading-text">
    Loading Patient Records...
  </h3>
) : (
  <div className="records-section">

    {patientList.length === 0 ? (

      <p>No Patient Added</p>

    ) : (

      <div className="table-container">
           <h2 className="heading-patient-appointment"> Patient Appointment</h2>
        <table className="appointment-table">
         

          <thead>

            <tr>

              <th>S.No</th>

              <th>Name</th>

              <th>Age</th>

              <th>Gender</th>

              <th>Mobile</th>

              <th>Address</th>

              <th>Appointment Type</th>

              <th>Appointment Date</th>

              <th>Appointment Time</th>

              <th>Cash Paid</th>

              <th>UPI / Online</th>

              <th>Total Paid</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {patientList.map((item, index) => {

              const cashPaid = Number(item.cash || 0);

              const upiPaid = Number(item.upi || 0);

              const totalPaid = cashPaid + upiPaid;

              return (

                <tr key={item._id || index}>

                  <td>{index + 1}</td>

                  <td>{item.name || "-"}</td>

                  <td>{item.age ?? "-"}</td>

                  <td>{item.gender || "-"}</td>

                  <td>{item.mobileNumber || "-"}</td>

                  <td>{item.address || "-"}</td>

                  <td>{item.appointmentType || "-"}</td>

                  <td>
                    {item.appointmentDate
                      ? new Date(
                          item.appointmentDate
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td>{item.appointmentTime || "-"}</td>

                  <td>₹{cashPaid}</td>

                  <td>₹{upiPaid}</td>

                  <td>₹{totalPaid}</td>

                  <td>

                    <button
                      className="enter-btn"
                      onClick={() => openPatient(item)}
                    >
                      Enter
                    </button>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    )}

  </div>
)}

      {/* ================= PATIENT MODAL ================= */}

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

            <div className="patient-header">

  <h2>
    {currentPatient.name || "Patient"} (
    {currentPatient.age ?? "-"} / {currentPatient.gender || "-"})
  </h2>

  <div className="patient-info-table-wrapper">

    <table className="patient-info-table">

      <tbody>

        <tr>
          <th>Patient Code</th>
          <td>{currentPatient.patientCode || "-"}</td>

          <th>Mobile</th>
          <td>{currentPatient.mobileNumber || "-"}</td>
        </tr>

        <tr>
          <th>Address</th>
          <td>{currentPatient.address || "-"}</td>
 

          <th>Problem</th>
          <td>{currentPatient.problem || "-"}</td>
       </tr>
        <tr>
          <th>Appointment Type</th>
          <td>{currentPatient.appointmentType || "-"}</td>

          <th>Appointment Date</th>
          <td>
            {currentPatient.appointmentDate
              ? new Date(
                  currentPatient.appointmentDate
                ).toLocaleDateString("en-IN")
              : "-"}
          </td>
        </tr>

        <tr>
          <th>Last Attendance</th>
          <td>{attendanceDate}</td>

          <th>File No</th>
          <td>
            {currentPatient.fileNo ||
              currentPatient.file_number ||
              "-"}
          </td>
        </tr>

      </tbody>

    </table>

  </div>

</div>

              {/* ================= DAILY ATTENDANCE ================= */}

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

              {/* ================= FEATURE CARDS ================= */}

              <div className="feature-row">

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
                  <FaWallet size={35} />

                  <p>Recharge</p>
                </div>

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
                  <FaFolder size={35} />

                  <p>
                    Open Patient File
                  </p>
                </div>

                <div
                  className="feature-card"
                  onClick={() =>
                    navigate("/")
                  }
                >
                  <FaHome size={35} />

                  <p>Homepage</p>
                </div>

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

                  <p>Prescription</p>
                </div>

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

              {/* ================= STATS ================= */}

              <div className="stats-row">

                <div>
                  <h3>Attendance</h3>

                  <h2>72%</h2>

                  <p>Good</p>
                </div>

                <div>
                  <h3>Punctuality</h3>

                  <h2>85%</h2>

                  <p>Excellent</p>
                </div>

              </div>

              {/* ================= WHATSAPP ================= */}

              <button className="whatsapp-btn">
                <FaWhatsapp />

                Share ID on WhatsApp
              </button>

            </div>
          </div>
        )}

      {/* ================= PROFILE MODAL ================= */}

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

            <h2>Clinic Profile</h2>

            <p>
              <strong>ID:</strong>{" "}
              {userData?.id || "-"}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {userData?.name || "-"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {userData?.email || "-"}
            </p>

            <p>
              <strong>Mobile:</strong>{" "}
              {userData?.mobile || "-"}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {userData?.role || "-"}
            </p>

          </div>
        </div>
      )}

    </div>
  );
};

export default HomePage;