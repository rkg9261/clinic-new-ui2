import React, { useEffect, useState } from "react";

import {
  FaCog,
  FaClock,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";

import { API } from "../../../config/api";


const AppointmentSettings = ({
  settings,
  setSettings,
}) => {

  const [saving, setSaving] = useState(false);


  /* =====================================================
     NO STATIC FORM VALUES
  ===================================================== */

  const safeSettings =
    settings || {};


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
      typeof token === "string" &&
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
      typeof token === "string" &&
      token.startsWith("Bearer ")
    ) {

      token =
        token.substring(7);

    }


    return token;

  };


  /* =====================================================
     FORMAT API DATA

  ===================================================== */

  const formatSettings = (item) => {

    if (!item) {

      return null;

    }


    console.log(
      "RAW APPOINTMENT SETTINGS FROM DATABASE:",
      item
    );


    const formatted = {

      /* =========================
         ID
      ========================= */

      id:
        item.id ??
        item.appointmentSettingsId ??
        item.appointmentSettingsID ??
        item.appointment_setting_id ??
        item.appointmentSettingId ??
        item.appointmentSettingID ??
        null,


      /* =========================
         ENABLE APPOINTMENT
      ========================= */

      enableAppointment:
        item.enableAppointment ??
        item.enable_appointment ??
        false,


      /* =========================
         SAME DAY BOOKING
      ========================= */

      sameDayBooking:
        item.sameDayBooking ??
        item.same_day_booking ??
        false,


      /* =========================
         SLOT DURATION
      ========================= */

      slotDuration:
        item.slotDuration ??
        item.slot_duration ??
        "",


      /* =========================
         MAX APPOINTMENTS
      ========================= */

      maximumAppointments:
        item.maximumAppointments ??
        item.maxAppointmentsPerSlot ??
        item.maximumAppointmentsPerSlot ??
        item.max_appointments_per_slot ??
        "",


      /* =========================
         BOOKING START DAYS
      ========================= */

      bookingStartDays:
        item.bookingStartDays ??
        item.booking_start_days ??
        "",


      /* =========================
         FUTURE APPOINTMENT DAYS
      ========================= */

      futureAppointmentDays:
        item.futureAppointmentDays ??
        item.future_appointment_days ??
        "",


      /* =========================
         START TIME
      ========================= */

      appointmentStartTime:
        item.appointmentStartTime ??
        item.appointment_start_time ??
        "",


      /* =========================
         END TIME
      ========================= */

      appointmentEndTime:
        item.appointmentEndTime ??
        item.appointment_end_time ??
        "",

    };


    console.log(
      "FORMATTED APPOINTMENT SETTINGS:",
      formatted
    );


    return formatted;

  };


  /* =====================================================
     GET ID
  ===================================================== */

  const getIdFromData = (data) => {

    if (!data) {

      return null;

    }


    return (

      data.id ??

      data.appointmentSettingsId ??

      data.appointmentSettingsID ??

      data.appointment_setting_id ??

      data.appointmentSettingId ??

      data.appointmentSettingID ??

      null

    );

  };


 


  const extractRecord = (responseData) => {

    if (!responseData) {

      return null;

    }


    let data =
      responseData?.data ??
      responseData;



    if (
      data &&
      !Array.isArray(data) &&
      data.data
    ) {

      data =
        data.data;

    }


    /* =========================
       ARRAY
    ========================= */

    if (
      Array.isArray(data)
    ) {

      if (
        data.length === 0
      ) {

        return null;

      }


      return data[0];

    }


    /* =========================
       OBJECT
    ========================= */

    if (
      typeof data === "object"
    ) {

      return data;

    }


    return null;

  };


  /* =====================================================
     GET APPOINTMENT SETTINGS
  ===================================================== */

  const getAppointmentSettings = async () => {

    const token =
      getAuthToken();


    console.log(
      "=========================================="
    );

    console.log(
      "GET APPOINTMENT SETTINGS"
    );

    console.log(
      "=========================================="
    );


    /* =========================
       TOKEN
    ========================= */

    if (!token) {

      console.error(
        "AUTH TOKEN NOT FOUND"
      );

      return null;

    }


    const getUrl =
      API.APPOINTMENT_SETTINGS;


    console.log(
      "GET URL:",
      getUrl
    );


    try {

      const response =
        await fetch(
          getUrl,
          {

            method:
              "GET",

            headers: {

              Accept:
                "application/json",

              Authorization:
                `Bearer ${token}`,

            },

          }
        );


      /* =========================
         RESPONSE
      ========================= */

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
        "GET RESPONSE"
      );

      console.log(
        "=========================================="
      );


      console.log(
        "GET STATUS:",
        response.status
      );


      console.log(
        "GET OK:",
        response.ok
      );


      console.log(
        "GET DATA:",
        responseData
      );


      /* =========================
         ERROR
      ========================= */

      if (!response.ok) {

        console.error(
          "GET APPOINTMENT SETTINGS FAILED:",
          responseData
        );


        if (
          response.status === 401
        ) {

          console.error(
            "Unauthorized."
          );

        }


        return null;

      }


      /* =========================
         EXTRACT DATABASE RECORD
      ========================= */

      const record =
        extractRecord(
          responseData
        );


      console.log(
        "DATABASE RECORD:",
        record
      );


      if (!record) {

        console.warn(
          "NO APPOINTMENT SETTINGS RECORD FOUND."
        );


        return null;

      }


      /* =========================
         GET DATABASE ID
      ========================= */

      const databaseId =
        getIdFromData(
          record
        );


      console.log(
        "=========================================="
      );

      console.log(
        "DATABASE APPOINTMENT SETTINGS ID"
      );

      console.log(
        "=========================================="
      );


      console.log(
        "ID:",
        databaseId
      );


      /* =========================
         FORMAT DATA
      ========================= */

      const formattedSettings =
        formatSettings(
          record
        );


      console.log(
        "FORM DATA FROM DATABASE:",
        formattedSettings
      );


      /* =========================
         FILL FORM
      ========================= */

      if (
        formattedSettings
      ) {

        setSettings(
          formattedSettings
        );

      }


      return {

        record:
          record,

        formatted:
          formattedSettings,

        id:
          databaseId,

      };

    }

    catch (error) {

      console.error(
        "GET APPOINTMENT SETTINGS ERROR:",
        error
      );


      return null;

    }

  };


  /* =====================================================
     AUTOMATIC GET
  ===================================================== */

  useEffect(() => {

    console.log(
      "=========================================="
    );

    console.log(
      "APPOINTMENT SETTINGS COMPONENT LOADED"
    );

    console.log(
      "CALLING GET API..."
    );

    console.log(
      "=========================================="
    );


    getAppointmentSettings();

  }, []);


  /* =====================================================
     HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setSettings(
      (previous) => {

        const current =
          previous || {};


        return {

          ...current,

          [name]:

            type === "checkbox"

              ? checked

              : (
                  name === "slotDuration" ||
                  name === "maximumAppointments" ||
                  name === "bookingStartDays" ||
                  name === "futureAppointmentDays"
                )

                ? (
                    value === ""
                      ? ""
                      : Number(value)
                  )

                : value,

        };

      }
    );

  };


  /* =====================================================
     HANDLE TOGGLE
  ===================================================== */

  const handleToggle = (name) => {

    setSettings(
      (previous) => {

        const current =
          previous || {};


        return {

          ...current,

          [name]:
            !Boolean(
              current[name]
            ),

        };

      }
    );

  };


  /* =====================================================
     BUILD REQUEST BODY
  ===================================================== */

  const buildRequestBody = () => {

    const current =
      settings || {};


    return {

      enableAppointment:
        Boolean(
          current.enableAppointment
        ),


      sameDayBooking:
        Boolean(
          current.sameDayBooking
        ),


      slotDuration:
        Number(
          current.slotDuration
        ),


      maxAppointmentsPerSlot:
        Number(
          current.maximumAppointments
        ),


      bookingStartDays:
        Number(
          current.bookingStartDays
        ),


      futureAppointmentDays:
        Number(
          current.futureAppointmentDays
        ),


      appointmentStartTime:
        current.appointmentStartTime || "",


      appointmentEndTime:
        current.appointmentEndTime || "",

    };

  };


  /* =====================================================
     POST API
  ===================================================== */

  const postAppointmentSettings = async (
    token,
    requestBody
  ) => {

    console.log(
      "=========================================="
    );

    console.log(
      "1. POST APPOINTMENT SETTINGS"
    );

    console.log(
      "=========================================="
    );


    const postUrl =
      API.APPOINTMENT_SETTINGS;


    console.log(
      "POST URL:",
      postUrl
    );


    console.log(
      "POST REQUEST BODY:",
      requestBody
    );


    const response =
      await fetch(
        postUrl,
        {

          method:
            "POST",

          headers: {

            "Content-Type":
              "application/json",

            Accept:
              "application/json",

            Authorization:
              `Bearer ${token}`,

          },

          body:
            JSON.stringify(
              requestBody
            ),

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
      "POST STATUS:",
      response.status
    );


    console.log(
      "POST RESPONSE:",
      responseData
    );


    if (
      response.status === 409
    ) {

      console.warn(
        "POST returned 409 - record already exists."
      );


      return {

        alreadyExists:
          true,

        response:
          responseData,

      };

    }


    if (
      !response.ok
    ) {

      throw new Error(

        responseData?.message ||

        responseData?.title ||

        responseData?.error ||

        "POST appointment settings failed."

      );

    }


    console.log(
      "POST SUCCESS."
    );


    return {

      alreadyExists:
        false,

      response:
        responseData,

    };

  };


  /* =====================================================
   PUT APPOINTMENT SETTINGS
===================================================== */

const putAppointmentSettings = async (
  token,
  id,
  requestBody
) => {

  console.log(
    "=========================================="
  );

  console.log(
    "3. PUT APPOINTMENT SETTINGS"
  );

  console.log(
    "=========================================="
  );

  const putUrl =
    API.APPOINTMENT_SETTINGS;


  console.log(
    "PUT ID:",
    id
  );

  console.log(
    "PUT URL:",
    putUrl
  );

  console.log(
    "PUT METHOD:",
    "PUT"
  );

  console.log(
    "PUT UPDATED DATA:",
    requestBody
  );


  try {

    const response =
      await fetch(
        putUrl,
        {

          method:
            "PUT",

          headers: {

            "Content-Type":
              "application/json",

            Accept:
              "application/json",

            Authorization:
              `Bearer ${token}`,

          },

          body:
            JSON.stringify(
              requestBody
            ),

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
      "PUT APPOINTMENT SETTINGS RESPONSE"
    );

    console.log(
      "=========================================="
    );

    console.log(
      "PUT ID:",
      id
    );

    console.log(
      "PUT STATUS:",
      response.status
    );

    console.log(
      "PUT OK:",
      response.ok
    );

    console.log(
      "PUT UPDATED DATA:",
      requestBody
    );

    console.log(
      "PUT RESPONSE:",
      responseData
    );


    if (!response.ok) {

      console.error(
        "PUT FAILED:",
        responseData
      );


      if (
        response.status === 401
      ) {

        throw new Error(
          "Unauthorized. Please login again."
        );

      }


      if (
        response.status === 404
      ) {

        throw new Error(
          "Appointment settings PUT endpoint was not found."
        );

      }


      throw new Error(

        responseData?.message ||

        responseData?.title ||

        responseData?.error ||

        "Failed to update appointment settings."

      );

    }


    console.log(
      "APPOINTMENT SETTINGS UPDATED SUCCESSFULLY"
    );


    return {

      success:
        true,

      response:
        responseData,

    };

  }

  catch (error) {

    console.error(
      "PUT APPOINTMENT SETTINGS ERROR:",
      error
    );

    throw error;

  }

};


  /* =====================================================
     SAVE
  ===================================================== */

  const handleSave = async () => {

    const token =
      getAuthToken();


    console.log(
      "=========================================="
    );

    console.log(
      "SAVE APPOINTMENT SETTINGS"
    );

    console.log(
      "=========================================="
    );


    /* =========================
       TOKEN
    ========================= */

    if (!token) {

      alert(
        "Unauthorized. Please login again."
      );

      return;

    }


    /* =========================
       VALIDATION
    ========================= */

    if (
      settings?.slotDuration === "" ||
      settings?.slotDuration === undefined ||
      settings?.slotDuration === null
    ) {

      alert(
        "Please select Slot Duration."
      );

      return;

    }


    if (
      settings?.maximumAppointments === "" ||
      settings?.maximumAppointments === undefined ||
      settings?.maximumAppointments === null
    ) {

      alert(
        "Please select Maximum Appointments Per Slot."
      );

      return;

    }


    if (
      !settings?.appointmentStartTime
    ) {

      alert(
        "Please select Appointment Start Time."
      );

      return;

    }


    if (
      !settings?.appointmentEndTime
    ) {

      alert(
        "Please select Appointment End Time."
      );

      return;

    }


    if (
      settings?.bookingStartDays === "" ||
      settings?.bookingStartDays === undefined ||
      settings?.bookingStartDays === null
    ) {

      alert(
        "Please enter Booking Start Days."
      );

      return;

    }


    if (
      settings?.futureAppointmentDays === "" ||
      settings?.futureAppointmentDays === undefined ||
      settings?.futureAppointmentDays === null
    ) {

      alert(
        "Please enter Future Appointment Days."
      );

      return;

    }


    /* =========================
       USER UPDATED DATA
    ========================= */

    const requestBody =
      buildRequestBody();


    console.log(
      "=========================================="
    );

    console.log(
      "USER UPDATED FORM DATA"
    );

    console.log(
      "=========================================="
    );


    console.log(
      requestBody
    );


    try {

      setSaving(true);


      /* =================================================
        POST
      ================================================= */

      const postResult =
        await postAppointmentSettings(
          token,
          requestBody
        );


      console.log(
        "POST RESULT:",
        postResult
      );


      /* =================================================
        — GET.
      ================================================= */

      const getResult =
        await getAppointmentSettings();


      if (!getResult) {

        throw new Error(
          "Could not retrieve appointment settings from database."
        );

      }


      /* =================================================
         DATABASE ID
      ================================================= */

      const databaseId =
        getResult.id;


      console.log(
        "=========================================="
      );

      console.log(
        "GET DATABASE RESULT"
      );

      console.log(
        "=========================================="
      );


      console.log(
        "DATABASE ID:",
        databaseId
      );


      console.log(
        "DATABASE RECORD:",
        getResult.record
      );


      console.log(
        "DATABASE FORM DATA:",
        getResult.formatted
      );


        const existingId =
        settings?.id;


      const recordAlreadyExisted =
        existingId !== null &&
        existingId !== undefined &&
        existingId !== "";


      console.log(
        "ID BEFORE SAVE:",
        existingId
      );


      console.log(
        "RECORD ALREADY EXISTED:",
        recordAlreadyExisted
      );


 

      if (
        recordAlreadyExisted
      ) {

        if (
          databaseId === null ||
          databaseId === undefined ||
          databaseId === ""
        ) {

          throw new Error(
            "Appointment Settings ID was not found for PUT."
          );

        }


        const putResult =
          await putAppointmentSettings(
            token,
            databaseId,
            requestBody
          );


        console.log(
          "=========================================="
        );

        console.log(
          "FINAL PUT RESULT"
        );

        console.log(
          "=========================================="
        );


        console.log(
          "PUT ID:",
          databaseId
        );


        console.log(
          "UPDATED DATA:",
          requestBody
        );


        console.log(
          "PUT RESULT:",
          putResult
        );


       

        const putRecord =
          extractRecord(
            putResult?.response
          );


        if (
          putRecord
        ) {

          const formattedPut =
            formatSettings(
              putRecord
            );


          if (
            formattedPut
          ) {

            setSettings(
              formattedPut
            );

          }

        }

        else {

          setSettings(
            (previous) => ({

              ...(previous || {}),

              id:
                databaseId,

            })
          );

        }


        alert(
          "Appointment settings updated successfully."
        );

      }

   

      else {

        console.log(
          "=========================================="
        );

        console.log(
          "FIRST SAVE COMPLETE"
        );

        console.log(
          "POST → GET"
        );

        console.log(
          "=========================================="
        );


        console.log(
          "DATABASE ID:",
          databaseId
        );


        console.log(
          "DATABASE DATA:",
          getResult.formatted
        );


        alert(
          "Appointment settings saved successfully."
        );

      }

    }

    catch (error) {

      console.error(
        "=========================================="
      );

      console.error(
        "SAVE APPOINTMENT SETTINGS ERROR"
      );

      console.error(
        "=========================================="
      );


      console.error(
        error
      );


      alert(
        error.message ||
        "Unable to save appointment settings."
      );

    }

    finally {

      setSaving(false);

    }

  };


  /* =====================================================
     RETURN
  ===================================================== */

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


      {/* =================================================
          FORM
      ================================================= */}

      <div className="appointment-settings-grid">


        {/* =================================================
            ENABLE APPOINTMENT
        ================================================= */}

        <div className="appointment-setting-item">

          <label>
            Enable Appointment
          </label>


          <label className="appointment-toggle">

            <input
              type="checkbox"

              checked={
                Boolean(
                  safeSettings.enableAppointment
                )
              }

              onChange={() =>
                handleToggle(
                  "enableAppointment"
                )
              }

            />

            <span />

          </label>

        </div>


        {/* =================================================
            SAME DAY BOOKING
        ================================================= */}

        <div className="appointment-setting-item">

          <label>
            Same Day Booking
          </label>


          <label className="appointment-toggle">

            <input
              type="checkbox"

              checked={
                Boolean(
                  safeSettings.sameDayBooking
                )
              }

              onChange={() =>
                handleToggle(
                  "sameDayBooking"
                )
              }

            />

            <span />

          </label>

        </div>


        {/* =================================================
            SLOT DURATION
        ================================================= */}

        <div className="appointment-setting-item">

          <label>
            Slot Duration <b>*</b>
          </label>


          <select
            name="slotDuration"

            value={
              safeSettings.slotDuration ?? ""
            }

            onChange={
              handleChange
            }

            className="appointment-setting-select"
          >

            <option value="">
              Select Duration
            </option>

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


        {/* =================================================
            START TIME
        ================================================= */}

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
                safeSettings.appointmentStartTime || ""
              }

              onChange={
                handleChange
              }

            />

          </div>

        </div>


        {/* =================================================
            MAX APPOINTMENTS
        ================================================= */}

        <div className="appointment-setting-item">

          <label>
            Maximum Appointments Per Slot <b>*</b>
          </label>


          <select
            name="maximumAppointments"

            value={
              safeSettings.maximumAppointments ?? ""
            }

            onChange={
              handleChange
            }

            className="appointment-setting-select"
          >

            <option value="">
              Select Maximum
            </option>

            <option value={1}>
              1
            </option>

            <option value={2}>
              2
            </option>

            <option value={3}>
              3
            </option>

            <option value={4}>
              4
            </option>

            <option value={5}>
              5
            </option>

          </select>

        </div>


        {/* =================================================
            END TIME
        ================================================= */}

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
                safeSettings.appointmentEndTime || ""
              }

              onChange={
                handleChange
              }

            />

          </div>

        </div>


        {/* =================================================
            BOOKING START DAYS
        ================================================= */}

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
                safeSettings.bookingStartDays ?? ""
              }

              onChange={
                handleChange
              }

            />


            <span>
              Days
            </span>

          </div>

        </div>


        {/* =================================================
            FUTURE APPOINTMENT DAYS
        ================================================= */}

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
                safeSettings.futureAppointmentDays ?? ""
              }

              onChange={
                handleChange
              }

            />


            <span>
              Days
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          NOTE
      ================================================= */}

      <div className="appointment-settings-note">

        <span>
          ⓘ
        </span>

        Future Appointment Days controls how many
        days in advance patients can book appointments.

      </div>


      {/* =================================================
          SAVE BUTTON
      ================================================= */}

      <div className="appointment-settings-footer">

        <button
          type="button"

          className="appointment-settings-save-btn"

          onClick={
            handleSave
          }

          disabled={
            saving
          }
        >

          <FaSave />

          {saving
            ? "Saving..."
            : "Save Settings"
          }

        </button>

      </div>

    </section>

  );

};


export default AppointmentSettings;