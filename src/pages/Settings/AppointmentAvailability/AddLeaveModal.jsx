import React, { useEffect, useState } from "react";

import {
  FaCalendarAlt,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";

import { API } from "../../../config/api";


const AddLeaveModal = ({
  onClose,
  onSave,
  editLeave,
}) => {

  /* =====================================================
     CHECK EDIT MODE
  ===================================================== */

  const isEditMode = !!editLeave;


  /* =====================================================
     REPEAT TYPE
  ===================================================== */

  const getRepeatLabel = (repeatType) => {

    switch (String(repeatType || "").toUpperCase()) {

      case "WEEKLY":
        return "Every Week";

      case "MONTHLY":
        return "Every Month";

      case "YEARLY":
        return "Every Year";

      case "NONE":
      default:
        return "Does not repeat";

    }

  };


  /* =====================================================
     GET VALUE FROM API
  ===================================================== */

  const getLeaveValue = (leave, camelCase, snakeCase) => {

    if (!leave) {
      return "";
    }

    return (
      leave[camelCase] ??
      leave[snakeCase] ??
      ""
    );

  };


  /* =====================================================
     FORM DATA
  ===================================================== */

  const [formData, setFormData] = useState({

    fromDate: "",

    toDate: "",

    reason: "",

    repeat: "Does not repeat",

  });


  /* =====================================================
     LOADING
  ===================================================== */

  const [loading, setLoading] = useState(false);


  /* =====================================================
     LOAD EDIT DATA
     
     IMPORTANT:
     This runs whenever editLeave changes.
  ===================================================== */

  useEffect(() => {

    console.log(
      "=========================================="
    );

    console.log(
      "ADD LEAVE MODAL"
    );

    console.log(
      "EDIT MODE:",
      isEditMode
    );

    console.log(
      "EDIT LEAVE DATA:",
      editLeave
    );

    console.log(
      "=========================================="
    );


    if (editLeave) {

      const fromDate =
        getLeaveValue(
          editLeave,
          "fromDate",
          "from_date"
        );

      const toDate =
        getLeaveValue(
          editLeave,
          "toDate",
          "to_date"
        );

      const reason =
        getLeaveValue(
          editLeave,
          "reason",
          "Reason"
        );

      const repeatType =
        getLeaveValue(
          editLeave,
          "repeatType",
          "repeat_type"
        );


      /* ---------------------------------------------
        YYYY-MM-DD
      --------------------------------------------- */

      const formattedFromDate =
        fromDate
          ? String(fromDate).split("T")[0]
          : "";


      const formattedToDate =
        toDate
          ? String(toDate).split("T")[0]
          : "";


      setFormData({

        fromDate:
          formattedFromDate,

        toDate:
          formattedToDate,

        reason:
          reason || "",

        repeat:
          getRepeatLabel(
            repeatType
          ),

      });


      console.log(
        "EDIT FORM DATA:",
        {
          fromDate:
            formattedFromDate,

          toDate:
            formattedToDate,

          reason:
            reason || "",

          repeat:
            getRepeatLabel(
              repeatType
            ),
        }
      );

    } else {

      /* ---------------------------------------------
         ADD MODE
      --------------------------------------------- */

      setFormData({

        fromDate: "",

        toDate: "",

        reason: "",

        repeat: "Does not repeat",

      });

    }

  }, [editLeave]);


  /* =====================================================
     HANDLE CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }));

  };




  const getRepeatType = () => {

    switch (formData.repeat) {

      case "Every Week":
        return "WEEKLY";

      case "Every Month":
        return "MONTHLY";

      case "Every Year":
        return "YEARLY";

      case "Does not repeat":
      default:
        return "NONE";

    }

  };


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
     GET EDIT ID
  ===================================================== */

  const getEditId = () => {

    if (!editLeave) {
      return null;
    }


    return (
      editLeave.id ??
      editLeave.leave_id ??
      editLeave.leaveId ??
      editLeave.appointmentLeaveId ??
      editLeave.appointmentLeaveID ??
      null
    );

  };


  /* =====================================================
     SAVE
  ===================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();


    /* =================================================
       DATE VALIDATION
    ================================================= */

    if (
      !formData.fromDate ||
      !formData.toDate
    ) {

      alert(
        "Please select leave date range."
      );

      return;

    }


    /* =================================================
       DATE RANGE VALIDATION
    ================================================= */

    if (
      formData.toDate <
      formData.fromDate
    ) {

      alert(
        "To Date cannot be before From Date."
      );

      return;

    }


    /* =================================================
       REASON VALIDATION
    ================================================= */

    if (
      !formData.reason.trim()
    ) {

      alert(
        "Please enter leave reason."
      );

      return;

    }


    /* =================================================
       TOKEN
    ================================================= */

    const token =
      getAuthToken();


    if (!token) {

      alert(
        "Unauthorized. Please login again."
      );

      return;

    }


    /* =================================================
       REQUEST BODY
    ================================================= */

    const requestBody = {

      fromDate:
        formData.fromDate,

      toDate:
        formData.toDate,

      reason:
        formData.reason.trim(),

      repeatType:
        getRepeatType(),

    };


    /* =================================================
       EDIT ID
    ================================================= */

    const editId =
      getEditId();


    /* =================================================
       URL
    ================================================= */

    const requestUrl =
      isEditMode && editId
        ? `${API.APPOINTMENT_LEAVES}/${editId}`
        : API.APPOINTMENT_LEAVES;


    /* =================================================
       METHOD
    ================================================= */

    const requestMethod =
      isEditMode && editId
        ? "PUT"
        : "POST";


    console.log(
      "=========================================="
    );

    console.log(
      isEditMode
        ? "UPDATE APPOINTMENT LEAVE"
        : "CREATE APPOINTMENT LEAVE"
    );

    console.log(
      "=========================================="
    );

    console.log(
      "EDIT ID:",
      editId
    );

    console.log(
      "API URL:",
      requestUrl
    );

    console.log(
      "METHOD:",
      requestMethod
    );

    console.log(
      "REQUEST BODY:",
      requestBody
    );

    console.log(
      "=========================================="
    );


    try {

      setLoading(true);


      /* =================================================
         API CALL
      ================================================= */

      const response =
        await fetch(
          requestUrl,
          {

            method:
              requestMethod,

            headers: {

              "Content-Type":
                "application/json",

              "Accept":
                "application/json",

              "Authorization":
                `Bearer ${token}`,

            },

            body:
              JSON.stringify(
                requestBody
              ),

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
         RESPONSE LOG
      ================================================= */

      console.log(
        "=========================================="
      );

      console.log(
        "APPOINTMENT LEAVE RESPONSE"
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

        if (
          response.status === 401
        ) {

          alert(
            "Unauthorized. Your login session may have expired. Please login again."
          );

        } else {

          alert(
            responseData?.message ||
            responseData?.title ||
            responseData?.error ||
            (
              isEditMode
                ? "Failed to update leave."
                : "Failed to add leave."
            )
          );

        }

        return;

      }


      /* =================================================
         SAVED DATA
      ================================================= */

      const apiSavedData =
        responseData?.data ||
        responseData ||
        {};


      const savedLeave = {

        ...editLeave,

        ...apiSavedData,

        id:
          getEditId() ||
          apiSavedData?.id ||
          apiSavedData?.leaveId ||
          apiSavedData?.appointmentLeaveId,

        fromDate:
          requestBody.fromDate,

        toDate:
          requestBody.toDate,

        reason:
          requestBody.reason,

        repeatType:
          requestBody.repeatType,

      };


      console.log(
        "SAVED LEAVE:",
        savedLeave
      );


      /* =================================================
         SEND TO PARENT
      ================================================= */

      if (onSave) {

        onSave(
          savedLeave
        );

      }

    } catch (error) {

      console.error(
        "SAVE LEAVE ERROR:",
        error
      );


      alert(
        error.message ||
        "Unable to connect to server."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="leave-modal-overlay">


      <div className="add-leave-modal">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="leave-modal-header">

          <div>

            <h2>

              {isEditMode
                ? "Edit Leave"
                : "Add Leave"
              }

            </h2>

            <p>

              {isEditMode
                ? "Update leave details for the selected dates."
                : "Add a leave to block appointments for selected dates."
              }

            </p>

          </div>


          <button
            type="button"
            className="leave-modal-close"
            onClick={onClose}
            disabled={loading}
          >

            <FaTimes />

          </button>

        </div>


        {/* =================================================
            INFO
        ================================================= */}

        <div className="leave-modal-info">

          <span>
            ⓘ
          </span>

          Appointments will not be available
          during the selected leave period.

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
        >


          {/* =================================================
              DATE RANGE
          ================================================= */}

          <div className="leave-date-form-grid">


            {/* FROM DATE */}

            <div className="leave-form-field">

              <label>

                From Date

                <b>*</b>

              </label>


              <div className="leave-date-input">

                <FaCalendarAlt />

                <input
                  type="date"
                  name="fromDate"
                  value={
                    formData.fromDate
                  }
                  onChange={
                    handleChange
                  }
                  disabled={loading}
                />

              </div>

            </div>


            {/* TO DATE */}

            <div className="leave-form-field">

              <label>

                To Date

                <b>*</b>

              </label>


              <div className="leave-date-input">

                <FaCalendarAlt />

                <input
                  type="date"
                  name="toDate"
                  value={
                    formData.toDate
                  }
                  min={
                    formData.fromDate ||
                    undefined
                  }
                  onChange={
                    handleChange
                  }
                  disabled={loading}
                />

              </div>

            </div>

          </div>


          {/* =================================================
              REASON
          ================================================= */}

          <div className="leave-reason-field">

            <label className="leave-form-label">

              Reason

              <b>*</b>

            </label>


            <textarea
              name="reason"
              value={
                formData.reason
              }
              onChange={
                handleChange
              }
              maxLength={200}
              placeholder="Enter leave reason..."
              disabled={loading}
            />


            <span className="leave-reason-counter">

              {formData.reason.length}
              /200

            </span>

          </div>


          {/* =================================================
              REPEAT
          ================================================= */}

          <div className="leave-repeat-status-row">

            <div className="leave-form-field">

              <label>
                Repeat
              </label>


              <div className="leave-repeat-select">

                <FaSyncAlt />

                <select
                  name="repeat"
                  value={
                    formData.repeat
                  }
                  onChange={
                    handleChange
                  }
                  disabled={loading}
                >

                  <option value="Does not repeat">
                    Does not repeat
                  </option>

                  <option value="Every Week">
                    Every Week
                  </option>

                  <option value="Every Month">
                    Every Month
                  </option>

                  <option value="Every Year">
                    Every Year
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="leave-modal-footer">

            <button
              type="button"
              className="leave-modal-cancel"
              onClick={onClose}
              disabled={loading}
            >

              Cancel

            </button>


            <button
              type="submit"
              className="leave-modal-save"
              disabled={loading}
            >

              {loading

                ? (
                  isEditMode
                    ? "Updating..."
                    : "Adding..."
                )

                : (
                  isEditMode
                    ? "Update Leave"
                    : "Add Leave"
                )

              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};


export default AddLeaveModal;