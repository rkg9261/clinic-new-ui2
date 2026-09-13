import React, { useState } from "react";
import {
  FaPlus,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

import "./PatientTreatmentProtocol.css";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function PatientTreatmentProtocol() {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================
  // PATIENT DATA
  // ==========================

  const patient =
    location.state?.patient || null;

  const patientName =
    patient?.name ||
    patient?.full_name ||
    "Unknown Patient";

  const patientCode =
    patient?.patientCode ||
    patient?.patient_code ||
    "-";

  const fileNo =
    patient?.fileNo ||
    patient?.file_number ||
    "-";

  // ==========================
  // TREATMENT MENUS
  // ==========================

  const treatmentMenus = [
    {
      id: 1,
      title: "Assessment",
      subMenus: [
        "Pain Assessment",
        "Posture Assessment",
        "ROM Assessment",
        "Muscle Strength",
      ],
    },
    {
      id: 2,
      title: "Electro Therapy",
      subMenus: [
        "IFT",
        "Ultrasound",
        "Laser",
        "TENS",
      ],
    },
    {
      id: 3,
      title: "Exercise",
      subMenus: [
        "Stretching",
        "Strengthening",
        "Balance Training",
        "Gait Training",
      ],
    },
    {
      id: 4,
      title: "Manual Therapy",
      subMenus: [
        "Mobilization",
        "Manipulation",
        "Massage",
      ],
    },
    {
      id: 5,
      title: "Advice",
      subMenus: [
        "Home Exercise",
        "Posture Correction",
        "Activity Modification",
      ],
    },
  ];

  // ==========================
  // STATES
  // ==========================

  const [
    showMenuPopup,
    setShowMenuPopup,
  ] = useState(false);

  const [
    expandedMenu,
    setExpandedMenu,
  ] = useState(null);

  const [
    searchText,
    setSearchText,
  ] = useState("");

  // ==========================
  // FILTER MENU
  // ==========================

  const filteredMenus =
    treatmentMenus.filter((menu) => {
      if (searchText === "")
        return true;

      const menuMatch =
        menu.title
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          );

      const subMenuMatch =
        menu.subMenus.some((sub) =>
          sub
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            )
        );

      return (
        menuMatch || subMenuMatch
      );
    });

  return (
    <div className="protocol-page-patient-protocol">

      {/* BACK BUTTON */}

      <FaArrowLeft
        className="back-icon-patient-protocol"
        onClick={() =>
          navigate("/homepage", {
            state: {
              openPatientPopup: true,
              patient,
            },
          })
        }
      />

      {/* PATIENT HEADER */}

      <div className="patient-header-treatment-protocol">

        <h2>{patientName}</h2>

        <div className="patient-details-treatment-protocol">

          <span>
            <strong>File No :</strong>{" "}
            {fileNo}
          </span>

          <span>
            <strong>
              Patient Code :
            </strong>{" "}
            {patientCode}
          </span>

        </div>

      </div>

      {/* LEFT PANEL */}

      <div className="left-panel-patient-protocol">

        <div className="header-patient-protocol">

          <h2 className="heading-patient-protocol">
            Treatment Protocol
          </h2>

          <FaPlus
            className="heading-plus-icon-patient-protocol"
            onClick={() => {
              setShowMenuPopup(true);
              setSearchText("");
              setExpandedMenu(null);
            }}
          />

        </div>
        {treatmentMenus.map((menu) => (

          <div
            key={menu.id}
            className="menu-card-patient-protocol"
          >

            <div className="menu-title-patient-protocol">
              {menu.title}
            </div>

            <ul className="submenu-list-patient-protocol">

              {menu.subMenus.map(
                (submenu, index) => (

                  <li
                    key={index}
                    className="submenu-item-patient-protocol"
                  >
                    {submenu}
                  </li>

                )
              )}

            </ul>

          </div>

        ))}

      </div>

      {/* =========================
          MENU POPUP
      ========================== */}

      {showMenuPopup && (

        <div className="popup-overlay-patient-protocol">

          <div className="popup-box-patient-protocol popup-menu-box-patient-protocol">

            <div className="popup-header-patient-protocol">

              <h3>Select Menu</h3>

              <FaTimes
                className="close-icon-patient-protocol"
                onClick={() =>
                  setShowMenuPopup(false)
                }
              />

            </div>

            <input
              type="text"
              placeholder="Search Menu..."
              className="search-input-patient-protocol"
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />

            <div className="popup-menu-list-patient-protocol">

            {filteredMenus.map((menu) => (

                <div
                  key={menu.id}
                  className="popup-menu-card-patient-protocol"
                >

                  <div
                    className="popup-menu-title-patient-protocol"
                    onClick={() =>
                      setExpandedMenu(
                        expandedMenu === menu.id
                          ? null
                          : menu.id
                      )
                    }
                  >

                    <div className="popup-menu-left-patient-protocol">

                      {expandedMenu === menu.id ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}

                      <span>{menu.title}</span>

                    </div>

                  </div>

                  {expandedMenu === menu.id && (

                    <div className="popup-submenu-patient-protocol">

                      {menu.subMenus
                        .filter((submenu) =>
                          submenu
                            .toLowerCase()
                            .includes(
                              searchText.toLowerCase()
                            )
                        )
                        .map((submenu, index) => (

                          <div
                            key={index}
                            className="popup-submenu-item-patient-protocol"
                            onClick={() => {
                              console.log(
                                "Selected:",
                                submenu
                              );

                              setShowMenuPopup(false);
                            }}
                          >
                            {submenu}
                          </div>

                        ))}

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

      )}
      </div>
  );
}