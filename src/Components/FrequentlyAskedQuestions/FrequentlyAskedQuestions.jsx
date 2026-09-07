import React, { useState } from "react";
import "./FrequentlyAskedQuestions.css";
import humanBodyImage from "../../assets/human-body-physiotherapy2.png"

const FrequentlyAskedQuestions = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "Do I need surgery for slip disc?",
      answer:
        "Not necessarily. Many slip disc problems can be managed with physiotherapy, exercises, posture correction and lifestyle changes. Surgery may only be recommended in specific severe cases."
    },
    {
      id: 2,
      question: "How many sessions will I need?",
      answer:
        "The number of physiotherapy sessions depends on your condition, symptoms and recovery progress. Your physiotherapist will recommend a treatment plan according to your individual requirements."
    },
    {
      id: 3,
      question: "Is physiotherapy painful?",
      answer:
        "Physiotherapy should generally be comfortable. Some exercises or manual techniques may cause mild temporary discomfort, but your therapist will adjust the treatment according to your comfort."
    },
    {
      id: 4,
      question: "Do you provide home physiotherapy?",
      answer:
        "Yes. Home physiotherapy services can be useful for patients who have difficulty travelling to the clinic or require treatment in the comfort of their home."
    },
    {
      id: 5,
      question: "What should I wear during therapy?",
      answer:
        "We recommend comfortable and loose-fitting clothes that allow easy movement and provide your physiotherapist access to the area being treated."
    },
    {
      id: 6,
      question: "Do you treat sports injuries?",
      answer:
        "Yes. Physiotherapy can help with sports injuries including muscle strains, ligament injuries, sprains, joint pain and movement-related problems."
    }
  ];

  const leftFaqs = faqData.slice(0, 3);
  const rightFaqs = faqData.slice(3, 6);

  const toggleFAQ = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

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
            isOpen ? "faq-answer-visible-clinic" : ""
          }`}
        >
          <div className="faq-answer-clinic">
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="faq-section-clinic" id="faq">

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

          {/* Physiotherapy treatment point */}
          <div className="faq-pain-point-clinic"></div>

          <div className="faq-pain-ring-clinic"></div>

        </div>


        {/* =====================================
            RIGHT FAQ CONTENT
        ====================================== */}

        <div className="faq-content-clinic">

          {/* Header */}

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
              onClick={() => setOpenQuestion(null)}
            >
              VIEW ALL FAQS
              <span className="faq-arrow-clinic">→</span>
            </button>

          </div>


          {/* FAQ columns */}

          <div className="faq-columns-clinic">

            {/* Left column */}

            <div className="faq-column-clinic">

              {leftFaqs.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                />
              ))}

            </div>


            {/* Right column */}

            <div className="faq-column-clinic">

              {rightFaqs.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                />
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default FrequentlyAskedQuestions;