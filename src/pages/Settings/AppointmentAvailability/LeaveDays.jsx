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

              {/* <th>
                Leave Type
              </th> */}

              {/* <th>
                Session
              </th> */}

              <th>
                Reason
              </th>

              {/* <th>
                Status
              </th> */}

              <th>
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {leaves.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="leave-empty"
                >

                  No leave days added yet.

                </td>

              </tr>

            ) : (

              leaves.map((leave) => (

                <tr key={leave.id}>

                  <td>

                    <div className="leave-date">

                      <span>
                        {leave.fromDate}
                      </span>

                      {leave.toDate &&
                        leave.toDate !==
                          leave.fromDate && (

                        <span>
                          {leave.toDate}
                        </span>

                      )}

                    </div>

                  </td>


                  <td>
                    {leave.leaveType}
                  </td>


                  <td>
                    {leave.session}
                  </td>


                  <td>
                    {leave.reason}
                  </td>


                  <td>

                    <span className="leave-active-status">

                      {leave.status ||
                        "Active"}

                    </span>

                  </td>


                  <td>

                    <div className="leave-action-buttons">

                      <button
                        type="button"
                        className="leave-edit-btn"
                        onClick={() =>
                          onEditLeave(
                            leave
                          )
                        }
                      >

                        <FaEdit />

                      </button>


                      <button
                        type="button"
                        className="leave-delete-btn"
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