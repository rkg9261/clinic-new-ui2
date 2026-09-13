import React, { useEffect } from "react";
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
    desc: "Detailed examination, evaluation & problem identification"
  },
  {
    id: "02",
    icon: <FaSearch />,
    title: "Diagnosis",
    desc: "Evidence-based diagnosis and movement analysis"
  },
  {
    id: "03",
    icon: <FaNotesMedical />,
    title: "Treatment Plan",
    desc: "Customized treatment plan designed for your condition"
  },
  {
    id: "04",
    icon: <FaProcedures />,
    title: "Therapy Sessions",
    desc: "Advanced therapies, exercises & manual techniques"
  },
  {
    id: "05",
    icon: <FaRunning />,
    title: "Rehabilitation",
    desc: "Strengthening, mobility & functional training"
  },
  {
    id: "06",
    icon: <FaShieldAlt />,
    title: "Recovery & Prevention",
    desc: "Long-term recovery, management & injury prevention"
  }
];

const RecoveryProcess = () => {

  useEffect(() => {

    const section = document.querySelector(
      ".recovery-process-section"
    );

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "recovery-process-visible"
            );

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.2
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };

  }, []);

  return (

    <section className="recovery-process-section">

      {/* HEADING */}

      <div className="recovery-process-heading">

        <p className="recovery-process-subtitle">
          OUR TREATMENT PROCESS
        </p>

        <h2 className="recovery-process-title">
          A Structured Path to Your Recovery
        </h2>

        {/* <p className="recovery-process-heading-description">
          From detailed examination to complete rehabilitation,
          our structured approach helps you move confidently
          toward better health and long-term recovery.
        </p> */}

      </div>


      {/* PROCESS */}

      <div className="recovery-process-wrapper">

        {processData.map((item, index) => (

          <React.Fragment key={item.id}>

            {/* PROCESS CARD */}

            <div
              className="recovery-process-card"
              style={{
                "--process-delay": `${index * 0.42}s`
              }}
            >

              <div className="recovery-process-circle">

                {/* NUMBER */}

                <span className="process-number">
                  {item.id}
                </span>

                {/* ICON */}

                <div className="process-icon">
                  {item.icon}
                </div>

              </div>


              {/* TITLE */}

              <h3>
                {item.title}
              </h3>


              {/* DESCRIPTION */}

              <p>
                {item.desc}
              </p>

            </div>


            {/* ARROW */}

            {index !== processData.length - 1 && (

              <div
                className="process-arrow"
                style={{
                  "--arrow-delay":
                    `${index * 0.42 + 0.28}s`
                }}
              >

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