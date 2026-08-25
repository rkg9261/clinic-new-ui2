import React, {
  useEffect,
  useState,
} from "react";

import "./OpenPatientList.css";
import { BASE_URL } from "../../config/api";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { FaTimes } from "react-icons/fa";



export default function OpenPatientList() {
  const navigate = useNavigate();

  const location = useLocation();

  // ================= GET PATIENT FROM HOMEPAGE =================

  const selectedPatient =
    location.state?.patient || null;

  // ================= STATES =================

  const [
    showIdCard,
    setShowIdCard,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    patient,
    setPatient,
  ] = useState({
    id: "",

    fileNo: "",

    patientCode: "",

    name: "",

    age: "",

    sex: "",

    whatsapp: "",

    address: "",

    problem: "",

    attendance: 72,

    punctuality: 85,
  });

  // ================= FETCH PATIENT FILE =================

  const fetchPatientFile = async () => {
    try {
      setLoading(true);

      // ================= TOKEN =================

      const token =
        localStorage.getItem("token");

      console.log(
        "PATIENT FILE TOKEN:",
        token
      );

      if (!token) {
        alert(
          "Token not found. Please login again."
        );

        navigate("/login");

        return;
      }

      // ================= PATIENT ID =================

      const patientId =
        selectedPatient?.id ||
        selectedPatient?._id;

      console.log(
        "SELECTED PATIENT:",
        selectedPatient
      );

      console.log(
        "PATIENT FILE ID:",
        patientId
      );

      if (!patientId) {
        alert(
          "Patient ID not found. Please open patient from homepage."
        );

        navigate("/homepage");

        return;
      }

      // ================= API CALL =================

      const response = await fetch(
        `${BASE_URL}/api/clinic/patients/${patientId}/file`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      // ================= RAW RESPONSE =================

      const responseText =
        await response.text();

      console.log(
        "RAW PATIENT FILE RESPONSE:",
        responseText
      );

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch (error) {
        console.error(
          "PATIENT FILE JSON PARSE ERROR:",
          error
        );
      }

      console.log(
        "PATIENT FILE STATUS:",
        response.status
      );

      console.log(
        "PATIENT FILE RESPONSE:",
        data
      );

      // ================= 401 ERROR =================

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

      // ================= 403 ERROR =================

      if (response.status === 403) {
        alert(
          data.message ||
            "You do not have permission to view patient file."
        );

        return;
      }

      // ================= 404 ERROR =================

      if (response.status === 404) {
        alert(
          data.message ||
            "Patient file not found."
        );

        return;
      }

      // ================= API ERROR =================

      if (!response.ok) {
        alert(
          data.message ||
            data.error ||
            `Failed to get patient file. Status: ${response.status}`
        );

        return;
      }

      // ================= GET PATIENT DATA =================

      const patientData =
        data.data?.patient ||
        data.patient ||
        data.data ||
        data;

      console.log(
        "FINAL PATIENT FILE DATA:",
        patientData
      );

      // ================= FORMAT PATIENT DATA =================

      setPatient({
        id:
          patientData.id ||
          patientData._id ||
          patientId ||
          "",

        fileNo:
          patientData.file_number ||
          patientData.fileNo ||
          selectedPatient?.file_number ||
          selectedPatient?.fileNo ||
          "",

        patientCode:
          patientData.patient_code ||
          patientData.patientCode ||
          selectedPatient?.patient_code ||
          selectedPatient?.patientCode ||
          "",

        name:
          patientData.full_name ||
          patientData.name ||
          selectedPatient?.full_name ||
          selectedPatient?.name ||
          "",

        age:
          patientData.age ??
          selectedPatient?.age ??
          "",

        sex:
          patientData.gender ||
          patientData.sex ||
          selectedPatient?.gender ||
          selectedPatient?.sex ||
          "",

        whatsapp:
          patientData.mobile_number ||
          patientData.mobileNumber ||
          patientData.mobile ||
          patientData.whatsapp ||
          selectedPatient?.mobile_number ||
          selectedPatient?.mobileNumber ||
          selectedPatient?.mobile ||
          "",

        address:
          patientData.address ||
          selectedPatient?.address ||
          "",

        problem:
          patientData.problem ||
          patientData.disease_problem ||
          selectedPatient?.problem ||
          selectedPatient?.disease_problem ||
          "",

        attendance: Number(
          patientData.attendance_percentage ??
            patientData.attendance ??
            72
        ),

        punctuality: Number(
          patientData.punctuality_percentage ??
            patientData.punctuality ??
            85
        ),
      });
    } catch (error) {
      console.error(
        "FETCH PATIENT FILE ERROR:",
        error
      );

      alert(
        "Something went wrong while loading patient file!"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= CALL PATIENT FILE API =================

  useEffect(() => {
    fetchPatientFile();
  }, []);

  // ================= SHARE WHATSAPP =================

  const shareWhatsApp = () => {
    const text =
      `Patient ID Card\n\n` +
      `File No: ${patient.fileNo}\n` +
      `Patient Code: ${patient.patientCode}\n` +
      `Name: ${patient.name}\n` +
      `Age/Sex: ${patient.age}/${patient.sex}\n` +
      `Mobile: ${patient.whatsapp}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  // ================= CLOSE PATIENT FILE =================

  const handleClose = () => {
    navigate("/homepage", {
      state: {
        openPatientPopup: true,

        patient:
          selectedPatient || patient,
      },
    });
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="patient-file-page">
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Loading Patient...
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="patient-file-page">
        <div className="patient-file-card">

          {/* ================= CLOSE ICON ================= */}

          <FaTimes
            className="close-icon-patient-file"
            onClick={handleClose}
          />

          {/* ================= PATIENT DETAILS ================= */}

         {/* ================= PATIENT HEADER ================= */}

<div className="patient-header-open-patient">

  <h2>{patient.name || "Unknown Patient"}</h2>

  <div className="patient-header-details-open-patient">

    <span>
      <strong>File No:</strong>{" "}
      {patient.fileNo || "-"}
    </span>

    <span>
      <strong>Patient Code:</strong>{" "}
      {patient.patientCode || "-"}
    </span>

  </div>

  <h3>Patient File</h3>

</div>

{/* ================= PATIENT DETAILS ================= */}



          <div className="patient-info">

            <p>
              <strong>
                File No:
              </strong>{" "}
              {patient.fileNo || "-"}
            </p>

            <p>
              <strong>
                Patient Code:
              </strong>{" "}
              {patient.patientCode ||
                "-"}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {patient.name || "-"}
            </p>

            <p>
              <strong>
                Age/Sex:
              </strong>{" "}
              {patient.age || "-"} /{" "}
              {patient.sex || "-"}
            </p>

            <p>
              <strong>
                Mobile:
              </strong>{" "}
              {patient.whatsapp || "-"}
            </p>

            <p>
              <strong>
                Address:
              </strong>{" "}
              {patient.address || "-"}
            </p>

            <p>
              <strong>
                Problem:
              </strong>{" "}
              {patient.problem || "-"}
            </p>

          </div>

          {/* ================= LINKS ================= */}

          <div className="link-grid">

            <button
              onClick={() =>
                navigate(
                  "/prescription",
                  {
                    state: {
                      patient:
                        selectedPatient ||
                        patient,
                    },
                  }
                )
              }
            >
              Patient Prescription
            </button>

            <button
              onClick={() =>
                setShowIdCard(true)
              }
            >
              Show ID Card
            </button>

            <button
              onClick={() =>
                navigate(
                  "/treatment-protocol",
                  {
                    state: {
                      patient:
                        selectedPatient ||
                        patient,
                    },
                  }
                )
              }
            >
              Treatment Protocol
            </button>

            <button
              onClick={() =>
                navigate(
                  "/attendance",
                  {
                    state: {
                      patient:
                        selectedPatient ||
                        patient,
                    },
                  }
                )
              }
            >
              Attendance Sheet
            </button>

            <button
              onClick={() =>
                navigate(
                  "/recharge",
                  {
                    state: {
                      returnToPopup: true,

                      patient:
                        selectedPatient ||
                        patient,
                    },
                  }
                )
              }
            >
              Recharge
            </button>

          </div>

          {/* ================= ATTENDANCE METERS ================= */}

          <div className="meter-section">

            <h3>Attendance %</h3>

            <div className="meter">
              <div
                className="meter-fill"
                style={{
                  width: `${patient.attendance}%`,
                }}
              >
                {patient.attendance}%
              </div>
            </div>

            <p>Good</p>

            <h3>Punctuality %</h3>

            <div className="meter">
              <div
                className="meter-fill"
                style={{
                  width: `${patient.punctuality}%`,
                }}
              >
                {patient.punctuality}%
              </div>
            </div>

            <p>Excellent</p>

          </div>

          {/* ================= PATIENT BILLS ================= */}

          <div className="bill-section">

            <h3>Patient Bills</h3>

            <ul>
              <li>
                Bill #1001 - ₹250
              </li>

              <li>
                Bill #1002 - ₹1125
              </li>

              <li>
                Bill #1003 - ₹600
              </li>
            </ul>

          </div>

        </div>

        {/* ================= ID CARD MODAL ================= */}

        {showIdCard && (
          <div className="modal-overlay">

            <div className="id-card">

              <h3>
                Patient ID Card
              </h3>

              <p>
                File No:{" "}
                {patient.fileNo || "-"}
              </p>

              <p>
                Patient Code:{" "}
                {patient.patientCode ||
                  "-"}
              </p>

              <p>
                Name:{" "}
                {patient.name || "-"}
              </p>

              <p>
                Age/Sex:{" "}
                {patient.age || "-"} /{" "}
                {patient.sex || "-"}
              </p>

              <p>
                Mobile:{" "}
                {patient.whatsapp || "-"}
              </p>

              <button
                onClick={
                  shareWhatsApp
                }
              >
                Share ID on WhatsApp
              </button>

              <button
                className="close-btn"
                onClick={() =>
                  setShowIdCard(false)
                }
              >
                Close
              </button>

            </div>

          </div>
        )}

      </div>
    </>
  );
}