import React, { useMemo, useState } from "react";

import {
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const PreviewSlots = ({
  schedule,
  leaves,
  settings,
}) => {

  const [selectedDate, setSelectedDate] =
    useState("");

  const [generatedDate, setGeneratedDate] =
    useState("");


  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (dateString) => {

    if (!dateString) {
      return "";
    }

    const date = new Date(
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

    if (!dateString) {
      return "";
    }

    const date = new Date(
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
     CHECK LEAVE
  ===================================================== */

  const getLeave = (dateString) => {

    if (!dateString) {
      return null;
    }

    return leaves.find((leave) => {

      if (
        !leave.fromDate ||
        !leave.toDate
      ) {
        return false;
      }

      return (
        dateString >= leave.fromDate &&
        dateString <= leave.toDate
      );
    });
  };


  /* =====================================================
     GENERATE SLOTS
  ===================================================== */

  const generateSlots = (
    startTime,
    endTime,
    duration
  ) => {

    const slots = [];

    if (
      !startTime ||
      !endTime ||
      !duration
    ) {
      return slots;
    }

    const [
      startHour,
      startMinute,
    ] = startTime
      .split(":")
      .map(Number);

    const [
      endHour,
      endMinute,
    ] = endTime
      .split(":")
      .map(Number);

    let currentMinutes =
      startHour * 60 +
      startMinute;

    const endMinutes =
      endHour * 60 +
      endMinute;

    while (
      currentMinutes + duration <=
      endMinutes
    ) {

      const hour =
        Math.floor(
          currentMinutes / 60
        );

      const minute =
        currentMinutes % 60;

      const nextMinutes =
        currentMinutes + duration;

      const nextHour =
        Math.floor(
          nextMinutes / 60
        );

      const nextMinute =
        nextMinutes % 60;


      const formatTime = (
        h,
        m
      ) => {

        const date = new Date();

        date.setHours(h);
        date.setMinutes(m);

        return date.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        );
      };


      slots.push({
        start: formatTime(
          hour,
          minute
        ),

        end: formatTime(
          nextHour,
          nextMinute
        ),
      });


      currentMinutes =
        nextMinutes;
    }

    return slots;
  };


  /* =====================================================
     SELECTED DAY SCHEDULE
  ===================================================== */

  const selectedDay = useMemo(() => {

    if (!selectedDate) {
      return null;
    }

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
     SELECTED LEAVE
  ===================================================== */

  const selectedLeave = useMemo(() => {

    return getLeave(
      selectedDate
    );

  }, [
    selectedDate,
    leaves,
  ]);


  /* =====================================================
     MORNING SLOTS
  ===================================================== */

  const morningSlots = useMemo(() => {

    if (
      !selectedDay ||
      !selectedDay.enabled ||
      !selectedDay.morningEnabled
    ) {
      return [];
    }

    return generateSlots(
      selectedDay.morningStart,
      selectedDay.morningEnd,
      Number(settings.slotDuration)
    );

  }, [
    selectedDay,
    settings.slotDuration,
  ]);


  /* =====================================================
     EVENING SLOTS
  ===================================================== */

  const eveningSlots = useMemo(() => {

    if (
      !selectedDay ||
      !selectedDay.enabled ||
      !selectedDay.eveningEnabled
    ) {
      return [];
    }

    return generateSlots(
      selectedDay.eveningStart,
      selectedDay.eveningEnd,
      Number(settings.slotDuration)
    );

  }, [
    selectedDay,
    settings.slotDuration,
  ]);


  /* =====================================================
     TOTAL SLOTS
  ===================================================== */

  const totalSlots =
    morningSlots.length +
    eveningSlots.length;


  /* =====================================================
     GENERATE
  ===================================================== */

  const handleGenerateSlots = () => {

    if (!selectedDate) {
      alert(
        "Please select a date first."
      );

      return;
    }

    setGeneratedDate(
      selectedDate
    );
  };


  /* =====================================================
     RENDER SLOT LIST
  ===================================================== */

  const renderSlotList = (
    title,
    slots
  ) => {

    if (!slots.length) {
      return null;
    }

    return (
      <div>

        <div className="preview-session-heading">

          {title}

        </div>


        {slots.map(
          (slot, index) => (

            <div
              className="preview-slot-item"
              key={`${title}-${index}`}
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

      </div>
    );
  };


  return (
    <div className="preview-slots-card">

      {/* =================================================
          TITLE
      ================================================= */}

      <div className="preview-slots-title">

        <FaCalendarAlt />

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

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(
                e.target.value
              )
            }
          />

          <FaCalendarAlt />

        </div>


        <button
          type="button"
          className="generate-slots-btn"
          onClick={
            handleGenerateSlots
          }
        >
          Generate
        </button>

      </div>


      {/* =================================================
          NO DATE
      ================================================= */}

      {!selectedDate && (

        <div className="preview-info-empty">

          <div>

            <FaCalendarAlt />

            <br />

            Select a date to preview
            available appointment slots.

          </div>

        </div>

      )}


      {/* =================================================
          SELECTED DATE
      ================================================= */}

      {selectedDate && (

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

      )}


      {/* =================================================
          CLINIC CLOSED
      ================================================= */}

      {selectedDate &&
        selectedDay &&
        !selectedDay.enabled && (

          <div className="preview-off-box">

            <strong>
              Clinic Closed
            </strong>

            <br />

            No appointment sessions are
            available on this day.

          </div>

        )}


      {/* =================================================
          LEAVE
      ================================================= */}

      {selectedDate &&
        selectedDay?.enabled &&
        selectedLeave && (

          <div className="preview-leave-box">

            <strong>
              Clinic Leave
            </strong>

            <br />

            {selectedLeave.reason ||
              "Clinic is unavailable on this date."}

          </div>

        )}


      {/* =================================================
          SLOTS
      ================================================= */}

      {selectedDate &&
        selectedDay?.enabled &&
        !selectedLeave &&
        generatedDate === selectedDate && (

          <>

            {/* TOTAL */}

            <div className="preview-total-box">

              <FaClock />

              <span>
                Total Slots:
              </span>

              <strong>
                {totalSlots}
              </strong>

            </div>


            {/* SLOT LIST */}

            <div className="preview-slot-list">

              {renderSlotList(
                "☀ Morning Session",
                morningSlots
              )}


              {renderSlotList(
                "🌙 Evening Session",
                eveningSlots
              )}


              {totalSlots === 0 && (

                <div className="preview-no-slots">

                  No sessions are enabled
                  for this day.

                </div>

              )}

            </div>

          </>

        )}


      {/* =================================================
          GENERATED DATE MESSAGE
      ================================================= */}

      {selectedDate &&
        generatedDate !== selectedDate && (
          <div className="preview-info-empty">

            Click
            <strong>
              Generate
            </strong>
            to preview available slots.

          </div>
        )}

    </div>
  );
};

export default PreviewSlots;