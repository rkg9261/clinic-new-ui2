import React, { useEffect, useState } from "react";

import {
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { API } from "../../../config/api";


const LeaveDays = ({
  leaves = [],
  onAddLeave,
  onDeleteLeave,
  onEditLeave,
}) => {

  /* =====================================================
     STATE
  ===================================================== */

  const [leaveData, setLeaveData] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [showAllLeaves, setShowAllLeaves] =
    useState(false);

  const [editLoading, setEditLoading] =
    useState(false);


  /* =====================================================
     GET AUTH TOKEN
  ===================================================== */

  const getAuthToken = () => {

    let token =
      localStorage.getItem("token");


    if (!token) {

      token =
        localStorage.getItem("authToken");

    }


    if (
      token &&
      token.startsWith('"') &&
      token.endsWith('"')
    ) {

      try {

        token =
          JSON.parse(token);

      } catch {

        // Keep original token

      }

    }


    if (
      token &&
      token.startsWith("Bearer ")
    ) {

      token =
        token.substring(7);

    }


    return token;

  };


  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (date) => {

    if (!date) {

      return "";

    }


    return String(
      date
    ).split("T")[0];

  };


  /* =====================================================
     GET ALL APPOINTMENT LEAVES
  ===================================================== */

  const getLeaves = async () => {

    const token =
      getAuthToken();


    console.log(
      "=========================================="
    );

    console.log(
      "GET APPOINTMENT LEAVES"
    );

    console.log(
      "API URL:",
      API.APPOINTMENT_LEAVES
    );

    console.log(
      "METHOD:",
      "GET"
    );

    console.log(
      "TOKEN EXISTS:",
      !!token
    );

    console.log(
      "=========================================="
    );


    if (!token) {

      console.error(
        "AUTH TOKEN NOT FOUND"
      );

      return;

    }


    try {

      setLoading(true);


      const response =
        await fetch(
          API.APPOINTMENT_LEAVES,
          {

            method:
              "GET",

            headers: {

              "Accept":
                "application/json",

              "Authorization":
                `Bearer ${token}`,

            },

          }
        );


      const responseText =
        await response.text();


      let responseData =
        null;


      if (responseText) {

        try {

          responseData =
            JSON.parse(
              responseText
            );

        } catch {

          responseData =
            responseText;

        }

      }


      console.log(
        "=========================================="
      );

      console.log(
        "APPOINTMENT LEAVES GET RESPONSE"
      );

      console.log(
        "STATUS:",
        response.status
      );

      console.log(
        "OK:",
        response.ok
      );

      console.log(
        "RESPONSE:",
        responseData
      );

      console.log(
        "=========================================="
      );


      if (!response.ok) {

        console.error(
          "GET APPOINTMENT LEAVES ERROR:",
          responseData
        );

        return;

      }


      /* =================================================
         GET ARRAY
      ================================================= */

      let apiLeaves = [];


      if (
        Array.isArray(
          responseData
        )
      ) {

        apiLeaves =
          responseData;

      }

      else if (
        Array.isArray(
          responseData?.data
        )
      ) {

        apiLeaves =
          responseData.data;

      }

      else if (
        Array.isArray(
          responseData?.leaves
        )
      ) {

        apiLeaves =
          responseData.leaves;

      }

      else if (
        Array.isArray(
          responseData?.result
        )
      ) {

        apiLeaves =
          responseData.result;

      }


      /* =================================================
         FORMAT API DATA
      ================================================= */

      const formattedLeaves =
        apiLeaves.map(
          (leave, index) => {

            return {

              ...leave,

              id:
                leave.id ??
                leave.leave_id ??
                leave.leaveId ??
                leave.appointmentLeaveId ??
                leave.appointmentLeaveID ??
                index + 1,

              fromDate:
                formatDate(
                  leave.from_date ||
                  leave.fromDate ||
                  leave.FromDate ||
                  ""
                ),

              toDate:
                formatDate(
                  leave.to_date ||
                  leave.toDate ||
                  leave.ToDate ||
                  ""
                ),

              reason:
                leave.reason ||
                leave.Reason ||
                "",

              repeatType:
                leave.repeat_type ||
                leave.repeatType ||
                leave.RepeatType ||
                "NONE",

            };

          }
        );


      console.log(
        "FORMATTED LEAVES:",
        formattedLeaves
      );


      setLeaveData(
        formattedLeaves
      );


    } catch (error) {

      console.error(
        "GET APPOINTMENT LEAVES FETCH ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  /* =====================================================
     LOAD API DATA
  ===================================================== */

  useEffect(() => {

    getLeaves();

  }, []);


  /* =====================================================
     DISPLAY DATA
  ===================================================== */

  const displayLeaves =
    leaveData.length > 0
      ? leaveData
      : leaves;


  /* =====================================================
     FIRST 3 / ALL
  ===================================================== */

  const visibleLeaves =
    showAllLeaves
      ? displayLeaves
      : displayLeaves.slice(
          0,
          3
        );


  /* =====================================================
     VIEW ALL
  ===================================================== */

  const handleViewAllLeaves = () => {

    setShowAllLeaves(
      (previous) =>
        !previous
    );

  };


  /* =====================================================
     EDIT LEAVE
     
     GET:
     /api/appointment-leaves/:id
  ===================================================== */

  const handleEditLeave = async (
    leave
  ) => {

    console.log(
      "=========================================="
    );

    console.log(
      "EDIT LEAVE BUTTON CLICKED"
    );

    console.log(
      "SELECTED LEAVE:",
      leave
    );


    /* =================================================
       GET ID
    ================================================= */

    const leaveId =
      leave?.id ??
      leave?.leave_id ??
      leave?.leaveId ??
      leave?.appointmentLeaveId ??
      leave?.appointmentLeaveID;


    console.log(
      "LEAVE ID:",
      leaveId
    );


    /* =================================================
       ID CHECK
    ================================================= */

    if (
      leaveId === undefined ||
      leaveId === null ||
      leaveId === ""
    ) {

      console.error(
        "LEAVE ID NOT FOUND:",
        leave
      );

      alert(
        "Leave ID not found."
      );

      return;

    }


    /* =================================================
       GET TOKEN
    ================================================= */

    const token =
      getAuthToken();


    console.log(
      "TOKEN EXISTS:",
      !!token
    );


    if (!token) {

      console.error(
        "AUTH TOKEN NOT FOUND"
      );

      alert(
        "Unauthorized. Please login again."
      );

      return;

    }


    /* =================================================
       EDIT API URL
    ================================================= */

    const editUrl =
      `${API.APPOINTMENT_LEAVES}/${leaveId}`;


    console.log(
      "EDIT API URL:",
      editUrl
    );

    console.log(
      "METHOD:",
      "GET"
    );

    console.log(
      "=========================================="
    );


    try {

      setEditLoading(true);


      /* =================================================
         CALL EDIT / GET API
      ================================================= */

      const response =
        await fetch(
          editUrl,
          {

            method:
              "GET",

            headers: {

              "Accept":
                "application/json",

              "Authorization":
                `Bearer ${token}`,

            },

          }
        );


      /* =================================================
         READ RESPONSE
      ================================================= */

      const responseText =
        await response.text();


      let responseData =
        null;


      if (responseText) {

        try {

          responseData =
            JSON.parse(
              responseText
            );

        } catch {

          responseData =
            responseText;

        }

      }


      /* =================================================
         API RESPONSE LOG
      ================================================= */

      console.log(
        "=========================================="
      );

      console.log(
        "EDIT LEAVE API RESPONSE"
      );

      console.log(
        "STATUS:",
        response.status
      );

      console.log(
        "OK:",
        response.ok
      );

      console.log(
        "RESPONSE:",
        responseData
      );

      console.log(
        "=========================================="
      );


      /* =================================================
         API ERROR
      ================================================= */

      if (!response.ok) {

        console.error(
          "EDIT LEAVE API ERROR:",
          responseData
        );


        if (
          response.status === 401
        ) {

          alert(
            "Unauthorized. Please login again."
          );

        } else {

          alert(
            responseData?.message ||
            responseData?.title ||
            responseData?.error ||
            "Unable to get leave details."
          );

        }

        return;

      }


      /* =================================================
         GET ACTUAL LEAVE OBJECT
      ================================================= */

      let apiLeave =
        responseData;


      if (
        responseData?.data
      ) {

        apiLeave =
          responseData.data;

      }

      else if (
        responseData?.leave
      ) {

        apiLeave =
          responseData.leave;

      }

      else if (
        responseData?.result
      ) {

        apiLeave =
          responseData.result;

      }


      console.log(
        "API LEAVE FOR EDIT:",
        apiLeave
      );


      /* =================================================
         FORMAT DATA FOR ADD LEAVE FORM
      ================================================= */

      const editLeaveData = {

        ...apiLeave,

        id:
          apiLeave?.id ??
          apiLeave?.leave_id ??
          apiLeave?.leaveId ??
          apiLeave?.appointmentLeaveId ??
          apiLeave?.appointmentLeaveID ??
          leaveId,

        fromDate:
          formatDate(
            apiLeave?.from_date ||
            apiLeave?.fromDate ||
            apiLeave?.FromDate ||
            ""
          ),

        toDate:
          formatDate(
            apiLeave?.to_date ||
            apiLeave?.toDate ||
            apiLeave?.ToDate ||
            ""
          ),

        reason:
          apiLeave?.reason ||
          apiLeave?.Reason ||
          "",

        repeatType:
          apiLeave?.repeat_type ||
          apiLeave?.repeatType ||
          apiLeave?.RepeatType ||
          "NONE",

      };


      console.log(
        "=========================================="
      );

      console.log(
        "EDIT FORM DATA"
      );

      console.log(
        "FROM DATE:",
        editLeaveData.fromDate
      );

      console.log(
        "TO DATE:",
        editLeaveData.toDate
      );

      console.log(
        "REASON:",
        editLeaveData.reason
      );

      console.log(
        "REPEAT TYPE:",
        editLeaveData.repeatType
      );

      console.log(
        "ID:",
        editLeaveData.id
      );

      console.log(
        "=========================================="
      );


      /* =================================================
         OPEN ADD LEAVE FORM WITH DATA
      ================================================= */

      if (onEditLeave) {

        onEditLeave(
          editLeaveData
        );

      }


    } catch (error) {

      console.error(
        "EDIT LEAVE API FETCH ERROR:",
        error
      );

      alert(
        error.message ||
        "Unable to connect to server."
      );


    } finally {

      setEditLoading(false);

    }

  };


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
          onClick={
            onAddLeave
          }
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

            {loading ? (

              <tr>

                <td
                  colSpan="3"
                  className="leave-empty"
                >

                  Loading leave days...

                </td>

              </tr>

            ) : displayLeaves.length === 0 ? (

              <tr>

                <td
                  colSpan="3"
                  className="leave-empty"
                >

                  No leave days added yet.

                </td>

              </tr>

            ) : (

              visibleLeaves.map(
                (
                  leave,
                  index
                ) => (

                  <tr
                    key={
                      leave.id ||
                      index
                    }
                  >


                    {/* =================================================
                        DATE RANGE
                    ================================================= */}

                    <td>

                      <div className="leave-date">

                        <span>

                          {formatDate(
                            leave.fromDate ||
                            leave.from_date
                          )}

                        </span>


                        {(
                          leave.toDate ||
                          leave.to_date
                        ) &&

                        formatDate(
                          leave.toDate ||
                          leave.to_date
                        ) !==

                        formatDate(
                          leave.fromDate ||
                          leave.from_date
                        ) && (

                          <>

                            <span className="leave-date-separator">

                              →

                            </span>

                            <span>

                              {formatDate(
                                leave.toDate ||
                                leave.to_date
                              )}

                            </span>

                          </>

                        )}

                      </div>

                    </td>


                    {/* =================================================
                        REASON
                    ================================================= */}

                    <td>

                      <div className="leave-reason-text">

                        {
                          leave.reason ||
                          ""
                        }

                      </div>

                    </td>


                    {/* =================================================
                        ACTION
                    ================================================= */}

                    <td>

                      <div className="leave-action-buttons">


                        {/* =================================================
                            EDIT
                        ================================================= */}

                        <button
                          type="button"
                          className="leave-edit-btn"
                          title="Edit Leave"
                          onClick={() =>
                            handleEditLeave(
                              leave
                            )
                          }
                          disabled={
                            editLoading
                          }
                        >

                          <FaEdit />

                        </button>


                        {/* =================================================
                            DELETE
                        ================================================= */}

                        <button
                          type="button"
                          className="leave-delete-btn"
                          title="Delete Leave"
                          onClick={() =>
                            onDeleteLeave &&
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

                )

              )

            )}

          </tbody>

        </table>

      </div>


      {/* =================================================
          VIEW ALL
      ================================================= */}

      {displayLeaves.length > 0 && (

        <button
          type="button"
          className="view-all-leaves-btn"
          onClick={
            handleViewAllLeaves
          }
        >

          {showAllLeaves
            ? "View less leaves"
            : "View all leaves"
          }

          <span>

            {showAllLeaves
              ? "↑"
              : "→"
            }

          </span>

        </button>

      )}

    </section>
  );
};


export default LeaveDays;