import React, { useMemo, useState } from "react";

import {
  FaEye,
  FaCalendarAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";


const PreviewSlots = ({
  schedule = [],
  leaves = [],
  settings = {},
}) => {


  /* =====================================================
     TODAY
  ===================================================== */

  const getToday = () => {

    const date = new Date();

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  const [selectedDate, setSelectedDate] =
    useState(getToday());


  const [generated, setGenerated] =
    useState(false);


  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (dateString) => {

    if (!dateString) {
      return "";
    }

    const date =
      new Date(
        `${dateString}T00:00:00`
      );

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  /* =====================================================
     GET DAY NAME
  ===================================================== */

  const getDayName = (dateString) => {

    const date =
      new Date(
        `${dateString}T00:00:00`
      );

    return date.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );
  };


  /* =====================================================
     TIME TO MINUTES
  ===================================================== */

  const timeToMinutes = (time) => {

    if (!time) {
      return null;
    }

    const [hours, minutes] =
      time.split(":").map(Number);

    return (
      hours * 60 + minutes
    );
  };


  /* =====================================================
     MINUTES TO TIME
  ===================================================== */

  const minutesToTime = (minutes) => {

    const hours =
      Math.floor(minutes / 60);

    const mins =
      minutes % 60;

    const suffix =
      hours >= 12
        ? "PM"
        : "AM";

    const displayHour =
      hours % 12 || 12;

    return `${String(
      displayHour
    ).padStart(2, "0")}:${String(
      mins
    ).padStart(2, "0")} ${suffix}`;
  };


  /* =====================================================
     CHECK LEAVE
  ===================================================== */

  const leaveForDate = useMemo(() => {

    if (!selectedDate) {
      return null;
    }

    const matchingLeave =
      leaves.find((leave) => {

        if (!leave.fromDate) {
          return false;
        }

        const from =
          leave.fromDate;

        const to =
          leave.toDate ||
          leave.fromDate;

        return (
          selectedDate >= from &&
          selectedDate <= to
        );
      });

    return matchingLeave || null;

  }, [
    selectedDate,
    leaves,
  ]);


  /* =====================================================
     GET SELECTED DAY
  ===================================================== */

  const selectedDay = useMemo(() => {

    const dayName =
      getDayName(selectedDate);

    return schedule.find(
      (item) =>
        item.day === dayName
    );

  }, [
    selectedDate,
    schedule,
  ]);


  /* =====================================================
     GENERATE SESSION SLOTS
  ===================================================== */

  const generateSessionSlots = (
    start,
    end,
    duration
  ) => {

    const slots = [];

    const startMinutes =
      timeToMinutes(start);

    const endMinutes =
      timeToMinutes(end);

    if (
      startMinutes === null ||
      endMinutes === null
    ) {
      return slots;
    }

    if (
      endMinutes <= startMinutes
    ) {
      return slots;
    }

    let current =
      startMinutes;

    while (
      current + duration <=
      endMinutes
    ) {

      const slotEnd =
        current + duration;

      slots.push({
        start: minutesToTime(
          current
        ),

        end: minutesToTime(
          slotEnd
        ),

        status: "Available",
      });

      current = slotEnd;
    }

    return slots;
  };


  /* =====================================================
     GENERATED SLOTS
  ===================================================== */

  const generatedSlots = useMemo(() => {

    if (!selectedDay) {
      return {
        morning: [],
        evening: [],
      };
    }

    if (!selectedDay.enabled) {
      return {
        morning: [],
        evening: [],
      };
    }

    if (leaveForDate) {
      return {
        morning: [],
        evening: [],
      };
    }

    const duration =
      Number(
        settings.slotDuration || 30
      );

    const morning =
      generateSessionSlots(
        selectedDay.morningStart,
        selectedDay.morningEnd,
        duration
      );

    const evening =
      generateSessionSlots(
        selectedDay.eveningStart,
        selectedDay.eveningEnd,
        duration
      );

    return {
      morning,
      evening,
    };

  }, [
    selectedDay,
    settings.slotDuration,
    leaveForDate,
  ]);


  /* =====================================================
     TOTAL
  ===================================================== */

  const totalSlots =
    generatedSlots.morning.length +
    generatedSlots.evening.length;


  /* =====================================================
     GENERATE BUTTON
  ===================================================== */

  const handleGenerateSlots = () => {

    setGenerated(true);
  };


  return (
    <section className="preview-slots-card">


      {/* =================================================
          TITLE
      ================================================= */}

      <div className="preview-slots-title">

        <FaEye />

        <span>
          Preview Slots
        </span>

      </div>


      {/* =================================================
          DATE
      ================================================= */}

      <label className="preview-date-label">
        Select Date
      </label>


      <div className="preview-date-row">

        <div className="preview-date-field">

          <FaCalendarAlt />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {

              setSelectedDate(
                e.target.value
              );

              setGenerated(false);

            }}
          />

        </div>


        <button
          type="button"
          className="generate-slots-btn"
          onClick={
            handleGenerateSlots
          }
        >
          Generate Slots
        </button>

      </div>


      {/* =================================================
          DATE INFORMATION
      ================================================= */}

      <div className="preview-selected-date">

        <strong>
          {formatDate(
            selectedDate
          )}
        </strong>

        <span>
          {getDayName(
            selectedDate
          )}
        </span>

      </div>


      {/* =================================================
          APPOINTMENT DISABLED
      ================================================= */}

      {!settings.enableAppointment && (

        <div className="preview-leave-box">

          <FaTimesCircle />

          Appointments are currently
          disabled for this clinic.

        </div>

      )}


      {/* =================================================
          LEAVE
      ================================================= */}

      {settings.enableAppointment &&
        leaveForDate && (

        <div className="preview-leave-box">

          <FaTimesCircle />

          <strong>
            {leaveForDate.leaveType ||
              "Clinic Leave"}
          </strong>

          <br />

          {leaveForDate.reason ||
            "No appointments available on this date."}

        </div>

      )}


      {/* =================================================
          WEEKLY CHECKBOX CLOSED
      ================================================= */}

      {settings.enableAppointment &&
        !leaveForDate &&
        selectedDay &&
        !selectedDay.enabled && (

        <div className="preview-off-box">

          <FaTimesCircle />

          <strong>
            Clinic Closed
          </strong>

          <br />

          No appointments are available
          on {getDayName(selectedDate)}.

        </div>

      )}


      {/* =================================================
          NOT GENERATED
      ================================================= */}

      {settings.enableAppointment &&
        !leaveForDate &&
        selectedDay?.enabled &&
        !generated && (

        <div className="preview-info-empty">

          <FaInfoCircle />

          Select the date and click
          <strong>
            Generate Slots
          </strong>
          to preview appointments.

        </div>

      )}


      {/* =================================================
          TOTAL
      ================================================= */}

      {generated &&
        settings.enableAppointment &&
        !leaveForDate &&
        selectedDay?.enabled && (

        <div className="preview-total-box">

          <FaCheckCircle />

          Total{" "}

          <strong>
            {totalSlots}
          </strong>

          {" "}Slots Available

        </div>

      )}


      {/* =================================================
          SLOT LIST
      ================================================= */}

      {generated &&
        settings.enableAppointment &&
        !leaveForDate &&
        selectedDay?.enabled && (

        <div className="preview-slot-list">


          {/* MORNING */}

          {generatedSlots.morning.length >
            0 && (

            <>

              <div className="preview-session-heading">

                --- Morning Session ---

              </div>


              {generatedSlots.morning.map(
                (slot, index) => (

                  <div
                    className="preview-slot-item"
                    key={`morning-${index}`}
                  >

                    <span>
                      {slot.start}
                      {" - "}
                      {slot.end}
                    </span>

                    <span className="preview-available">
                      Available
                    </span>

                  </div>

                )
              )}

            </>

          )}


          {/* EVENING */}

          {generatedSlots.evening.length >
            0 && (

            <>

              <div className="preview-session-heading">

                --- Evening Session ---

              </div>


              {generatedSlots.evening.map(
                (slot, index) => (

                  <div
                    className="preview-slot-item"
                    key={`evening-${index}`}
                  >

                    <span>
                      {slot.start}
                      {" - "}
                      {slot.end}
                    </span>

                    <span className="preview-available">
                      Available
                    </span>

                  </div>

                )
              )}

            </>

          )}


          {/* NO SESSION */}

          {generatedSlots.morning.length ===
            0 &&
            generatedSlots.evening.length ===
            0 && (

            <div className="preview-no-slots">

              No appointment sessions
              configured for this day.

            </div>

          )}

        </div>

      )}

    </section>
  );
};

export default PreviewSlots;