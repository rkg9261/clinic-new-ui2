import React, { useState } from "react";
import "./PatientAttendance.css";
import { useNavigate, useLocation } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

export default function PatientAttendance() {

 const navigate = useNavigate();
const location = useLocation();


  const [attendanceList, setAttendanceList] = useState([
    {
      serialNo: 1,
      name: "Rajan Kumar",
      date: "01-06-2026",
      time: "10:00 AM",
    },
    {
      serialNo: 2,
      name: "Ansh",
      date: "01-06-2026",
      time: "11:00 AM",
    },
    {
      serialNo: 3,
      name: "Mahi",
      date: "01-06-2026",
      time: "12:00 PM",
    },
  ]);

  return (
    <>
   
    <div className="attendance-container">

      <div className="attendance-card">
    
     <button  className="close-attendance-btn" onClick={() =>
        navigate("/homepage", {   state: {
        openPatientPopup: true,
       },
   })
   } > ✕</button>

         <h2>Patient Attendance Sheet</h2>

        <div className="table-wrapper">

          <table className="attendance-table">

            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>

              {attendanceList.map((item) => (

                <tr key={item.serialNo}>

                  <td>{item.serialNo}</td>

                  <td>{item.name}</td>

                  <td>{item.date}</td>

                  <td>{item.time}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
    </>
  );
}