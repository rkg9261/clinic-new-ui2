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

  const appointments = [
    {
      id: 1,
      time: "09:00 AM",
      shift: "Morning",
      name: "Rohit Sharma",
      age: 35,
      gender: "Male",
      whatsapp: "+91 98765 43210",
      status: "Completed"
    },
    {
      id: 2,
      time: "10:30 AM",
      shift: "Morning",
      name: "Pooja Singh",
      age: 28,
      gender: "Female",
      whatsapp: "+91 87654 32109",
      status: "Completed"
    },
    {
      id: 3,
      time: "12:00 PM",
      shift: "Morning",
      name: "Amit Kumar",
      age: 42,
      gender: "Male",
      whatsapp: "+91 76543 21098",
      status: "Pending"
    },
    {
      id: 4,
      time: "01:30 PM",
      shift: "Afternoon",
      name: "Simran Kaur",
      age: 26,
      gender: "Female",
      whatsapp: "+91 65432 10987",
      status: "Completed"
    },
    {
      id: 5,
      time: "03:00 PM",
      shift: "Evening",
      name: "Vivek Joshi",
      age: 48,
      gender: "Male",
      whatsapp: "+91 54321 09876",
      status: "Pending"
    },
    {
      id: 6,
      time: "04:30 PM",
      shift: "Evening",
      name: "Neha Gupta",
      age: 32,
      gender: "Female",
      whatsapp: "+91 43210 98765",
      status: "Completed"
    },
    {
      id: 7,
      time: "05:30 PM",
      shift: "Evening",
      name: "",
      age: "",
      gender: "",
      whatsapp: "",
      status: "Available"
    },
    {
      id: 8,
      time: "06:00 PM",
      shift: "Evening",
      name: "Ankit Rajput",
      age: 36,
      gender: "Male",
      whatsapp: "+91 21098 76543",
      status: "Missed"
    },
    {
      id: 9,
      time: "06:30 PM",
      shift: "Evening",
      name: "Priya Patel",
      age: 29,
      gender: "Female",
      whatsapp: "+91 21098 76543",
      status: "Completed"
    }
  ];

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
  // FILTER APPOINTMENTS
  // --------------------------------------------------

  const filteredAppointments = useMemo(() => {

    return appointments.filter((item) => {

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
        item.status === statusFilter;

      return (
        matchSearch &&
        matchShift &&
        matchStatus
      );
    });

  }, [
    search,
    shift,
    statusFilter
  ]);

  // --------------------------------------------------
  // COUNTS
  // --------------------------------------------------

  const completedCount =
    appointments.filter(
      x => x.status === "Completed"
    ).length;

  const pendingCount =
    appointments.filter(
      x => x.status === "Pending"
    ).length;

  const missedCount =
    appointments.filter(
      x => x.status === "Missed"
    ).length;

  const availableSlot =
    appointments.find(
      x => x.status === "Available"
    );

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

    if (status === "Completed") {

      return (
        <span className="an-status an-status-completed">
          <FaCheckCircle />
          Completed
        </span>
      );
    }

    if (status === "Pending") {

      return (
        <span className="an-status an-status-pending">
          <FaClock />
          Pending
        </span>
      );
    }

    if (status === "Missed") {

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
                        ${
                          !item.currentMonth
                            ? "an-other-month"
                            : ""
                        }
                        ${
                          selected
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
                              {appointment.time}
                            </strong>

                            <small>
                              {appointment.shift}
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

                              {appointment.whatsapp}

                            </div>

                          )}

                        </td>


                        {/* STATUS */}

                        <td>

                          <StatusBadge
                            status={
                              appointment.status
                            }
                          />

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