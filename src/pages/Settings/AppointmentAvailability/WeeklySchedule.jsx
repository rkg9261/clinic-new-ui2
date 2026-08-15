import React from "react";
import {
  FaCalendarAlt,
  // FaClock,
} from "react-icons/fa";

const WeeklySchedule = ({
  schedule,
  setSchedule,
}) => {

  /* =====================================================
     UPDATE TIME
  ===================================================== */

  const updateDay = (index, field, value) => {

    setSchedule((previous) =>
      previous.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };


  /* =====================================================
     MAIN DAY CHECKBOX

     CHECKED:
     - Working day ON
     - Morning toggle ON
     - Evening toggle ON

     UNCHECKED:
     - Clinic closed
     - Morning toggle OFF
     - Evening toggle OFF
  ===================================================== */

  const handleDayToggle = (index) => {

    setSchedule((previous) =>
      previous.map((item, i) => {

        if (i !== index) {
          return item;
        }

        const newEnabled = !item.enabled;

        return {
          ...item,

          enabled: newEnabled,

          morningEnabled: newEnabled,

          eveningEnabled: newEnabled,
        };
      })
    );
  };


  /* =====================================================
     MORNING TOGGLE
  ===================================================== */

  const handleMorningToggle = (index) => {

    setSchedule((previous) =>
      previous.map((item, i) => {

        if (i !== index) {
          return item;
        }

        if (!item.enabled) {
          return item;
        }

        return {
          ...item,

          morningEnabled:
            !item.morningEnabled,
        };
      })
    );
  };


  /* =====================================================
     EVENING TOGGLE
  ===================================================== */

  const handleEveningToggle = (index) => {

    setSchedule((previous) =>
      previous.map((item, i) => {

        if (i !== index) {
          return item;
        }

        if (!item.enabled) {
          return item;
        }

        return {
          ...item,

          eveningEnabled:
            !item.eveningEnabled,
        };
      })
    );
  };


  return (
    <div className="weekly-schedule-card">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="weekly-schedule-header">

        <div className="weekly-schedule-title">

          <FaCalendarAlt />

          <span>
            Weekly Schedule
          </span>

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="weekly-schedule-scroll">

        <table className="weekly-schedule-table">

          <thead>

            <tr>

              <th>
                Day
              </th>

              <th>
                Morning Session
              </th>

              <th>
                Evening Session
              </th>

            </tr>

          </thead>


          <tbody>

            {schedule.map((item, index) => {

              const isClosed =
                !item.enabled;

              return (

                <tr
                  key={item.day}
                  className={
                    isClosed
                      ? "schedule-holiday-row"
                      : "schedule-working-row"
                  }
                >

                  {/* =================================================
                      DAY
                  ================================================= */}

                  <td>

                    <div className="weekly-day-wrapper">

                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={() =>
                          handleDayToggle(index)
                        }
                      />

                      <div className="weekly-day-content">

                        <span>
                          {item.day}
                        </span>

                        {isClosed && (
                          <small>
                            Clinic Closed
                          </small>
                        )}

                      </div>

                    </div>

                  </td>


                  {/* =================================================
                      MORNING SESSION
                  ================================================= */}

                  <td>

                    <div className="session-time-wrapper">

                      {/* Morning Toggle */}

                      <label
                        className={`appointment-session-toggle ${
                          !item.enabled
                            ? "session-toggle-disabled"
                            : ""
                        }`}
                        title={
                          !item.enabled
                            ? "Clinic is closed"
                            : item.morningEnabled
                              ? "Disable morning session"
                              : "Enable morning session"
                        }
                      >

                        <input
                          type="checkbox"
                          checked={
                            item.morningEnabled
                          }
                          disabled={
                            !item.enabled
                          }
                          onChange={() =>
                            handleMorningToggle(
                              index
                            )
                          }
                        />

                        <span></span>

                      </label>


                      {/* Morning Start */}

                      <div className="time-field">

                        <input
                          type="time"
                          value={
                            item.morningStart
                          }
                          disabled={
                            !item.enabled ||
                            !item.morningEnabled
                          }
                          onChange={(e) =>
                            updateDay(
                              index,
                              "morningStart",
                              e.target.value
                            )
                          }
                        />

                        {/* <FaClock /> */}

                      </div>


                      <span className="time-separator">
                        -
                      </span>


                      {/* Morning End */}

                      <div className="time-field">

                        <input
                          type="time"
                          value={
                            item.morningEnd
                          }
                          disabled={
                            !item.enabled ||
                            !item.morningEnabled
                          }
                          onChange={(e) =>
                            updateDay(
                              index,
                              "morningEnd",
                              e.target.value
                            )
                          }
                        />

                        {/* <FaClock /> */}

                      </div>

                    </div>

                  </td>


                  {/* =================================================
                      EVENING SESSION
                  ================================================= */}

                  <td>

                    <div className="session-time-wrapper">

                      {/* Evening Toggle */}

                      <label
                        className={`appointment-session-toggle ${
                          !item.enabled
                            ? "session-toggle-disabled"
                            : ""
                        }`}
                        title={
                          !item.enabled
                            ? "Clinic is closed"
                            : item.eveningEnabled
                              ? "Disable evening session"
                              : "Enable evening session"
                        }
                      >

                        <input
                          type="checkbox"
                          checked={
                            item.eveningEnabled
                          }
                          disabled={
                            !item.enabled
                          }
                          onChange={() =>
                            handleEveningToggle(
                              index
                            )
                          }
                        />

                        <span></span>

                      </label>


                      {/* Evening Start */}

                      <div className="time-field">

                        <input
                          type="time"
                          value={
                            item.eveningStart
                          }
                          disabled={
                            !item.enabled ||
                            !item.eveningEnabled
                          }
                          onChange={(e) =>
                            updateDay(
                              index,
                              "eveningStart",
                              e.target.value
                            )
                          }
                        />

                        {/* <FaClock /> */}

                      </div>


                      <span className="time-separator">
                        -
                      </span>


                      {/* Evening End */}

                      <div className="time-field">

                        <input
                          type="time"
                          value={
                            item.eveningEnd
                          }
                          disabled={
                            !item.enabled ||
                            !item.eveningEnabled
                          }
                          onChange={(e) =>
                            updateDay(
                              index,
                              "eveningEnd",
                              e.target.value
                            )
                          }
                        />

                        {/* <FaClock /> */}

                      </div>

                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>


      {/* =================================================
          NOTE
      ================================================= */}

      <div className="weekly-schedule-note">

        <span>💡</span>

        Enable or disable the morning and evening
        sessions separately. Only enabled sessions
        will appear in the Preview Slots section.

      </div>

    </div>
  );
};

export default WeeklySchedule;