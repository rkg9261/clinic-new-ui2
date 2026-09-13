import React, { useState } from "react";
import "./SecureCare.css";

import secureCareImage from "../../assets/secure-care.jpeg"

export default function SecureCare() {

  const [activeStep, setActiveStep] = useState(2);

  const steps = [

    {
      id: 1,
      title: "Book Your Visit",
      className: "step-one-secure-care",

      description:
        "Schedule your appointment with our experienced physiotherapy team. Choose your preferred date and time to begin your recovery journey with personalized care."
    },

    {
      id: 2,
      title: "Initial Medical Consultation",
      className: "step-two-secure-care",

      description:
        "Begin with a comprehensive assessment to understand your condition, pain level, medical history and lifestyle before creating your treatment strategy."
    },

    {
      id: 3,
      title: "Whole Body Checkup",
      className: "step-three-secure-care",

      description:
        "Our therapists perform posture analysis, flexibility testing, muscle strength assessment and mobility evaluation to identify the root cause."
    },

    {
      id: 4,
      title: "Personalized Care Plan",
      className: "step-four-secure-care",

      description:
        "A customized rehabilitation program is designed according to your goals, condition and recovery timeline for maximum results."
    },

    {
      id: 5,
      title: "Skilled Hands Therapy",
      className: "step-five-secure-care",

      description:
        "Receive manual therapy, advanced physiotherapy techniques, stretching and guided exercises from highly trained professionals."
    },

    {
      id: 6,
      title: "Improvement & Recovery",
      className: "step-six-secure-care",

      description:
        "Track your progress through regular follow-ups while improving strength, flexibility, posture and confidence for a healthy lifestyle."
    }

  ];

  return (

<section className="secure-care-section-secure-care">

<div className="secure-care-container-secure-care">

<div className="secure-care-heading-secure-care">

<div className="secure-care-title-row-secure-care">

<div className="secure-care-line-secure-care"></div>

<div className="secure-care-dot-secure-care"></div>

<span>SECURE CARE</span>

</div>

<h2>

The Steps

<span> To Begin Your</span>

Recovery

</h2>

</div>

<div className="secure-care-content-secure-care">

{/* LEFT */}

<div className="secure-care-left-secure-care">

{steps.slice(4,6).reverse().map((step)=>(

<div

key={step.id}

className={`${step.className} secure-care-step-box-secure-care`}

onMouseEnter={()=>setActiveStep(step.id)}

>

<h4>

Step:{step.id}

</h4>

<button

className={activeStep===step.id

?

"active-button-secure-care"

:

"step-button-secure-care"

}

>

{step.title}

</button>

{activeStep===step.id && (

<div className="step-description-secure-care">

<p>

{step.description}

</p>

</div>

)}

</div>

))}

</div>

{/* CENTER IMAGE */}

<div className="secure-care-image-area-secure-care">

<div className="outer-ring-secure-care"></div>

<div className="middle-ring-secure-care"></div>

<div className="image-wrapper-secure-care">

<img

src={secureCareImage}

alt="Secure Care"

/>

</div>

</div>

{/* ==========================
              RIGHT SIDE
          ========================== */}

          <div className="secure-care-right-secure-care">

            {steps.slice(0, 4).map((step) => (

              <div
                key={step.id}
                className={`${step.className} secure-care-step-box-secure-care`}
                onMouseEnter={() => setActiveStep(step.id)}
              >

                <h4>
                  Step:{step.id}
                </h4>

                <button
                  className={
                    activeStep === step.id
                      ? "active-button-secure-care"
                      : "step-button-secure-care"
                  }
                >
                  {step.title}
                </button>

                {activeStep === step.id && (

                  <div className="step-description-secure-care">

                    <p>
                      {step.description}
                    </p>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}