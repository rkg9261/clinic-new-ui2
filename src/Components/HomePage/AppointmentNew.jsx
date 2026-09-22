import React, {
  useEffect,
  useMemo,
  useState
} from "react";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
  FaEllipsisV,
  FaWhatsapp,
  FaPlus,
  FaSyncAlt,
  FaCalendarCheck
} from "react-icons/fa";

import "./AppointmentNew.css";
import {
  BASE_URL,
  API
} from "../../config/api";

const AppointmentNew = () => {

  // --------------------------------------------------
  // DATE
  // --------------------------------------------------

  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );

  const [currentMonth, setCurrentMonth] = useState(
    new Date()
  );

  // --------------------------------------------------
  // FILTERS
  // --------------------------------------------------

  const [shift, setShift] = useState("All Shifts");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [search, setSearch] = useState("");

  // --------------------------------------------------
  // SAMPLE APPOINTMENTS
  // Replace this with your API data
  // --------------------------------------------------

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState("");

  const [availableSlots, setAvailableSlots] = useState([]);


  // --------------------------------------------------
  // Fetch appointments when selectedDate changes
  // --------------------------------------------------
  useEffect(() => {

    fetchAppointmentsByDate(
        selectedDate
    );

  }, [selectedDate]);

  // --------------------------------------------------
  // Date formatting for API
  // --------------------------------------------------
  const formatDateForAPI = (date) => {

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // --------------------------------------------------
  // CALENDAR
  // --------------------------------------------------

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const weekDays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ];

  const getCalendarDays = () => {

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    let startDay = firstDay.getDay();

    // Convert Sunday=0 format to Monday=0
    startDay = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const previousMonthDays = new Date(
      year,
      month,
      0
    ).getDate();

    const days = [];

    // Previous month
    for (let i = startDay - 1; i >= 0; i--) {

      days.push({
        date: new Date(
          year,
          month - 1,
          previousMonthDays - i
        ),
        currentMonth: false
      });

    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {

      days.push({
        date: new Date(
          year,
          month,
          i
        ),
        currentMonth: true
      });

    }

    // Next month
    while (days.length < 42) {

      const nextDay =
        days.length -
        (startDay + daysInMonth) +
        1;

      days.push({
        date: new Date(
          year,
          month + 1,
          nextDay
        ),
        currentMonth: false
      });
    }

    return days;
  };

  const isSameDate = (date1, date2) => {

    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const changeMonth = (amount) => {

    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + amount,
        1
      )
    );
  };

  const goToday = () => {

    const now = new Date();

    setSelectedDate(now);

    setCurrentMonth(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    );
  };

  // --------------------------------------------------
  // Clean Name Function
  // --------------------------------------------------
  const cleanName = (name) => {

    if (!name) {
        return "";
    }

    return String(name)
        .replace(/;+$/g, "")
        .trim();
  };

  //format time to 12 hour format
  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  // --------------------------------------------------
  // Get Shift Function
  // --------------------------------------------------
  const getShift = (time) => {

    if (!time) {
        return "";
    }

    const value = String(time).toUpperCase();
    console.log("TIME VALUE:", value);
    let hour = parseInt(value.replace(/[^0-9]/g, ""), 10);
    hour = parseInt(value.split(":")[0], 10);
    console.log("HOUR:", hour);
    if (
        value.includes("PM") &&
        hour !== 12
    ) {
        hour += 12;
    }

    if (
        value.includes("AM") &&
        hour === 12
    ) {
        hour = 0;
    }


    if (hour < 12) {
        return "Morning";
    }

    if (hour < 17) {
        return "Afternoon";
    }

    return "Evening";
  };
  // --------------------------------------------------
  // FETCH APPOINTMENTS BY DATE
  // --------------------------------------------------
  const fetchAppointmentsByDate = async (selectedDate) => {

    try {

      setLoading(true);

      setApiError("");

      const token = localStorage.getItem("token");

      if (!token) {

        setApiError(
          "Login session expired. Please login again."
        );

        return;
      }


      const date = formatDateForAPI(selectedDate);


      const appointmentListUrl =
        API.APPOINTMENT_LIST_BY_DATE ||
        `${BASE_URL}/api/appointment/listbydate`;


      const url = `${appointmentListUrl}/${encodeURIComponent(date)}`;


      console.log("================================");

      console.log("GET APPOINTMENTS BY DATE");

      console.log("DATE:", date);

      console.log("URL:", url);

      console.log("================================");


      const response = await fetch(
          url,
          {
            method: "GET",

            headers: {

              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json"

            }
          }
        );


      const responseText =
        await response.text();


      let data = {};

      try {

        data =
          responseText
            ? JSON.parse(
              responseText
            )
            : {};

      }
      catch (error) {

        console.error(
          "JSON PARSE ERROR:",
          error
        );

        console.error(
          "RAW RESPONSE:",
          responseText
        );

        throw new Error(
          "API returned invalid JSON."
        );
      }


      console.log(
        "APPOINTMENT API STATUS:",
        response.status
      );

      console.log(
        "APPOINTMENT API RESPONSE:",
        data
      );


      if (
        response.status === 401
      ) {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        setApiError(
          "Session expired. Please login again."
        );

        return;
      }


      if (
        response.status === 403
      ) {

        setApiError(
          data?.message ||
          "You do not have permission to view appointments."
        );

        return;
      }


      if (!response.ok) {

        throw new Error(
          data?.message ||
          data?.error ||
          "Failed to load appointments."
        );
      }


      // ------------------------------------
      // FIND ARRAY IN API RESPONSE
      // ------------------------------------

      let appointmentArray = [];


      if (
        Array.isArray(data)
      ) {

        appointmentArray =
          data;

      }
      else if (
        Array.isArray(data.data)
      ) {

        appointmentArray =
          data.data;

      }
      else if (
        Array.isArray(
          data.appointments
        )
      ) {

        appointmentArray =
          data.appointments;

      }
      else if (
        Array.isArray(
          data.data?.appointments
        )
      ) {

        appointmentArray =
          data.data.appointments;

      }
      else if (
        Array.isArray(
          data.result
        )
      ) {

        appointmentArray =
          data.result;

      }
      else if (
        Array.isArray(
          data.result?.data
        )
      ) {

        appointmentArray =
          data.result.data;
      }


      console.log(
        "APPOINTMENT ARRAY:",
        appointmentArray
      );



      // ------------------------------------
      // FORMAT API DATA FOR UI
      // ------------------------------------

      const formatted =
        appointmentArray.map(
          (item) => {

            return {

              ...item,
              
              // ID

              id:
                item.id ||
                item._id ||
                "",


              _id:
                item.id ||
                item._id ||
                "",



              //  API FIELDS


              name:
                item.name ||
                "",


              age:
                item.age ??
                "",


              gender:
                item.gender ||
                "",


              whatsapp_number:
                item.whatsapp_number ||
                "",


              appointment_date:
                item.appointment_date ||
                "",


              appointment_time:
                item.appointment_time ||
                "",


              appointment_time_to:
                item.appointment_time_to ||
                "",



              // FRONTEND DISPLAY ALIASES


              mobileNumber:
                item.whatsapp_number ||
                "",


              appointmentDate:
                item.appointment_date ||
                "",


              appointmentTime:
                item.appointment_time ||
                "",


              appointmentTimeTo:
                item.appointment_time_to ||
                "",

              paymentStatus:
                item.payment_status ||
                "",

              //  PATIENT FIELDS


              patientCode:
                item.patient_code ||
                item.patientCode ||
                "",


              address:
                item.address ||
                "",


              problem:
                item.problem ||
                item.disease_problem ||
                "",


              appointmentType:
                item.appointment_type ||
                item.appointmentType ||
                "",


              fileNo:
                item.file_number ||
                item.fileNo ||
                "",


              lastAttendanceDate:
                item.last_attendance_date ||
                item.lastAttendanceDate ||
                "",

            };

          }
        );


      setAppointments(formatted);

      
      console.log(
        "Filtered APPOINTMENT ARRAY:",
        filteredAppointments
      );

      }
      
    catch (error) {

      console.error(
        "FETCH APPOINTMENTS ERROR:",
        error
      );

      setApiError(
        error.message ||
        "Unable to load appointments."
      );

      setAppointments([]);

    }
    finally {

      setLoading(false);

    }

  };


  // --------------------------------------------------
  // FILTER APPOINTMENTS
  // --------------------------------------------------

  const filteredAppointments = useMemo(() => {
    console.log(
            "FILTER RUNNING"
        );


    console.log(
        "appointments:",
        appointments
    );

    console.log(
        "search:",
        search
    );

    console.log(
        "shift:",
        shift
    );

    console.log(
        "status:",
        statusFilter
    );

    const result = appointments.filter((item) => {

      const searchText =
        search.toLowerCase().trim();

      const matchSearch =
        !searchText ||
        item.name.toLowerCase().includes(searchText) ||
        item.whatsapp.toLowerCase().includes(searchText);

      const matchShift =
        shift === "All Shifts" ||
        item.shift === shift;

      const matchStatus =
        statusFilter === "All Status" ||
        String(item.status).toLowerCase() === String(statusFilter).toLowerCase();

      return (
        matchSearch &&
        matchShift &&
        matchStatus
      );
    });

    console.log(
        "FILTERED APPOINTMENT ARRAY:",
        result
    );

    return result;
  }, [
    appointments,
    search,
    shift,
    statusFilter
  ]);

  // --------------------------------------------------
  // COUNTS
  // --------------------------------------------------

  const completedCount =
    appointments.filter(
      x => String(x.status).toLowerCase() === "completed"
    ).length;
  

  const pendingCount =
    appointments.filter(
      x => String(x.status).toLowerCase() === "pending"
    ).length;

  const missedCount =
    appointments.filter(
      x => String(x.status).toLowerCase() === "missed"
    ).length;

  // const availableSlot =
  //   appointments.find(
  //     x => String(x.status).toLowerCase() === "available"
  //   );

    const availableSlot =
    availableSlots.length > 0
        ? availableSlots[0]
        : null;

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  const formatDate = (date) => {

    return date.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );
  };

  // --------------------------------------------------
  // STATUS COMPONENT
  // --------------------------------------------------

  const StatusBadge = ({ status }) => {

    if (String(status).toLowerCase() === "completed") {
      return (
        <span className="an-status an-status-completed">
          <FaCheckCircle />
          Completed
        </span>
      );
    }

    if (String(status).toLowerCase() === "pending") {
      return (
        <span className="an-status an-status-pending">
          <FaClock />
          Pending
        </span>
      );
    }

    if (String(status).toLowerCase() === "missed") {
      return (
        <span className="an-status an-status-missed">
          <FaTimesCircle />
          Missed
        </span>
      );
    }

    return (
      <span className="an-status an-status-available">
        <FaCalendarCheck />
        Available
      </span>
    );
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (

    <div className="appointment-new-page">

      {/* ==========================================
          MAIN LAYOUT
      ========================================== */}

      <div className="an-layout">


        {/* ======================================
            LEFT SIDEBAR
        ====================================== */}

        <aside className="an-sidebar">


          {/* CALENDAR */}

          <div className="an-card an-calendar-card">

            <div className="an-section-title">

              <FaCalendarAlt />

              <span>
                Select Date
              </span>

            </div>


            <div className="an-calendar-header">

              <button
                onClick={() =>
                  changeMonth(-1)
                }
              >
                <FaChevronLeft />
              </button>

              <strong>
                {monthNames[
                  currentMonth.getMonth()
                ]}{" "}
                {currentMonth.getFullYear()}
              </strong>

              <button
                onClick={() =>
                  changeMonth(1)
                }
              >
                <FaChevronRight />
              </button>

            </div>


            <div className="an-weekdays">

              {weekDays.map(day => (

                <div
                  key={day}
                >
                  {day}
                </div>

              ))}

            </div>


            <div className="an-calendar-grid">

              {getCalendarDays().map(
                (item, index) => {

                  const selected =
                    isSameDate(
                      item.date,
                      selectedDate
                    );

                  return (

                    <button
                      key={index}
                      className={`
                        an-calendar-day
                        ${!item.currentMonth
                          ? "an-other-month"
                          : ""
                        }
                        ${selected
                          ? "an-selected-day"
                          : ""
                        }
                      `}
                      onClick={() => {

                        setSelectedDate(
                          item.date
                        );

                        if (
                          !item.currentMonth
                        ) {

                          setCurrentMonth(
                            new Date(
                              item.date.getFullYear(),
                              item.date.getMonth(),
                              1
                            )
                          );
                        }

                      }}
                    >

                      <span>
                        {item.date.getDate()}
                      </span>

                      {selected && (
                        <small></small>
                      )}

                    </button>

                  );

                }
              )}

            </div>


            {/* LEGEND */}

            <div className="an-calendar-legend">

              <div>
                <span className="legend-dot completed"></span>
                Completed
              </div>

              <div>
                <span className="legend-dot pending"></span>
                Pending
              </div>

              <div>
                <span className="legend-dot missed"></span>
                Missed
              </div>

              <div>
                <span className="legend-ring"></span>
                Available Slot
              </div>

            </div>

          </div>


          {/* QUICK FILTER */}
          {/*
          <div className="an-card an-filter-card">

            <div className="an-section-title">

              <FaFilter />

              <span>
                Quick Filters
              </span>

            </div>


            <label>
              Shift
            </label>

            <select
              value={shift}
              onChange={(e) =>
                setShift(e.target.value)
              }
            >

              <option>
                All Shifts
              </option>

              <option>
                Morning
              </option>

              <option>
                Afternoon
              </option>

              <option>
                Evening
              </option>

            </select>


            <label>
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >

              <option>
                All Status
              </option>

              <option>
                Completed
              </option>

              <option>
                Pending
              </option>

              <option>
                Missed
              </option>

              <option>
                Available
              </option>

            </select>


            <label>
              Patient Name / Phone
            </label>

            <div className="an-filter-search">

              <FaSearch />

              <input
                type="text"
                placeholder="Search by name or phone..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <button
              className="an-reset-btn"
              onClick={() => {

                setShift("All Shifts");
                setStatusFilter("All Status");
                setSearch("");

              }}
            >

              <FaSyncAlt />

              Reset Filters

            </button>

          </div>
          */}
        </aside>


        {/* ======================================
            RIGHT CONTENT
        ====================================== */}

        <main className="an-content">


          {/* STATISTICS */}

          <div className="an-stat-row">


            {/* COMPLETED */}

            <div className="an-stat-card completed">

              <div className="an-stat-icon">
                <FaCheckCircle />
              </div>

              <div className="an-stat-title">
                Completed
              </div>

              <strong>
                {completedCount}
              </strong>

            </div>


            {/* PENDING */}

            <div className="an-stat-card pending">

              <div className="an-stat-icon">
                <FaClock />
              </div>

              <div className="an-stat-title">
                Pending
              </div>

              <strong>
                {pendingCount}
              </strong>

            </div>


            {/* MISSED */}

            <div className="an-stat-card missed">

              <div className="an-stat-icon">
                <FaTimesCircle />
              </div>

              <div className="an-stat-title">
                Missed
              </div>

              <strong>
                {missedCount}
              </strong>

            </div>


            {/* AVAILABLE */}

            <div className="an-stat-card available">

              <div className="an-stat-icon">
                <FaCalendarAlt />
              </div>

              <div>

                <div className="an-stat-title">
                  Available Slot
                </div>

                <strong>
                  {availableSlot?.time || "-"}
                </strong>

              </div>

              <span className="an-available-count">
                1
              </span>

            </div>

          </div>


          {/* APPOINTMENT TABLE CARD */}

          <div className="an-table-card">


            {/* TABLE HEADER */}

            <div className="an-table-header">

              <div>

                <FaCalendarAlt />

                <h2>
                  {formatDate(selectedDate)}
                </h2>

              </div>

                  {/* showing loading... in center */}
                  {loading && (
                    <div className="an-loading">
                      Loading...
                    </div>
                  )}
              <div>

                <button
                  className="an-prev-day"
                  onClick={() => {

                    const date =
                      new Date(
                        selectedDate
                      );

                    date.setDate(
                      date.getDate() - 1
                    );

                    setSelectedDate(date);

                    setCurrentMonth(
                      new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        1
                      )
                    );

                  }}
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="an-today-btn"
                  onClick={goToday}
                >
                  Today
                </button>

              </div>

            </div>


            {/* TABLE */}

            <div className="an-table-wrapper">

              <table className="an-appointment-table">

                <thead>

                  <tr>

                    <th>
                      Time
                    </th>

                    <th>
                      Patient Name
                      <span>
                        (Age / Gender)
                      </span>
                    </th>

                    <th>
                      WhatsApp Number
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredAppointments.map(
                    appointment => (

                      <tr
                        key={
                          appointment.id
                        }
                        className={
                          appointment.status ===
                            "Available"
                            ? "an-available-row"
                            : ""
                        }
                      >


                        {/* TIME */}

                        <td>

                          <div className="an-time">

                            <strong>
                              {formatTime(appointment.appointmentTime)}
                            </strong>

                            <small>
                              {getShift(appointment.appointmentTime)}
                            </small>

                          </div>

                        </td>


                        {/* PATIENT */}

                        <td>

                          {appointment.status ===
                            "Available" ? (

                            <div className="an-available-patient">

                              <div className="an-plus-icon">
                                <FaPlus />
                              </div>

                              <div>

                                <strong>
                                  Available Slot
                                </strong>

                                <small>
                                  Book Now
                                </small>

                              </div>

                            </div>

                          ) : (

                            <div className="an-patient">

                              <div className="an-patient-avatar">

                                {appointment.name
                                  .split(" ")
                                  .map(
                                    word =>
                                      word[0]
                                  )
                                  .join("")
                                  .substring(
                                    0,
                                    2
                                  )}

                              </div>

                              <div>

                                <strong>
                                  {appointment.name}
                                </strong>

                                <small>
                                  {appointment.age}{" "}
                                  /{" "}
                                  {appointment.gender}
                                </small>

                              </div>

                            </div>

                          )}

                        </td>


                        {/* WHATSAPP */}

                        <td>

                          {appointment.status ===
                            "Available" ? (

                            <span className="an-dash">
                              —
                            </span>

                          ) : (

                            <div className="an-whatsapp">

                              <FaWhatsapp />
                              <a href={`https://wa.me/${appointment.whatsapp_number}`}
                                 target="_blank"
                                 rel="noopener noreferrer">
                                {appointment.whatsapp_number}
                              </a>  

                            </div>

                          )}

                        </td>


                        {/* STATUS */}

                        <td>
                          
                          {appointment.paymentStatus === "CAPTURED" ? (
                            <span className="an-status an-status-captured">
                              <span style={{ color: 'green', fontWeight: 'bold', fontSize: '12px' }}><FaCheckCircle /> Paid</span>
                            </span>
                          ) : (
                            <span className="an-status an-status-not-captured">                              
                              <span style={{ color: 'red', fontWeight: 'bold', fontSize: '12px' }}><FaTimesCircle /> Not Paid</span>
                            </span>
                          )}
                          {/* <StatusBadge
                            status={
                              appointment.status
                            }
                          /> */}

                        </td>


                        {/* ACTION */}

                        <td>

                          {appointment.status ===
                            "Available" ? (

                            <button
                              className="an-book-btn"
                              onClick={() =>
                                alert(
                                  "Open new appointment form"
                                )
                              }
                            >

                              <FaCalendarCheck />

                              Book Now

                            </button>

                          ) : (

                            <div className="an-actions">

                              <button
                                title="View Appointment"
                                onClick={() =>
                                  alert(
                                    `View ${appointment.name}`
                                  )
                                }
                              >
                                <FaEye />
                              </button>

                              <button
                                title="More"
                              >
                                <FaEllipsisV />
                              </button>

                            </div>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>


            {/* FOOTER */}

            <div className="an-table-footer">

              Showing{" "}
              <strong>
                {filteredAppointments.length}
              </strong>{" "}
              of{" "}
              <strong>
                {appointments.length}
              </strong>{" "}
              appointments

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default AppointmentNew;