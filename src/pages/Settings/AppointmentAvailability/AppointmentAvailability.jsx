import React, { useState } from "react";

import AppointmentSettings from "./AppointmentSettings";
import WeeklySchedule from "./WeeklySchedule";
import PreviewSlots from "./PreviewSlots";
import LeaveDays from "./LeaveDays";
import AddLeaveModal from "./AddLeaveModal";

import "./AppointmentAvailability.css";

const AppointmentAvailability = () => {

  /* =====================================================
     APPOINTMENT SETTINGS
  ===================================================== */

  const [settings, setSettings] = useState({
    enableAppointment: true,
    sameDayBooking: true,

    slotDuration: 30,

    maximumAppointments: 1,

    bookingStartDays: 30,

    futureAppointmentDays: 30,

    appointmentStartTime: "09:00",

    appointmentEndTime: "21:00",
  });


  /* =====================================================
     WEEKLY SCHEDULE

     enabled:
     true  = Working Day
     false = Clinic Closed

     morningEnabled:
     true  = Morning slots available
     false = Morning slots disabled

     eveningEnabled:
     true  = Evening slots available
     false = Evening slots disabled
  ===================================================== */

  const [schedule, setSchedule] = useState([
    {
      day: "Monday",
      enabled: true,

      morningEnabled: true,
      morningStart: "09:00",
      morningEnd: "13:00",

      eveningEnabled: true,
      eveningStart: "16:00",
      eveningEnd: "20:00",
    },

    {
      day: "Tuesday",
      enabled: true,

      morningEnabled: true,
      morningStart: "09:00",
      morningEnd: "13:00",

      eveningEnabled: true,
      eveningStart: "16:00",
      eveningEnd: "20:00",
    },

    {
      day: "Wednesday",
      enabled: true,

      morningEnabled: true,
      morningStart: "09:00",
      morningEnd: "13:00",

      eveningEnabled: true,
      eveningStart: "16:00",
      eveningEnd: "20:00",
    },

    {
      day: "Thursday",
      enabled: true,

      morningEnabled: true,
      morningStart: "09:00",
      morningEnd: "13:00",

      eveningEnabled: true,
      eveningStart: "16:00",
      eveningEnd: "20:00",
    },

    {
      day: "Friday",
      enabled: true,

      morningEnabled: true,
      morningStart: "09:00",
      morningEnd: "13:00",

      eveningEnabled: true,
      eveningStart: "16:00",
      eveningEnd: "20:00",
    },

    {
      day: "Saturday",
      enabled: false,

      morningEnabled: false,
      morningStart: "09:00",
      morningEnd: "13:00",

      eveningEnabled: false,
      eveningStart: "16:00",
      eveningEnd: "20:00",
    },

    {
      day: "Sunday",
      enabled: false,

      morningEnabled: false,
      morningStart: "09:00",
      morningEnd: "13:00",

      eveningEnabled: false,
      eveningStart: "16:00",
      eveningEnd: "20:00",
    },
  ]);


  /* =====================================================
     LEAVES
  ===================================================== */

  const [leaves, setLeaves] = useState([]);


  /* =====================================================
     LEAVE MODAL
  ===================================================== */

  const [showLeaveModal, setShowLeaveModal] =
    useState(false);


  /* =====================================================
     ADD LEAVE
  ===================================================== */

  const handleAddLeave = (newLeave) => {

    const leave = {
      id: Date.now(),
      ...newLeave,
      status: "Active",
    };

    setLeaves((previous) => [
      ...previous,
      leave,
    ]);

    setShowLeaveModal(false);
  };


  /* =====================================================
     DELETE LEAVE
  ===================================================== */

  const handleDeleteLeave = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave?"
    );

    if (!confirmDelete) {
      return;
    }

    setLeaves((previous) =>
      previous.filter(
        (leave) => leave.id !== id
      )
    );
  };


  /* =====================================================
     EDIT LEAVE
  ===================================================== */

  const handleEditLeave = (leave) => {

    alert(
      `Edit Leave\n\nType: ${
        leave.leaveType
      }\nFrom: ${
        leave.fromDate
      }\nTo: ${
        leave.toDate
      }`
    );
  };


  /* =====================================================
     SAVE ALL SETTINGS
  ===================================================== */

  const handleSaveSettings = () => {

    const data = {
      settings,
      schedule,
      leaves,
    };

    console.log(
      "Appointment Availability:",
      data
    );

    alert(
      "Appointment availability saved successfully."
    );
  };


  return (
    <div className="appointment-availability-page">

  

      <div className="appointment-availability-header">

        <div>

          <h1>
            Appointment Availability
          </h1>

          <p>
            Manage clinic appointment timing,
            weekly schedule, slots and leaves
          </p>

        </div>

        <button
          type="button"
          className="appointment-header-leave-btn"
          onClick={() =>
            setShowLeaveModal(true)
          }
        >

          <span>+</span>

          Add Leave

        </button>

      </div>


      {/* =================================================
          APPOINTMENT SETTINGS
      ================================================= */}

      <AppointmentSettings
        settings={settings}
        setSettings={setSettings}
      />


      {/* =================================================
          MAIN GRID
      ================================================= */}

      <div className="appointment-main-grid">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="appointment-left-content">

          {/* =================================================
              WEEKLY SCHEDULE
          ================================================= */}

          <WeeklySchedule
            schedule={schedule}
            setSchedule={setSchedule}
          />


          {/* =================================================
              LEAVE DAYS
          ================================================= */}

          <div className="appointment-bottom-grid">

            <LeaveDays
              leaves={leaves}

              onAddLeave={() =>
                setShowLeaveModal(true)
              }

              onDeleteLeave={
                handleDeleteLeave
              }

              onEditLeave={
                handleEditLeave
              }
            />

          </div>

        </div>


        {/* =================================================
            PREVIEW
        ================================================= */}

        <div className="appointment-right-content">

          <PreviewSlots
            schedule={schedule}
            leaves={leaves}
            settings={settings}
          />

        </div>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="appointment-page-footer">

        <button
          type="button"
          className="appointment-cancel-btn"
          onClick={() =>
            window.history.back()
          }
        >
          Cancel
        </button>

        <button
          type="button"
          className="appointment-save-btn"
          onClick={handleSaveSettings}
        >
          Save Settings
        </button>

      </div>


      {/* =================================================
          ADD LEAVE MODAL
      ================================================= */}

      {showLeaveModal && (

        <AddLeaveModal
          onClose={() =>
            setShowLeaveModal(false)
          }

          onSave={handleAddLeave}
        />

      )}

    </div>
  );
};

export default AppointmentAvailability;