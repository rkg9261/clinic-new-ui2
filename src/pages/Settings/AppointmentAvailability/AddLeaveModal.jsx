import React, { useState } from "react";

import {
  FaCalendarAlt,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";


const AddLeaveModal = ({
  onClose,
  onSave,
}) => {

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
     SAVE
  ===================================================== */

  const handleSubmit = (e) => {

    e.preventDefault();


    /* -----------------------------------------------
       DATE VALIDATION
    ----------------------------------------------- */

    if (
      !formData.fromDate ||
      !formData.toDate
    ) {

      alert(
        "Please select leave date range."
      );

      return;
    }


    /* -----------------------------------------------
       DATE RANGE VALIDATION
    ----------------------------------------------- */

    if (
      formData.toDate <
      formData.fromDate
    ) {

      alert(
        "To Date cannot be before From Date."
      );

      return;
    }


    /* -----------------------------------------------
       REASON VALIDATION
    ----------------------------------------------- */

    if (
      !formData.reason.trim()
    ) {

      alert(
        "Please enter leave reason."
      );

      return;
    }


    /* -----------------------------------------------
       SAVE DATA
    ----------------------------------------------- */

    onSave({
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      reason: formData.reason.trim(),
    });
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
              Add a leave to block appointments
              for selected dates.
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


            {/* ---------------------------------------------
                FROM DATE
            --------------------------------------------- */}

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


            {/* ---------------------------------------------
                TO DATE
            --------------------------------------------- */}

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