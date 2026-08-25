import React, {
  useRef,
  useState,
} from "react";

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

  const [
    settings,
    setSettings
  ] = useState(null);


  /* =====================================================
     WEEKLY SCHEDULE

  ===================================================== */

  const [
    schedule,
    setSchedule
  ] = useState([

    {
      day:
        "Monday",

      dayOfWeek:
        "Monday",

      id:
        null,

      enabled:
        false,

      morningEnabled:
        false,

      morningStart:
        "",

      morningEnd:
        "",

      eveningEnabled:
        false,

      eveningStart:
        "",

      eveningEnd:
        "",

    },

    {
      day:
        "Tuesday",

      dayOfWeek:
        "Tuesday",

      id:
        null,

      enabled:
        false,

      morningEnabled:
        false,

      morningStart:
        "",

      morningEnd:
        "",

      eveningEnabled:
        false,

      eveningStart:
        "",

      eveningEnd:
        "",

    },

    {
      day:
        "Wednesday",

      dayOfWeek:
        "Wednesday",

      id:
        null,

      enabled:
        false,

      morningEnabled:
        false,

      morningStart:
        "",

      morningEnd:
        "",

      eveningEnabled:
        false,

      eveningStart:
        "",

      eveningEnd:
        "",

    },

    {
      day:
        "Thursday",

      dayOfWeek:
        "Thursday",

      id:
        null,

      enabled:
        false,

      morningEnabled:
        false,

      morningStart:
        "",

      morningEnd:
        "",

      eveningEnabled:
        false,

      eveningStart:
        "",

      eveningEnd:
        "",

    },

    {
      day:
        "Friday",

      dayOfWeek:
        "Friday",

      id:
        null,

      enabled:
        false,

      morningEnabled:
        false,

      morningStart:
        "",

      morningEnd:
        "",

      eveningEnabled:
        false,

      eveningStart:
        "",

      eveningEnd:
        "",

    },

    {
      day:
        "Saturday",

      dayOfWeek:
        "Saturday",

      id:
        null,

      enabled:
        false,

      morningEnabled:
        false,

      morningStart:
        "",

      morningEnd:
        "",

      eveningEnabled:
        false,

      eveningStart:
        "",

      eveningEnd:
        "",

    },

    {
      day:
        "Sunday",

      dayOfWeek:
        "Sunday",

      id:
        null,

      enabled:
        false,

      morningEnabled:
        false,

      morningStart:
        "",

      morningEnd:
        "",

      eveningEnabled:
        false,

      eveningStart:
        "",

      eveningEnd:
        "",

    },

  ]);


  /* =====================================================
     WEEKLY SCHEDULE REF

     Used to call saveSchedule() from WeeklySchedule.jsx.
  ===================================================== */

  const weeklyScheduleRef =
    useRef(null);


  /* =====================================================
     LEAVES
  ===================================================== */

  const [
    leaves,
    setLeaves
  ] = useState([]);


  /* =====================================================
     LEAVE MODAL
  ===================================================== */

  const [
    showLeaveModal,
    setShowLeaveModal
  ] = useState(false);


  /* =====================================================
     EDIT LEAVE
  ===================================================== */

  const [
    editLeave,
    setEditLeave
  ] = useState(null);


  /* =====================================================
     LOADING
  ===================================================== */

  const [
    loading,
    setLoading
  ] = useState(false);


  /* =====================================================
     OPEN ADD LEAVE
  ===================================================== */

  const handleOpenAddLeave = () => {

    setEditLeave(
      null
    );

    setShowLeaveModal(
      true
    );

  };


  /* =====================================================
     SAVE LEAVE
  ===================================================== */

  const handleSaveLeave = (
    savedLeave
  ) => {

    console.log(
      "LEAVE SAVED:",
      savedLeave
    );


    if (!savedLeave) {

      return;

    }


    /* =================================================
       EDIT EXISTING LEAVE
    ================================================= */

    if (
      editLeave
    ) {

      setLeaves(
        (previous) =>

          previous.map(
            (leave) => {

              const leaveId =

                leave?.id ||

                leave?.leave_id ||

                leave?.leaveId ||

                leave?.appointmentLeaveId ||

                leave?.appointmentLeaveID;


              const editedId =

                editLeave?.id ||

                editLeave?.leave_id ||

                editLeave?.leaveId ||

                editLeave?.appointmentLeaveId ||

                editLeave?.appointmentLeaveID;


              if (
                String(
                  leaveId
                ) ===
                String(
                  editedId
                )
              ) {

                return {

                  ...leave,

                  ...savedLeave,

                };

              }


              return leave;

            }
          )
      );

    }


    /* =================================================
       ADD NEW LEAVE
    ================================================= */

    else {

      const newLeave = {

        id:

          savedLeave?.id ||

          savedLeave?.leave_id ||

          savedLeave?.leaveId ||

          savedLeave?.appointmentLeaveId ||

          savedLeave?.appointmentLeaveID ||

          Date.now(),


        ...savedLeave,


        status:
          savedLeave?.status ||
          "Active",

      };


      setLeaves(
        (previous) => [

          ...previous,

          newLeave,

        ]
      );

    }


    setShowLeaveModal(
      false
    );

    setEditLeave(
      null
    );

  };


  /* =====================================================
     DELETE LEAVE
  ===================================================== */

  const handleDeleteLeave = (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this leave?"
      );


    if (!confirmDelete) {

      return;

    }


    setLeaves(
      (previous) =>

        previous.filter(
          (leave) => {

            const leaveId =

              leave?.id ||

              leave?.leave_id ||

              leave?.leaveId ||

              leave?.appointmentLeaveId ||

              leave?.appointmentLeaveID;


            return (
              String(
                leaveId
              ) !==
              String(
                id
              )
            );

          }
        )
    );

  };


  /* =====================================================
     EDIT LEAVE
  ===================================================== */

  const handleEditLeave = (
    leave
  ) => {

    if (!leave) {

      return;

    }


    console.log(
      "EDIT LEAVE:",
      leave
    );


    setEditLeave(
      leave
    );

    setShowLeaveModal(
      true
    );

  };


  /* =====================================================
     SAVE ALL SETTINGS

     IMPORTANT:

     Weekly Schedule API is NOT here.

     WeeklySchedule.jsx owns:

     POST
     GET
     PUT
  ===================================================== */

  const handleSaveSettings = async () => {

    console.log(
      "=========================================="
    );

    console.log(
      "APPOINTMENT AVAILABILITY SAVE"
    );

    console.log(
      "=========================================="
    );


    try {

      setLoading(
        true
      );


      /* =================================================
         CALL WEEKLY SCHEDULE API

         The actual API logic is inside
         WeeklySchedule.jsx.
      ================================================= */

      if (
        weeklyScheduleRef.current &&
        typeof weeklyScheduleRef.current.saveSchedule ===
          "function"
      ) {

        await weeklyScheduleRef.current.saveSchedule();

      }


      console.log(
        "APPOINTMENT SETTINGS:",
        settings
      );


      console.log(
        "WEEKLY SCHEDULE:",
        schedule
      );


      console.log(
        "LEAVES:",
        leaves
      );

    }

    catch (error) {

      console.error(
        "APPOINTMENT AVAILABILITY SAVE ERROR:",
        error
      );

    }

    finally {

      setLoading(
        false
      );

    }

  };


  /* =====================================================
     RETURN
  ===================================================== */

  return (

    <div className="appointment-availability-page">


      {/* =================================================
          HEADER
      ================================================= */}

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

          onClick={
            handleOpenAddLeave
          }

          disabled={
            loading
          }
        >

          <span>
            +
          </span>

          Add Leave

        </button>

      </div>


      {/* =================================================
          APPOINTMENT SETTINGS
      ================================================= */}

      <AppointmentSettings

        settings={
          settings
        }

        setSettings={
          setSettings
        }

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

              API is completely inside WeeklySchedule.jsx.
          ================================================= */}

          <WeeklySchedule

            ref={
              weeklyScheduleRef
            }

            schedule={
              schedule
            }

            setSchedule={
              setSchedule
            }

          />


          {/* =================================================
              LEAVE DAYS
          ================================================= */}

          <div className="appointment-bottom-grid">

            <LeaveDays

              leaves={
                leaves
              }

              onAddLeave={
                handleOpenAddLeave
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
            RIGHT CONTENT
        ================================================= */}

        <div className="appointment-right-content">

          <PreviewSlots

            schedule={
              schedule
            }

            leaves={
              leaves
            }

            settings={
              settings
            }

          />

        </div>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="appointment-page-footer">


        {/* =================================================
            CANCEL
        ================================================= */}

        <button
          type="button"

          className="appointment-cancel-btn"

          onClick={() =>
            window.history.back()
          }

          disabled={
            loading
          }
        >

          Cancel

        </button>


        {/* =================================================
            SAVE
        ================================================= */}

        <button
          type="button"

          className="appointment-save-btn"

          onClick={
            handleSaveSettings
          }

          disabled={
            loading
          }
        >

          {loading
            ? "Saving..."
            : "Save Settings"
          }

        </button>

      </div>


      {/* =================================================
          ADD / EDIT LEAVE MODAL
      ================================================= */}

      {showLeaveModal && (

        <AddLeaveModal

          onClose={() => {

            if (
              !loading
            ) {

              setShowLeaveModal(
                false
              );

              setEditLeave(
                null
              );

            }

          }}

          editLeave={
            editLeave
          }

          onSave={
            handleSaveLeave
          }

        />

      )}

    </div>

  );

};


export default AppointmentAvailability;