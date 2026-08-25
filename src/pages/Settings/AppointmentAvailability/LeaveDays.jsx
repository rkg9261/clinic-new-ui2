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

  /* STATE  */
    


  const [leaveData, setLeaveData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showAllLeaves, setShowAllLeaves] = useState(false);


  /* GET AUTH TOKEN */
    
 

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


  /*   FORMAT DATE*/
  
  

  const formatDate = (date) => {

    if (!date) {
      return "";
    }

    return String(date).split("T")[0];

  };


  /*  GET APPOINTMENT LEAVES */
   
     
  
 

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


      /* GET API */
         
      

      const response =
        await fetch(
          API.APPOINTMENT_LEAVES,
          {

            method: "GET",

            headers: {

              "Accept":
                "application/json",

              "Authorization":
                `Bearer ${token}`,

            },

          }
        );


      /*  READ RESPONSE */
        
      

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


      /*  RESPONSE LOG */
        
      

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


      /* API ERROR */
         
      

      if (!response.ok) {

        console.error(
          "GET APPOINTMENT LEAVES ERROR:",
          responseData
        );

        return;

      }


      /* GET ARRAY*/
         
       

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


      /*   FORMAT API DATA*/
       
       

      const formattedLeaves =
        apiLeaves.map(
          (leave, index) => {

            return {

              ...leave,

              id:
                leave.id ||
                leave.leave_id ||
                leave.leaveId ||
                index + 1,

              fromDate:
                formatDate(
                  leave.from_date ||
                  leave.fromDate ||
                  ""
                ),

              toDate:
                formatDate(
                  leave.to_date ||
                  leave.toDate ||
                  ""
                ),

              reason:
                leave.reason ||
                "",

              repeatType:
                leave.repeat_type ||
                leave.repeatType ||
                "NONE",

            };

          }
        );


      console.log(
        "FORMATTED LEAVES:",
        formattedLeaves
      );


      /*   SAVE API DATA */
       
      

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


  /*  LOAD LEAVES */
   
 

  useEffect(() => {

    getLeaves();

  }, []);


  /*  DISPLAY DATA*/
   
  

  const displayLeaves =
    leaveData.length > 0
      ? leaveData
      : leaves;


  /*  SHOW FIRST 3 OR ALL  */
   


  const visibleLeaves =
    showAllLeaves
      ? displayLeaves
      : displayLeaves.slice(0, 3);


  /*VIEW ALL CLICK  */
     


  const handleViewAllLeaves = () => {

    setShowAllLeaves(
      (previous) => !previous
    );

  };


  return (
    <section className="leave-days-card">


      {/* 
          HEADER
       */}

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


      {/* 
          TABLE
       */}

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
                (leave, index) => (

                  <tr
                    key={
                      leave.id ||
                      index
                    }
                  >


                    {/* =====================================
                        DATE RANGE
                    ===================================== */}

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


                    {/* =====================================
                        REASON
                    ===================================== */}

                    <td>

                      <div className="leave-reason-text">

                        {
                          leave.reason ||
                          ""
                        }

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
                            onEditLeave &&
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


      {/* 
          VIEW ALL
       */}

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