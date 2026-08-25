import React, { useState } from "react";

import {
  FaCalendarAlt,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";

import { API } from "../../../config/api";


const AddLeaveModal = ({
  onClose,
  onSave,
}) => {

  /*  FORM DATA*/
   
  

  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    repeat: "Does not repeat",
  });


  /*LOADING*/
     
  

  const [loading, setLoading] = useState(false);


  /* HANDLE CHANGE  */
    


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


  /* GET REPEAT TYPE FOR API*/
    
  

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


  /*GET AUTH TOKEN*/
     
  

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


  /* SAVE*/
    
  

  const handleSubmit = async (e) => {

    e.preventDefault();


    /*DATE VALIDATION  */
       
  

    if (
      !formData.fromDate ||
      !formData.toDate
    ) {

      alert(
        "Please select leave date range."
      );

      return;

    }


    /* DATE RANGE VALIDATION */
      
   

    if (
      formData.toDate <
      formData.fromDate
    ) {

      alert(
        "To Date cannot be before From Date."
      );

      return;

    }


    /* REASON VALIDATION */
      
   

    if (
      !formData.reason.trim()
    ) {

      alert(
        "Please enter leave reason."
      );

      return;

    }


    /* TOKEN */
      
   

    const token =
      getAuthToken();


    /* API BODY */
      
   

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


  

    console.log(
      "=========================================="
    );

    console.log(
      "CREATE APPOINTMENT LEAVE"
    );

    console.log(
      "=========================================="
    );

    console.log(
      "API URL:",
      API.APPOINTMENT_LEAVES
    );

    console.log(
      "METHOD:",
      "POST"
    );

    console.log(
      "TOKEN EXISTS:",
      !!token
    );

    console.log(
      "REQUEST BODY:",
      requestBody
    );

    console.log(
      "REQUEST BODY JSON:",
      JSON.stringify(
        requestBody,
        null,
        2
      )
    );

    console.log(
      "=========================================="
    );


    /*TOKEN CHECK*/
       
    

    if (!token) {

      console.error(
        "AUTH TOKEN NOT FOUND"
      );

      alert(
        "Unauthorized. Please login again."
      );

      return;

    }


    try {

      setLoading(true);


      /*API CALL*/
         
      

      const response =
        await fetch(
          API.APPOINTMENT_LEAVES,
          {

            method: "POST",

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


      /*RESPONSE*/
         
      

      console.log(
        "=========================================="
      );

      console.log(
        "APPOINTMENT LEAVE API RESPONSE"
      );

      console.log(
        "=========================================="
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


      /*  API ERROR */
       
     

      if (!response.ok) {

        console.error(
          "APPOINTMENT LEAVE API ERROR:",
          responseData
        );


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
            "Failed to add leave."
          );

        }

        return;

      }


      /*SUCCESS*/
         
      

      console.log(
        "=========================================="
      );

      console.log(
        "LEAVE CREATED SUCCESSFULLY"
      );

      console.log(
        "=========================================="
      );


   

      const savedLeave = {

        ...(responseData?.data || {}),

        fromDate:
          requestBody.fromDate,

        toDate:
          requestBody.toDate,

        reason:
          requestBody.reason,

        repeatType:
          requestBody.repeatType,

      };


      if (onSave) {

        onSave(
          savedLeave
        );

      }


    } catch (error) {

      /*NETWORK ERROR*/

      console.error(
        "CREATE LEAVE FETCH ERROR:",
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


        {/*  HEADER*/}
          
        

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
            disabled={loading}
          >

            <FaTimes />

          </button>

        </div>


        {/*INFO*/}
            
        

        <div className="leave-modal-info">

          <span>
            ⓘ
          </span>

          Appointments will not be available
          during the selected leave period.

        </div>


        {/*FORM*/}
            
        

        <form
          onSubmit={handleSubmit}
        >


          {/*DATE RANGE */}
              
         

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
                  disabled={loading}
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
                  disabled={loading}
                />

              </div>

            </div>

          </div>


          {/*
              REASON
          */}

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


          {/*
              REPEAT
          */}

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


          {/*
              FOOTER
          */}

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
                ? "Adding..."
                : "Add Leave"
              }

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};


export default AddLeaveModal;