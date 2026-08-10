import React, { useState } from "react";
import "./Conditions.css";
import { conditionsData } from "./ConditionsData";

const Conditions = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);

  const visibleConditions = showAll
    ? conditionsData
    : conditionsData.slice(0, 6);

  const handleClosePopup = () => {
    setSelectedCondition(null);
  };

  return (
    <section className="conditions-section" id="conditions">

      {/* =========================
          HEADER
      ========================= */}

      <div className="conditions-header">

        <div className="conditions-header-content">

          <p className="conditions-subtitle">
            CONDITIONS WE TREAT
          </p>

          <h2 className="conditions-title">
            We Treat the
            <span> Root Cause,</span>
            <br />
            Not Just the Pain
          </h2>

        </div>

        <button
          type="button"
          className="view-all-btn"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll
            ? "SHOW LESS ←"
            : "VIEW ALL CONDITIONS →"}
        </button>

      </div>


      {/* =========================
          CONDITIONS GRID
      ========================= */}

      <div className="conditions-grid">

        {visibleConditions.map((item) => (

          <div
            key={item.id}
            className="condition-card"
            onClick={() => setSelectedCondition(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedCondition(item);
              }
            }}
          >

            <span className="shine"></span>

            <img
              src={item.image}
              alt={item.title}
              className="condition-image"
            />

            <h4>{item.title}</h4>

          </div>

        ))}

      </div>


      {/* =========================
          POPUP
      ========================= */}

      {selectedCondition && (

        <div
          className="popup-overlay"
          onClick={handleClosePopup}
        >

          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="close-popup"
              onClick={handleClosePopup}
              aria-label="Close"
            >
              ×
            </button>

            <img
              src={selectedCondition.image}
              alt={selectedCondition.title}
              className="popup-image"
            />

            <h2>
              {selectedCondition.title}
            </h2>

          </div>

        </div>

      )}

    </section>
  );
};

export default Conditions;