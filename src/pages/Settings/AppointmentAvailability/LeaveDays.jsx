import React from "react";

import {
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";


const LeaveDays = ({
  leaves = [],
  onAddLeave,
  onDeleteLeave,
  onEditLeave,
}) => {

  return (
    <section className="leave-days-card">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="leave-days-header">

        <div className="leave-days-title">

          <FaCalendarAlt />

          <span>
            Leave Days
          </span>

        </div>


        <button
          type="button"
          className="add-leave-btn"
          onClick={onAddLeave}
        >

          <FaPlus />

          Add Leave

        </button>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="leave-table-scroll">

        <table className="leave-table">

          <thead>

            <tr>

              <th>
                Date Range
              </th>

              <th>
                Reason
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {leaves.length === 0 ? (

              <tr>

                <td
                  colSpan="3"
                  className="leave-empty"
                >

                  No leave days added yet.

                </td>

              </tr>

            ) : (

              leaves.map((leave) => (

                <tr
                  key={leave.id}
                >


                  {/* =====================================
                      DATE RANGE
                  ===================================== */}

                  <td>

                    <div className="leave-date">

                      <span>
                        {leave.fromDate}
                      </span>


                      {leave.toDate &&
                        leave.toDate !==
                          leave.fromDate && (

                        <>
                          <span className="leave-date-separator">
                            →
                          </span>

                          <span>
                            {leave.toDate}
                          </span>
                        </>

                      )}

                    </div>

                  </td>


                  {/* =====================================
                      REASON
                  ===================================== */}

                  <td>

                    <div className="leave-reason-text">

                      {leave.reason}

                    </div>

                  </td>


                  {/* =====================================
                      ACTION
                  ===================================== */}

                  <td>

                    <div className="leave-action-buttons">


                      {/* EDIT */}

                      <button
                        type="button"
                        className="leave-edit-btn"
                        title="Edit Leave"
                        onClick={() =>
                          onEditLeave(
                            leave
                          )
                        }
                      >

                        <FaEdit />

                      </button>


                      {/* DELETE */}

                      <button
                        type="button"
                        className="leave-delete-btn"
                        title="Delete Leave"
                        onClick={() =>
                          onDeleteLeave(
                            leave.id
                          )
                        }
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


      {/* =================================================
          VIEW ALL
      ================================================= */}

      {leaves.length > 0 && (

        <button
          type="button"
          className="view-all-leaves-btn"
        >

          View all leaves

          <span>
            →
          </span>

        </button>

      )}

    </section>
  );
};


export default LeaveDays;