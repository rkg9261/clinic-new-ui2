import React, { useState } from "react";

import {
  FaCalendarAlt,
  FaUserMd,
  FaHospital,
  FaUmbrellaBeach,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";


const AddLeaveModal = ({
  onClose,
  onSave,
}) => {

  /* =====================================================
     FORM
  ===================================================== */

  const [formData, setFormData] = useState({

    // leaveType: "Doctor Leave",

    fromDate: "",

    toDate: "",

    // session: "Full Day",

    reason: "",

    repeat: "Does not repeat",

    status: true,

  });


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


  /* =====================================================
     SELECT LEAVE TYPE
  ===================================================== */

  const selectLeaveType = (
    type
  ) => {

    setFormData((previous) => ({
      ...previous,
      leaveType: type,
    }));
  };


  /* =====================================================
     SELECT SESSION
  ===================================================== */

  const selectSession = (
    session
  ) => {

    setFormData((previous) => ({
      ...previous,
      session,
    }));
  };


  /* =====================================================
     SAVE
  ===================================================== */

  const handleSubmit = (e) => {

    e.preventDefault();


    if (
      !formData.fromDate ||
      !formData.toDate
    ) {

      alert(
        "Please select leave date range."
      );

      return;
    }


    if (
      formData.toDate <
      formData.fromDate
    ) {

      alert(
        "To Date cannot be before From Date."
      );

      return;
    }


    if (!formData.reason.trim()) {

      alert(
        "Please enter leave reason."
      );

      return;
    }


    onSave(formData);
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
              Add Leave
            </h2>

            <p>
              Add a leave or holiday to block
              appointments for selected dates.
            </p>

          </div>


          <button
            type="button"
            className="leave-modal-close"
            onClick={onClose}
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


        <form
          onSubmit={handleSubmit}
        >


          {/* =================================================
              LEAVE TYPE
          ================================================= */}
{/* 
          <div className="leave-form-section">

            <label className="leave-form-label">

              Leave Type

              <b>*</b>

            </label>


            <div className="leave-type-grid">


              <button
                type="button"
                className={
                  formData.leaveType ===
                  "Doctor Leave"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  selectLeaveType(
                    "Doctor Leave"
                  )
                }
              >

                <FaUserMd />

                <span>
                  Doctor Leave
                </span>

              </button>


              <button
                type="button"
                className={
                  formData.leaveType ===
                  "Clinic Holiday"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  selectLeaveType(
                    "Clinic Holiday"
                  )
                }
              >

                <FaHospital />

                <span>
                  Clinic Holiday
                </span>

              </button>


              <button
                type="button"
                className={
                  formData.leaveType ===
                  "Other"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  selectLeaveType(
                    "Other"
                  )
                }
              >

                <FaUmbrellaBeach />

                <span>
                  Other
                </span>

              </button>

            </div>

          </div> */}


          {/* =================================================
              DATE RANGE
          ================================================= */}

          <div className="leave-date-form-grid">


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
                />

              </div>

            </div>


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
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>

          </div>


          {/* =================================================
              SESSION
          ================================================= */}

          {/* <div className="leave-form-section">

            <label className="leave-form-label">

              Session

              <b>*</b>

            </label>


            <div className="leave-session-grid">


              <button
                type="button"
                className={
                  formData.session ===
                  "Full Day"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  selectSession(
                    "Full Day"
                  )
                }
              >

                <FaCalendarAlt />

                Full Day

              </button>


              <button
                type="button"
                className={
                  formData.session ===
                  "Morning"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  selectSession(
                    "Morning"
                  )
                }
              >

                Morning

              </button>


              <button
                type="button"
                className={
                  formData.session ===
                  "Evening"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  selectSession(
                    "Evening"
                  )
                }
              >

                Evening

              </button>

            </div>

          </div> */}


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
            />

            <span>
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
                >

                  <option>
                    Does not repeat
                  </option>

                  <option>
                    Every Week
                  </option>

                  <option>
                    Every Month
                  </option>

                  <option>
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
            >
              Cancel
            </button>


            <button
              type="submit"
              className="leave-modal-save"
            >
              Add Leave
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddLeaveModal;