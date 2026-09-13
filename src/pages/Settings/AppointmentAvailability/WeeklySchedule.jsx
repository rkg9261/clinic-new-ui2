import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";

import {
  FaCalendarAlt,
} from "react-icons/fa";

import { API } from "../../../config/api";


/* =====================================================
   FIXED WEEKDAYS
===================================================== */

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];


const WeeklySchedule = forwardRef(
  (
    {
      schedule,
      setSchedule,
    },
    ref
  ) => {


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

          // Keep original token

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
       CONVERT API VALUE TO BOOLEAN

    ===================================================== */

    const toBoolean = (
      value
    ) => {

      if (
        value === true
      ) {

        return true;

      }


      if (
        value === false
      ) {

        return false;

      }


      if (
        value === 1
      ) {

        return true;

      }


      if (
        value === 0
      ) {

        return false;

      }


      if (
        typeof value === "string"
      ) {

        const normalized =
          value
            .trim()
            .toLowerCase();


        if (
          normalized === "1" ||
          normalized === "true"
        ) {

          return true;

        }


        if (
          normalized === "0" ||
          normalized === "false" ||
          normalized === ""
        ) {

          return false;

        }

      }


      return false;

    };


    /* =====================================================
       CHECK VALUE EXISTS
    ===================================================== */

    const hasValue = (
      value
    ) => {

      return (
        value !== undefined &&
        value !== null
      );

    };


    /* =====================================================
       FORMAT TIME

    ===================================================== */

    const formatTime = (
      value
    ) => {

      if (
        value === null ||
        value === undefined ||
        value === ""
      ) {

        return "";

      }


      return String(
        value
      ).substring(
        0,
        5
      );

    };


    /* =====================================================
       GET SCHEDULE ID
    ===================================================== */

    const getScheduleId = (
      item
    ) => {

      if (!item) {

        return null;

      }


      return (

        item.id ??

        item.weeklyScheduleId ??

        item.weeklyScheduleID ??

        item.weekly_schedule_id ??

        item.scheduleId ??

        item.scheduleID ??

        null

      );

    };


    /* =====================================================
       GET DAY
    ===================================================== */

    const getScheduleDay = (
      item
    ) => {

      if (!item) {

        return "";

      }


      return (

        item.dayOfWeek ??

        item.day ??

        item.DayOfWeek ??

        item.day_of_week ??

        ""

      );

    };


    /* =====================================================
       GET FIRST VALUE
    ===================================================== */

    const getFirstValue = (
      item,
      keys
    ) => {

      for (
        const key of keys
      ) {

        if (
          item?.[key] !== undefined &&
          item?.[key] !== null
        ) {

          return item[key];

        }

      }


      return undefined;

    };


    /* =====================================================
       FORMAT API RECORD
    ===================================================== */

    const formatApiRecord = (
      item
    ) => {

      if (!item) {

        return null;

      }


      const apiDay =
        getScheduleDay(
          item
        );


      if (!apiDay) {

        return null;

      }


      /* ---------------------------------------------
         MATCH DAY
      --------------------------------------------- */

      const matchedDay =
        WEEKDAYS.find(
          (weekday) =>
            weekday
              .toLowerCase() ===
            String(
              apiDay
            )
              .trim()
              .toLowerCase()
        );


      const day =
        matchedDay ||
        String(
          apiDay
        ).trim();


      /* ---------------------------------------------
         DATABASE ID
      --------------------------------------------- */

      const id =
        getScheduleId(
          item
        );


      const hasDatabaseRecord =
        id !== null &&
        id !== undefined &&
        id !== "";


      /* ---------------------------------------------
         ENABLED
      --------------------------------------------- */

      const enabledValue =
        getFirstValue(
          item,
          [
            "enabled",
            "Enabled",
            "isEnabled",
            "IsEnabled",
          ]
        );


      /* ---------------------------------------------
         MORNING ENABLED
      --------------------------------------------- */

      const morningEnabledValue =
        getFirstValue(
          item,
          [
            "morningEnabled",
            "morning_enabled",
            "MorningEnabled",
            "isMorningEnabled",
            "IsMorningEnabled",
          ]
        );


      /* ---------------------------------------------
         EVENING ENABLED
      --------------------------------------------- */

      const eveningEnabledValue =
        getFirstValue(
          item,
          [
            "eveningEnabled",
            "evening_enabled",
            "EveningEnabled",
            "isEveningEnabled",
            "IsEveningEnabled",
          ]
        );


      /* ---------------------------------------------
         MORNING TIMES
      --------------------------------------------- */

      const morningStart =
        formatTime(
          getFirstValue(
            item,
            [
              "morningStartTime",
              "morningStart",
              "morning_start_time",
              "MorningStartTime",
            ]
          )
        );


      const morningEnd =
        formatTime(
          getFirstValue(
            item,
            [
              "morningEndTime",
              "morningEnd",
              "morning_end_time",
              "MorningEndTime",
            ]
          )
        );


      /* ---------------------------------------------
         EVENING TIMES
      --------------------------------------------- */

      const eveningStart =
        formatTime(
          getFirstValue(
            item,
            [
              "eveningStartTime",
              "eveningStart",
              "evening_start_time",
              "EveningStartTime",
            ]
          )
        );


      const eveningEnd =
        formatTime(
          getFirstValue(
            item,
            [
              "eveningEndTime",
              "eveningEnd",
              "evening_end_time",
              "EveningEndTime",
            ]
          )
        );


      /* ---------------------------------------------
         CHECK EXISTING TIMES
      --------------------------------------------- */

      const hasMorningTime =
        Boolean(
          morningStart ||
          morningEnd
        );


      const hasEveningTime =
        Boolean(
          eveningStart ||
          eveningEnd
        );



      let enabled;


      if (
        hasValue(
          enabledValue
        )
      ) {

        enabled =
          toBoolean(
            enabledValue
          );

      } else {

        enabled =
          hasDatabaseRecord;

      }


      /* =================================================
         MORNING ENABLED
      ================================================= */

      let morningEnabled;


      if (
        hasValue(
          morningEnabledValue
        )
      ) {

        morningEnabled =
          toBoolean(
            morningEnabledValue
          );

      } else {

        morningEnabled =
          hasMorningTime ||
          hasDatabaseRecord;

      }


      /* =================================================
         EVENING ENABLED
      ================================================= */

      let eveningEnabled;


      if (
        hasValue(
          eveningEnabledValue
        )
      ) {

        eveningEnabled =
          toBoolean(
            eveningEnabledValue
          );

      } else {

        eveningEnabled =
          hasEveningTime ||
          hasDatabaseRecord;

      }


      /* =================================================
         FINAL API RECORD
      ================================================= */

      const formattedRecord = {

        id:
          id,

        day:
          day,

        dayOfWeek:
          day,

        enabled:
          enabled,

        morningEnabled:
          morningEnabled,

        morningStart:
          morningStart,

        morningEnd:
          morningEnd,

        eveningEnabled:
          eveningEnabled,

        eveningStart:
          eveningStart,

        eveningEnd:
          eveningEnd,

      };


      console.log(
        `WEEKLY SCHEDULE FROM API - ${day}`,
        formattedRecord
      );


      return formattedRecord;

    };


    /* =====================================================
       EXTRACT API ARRAY
    ===================================================== */

    const extractScheduleArray = (
      responseData
    ) => {

      if (!responseData) {

        return [];

      }


      if (
        Array.isArray(
          responseData
        )
      ) {

        return responseData;

      }


      if (
        Array.isArray(
          responseData.data
        )
      ) {

        return responseData.data;

      }


      if (
        Array.isArray(
          responseData.schedule
        )
      ) {

        return responseData.schedule;

      }


      if (
        Array.isArray(
          responseData.schedules
        )
      ) {

        return responseData.schedules;

      }


      if (
        Array.isArray(
          responseData.result
        )
      ) {

        return responseData.result;

      }


      if (
        responseData.data &&
        typeof responseData.data === "object"
      ) {

        if (
          Array.isArray(
            responseData.data.data
          )
        ) {

          return responseData.data.data;

        }


        if (
          Array.isArray(
            responseData.data.schedule
          )
        ) {

          return responseData.data.schedule;

        }


        if (
          Array.isArray(
            responseData.data.schedules
          )
        ) {

          return responseData.data.schedules;

        }

      }


      return [];

    };


    /* =====================================================
       MERGE API DATA WITH MONDAY-SUNDAY
    ===================================================== */

    const mergeSchedule = (
      apiArray
    ) => {

      const formattedApiRows =
        apiArray
          .map(
            formatApiRecord
          )
          .filter(
            Boolean
          );


      console.log(
        "=============================================="
      );

      console.log(
        "FORMATTED WEEKLY API RECORDS"
      );

      console.log(
        formattedApiRows
      );


      const finalSchedule =
        WEEKDAYS.map(
          (weekday) => {

            /* -----------------------------------------
               DATABASE ROW
            ----------------------------------------- */

            const databaseRow =
              formattedApiRows.find(
                (row) =>
                  String(
                    row.day
                  )
                    .trim()
                    .toLowerCase() ===
                  weekday.toLowerCase()
              );


            /* -----------------------------------------
               OLD REACT ROW
            ----------------------------------------- */

            const oldRow =
              schedule?.find(
                (row) =>
                  String(
                    row.day
                  )
                    .trim()
                    .toLowerCase() ===
                  weekday.toLowerCase()
              );


            /* =========================================
               DATABASE RECORD FOUND
            ========================================= */

            if (
              databaseRow
            ) {

              return {

                ...(oldRow || {}),

                /* ID */

                id:
                  databaseRow.id,

                /* DAY */

                day:
                  weekday,

                dayOfWeek:
                  weekday,

                /* MAIN CHECKBOX */

                enabled:
                  toBoolean(
                    databaseRow.enabled
                  ),

                /* MORNING CHECKBOX */

                morningEnabled:
                  toBoolean(
                    databaseRow.morningEnabled
                  ),

                /* MORNING TIME */

                morningStart:
                  databaseRow.morningStart,

                morningEnd:
                  databaseRow.morningEnd,

                /* EVENING CHECKBOX */

                eveningEnabled:
                  toBoolean(
                    databaseRow.eveningEnabled
                  ),

                /* EVENING TIME */

                eveningStart:
                  databaseRow.eveningStart,

                eveningEnd:
                  databaseRow.eveningEnd,

              };

            }


            /* =========================================
               DATABASE RECORD NOT FOUND
            ========================================= */

            return {

              ...(oldRow || {}),

              id:
                oldRow?.id ??
                null,

              day:
                weekday,

              dayOfWeek:
                weekday,

              enabled:
                toBoolean(
                  oldRow?.enabled ??
                  false
                ),

              morningEnabled:
                toBoolean(
                  oldRow?.morningEnabled ??
                  false
                ),

              morningStart:
                oldRow?.morningStart ??
                "",

              morningEnd:
                oldRow?.morningEnd ??
                "",

              eveningEnabled:
                toBoolean(
                  oldRow?.eveningEnabled ??
                  false
                ),

              eveningStart:
                oldRow?.eveningStart ??
                "",

              eveningEnd:
                oldRow?.eveningEnd ??
                "",

            };

          }
        );


      console.log(
        "=============================================="
      );

      console.log(
        "FINAL SCHEDULE AFTER GET"
      );

      console.log(
        finalSchedule
      );

      console.log(
        "=============================================="
      );


      return finalSchedule;

    };


    /* =====================================================
       GET WEEKLY SCHEDULE

       RUNS AUTOMATICALLY AFTER REFRESH
    ===================================================== */

    const getWeeklySchedule =
      async () => {

        const token =
          getAuthToken();


        console.log(
          "=============================================="
        );

        console.log(
          "GET WEEKLY SCHEDULE"
        );

        console.log(
          "=============================================="
        );


        console.log(
          "GET URL:",
          API.WEEKLY_SCHEDULE
        );


        if (!token) {

          console.error(
            "AUTH TOKEN NOT FOUND"
          );

          return null;

        }


        try {

          const response =
            await fetch(
              API.WEEKLY_SCHEDULE,
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


          const responseText =
            await response.text();


          let responseData =
            null;


          if (
            responseText
          ) {

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
            "GET STATUS:",
            response.status
          );


          console.log(
            "GET RESPONSE:",
            responseData
          );


          if (
            !response.ok
          ) {

            console.error(
              "GET FAILED:",
              responseData
            );

            return null;

          }


          /* ---------------------------------------------
             EXTRACT
          --------------------------------------------- */

          const apiArray =
            extractScheduleArray(
              responseData
            );


          console.log(
            "DATABASE WEEKLY RECORDS:",
            apiArray
          );


          /* ---------------------------------------------
             MERGE
          --------------------------------------------- */

          const mergedSchedule =
            mergeSchedule(
              apiArray
            );


          /* ---------------------------------------------
             SET STATE

             Previously saved checkboxes and
             time values appear automatically.
          --------------------------------------------- */

          setSchedule(
            mergedSchedule
          );


          return mergedSchedule;

        }

        catch (error) {

          console.error(
            "GET WEEKLY SCHEDULE ERROR:",
            error
          );


          return null;

        }

      };


    /* =====================================================
       AUTOMATIC GET ON PAGE LOAD / REFRESH
    ===================================================== */

    useEffect(() => {

      getWeeklySchedule();

    }, []);


    /* =====================================================
       POST BODY

    ===================================================== */

    const buildPostBody = (
      item
    ) => {

      return {

        dayOfWeek:
          item.dayOfWeek ||
          item.day,

        enabled:
          toBoolean(
            item.enabled
          ),

        morningEnabled:
          toBoolean(
            item.morningEnabled
          ),

        morningStartTime:
          item.morningStart ||
          "",

        morningEndTime:
          item.morningEnd ||
          "",

        eveningEnabled:
          toBoolean(
            item.eveningEnabled
          ),

        eveningStartTime:
          item.eveningStart ||
          "",

        eveningEndTime:
          item.eveningEnd ||
          "",

      };

    };


    /* =====================================================
       PUT BODY

 
    ===================================================== */

    const buildPutBody = (
      item
    ) => {

      return {

        dayOfWeek:
          item.dayOfWeek ||
          item.day,

        enabled:
          toBoolean(
            item.enabled
          ),

        morningEnabled:
          toBoolean(
            item.morningEnabled
          ),

        morningStartTime:
          item.morningStart ||
          "",

        morningEndTime:
          item.morningEnd ||
          "",

        eveningEnabled:
          toBoolean(
            item.eveningEnabled
          ),

        eveningStartTime:
          item.eveningStart ||
          "",

        eveningEndTime:
          item.eveningEnd ||
          "",

      };

    };


    /* =====================================================
       POST ONE WEEKLY SCHEDULE
    ===================================================== */

    const postWeeklySchedule =
      async (
        token,
        item
      ) => {

        const requestBody =
          buildPostBody(
            item
          );


        console.log(
          "=============================================="
        );

        console.log(
          "POST WEEKLY SCHEDULE"
        );

        console.log(
          "POST DAY:",
          item.day
        );

        console.log(
          "POST REQUEST BODY:",
          requestBody
        );


        const response =
          await fetch(
            API.WEEKLY_SCHEDULE,
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


        const text =
          await response.text();


        let data =
          null;


        if (
          text
        ) {

          try {

            data =
              JSON.parse(
                text
              );

          } catch {

            data =
              text;

          }

        }


        console.log(
          "POST STATUS:",
          response.status
        );


        console.log(
          "POST RESPONSE:",
          data
        );


        /* ---------------------------------------------
           RECORD ALREADY EXISTS
        --------------------------------------------- */

        if (
          response.status === 409
        ) {

          console.warn(
            `${item.day} already exists.`
          );


          return {

            success:
              false,

            alreadyExists:
              true,

            data:
              data,

          };

        }


        /* ---------------------------------------------
           OTHER ERROR
        --------------------------------------------- */

        if (
          !response.ok
        ) {

          throw new Error(

            data?.message ||

            data?.title ||

            data?.error ||

            `Failed to create ${item.day}.`

          );

        }


        return {

          success:
            true,

          alreadyExists:
            false,

          data:
            data,

        };

      };


    /* =====================================================
       PUT ONE WEEKLY SCHEDULE
    ===================================================== */

    const putWeeklySchedule =
      async (
        token,
        id,
        item
      ) => {

        if (
          id === null ||
          id === undefined ||
          id === ""
        ) {

          throw new Error(
            `Weekly schedule ID not found for ${item.day}.`
          );

        }


        const requestBody =
          buildPutBody(
            item
          );


        const putUrl =
          `${API.WEEKLY_SCHEDULE}/${encodeURIComponent(
            id
          )}`;


        console.log(
          "=============================================="
        );

        console.log(
          "PUT WEEKLY SCHEDULE"
        );

        console.log(
          "PUT ID:",
          id
        );

        console.log(
          "PUT DAY:",
          item.day
        );

        console.log(
          "PUT URL:",
          putUrl
        );

        console.log(
          "PUT REQUEST BODY:",
          requestBody
        );


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


        const text =
          await response.text();


        let data =
          null;


        if (
          text
        ) {

          try {

            data =
              JSON.parse(
                text
              );

          } catch {

            data =
              text;

          }

        }


        console.log(
          "PUT STATUS:",
          response.status
        );


        console.log(
          "PUT RESPONSE:",
          data
        );


        if (
          !response.ok
        ) {

          throw new Error(

            data?.message ||

            data?.title ||

            data?.error ||

            `Failed to update ${item.day}.`

          );

        }


        return {

          success:
            true,

          id:
            id,

          day:
            item.day,

          data:
            data,

        };

      };


    /* =====================================================
       SAVE SCHEDULE

       POST → GET → PUT
    ===================================================== */

    const saveSchedule =
      async () => {

        const token =
          getAuthToken();


        console.log(
          "=============================================="
        );

        console.log(
          "SAVE WEEKLY SCHEDULE"
        );

        console.log(
          "=============================================="
        );


        if (!token) {

          alert(
            "Unauthorized. Please login again."
          );

          return;

        }


        if (
          !Array.isArray(
            schedule
          ) ||
          schedule.length === 0
        ) {

          alert(
            "Weekly schedule is empty."
          );

          return;

        }


        try {

          /* =============================================
             STEP 1
             POST
          ============================================= */

          console.log(
            "STEP 1: POST"
          );


          const postResults =
            [];


          for (
            const item of schedule
          ) {

            const result =
              await postWeeklySchedule(
                token,
                item
              );


            postResults.push({

              day:
                item.day,

              result:
                result,

            });

          }


          console.log(
            "ALL POST RESULTS:",
            postResults
          );


          /* =============================================
             STEP 2
             GET

             Gets latest database IDs.
          ============================================= */

          console.log(
            "STEP 2: GET"
          );


          const latestDatabase =
            await getWeeklySchedule();


          if (
            !latestDatabase
          ) {

            throw new Error(
              "Unable to get weekly schedule after POST."
            );

          }


          console.log(
            "LATEST DATABASE:",
            latestDatabase
          );


          /* =============================================
             STEP 3
             PUT EXISTING RECORDS
          ============================================= */

          console.log(
            "STEP 3: PUT"
          );


          const putResults =
            [];


          for (
            const item of schedule
          ) {

            const oldId =
              getScheduleId(
                item
              );


            /*
             * Existing record already has ID.
             * Update it using PUT.
             */

            if (
              oldId !== null &&
              oldId !== undefined &&
              oldId !== ""
            ) {

              const databaseRow =
                latestDatabase.find(
                  (row) =>
                    String(
                      row.day
                    )
                      .trim()
                      .toLowerCase() ===
                    String(
                      item.day
                    )
                      .trim()
                      .toLowerCase()
                );


              const finalId =
                databaseRow?.id ??
                oldId;


              console.log(
                "EXISTING RECORD:",
                item.day
              );

              console.log(
                "DATABASE ID:",
                finalId
              );


              const putResult =
                await putWeeklySchedule(
                  token,
                  finalId,
                  item
                );


              putResults.push(
                putResult
              );

            }

          }


          console.log(
            "ALL PUT RESULTS:",
            putResults
          );


          /* =============================================
             KEEP CURRENT UI DATA
             AND DATABASE IDS
          ============================================= */

          setSchedule(
            (previous) => {

              return WEEKDAYS.map(
                (weekday) => {

                  const current =
                    previous.find(
                      (row) =>
                        String(
                          row.day
                        )
                          .trim()
                          .toLowerCase() ===
                        weekday.toLowerCase()
                    );


                  const database =
                    latestDatabase.find(
                      (row) =>
                        String(
                          row.day
                        )
                          .trim()
                          .toLowerCase() ===
                        weekday.toLowerCase()
                    );


                  return {

                    ...(current || {}),

                    day:
                      weekday,

                    dayOfWeek:
                      weekday,

                    id:
                      database?.id ??
                      current?.id ??
                      null,

                    enabled:
                      toBoolean(
                        current?.enabled ??
                        false
                      ),

                    morningEnabled:
                      toBoolean(
                        current?.morningEnabled ??
                        false
                      ),

                    morningStart:
                      current?.morningStart ??
                      "",

                    morningEnd:
                      current?.morningEnd ??
                      "",

                    eveningEnabled:
                      toBoolean(
                        current?.eveningEnabled ??
                        false
                      ),

                    eveningStart:
                      current?.eveningStart ??
                      "",

                    eveningEnd:
                      current?.eveningEnd ??
                      "",

                  };

                }
              );

            }
          );


          console.log(
            "=============================================="
          );

          console.log(
            "FINAL SAVE RESULT"
          );

          console.log(
            "POST RESULTS:",
            postResults
          );

          console.log(
            "PUT RESULTS:",
            putResults
          );

          console.log(
            "=============================================="
          );


          alert(
            "Weekly schedule saved successfully."
          );

        }

        catch (error) {

          console.error(
            "=============================================="
          );

          console.error(
            "SAVE WEEKLY SCHEDULE ERROR:",
            error
          );

          console.error(
            "=============================================="
          );


          alert(
            error.message ||
            "Unable to save weekly schedule."
          );

        }

      };


    /* =====================================================
       EXPOSE SAVE FUNCTION TO PARENT
    ===================================================== */

    useImperativeHandle(
      ref,
      () => ({

        saveSchedule,

      }),
      [
        schedule,
      ]
    );


    /* =====================================================
       UPDATE TIME
    ===================================================== */

    const updateDay = (
      index,
      field,
      value
    ) => {

      setSchedule(
        (previous) =>
          previous.map(
            (item, i) => {

              if (
                i !== index
              ) {

                return item;

              }


              return {

                ...item,

                [field]:
                  value,

              };

            }
          )
      );

    };


    /* =====================================================
       DAY TOGGLE

       ON:
       Day       = ON
       Morning   = ON
       Evening   = ON

       OFF:
       Day       = OFF
       Morning   = OFF
       Evening   = OFF
    ===================================================== */

    const handleDayToggle = (
      index
    ) => {

      setSchedule(
        (previous) =>
          previous.map(
            (item, i) => {

              if (
                i !== index
              ) {

                return item;

              }


              const newEnabled =
                !toBoolean(
                  item.enabled
                );


              return {

                ...item,

                enabled:
                  newEnabled,

                morningEnabled:
                  newEnabled,

                eveningEnabled:
                  newEnabled,

              };

            }
          )
      );

    };


    /* =====================================================
       MORNING TOGGLE
    ===================================================== */

    const handleMorningToggle = (
      index
    ) => {

      setSchedule(
        (previous) =>
          previous.map(
            (item, i) => {

              if (
                i !== index
              ) {

                return item;

              }


              if (
                !toBoolean(
                  item.enabled
                )
              ) {

                return item;

              }


              return {

                ...item,

                morningEnabled:
                  !toBoolean(
                    item.morningEnabled
                  ),

              };

            }
          )
      );

    };


    /* =====================================================
       EVENING TOGGLE
    ===================================================== */

    const handleEveningToggle = (
      index
    ) => {

      setSchedule(
        (previous) =>
          previous.map(
            (item, i) => {

              if (
                i !== index
              ) {

                return item;

              }


              if (
                !toBoolean(
                  item.enabled
                )
              ) {

                return item;

              }


              return {

                ...item,

                eveningEnabled:
                  !toBoolean(
                    item.eveningEnabled
                  ),

              };

            }
          )
      );

    };


    /* =====================================================
       RETURN
    ===================================================== */

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


          <button
            type="button"
            className="appointment-save-btn"
            onClick={
              saveSchedule
            }
          >

            Save Schedule

          </button>

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

              {WEEKDAYS.map(
                (
                  weekday,
                  fallbackIndex
                ) => {


                  /* =========================================
                     FIND ACTUAL INDEX
                  ========================================= */

                  const actualIndex =
                    schedule?.findIndex(
                      (row) =>
                        String(
                          row.day
                        )
                          .trim()
                          .toLowerCase() ===
                        weekday.toLowerCase()
                    );


                  const rowIndex =
                    actualIndex >= 0
                      ? actualIndex
                      : fallbackIndex;


                  /* =========================================
                     FIND ROW
                  ========================================= */

                  const item =
                    schedule?.find(
                      (row) =>
                        String(
                          row.day
                        )
                          .trim()
                          .toLowerCase() ===
                        weekday.toLowerCase()
                    ) || {

                      id:
                        null,

                      day:
                        weekday,

                      dayOfWeek:
                        weekday,

                      enabled:
                        false,

                      morningEnabled:
                        false,

                      morningStart:
                        "",

                      morningEnd:
                        "",

                      eveningEnabled:
                        false,

                      eveningStart:
                        "",

                      eveningEnd:
                        "",

                    };


                  const isClosed =
                    !toBoolean(
                      item.enabled
                    );


                  return (

                    <tr
                      key={
                        weekday
                      }

                      className={
                        isClosed
                          ? "schedule-holiday-row"
                          : "schedule-working-row"
                      }
                    >


                      {/* ===================================
                          DAY
                      =================================== */}

                      <td>

                        <div className="weekly-day-wrapper">

                          <input
                            type="checkbox"

                            checked={
                              toBoolean(
                                item.enabled
                              )
                            }

                            onChange={() =>
                              handleDayToggle(
                                rowIndex
                              )
                            }

                          />


                          <div className="weekly-day-content">

                            <span>
                              {weekday}
                            </span>


                            {isClosed && (

                              <small>
                                Clinic Closed
                              </small>

                            )}

                          </div>

                        </div>

                      </td>


                      {/* ===================================
                          MORNING
                      =================================== */}

                      <td>

                        <div className="session-time-wrapper">

                          <label
                            className={`appointment-session-toggle ${
                              !toBoolean(
                                item.enabled
                              )
                                ? "session-toggle-disabled"
                                : ""
                            }`}
                          >

                            <input
                              type="checkbox"

                              checked={
                                toBoolean(
                                  item.morningEnabled
                                )
                              }

                              disabled={
                                !toBoolean(
                                  item.enabled
                                )
                              }

                              onChange={() =>
                                handleMorningToggle(
                                  rowIndex
                                )
                              }

                            />

                            <span />

                          </label>


                          <div className="time-field">

                            <input
                              type="time"

                              value={
                                item.morningStart ||
                                ""
                              }

                              disabled={
                                !toBoolean(
                                  item.enabled
                                ) ||
                                !toBoolean(
                                  item.morningEnabled
                                )
                              }

                              onChange={(e) =>
                                updateDay(
                                  rowIndex,
                                  "morningStart",
                                  e.target.value
                                )
                              }

                            />

                          </div>


                          <span className="time-separator">
                            -
                          </span>


                          <div className="time-field">

                            <input
                              type="time"

                              value={
                                item.morningEnd ||
                                ""
                              }

                              disabled={
                                !toBoolean(
                                  item.enabled
                                ) ||
                                !toBoolean(
                                  item.morningEnabled
                                )
                              }

                              onChange={(e) =>
                                updateDay(
                                  rowIndex,
                                  "morningEnd",
                                  e.target.value
                                )
                              }

                            />

                          </div>

                        </div>

                      </td>


                      {/* ===================================
                          EVENING
                      =================================== */}

                      <td>

                        <div className="session-time-wrapper">

                          <label
                            className={`appointment-session-toggle ${
                              !toBoolean(
                                item.enabled
                              )
                                ? "session-toggle-disabled"
                                : ""
                            }`}
                          >

                            <input
                              type="checkbox"

                              checked={
                                toBoolean(
                                  item.eveningEnabled
                                )
                              }

                              disabled={
                                !toBoolean(
                                  item.enabled
                                )
                              }

                              onChange={() =>
                                handleEveningToggle(
                                  rowIndex
                                )
                              }

                            />

                            <span />

                          </label>


                          <div className="time-field">

                            <input
                              type="time"

                              value={
                                item.eveningStart ||
                                ""
                              }

                              disabled={
                                !toBoolean(
                                  item.enabled
                                ) ||
                                !toBoolean(
                                  item.eveningEnabled
                                )
                              }

                              onChange={(e) =>
                                updateDay(
                                  rowIndex,
                                  "eveningStart",
                                  e.target.value
                                )
                              }

                            />

                          </div>


                          <span className="time-separator">
                            -
                          </span>


                          <div className="time-field">

                            <input
                              type="time"

                              value={
                                item.eveningEnd ||
                                ""
                              }

                              disabled={
                                !toBoolean(
                                  item.enabled
                                ) ||
                                !toBoolean(
                                  item.eveningEnabled
                                )
                              }

                              onChange={(e) =>
                                updateDay(
                                  rowIndex,
                                  "eveningEnd",
                                  e.target.value
                                )
                              }

                            />

                          </div>

                        </div>

                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            NOTE
        ================================================= */}

        <div className="weekly-schedule-note">

          <span>
            💡
          </span>

          Enable or disable the morning and evening
          sessions separately. Only enabled sessions
          will appear in the Preview Slots section.

        </div>

      </div>

    );

  }
);


WeeklySchedule.displayName =
  "WeeklySchedule";


export default WeeklySchedule;