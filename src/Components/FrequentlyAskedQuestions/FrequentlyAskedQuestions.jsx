import React, { useEffect, useState } from "react";
import "./FrequentlyAskedQuestions.css";

import humanBodyImage from "../../assets/human-body-physiotherapy2.png";

import { API } from "../../config/api";
import { getAuthHeaders } from "../../utils/auth";

const FrequentlyAskedQuestions = () => {
 
  // OPEN FAQ
 

  const [openQuestion, setOpenQuestion] = useState(null);

 
  // FAQ DATA
 

  const [faqData, setFaqData] = useState([]);

 
  // LOADING
 

  const [loading, setLoading] = useState(true);

 
  // ERROR
 

  const [error, setError] = useState("");

 
  // GET FAQ API
 

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError("");

      const authHeaders = getAuthHeaders();

      const response = await fetch(API.FAQS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(authHeaders || {}),
        },
      });

      const result = await response.json();

      console.log("FAQ GET RESPONSE:", result);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to load FAQs."
        );
      }

      
      // GET API RESPONSE DATA
      

      let data = [];

      if (Array.isArray(result?.data)) {
        data = result.data;
      } else if (Array.isArray(result?.data?.data)) {
        data = result.data.data;
      } else if (Array.isArray(result)) {
        data = result;
      }

      
      // ONLY ACTIVE FAQs
      

      const activeFAQs = data.filter((item) => {
        return (
          item.is_active === 1 ||
          item.is_active === true ||
          item.isActive === true ||
          item.isActive === 1
        );
      });

      setFaqData(activeFAQs);
    } catch (err) {
      console.error("FAQ GET ERROR:", err);

      setError(
        err.message || "Unable to load FAQs."
      );

      setFaqData([]);
    } finally {
      setLoading(false);
    }
  };

 
  // CALL GET API WHEN PAGE LOADS
 

  useEffect(() => {
    fetchFAQs();
  }, []);

 
  // TOGGLE FAQ
 

  const toggleFAQ = (id) => {
    setOpenQuestion(
      openQuestion === id ? null : id
    );
  };

 
  // FAQ ITEM
 

  const FAQItem = ({ item }) => {
    const isOpen = openQuestion === item.id;

    return (
      <div
        className={`faq-item-clinic ${
          isOpen ? "faq-item-open-clinic" : ""
        }`}
      >

        <button
          type="button"
          className="faq-question-clinic"
          onClick={() => toggleFAQ(item.id)}
          aria-expanded={isOpen}
        >

          <span className="faq-question-text-clinic">
            {item.question}
          </span>

          <span
            className={`faq-plus-clinic ${
              isOpen ? "faq-plus-open-clinic" : ""
            }`}
          >
            {isOpen ? "−" : "+"}
          </span>

        </button>

        <div
          className={`faq-answer-wrapper-clinic ${
            isOpen
              ? "faq-answer-visible-clinic"
              : ""
          }`}
        >

          <div className="faq-answer-clinic">

            <p>
              {item.answer}
            </p>

          </div>

        </div>

      </div>
    );
  };

 
  // SPLIT FAQS INTO TWO COLUMNS
 

  const leftFaqs = faqData.filter(
    (_, index) => index % 2 === 0
  );

  const rightFaqs = faqData.filter(
    (_, index) => index % 2 !== 0
  );

 
  // VIEW ALL FAQS
 

  const handleViewAll = () => {
    setOpenQuestion(null);
  };

 
  // RETURN
 

  return (
    <section
      className="faq-section-clinic"
      id="faq"
    >

      <div className="faq-container-clinic">

        {/* =====================================
            LEFT HUMAN BODY IMAGE
        ====================================== */}

        <div className="faq-image-section-clinic">

          <div className="faq-image-background-clinic"></div>

          <img
            src={humanBodyImage}
            alt="Human body silhouette"
            className="faq-human-image-clinic"
          />

          <div className="faq-pain-point-clinic"></div>

          <div className="faq-pain-ring-clinic"></div>

        </div>


        {/* =====================================
            RIGHT FAQ CONTENT
        ====================================== */}

        <div className="faq-content-clinic">

          {/* =====================================
              HEADER
          ====================================== */}

          <div className="faq-header-clinic">

            <div className="faq-heading-wrapper-clinic">

              <span className="faq-subtitle-clinic">
                FREQUENTLY ASKED QUESTIONS
              </span>

              <h2 className="faq-heading-clinic">
                Have Questions? We've Got Answers.
              </h2>

            </div>


            <button
              type="button"
              className="faq-view-all-clinic"
              onClick={handleViewAll}
            >
              VIEW ALL FAQS

              <span className="faq-arrow-clinic">
                →
              </span>

            </button>

          </div>


          {/* =====================================
              LOADING
          ====================================== */}

          {loading && (
            <div className="faq-loading-clinic">
              Loading FAQs...
            </div>
          )}


          {/* =====================================
              ERROR
          ====================================== */}

          {!loading && error && (
            <div className="faq-error-clinic">
              {error}
            </div>
          )}


          {/* =====================================
              NO FAQ
          ====================================== */}

          {!loading &&
            !error &&
            faqData.length === 0 && (
              <div className="faq-empty-clinic">
                No frequently asked questions available.
              </div>
            )}


          {/* =====================================
              FAQ COLUMNS
          ====================================== */}

          {!loading &&
            !error &&
            faqData.length > 0 && (

              <div className="faq-columns-clinic">

                {/* =================================
                    LEFT COLUMN
                ================================== */}

                <div className="faq-column-clinic">

                  {leftFaqs.map((item) => (
                    <FAQItem
                      key={item.id}
                      item={item}
                    />
                  ))}

                </div>


                {/* =================================
                    RIGHT COLUMN
                ================================== */}

                <div className="faq-column-clinic">

                  {rightFaqs.map((item) => (
                    <FAQItem
                      key={item.id}
                      item={item}
                    />
                  ))}

                </div>

              </div>

            )}

        </div>

      </div>

    </section>
  );
};

export default FrequentlyAskedQuestions;