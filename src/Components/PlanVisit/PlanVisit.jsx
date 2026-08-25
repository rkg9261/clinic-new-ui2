import React from "react";
import "./PlanVisit.css";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCircle,
} from "react-icons/fa";

import visitImageOne from "../../assets/plan-visit-1.jpeg"
import  visitImageTwo from "../../assets/plan-visit-2.jpg"
export default function PlanVisit() {
  return (
    <section className="plan-visit-section-plan-visit">
      <div className="plan-visit-container-plan-visit">

        {/* =========================
            LEFT SIDE
        ========================== */}
        <div className="plan-visit-left-plan-visit">

          <div className="plan-visit-title-plan-visit">

            <div className="plan-visit-top-plan-visit">
              <div className="plan-line-plan-visit"></div>

              <FaCircle className="plan-dot-plan-visit" />

              <span>PLAN YOUR VISIT</span>
            </div>

            <h2>
              Book
              <span> Your Appointment </span>
              Today
            </h2>

            <p>
              We're committed to offering more than treatment.
              Receive expert physiotherapy with personalized
              care designed to restore movement, reduce pain,
              and improve your quality of life.
            </p>

          </div>

          {/* =========================
              CONTACT BOXES
          ========================== */}

          <div className="plan-contact-row-plan-visit">

            <div className="plan-contact-card-plan-visit">

              <div className="plan-icon-plan-visit">
                <FaPhoneAlt />
              </div>

              <div>
                <h4>Talk With Us</h4>
                <h4>+91 7467067466</h4>
              </div>

            </div>

            <div className="plan-contact-card-plan-visit">

              <div className="plan-icon-plan-visit">
                <FaEnvelope />
              </div>

              <div>
                <h4>Email Address</h4>
                <h4>krishnaadvancephysioclinic
                    <br/>@gmail.com</h4>
              </div>

            </div>

            <div className="plan-contact-card-plan-visit">

              <div className="plan-icon-plan-visit">
                <FaClock />
              </div>

              <div>
                <h4>Working Hours</h4>
                <h4>10AM To 8 PM</h4>
              </div>

            </div>

          </div>

          {/* =========================
              LARGE IMAGE
          ========================== */}

          <div className="plan-big-image-plan-visit">

            <img
              src={visitImageOne}
              alt="Plan Visit"
            />

          </div>

        </div>

        {/* =========================
            RIGHT SIDE
        ========================== */}

        <div className="plan-visit-right-plan-visit">

          <div className="plan-image-card-plan-visit">

            <img
              src={visitImageTwo}
              alt="Therapy"
            />

            {/* Overlay must be inside image card */}
            <div className="plan-image-overlay-plan-visit">

              <div className="plan-image-content-plan-visit">

                <h3>
                  Personalized
                  <br />
                  Physiotherapy
                  <br />
                  Care
                </h3>

                <p>
                  Expert rehabilitation, pain relief and
                  recovery programs tailored specially
                  for your health and lifestyle.
                </p>

                <div className="plan-image-badge-plan-visit">

                  <span>18+</span>

                  <small>
                    Years Of
                    <br />
                    Experience
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}