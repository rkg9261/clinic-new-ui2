import React from "react";

import {
  FaCog,
  FaClock,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";

const AppointmentSettings = ({
  settings,
  setSettings,
}) => {

  /* =====================================================
     HANDLE CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setSettings((previous) => ({
      ...previous,

      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
          ? checked
          : value,
    }));
  };


  /* =====================================================
     TOGGLE
  ===================================================== */

  const handleToggle = (name) => {

    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };


  return (
    <section className="appointment-settings-card">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="appointment-settings-header">

        <div className="appointment-settings-title">

          <FaCog />

          <span>
            Clinic Appointment Settings
          </span>

        </div>

      </div>


   

      <div className="appointment-settings-grid">


        {/* ENABLE APPOINTMENT */}

        <div className="appointment-setting-item">

          <label>
            Enable Appointment
          </label>

          <label className="appointment-toggle">

            <input
              type="checkbox"
              checked={
                settings.enableAppointment
              }
              onChange={() =>
                handleToggle(
                  "enableAppointment"
                )
              }
            />

            <span></span>

          </label>

        </div>


        {/* SAME DAY BOOKING */}

        <div className="appointment-setting-item">

          <label>
            Same Day Booking
          </label>

          <label className="appointment-toggle">

            <input
              type="checkbox"
              checked={
                settings.sameDayBooking
              }
              onChange={() =>
                handleToggle(
                  "sameDayBooking"
                )
              }
            />

            <span></span>

          </label>

        </div>


        {/* SLOT DURATION */}

        <div className="appointment-setting-item">

          <label>
            Slot Duration <b>*</b>
          </label>

          <select
            name="slotDuration"
            value={settings.slotDuration}
            onChange={handleChange}
            className="appointment-setting-select"
          >

            <option value={15}>
              15 Minutes
            </option>

            <option value={20}>
              20 Minutes
            </option>

            <option value={30}>
              30 Minutes
            </option>

            <option value={45}>
              45 Minutes
            </option>

            <option value={60}>
              60 Minutes
            </option>

          </select>

        </div>


        {/* APPOINTMENT START */}

        <div className="appointment-setting-item">

          <label>
            Appointment Start Time <b>*</b>
          </label>

          <div className="appointment-time-input">

            <FaClock />

            <input
              type="time"
              name="appointmentStartTime"
              value={
                settings.appointmentStartTime
              }
              onChange={handleChange}
            />

          </div>

        </div>


        {/* MAX APPOINTMENTS */}

        <div className="appointment-setting-item">

          <label>
            Maximum Appointments Per Slot <b>*</b>
          </label>

          <select
            name="maximumAppointments"
            value={
              settings.maximumAppointments
            }
            onChange={handleChange}
            className="appointment-setting-select"
          >

            <option value={1}>1</option>

            <option value={2}>2</option>

            <option value={3}>3</option>

            <option value={4}>4</option>

            <option value={5}>5</option>

          </select>

        </div>


        {/* APPOINTMENT END */}

        <div className="appointment-setting-item">

          <label>
            Appointment End Time <b>*</b>
          </label>

          <div className="appointment-time-input">

            <FaClock />

            <input
              type="time"
              name="appointmentEndTime"
              value={
                settings.appointmentEndTime
              }
              onChange={handleChange}
            />

          </div>

        </div>


        {/* BOOKING START DAYS */}

        <div className="appointment-setting-item">

          <label>
            Booking Start Days (Advance) <b>*</b>
          </label>

          <div className="appointment-number-input">

            <FaCalendarAlt />

            <input
              type="number"
              min="0"
              name="bookingStartDays"
              value={
                settings.bookingStartDays
              }
              onChange={handleChange}
            />

            <span>Days</span>

          </div>

        </div>


        {/* FUTURE APPOINTMENT DAYS */}

        <div className="appointment-setting-item">

          <label>
            Future Appointment Days <b>*</b>
          </label>

          <div className="appointment-number-input">

            <FaCalendarAlt />

            <input
              type="number"
              min="1"
              name="futureAppointmentDays"
              value={
                settings.futureAppointmentDays
              }
              onChange={handleChange}
            />

            <span>Days</span>

          </div>

        </div>

      </div>


      {/* =================================================
          NOTE
      ================================================= */}

      <div className="appointment-settings-note">

        <span>ⓘ</span>

        Future Appointment Days controls how many
        days in advance patients can book appointments.

      </div>


      {/* =================================================
          SAVE
      ================================================= */}

      <div className="appointment-settings-footer">

        <button
          type="button"
          className="appointment-settings-save-btn"
        >

          <FaSave />

          Save Settings

        </button>

      </div>

    </section>
  );
};

export default AppointmentSettings;