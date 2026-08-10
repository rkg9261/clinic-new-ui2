import React from "react";
import "./RecoveryProcess.css";

import {
  FaClipboardCheck,
  FaSearch,
  FaNotesMedical,
  FaProcedures,
  FaRunning,
  FaShieldAlt
} from "react-icons/fa";

import { HiArrowLongRight } from "react-icons/hi2";

const processData = [
  {
    id: "01",
    icon: <FaClipboardCheck />,
    title: "Assessment",
    desc: "Detailed evaluation & problem identification"
  },
  {
    id: "02",
    icon: <FaSearch />,
    title: "Diagnosis",
    desc: "Evidence-based diagnosis"
  },
  {
    id: "03",
    icon: <FaNotesMedical />,
    title: "Treatment Plan",
    desc: "Customized plan for your condition"
  },
  {
    id: "04",
    icon: <FaProcedures />,
    title: "Therapy Sessions",
    desc: "Advanced therapies & manual techniques"
  },
  {
    id: "05",
    icon: <FaRunning />,
    title: "Rehabilitation",
    desc: "Strengthening & functional training"
  },
  {
    id: "06",
    icon: <FaShieldAlt />,
    title: "Recovery & Prevention",
    desc: "Long-term management & injury prevention"
  }
];

const RecoveryProcess = () => {
  return (
    <section className="recovery-process-section">

      <div className="recovery-process-heading">

        <p className="recovery-process-subtitle">
          OUR TREATMENT PROCESS
        </p>

        <h2 className="recovery-process-title">
          A Structured Path to Your Recovery
        </h2>

      </div>

      <div className="recovery-process-wrapper">

        {processData.map((item, index) => (

          <React.Fragment key={item.id}>

            <div className="recovery-process-card">

              <div className="recovery-process-circle">

                <span className="process-number">
                  {item.id}
                </span>

                <div className="process-icon">
                  {item.icon}
                </div>

              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

            </div>

            {index !== processData.length - 1 && (
              <div className="process-arrow">
                <HiArrowLongRight />
              </div>
            )}

          </React.Fragment>

        ))}

      </div>

    </section>
  );
};

export default RecoveryProcess;