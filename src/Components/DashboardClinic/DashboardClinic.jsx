import React, { useState, useEffect} from "react";
import "./DashboardClinic.css";
import { useNavigate } from "react-router-dom";

import {
  FaRupeeSign,
  FaUsers,
  FaUserMd,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaShieldAlt,
  FaUserFriends,
  FaEllipsisV,
  FaArrowUp,
  FaArrowDown,
  FaRegCalendarAlt,
} from "react-icons/fa";

export default function DashboardClinic() {
  const navigate = useNavigate();

const [openMenu, setOpenMenu] = useState(null);
useEffect(() => {
  const closeMenu = () => setOpenMenu(null);

  window.addEventListener("click", closeMenu);

  return () => {
    window.removeEventListener("click", closeMenu);
  };
}, []);

 const summaryCards = [
  {
    id: 1,
    title: "Today Revenue",
    value: "₹54,320",
    icon: <FaRupeeSign />,
    iconClass: "dc-card-icon revenue",
    change: "+18.6%",
    changeType: "up",
    subtitle: "from yesterday",
    extra1: "Cash: ₹32000",
    extra2: "Online: ₹22320",
    graph: "green",
    menu: [
      {
        label: "Recharge History",
        path: "/recharge-history",
      },
     
    ],
  },
  {
    id: 2,
    title: "Today Attendance",
    value: "48 / 62",
    icon: <FaUsers />,
    iconClass: "dc-card-icon attendance",
    change: "+12.5%",
    changeType: "up",
    subtitle: "from yesterday",
    graph: "blue",
       menu: [
      {
        label: "Attendance List",
        path: "/attendance-list",
      },  
    ],
  },
  {
    id: 3,
    title: "Today Consulted",
    value: "25",
    icon: <FaUserMd />,
    iconClass: "dc-card-icon consulted",
    change: "+8.2%",
    changeType: "up",
    subtitle: "from yesterday",
    graph: "purple",
    //    menu: [
    //   {
    //     label: "Recharge History",
    //     path: "/recharge-history",
    //   },
     
    // ],
  },
  {
    id: 4,
    title: "Pending Appointments",
    value: "4",
    icon: <FaCalendarAlt />,
    iconClass: "dc-card-icon pending",
    change: "-7.1%",
    changeType: "down",
    subtitle: "from yesterday",
    graph: "orange",
    menu: [
      {
        label: "Patient List",
        path: "/homepage",
      },
    ],
  },
];
  return (
    <div className="dashboard-clinic">

      {/* Header */}

      <div className="dc-header">
        <div>
          <h1> Welcome Back 👋</h1>
          <p>
            Have a great day! Here's today's clinic overview.
          </p>
        </div>

        <div className="dc-date-box">
          <FaRegCalendarAlt />
          <span>11 July 2026</span>
        </div>
      </div>

      {/* Summary Cards */}

      <div className="dc-summary-grid">

        {summaryCards.map((card) => (
          <div className="dc-summary-card" key={card.id}>

      <div className="dc-card-top">

  <div className={card.iconClass}>
    {card.icon}
  </div>

  <div className="dc-card-heading">
    <h4>{card.title}</h4>
  </div>

  <div
  className="dc-more-wrapper"
  onClick={(e) => e.stopPropagation()}
>
  <FaEllipsisV
    className="dc-more"
    onClick={(e) => {
      e.stopPropagation();
      setOpenMenu(openMenu === card.id ? null : card.id);
    }}
  />

  {openMenu === card.id && card.menu && (
    <div className="dc-dropdown">

      {card.menu.map((item, index) => (

        <div
          key={index}
          className="dc-dropdown-item"
          onClick={() => {
            setOpenMenu(null);
            navigate(item.path);
          }}
        >
          {item.label}
        </div>

      ))}

    </div>
  )}
</div>

            </div>

            <div className="dc-card-body">

              <h2>{card.value}</h2>

              <div className="dc-change">

                {card.changeType === "up" ? (
                  <FaArrowUp className="up" />
                ) : (
                  <FaArrowDown className="down" />
                )}

                <span
                  className={
                    card.changeType === "up"
                      ? "change-up"
                      : "change-down"
                  }
                >
                  {card.change}
                </span>

                <small>{card.subtitle}</small>

              </div>

              {card.extra1 && (
                <div className="dc-extra-text">
                  {card.extra1}
                </div>
              )}

              {card.extra2 && (
                <div className="dc-extra-text">
                  {card.extra2}
                </div>
              )}

            </div>

            <div
              className={`dc-mini-graph ${card.graph}`}
            >
              <svg
                viewBox="0 0 260 60"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 45
                     C20 15 35 55 55 35
                     S95 10 120 30
                     S170 55 190 25
                     S225 20 260 10"
                />
              </svg>
            </div>

          </div>
        ))}

      </div>

      {/* Remaining Dashboard starts in Part 2 */}

      <div className="dc-dashboard-body">

        {/* Left Side */}

        <div className="dc-left-section">

          {/* Monthly Revenue */}

          <div className="dc-panel dc-revenue-panel">

            <div className="dc-panel-header">
              <div>
                <h3>Monthly Revenue</h3>

                <div className="dc-big-price">
                  ₹2,45,780
                  <span className="dc-growth">
                    <FaArrowUp /> 22.4% vs july 2026
                  </span>
                </div>
              </div>

              <select className="dc-select">
                <option>June 2026</option>
                <option>May 2026</option>
                <option>April 2026</option>
                <option>March 2026</option>
              </select>
            </div>

            <div className="dc-chart">

              <div className="dc-chart-y">
                <span>₹15L</span>
                <span>₹12L</span>
                <span>₹9L</span>
                <span>₹6L</span>
                <span>₹3L</span>
                <span>₹0</span>
              </div>

              <div className="dc-chart-area">

                <svg
                  viewBox="0 0 600 260"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="graphFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#4fd1c5"
                        stopOpacity="0.45"
                      />
                      <stop
                        offset="100%"
                        stopColor="#4fd1c5"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="
                    M0 220
                    C40 170 60 180 90 150
                    S140 130 170 145
                    S210 90 240 95
                    S280 70 320 85
                    S360 40 400 50
                    S450 30 490 25
                    S540 5 580 0"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="5"
                  />

                  <path
                    d="
                    M0 220
                    C40 170 60 180 90 150
                    S140 130 170 145
                    S210 90 240 95
                    S280 70 320 85
                    S360 40 400 50
                    S450 30 490 25
                    S540 5 580 0
                    L580 260
                    L0 260 Z"
                    fill="url(#graphFill)"
                  />
                </svg>

                <div className="dc-chart-labels">
                  <span>1 May</span>
                  <span>6 May</span>
                  <span>11 May</span>
                  <span>16 May</span>
                  <span>21 May</span>
                  <span>26 May</span>
                  <span>31 May</span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Center Section */}

        <div className="dc-center-section">

          <div className="dc-panel">

            <div className="dc-panel-header">
              <h3>
                <FaExclamationTriangle />
                Low Session Alerts
              </h3>
            </div>

            <div className="dc-alert-list">

              <div className="dc-alert-item">
                <span>Ramesh Sharma</span>
                <small>2 sessions left</small>
              </div>

              <div className="dc-alert-item">
                <span>Anita Patel</span>
                <small>3 sessions left</small>
              </div>

              <div className="dc-alert-item">
                <span>Vikram Singh</span>
                <small>1 session left</small>
              </div>

              <div className="dc-alert-item">
                <span>Meena Joshi</span>
                <small>2 sessions left</small>
              </div>

            </div>

            <button className="dc-btn">
              View All Alerts
            </button>

          </div>

        </div>

        {/* Right Section */}

        <div className="dc-right-section">

          <div className="dc-panel">

            <div className="dc-panel-header">
              <h3>Package Recharge Summary</h3>
            </div>

            <div className="dc-donut-wrap">

              <div className="dc-donut">
                <div className="dc-donut-center">
                  <h2>₹3,25,000</h2>
                  <p>Total</p>
                </div>
              </div>

            </div>

            <div className="dc-summary-list">

              <div className="row">
                <div>
                  <span className="green-dot"></span>
                  Recharged
                </div>

                <strong>62%</strong>
              </div>

              <div className="row">
                <div>
                  <span className="orange-dot"></span>
                  Expiring Soon
                </div>

                <strong>25%</strong>
              </div>

              <div className="row">
                <div>
                  <span className="red-dot"></span>
                  Expired
                </div>

                <strong>13%</strong>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Bottom Cards ================= */}

      <div className="dc-bottom-grid">

        {/* Update Treatment Protocol */}

        <div className="dc-panel">

          <div className="dc-panel-header">
            <h3>
              <FaShieldAlt />
              Update Treatment Protocol
            </h3>
          </div>

          <div className="dc-followup-list">

            <div className="dc-follow-item">
              <div className="dc-avatar">PS</div>

              <div className="dc-follow-info">
                <h4>Pooja Sharma</h4>
                <p>Knee Pain</p>
              </div>

              <span className="dc-overdue">
                3 days overdue
              </span>
            </div>

            <div className="dc-follow-item">
              <div className="dc-avatar">AM</div>

              <div className="dc-follow-info">
                <h4>Arjun Mehta</h4>
                <p>Back Pain</p>
              </div>

              <span className="dc-overdue">
                2 days overdue
              </span>
            </div>

            <div className="dc-follow-item">
              <div className="dc-avatar">RK</div>

              <div className="dc-follow-info">
                <h4>Rahul Kapoor</h4>
                <p>Shoulder Pain</p>
              </div>

              <span className="dc-overdue">
                1 day overdue
              </span>
            </div>

            <div className="dc-follow-item">
              <div className="dc-avatar">NK</div>

              <div className="dc-follow-info">
                <h4>Neha Kapoor</h4>
                <p>Post Surgery</p>
              </div>

              <span className="dc-overdue">
                2 days overdue
              </span>
            </div>

          </div>

          <button className="dc-btn">
            View All Follow-Ups
          </button>

        </div>

        {/* Inactive Patients */}

        <div className="dc-panel">

          <div className="dc-panel-header">

            <h3>Inactive Patients</h3>

            <select className="dc-select">
              <option>July 2026</option>
            </select>

          </div>

          <div className="dc-inactive-list">

            <div className="dc-inactive-item">
              <h4>Suresh Yadav</h4>
              <p>Last Visit : 45 days ago</p>
            </div>

            <div className="dc-inactive-item">
              <h4>Vikram Patel</h4>
              <p>Last Visit : 38 days ago</p>
            </div>

            <div className="dc-inactive-item">
              <h4>Anjali Desai</h4>
              <p>Last Visit : 32 days ago</p>
            </div>

            <div className="dc-inactive-item">
              <h4>Rohit Verma</h4>
              <p>Last Visit : 30 days ago</p>
            </div>

          </div>

          <button className="dc-btn">
            View All Inactive Patients
          </button>

        </div>

        {/* Referral Summary */}

        <div className="dc-panel">

          <div className="dc-panel-header">

            <h3>
              <FaUserFriends />
              Referral Summary
            </h3>

            <select className="dc-select">
              <option>July 2026</option>
            </select>

          </div>

          <div className="dc-referral-table">

            <div className="dc-row">
              <span>Total Referrals</span>
              <strong>128</strong>
            </div>

            <div className="dc-row">
              <span>Converted Referrals</span>
              <strong>62</strong>
            </div>

            <div className="dc-row">
              <span>Conversion Rate</span>
              <strong className="green-text">
                48.4%
              </strong>
            </div>

          </div>

          <button className="dc-btn">
            View Referral Report
          </button>
           
        </div>

      </div>

    </div>
  );
}







     