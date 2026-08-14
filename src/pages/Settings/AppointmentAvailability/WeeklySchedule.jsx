import React from "react";
import { FaClock } from "react-icons/fa";

const WeeklySchedule = ({
  schedule = [],
  setSchedule,
}) => {


  /* =====================================================
     TOGGLE DAY
  ===================================================== */

  const handleDayToggle = (index) => {

    setSchedule((previous) =>
      previous.map((item, i) => {

        if (i !== index) {
          return item;
        }

        return {
          ...item,
          enabled: !item.enabled,
        };
      })
    );
  };


  /* =====================================================
     CHANGE TIME
  ===================================================== */

  const handleTimeChange = (
    index,
    field,
    value
  ) => {

    setSchedule((previous) =>
      previous.map((item, i) => {

        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [field]: value,
        };
      })
    );
  };


  return (
    <section className="weekly-schedule-card">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="weekly-schedule-header">

        <div className="weekly-schedule-title">

          <FaClock />

          <span>
            Appointment Slot Settings
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

            {schedule.map(
              (item, index) => (

                <tr
                  key={item.day}
                  className={
                    !item.enabled
                      ? "weekly-day-disabled"
                      : ""
                  }
                >


                  {/* DAY */}

                  <td>

                    <div className="weekly-day-wrapper">

                      <input
                        type="checkbox"
                        checked={
                          item.enabled
                        }
                        onChange={() =>
                          handleDayToggle(
                            index
                          )
                        }
                      />

                      <span>
                        {item.day}
                      </span>

                    </div>

                  </td>


                  {/* MORNING */}

                  <td>

                    <div className="session-time-wrapper">

                      <div className="time-field">

                        <input
                          type="time"
                          value={
                            item.morningStart
                          }
                          disabled={
                            !item.enabled
                          }
                          onChange={(e) =>
                            handleTimeChange(
                              index,
                              "morningStart",
                              e.target.value
                            )
                          }
                        />

                        <FaClock />

                      </div>


                      <span className="time-separator">
                        -
                      </span>


                      <div className="time-field">

                        <input
                          type="time"
                          value={
                            item.morningEnd
                          }
                          disabled={
                            !item.enabled
                          }
                          onChange={(e) =>
                            handleTimeChange(
                              index,
                              "morningEnd",
                              e.target.value
                            )
                          }
                        />

                        <FaClock />

                      </div>

                    </div>

                  </td>


                  {/* EVENING */}

                  <td>

                    <div className="session-time-wrapper">

                      <div className="time-field">

                        <input
                          type="time"
                          value={
                            item.eveningStart
                          }
                          disabled={
                            !item.enabled
                          }
                          onChange={(e) =>
                            handleTimeChange(
                              index,
                              "eveningStart",
                              e.target.value
                            )
                          }
                        />

                        <FaClock />

                      </div>


                      <span className="time-separator">
                        -
                      </span>


                      <div className="time-field">

                        <input
                          type="time"
                          value={
                            item.eveningEnd
                          }
                          disabled={
                            !item.enabled
                          }
                          onChange={(e) =>
                            handleTimeChange(
                              index,
                              "eveningEnd",
                              e.target.value
                            )
                          }
                        />

                        <FaClock />

                      </div>

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>


      {/* NOTE */}

      <div className="weekly-schedule-note">

        <span>ⓘ</span>

        Checked days are working days.
        Unchecked days will show as Clinic Closed
        in Preview Slots.

      </div>

    </section>
  );
};

export default WeeklySchedule;