import React, { useEffect, useState } from "react";
import "./AppointmentPayment.css";

import {
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhoneAlt,
  FaCreditCard,
  FaLock,
  FaRupeeSign,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRedo,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";


const AppointmentPayment = ({
  appointment,
  onClose,
}) => {

  /* RAZORPAY TEST CONFIG*/
  
    

  const RAZORPAY_KEY_ID =
    import.meta.env.VITE_RAZORPAY_KEY_ID;

  const RAZORPAY_ORDER_ID =
    import.meta.env.VITE_RAZORPAY_ORDER_ID;

  const RAZORPAY_AMOUNT =
    Number(
      import.meta.env.VITE_RAZORPAY_AMOUNT || 10000
    );


  /*PAYMENT STATES */
 
     

  const [paymentLoading, setPaymentLoading] = useState(false);
   

  const [paymentSuccess, setPaymentSuccess] = useState(false);
   

  const [paymentFailed, setPaymentFailed] = useState(false);
   

  const [paymentError, setPaymentError] =  useState("");
  

  const [
    paymentInformation,
    setPaymentInformation
  ] = useState({
    paymentId: "",
    orderId: "",
    signature: "",
  });


  /*LOAD RAZORPAY SCRIPT*/
  
     

  useEffect(() => {

    if (
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      )
    ) {
      return;
    }

    const script =
      document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      
      // Razorpay can reuse this script.
    };

  }, []);


  /*OPEN RAZORPAY */
 
     

  const handlePayNow = () => {

    try {

      setPaymentLoading(true);

      setPaymentFailed(false);

      setPaymentSuccess(false);

      setPaymentError("");


      /*  VALIDATE KEY */
      
        

      if (!RAZORPAY_KEY_ID) {

        throw new Error(
          "Razorpay Test Key ID is missing."
        );

      }


      /* VALIDATE ORDER ID   */
    
         

      if (!RAZORPAY_ORDER_ID) {

        throw new Error(
          "Razorpay Test Order ID is missing."
        );

      }


      /* CHECK RAZORPAY SCRIPT*/
       
         

      if (!window.Razorpay) {

        throw new Error(
          "Razorpay Checkout is still loading. Please try again."
        );

      }


      /* RAZORPAY OPTIONS*/
       
         

      const options = {

        key: RAZORPAY_KEY_ID,

        amount: RAZORPAY_AMOUNT,

        currency: "INR",

        name:
          "Krishna Advance Physio Clinic",

        description:
          "Test Appointment Payment",

        order_id:
          RAZORPAY_ORDER_ID,


        /*   PREFILL */
         
        

        prefill: {

          name:
            appointment?.name || "",

          contact:
            appointment?.whatsapp_number
              ? `+91${appointment.whatsapp_number}`
              : "",

        },


        /* NOTES*/
         
           

        notes: {

          appointmentId:
            String(
              appointment?.appointmentId || ""
            ),

          patientName:
            appointment?.name || "",

        },


        /* THEME*/
         
           

        theme: {

          color: "#00796b",

        },


        /* SUCCESS  */
       
           

        handler: function (
          response
        ) {

          console.log(
            "RAZORPAY SUCCESS:",
            response
          );


          /*
            Razorpay returns:

            response.razorpay_payment_id
            response.razorpay_order_id
            response.razorpay_signature
          */


          setPaymentInformation({

            paymentId:
              response.razorpay_payment_id,

            orderId:
              response.razorpay_order_id,

            signature:
              response.razorpay_signature,

          });


          setPaymentLoading(false);

          setPaymentFailed(false);

          setPaymentSuccess(true);

        },


        /* MODAL DISMISS */
        
           

        modal: {

          ondismiss: function () {

            setPaymentLoading(false);

          },

        },

      };


      /* CREATE RAZORPAY INSTANCE*/
       
         

      const razorpay =
        new window.Razorpay(options);


      /* PAYMENT FAILED*/
       
         

      razorpay.on(
        "payment.failed",
        function (response) {

          console.error(
            "RAZORPAY PAYMENT FAILED:",
            response
          );


          const errorDescription =
            response?.error?.description ||
            response?.error?.reason ||
            "Payment failed.";

          setPaymentError(
            errorDescription
          );

          setPaymentLoading(false);

          setPaymentSuccess(false);

          setPaymentFailed(true);

        }
      );


      /* OPEN RAZORPAY CHECKOUT*/
       
         

      razorpay.open();

    } catch (error) {

      console.error(
        "RAZORPAY ERROR:",
        error
      );


      setPaymentLoading(false);

      setPaymentFailed(true);

      setPaymentError(
        error.message ||
        "Unable to open Razorpay Checkout."
      );

    }

  };


  /*RETRY*/
  
     

  const handleRetry = () => {

    setPaymentFailed(false);

    setPaymentError("");

    setPaymentLoading(false);

    setTimeout(() => {

      handlePayNow();

    }, 100);

  };


  /*CLOSE*/
  
     

  const handleClose = () => {

    if (paymentLoading) {
      return;
    }

    if (onClose) {
      onClose();
    }

  };


  /*SUCCESS SCREEN*/
  
     

  if (paymentSuccess) {

    return (

      <div className="appointment-payment-overlay">

        <div className="appointment-payment-modal">

          <button
            className="appointment-payment-close"
            onClick={handleClose}
          >
            <FaTimes />
          </button>


          <div className="appointment-payment-success">

            <div className="appointment-payment-success-icon">

              <FaCheckCircle />

            </div>


            <h2>
              Payment Successful
            </h2>


            <p className="appointment-payment-success-text">

              Razorpay Test Payment was
              completed successfully.

            </p>


            <div className="appointment-payment-success-details">

              <div className="appointment-payment-detail-row">

                <span>
                  Amount
                </span>

                <strong>
                  ₹
                  {(
                    RAZORPAY_AMOUNT / 100
                  ).toFixed(2)}
                </strong>

              </div>


              <div className="appointment-payment-detail-row">

                <span>
                  Payment ID
                </span>

                <strong>
                  {paymentInformation.paymentId}
                </strong>

              </div>


              <div className="appointment-payment-detail-row">

                <span>
                  Order ID
                </span>

                <strong>
                  {paymentInformation.orderId}
                </strong>

              </div>


              <div className="appointment-payment-detail-row">

                <span>
                  Appointment
                </span>

                <strong>
                  #{appointment?.appointmentId || "-"}
                </strong>

              </div>

            </div>


            <button
              className="appointment-payment-success-button"
              onClick={handleClose}
            >
              Done
            </button>

          </div>

        </div>

      </div>

    );

  }


  /*
     FAILURE SCREEN
  */

  if (paymentFailed) {

    return (

      <div className="appointment-payment-overlay">

        <div className="appointment-payment-modal">

          <button
            className="appointment-payment-close"
            onClick={handleClose}
          >
            <FaTimes />
          </button>


          <div className="appointment-payment-failure">

            <div className="appointment-payment-failure-icon">

              <FaExclamationTriangle />

            </div>


            <h2>
              Payment Failed
            </h2>


            <p className="appointment-payment-failure-text">

              {paymentError ||
                "Your Razorpay test payment failed."}

            </p>


            <div className="appointment-payment-failure-amount">

              <FaRupeeSign />

              {(RAZORPAY_AMOUNT / 100).toFixed(2)}

            </div>


            <button
              className="appointment-payment-retry-button"
              onClick={handleRetry}
            >

              <FaRedo />

              Retry Payment

            </button>


            <button
              className="appointment-payment-back-button"
              onClick={() => {

                setPaymentFailed(false);

                setPaymentError("");

              }}
            >

              <FaArrowLeft />

              Back to Payment

            </button>

          </div>

        </div>

      </div>

    );

  }


  /*
     MAIN PAYMENT UI
  */

  return (

    <div className="appointment-payment-overlay">

      <div className="appointment-payment-modal">

        {/* 
            HEADER
         */}

        <div className="appointment-payment-header">

          <div>

            <h2>
              Appointment Payment
            </h2>

            <p>
              Secure Razorpay Test Payment
            </p>

          </div>


          <button
            className="appointment-payment-close"
            onClick={handleClose}
            disabled={paymentLoading}
          >
            <FaTimes />
          </button>

        </div>


        {/* 
            APPOINTMENT
         */}

        <div className="appointment-payment-appointment-card">

          <div className="appointment-payment-card-title">

            Appointment Details

          </div>


          <div className="appointment-payment-info-grid">

            <div className="appointment-payment-info-item">

              <FaUser />

              <div>

                <span>
                  Patient
                </span>

                <strong>
                  {appointment?.name || "-"}
                </strong>

              </div>

            </div>


            <div className="appointment-payment-info-item">

              <FaPhoneAlt />

              <div>

                <span>
                  Mobile
                </span>

                <strong>
                  {appointment?.whatsapp_number || "-"}
                </strong>

              </div>

            </div>


            <div className="appointment-payment-info-item">

              <FaCalendarAlt />

              <div>

                <span>
                  Date
                </span>

                <strong>
                  {appointment?.appointment_date || "-"}
                </strong>

              </div>

            </div>


            <div className="appointment-payment-info-item">

              <FaClock />

              <div>

                <span>
                  Time
                </span>

                <strong>

                  {appointment?.appointment_time || "-"}

                  {appointment?.appointment_time_to
                    ? ` - ${appointment.appointment_time_to}`
                    : ""}

                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* 
            AMOUNT
         */}

        <div className="appointment-payment-amount-section">

          <div className="appointment-payment-amount-label">

            Test Payment Amount

          </div>


          <div className="appointment-payment-amount">

            <FaRupeeSign />

            {(RAZORPAY_AMOUNT / 100).toFixed(2)}

          </div>


          <p className="appointment-payment-test-note">

            Razorpay Test Mode

          </p>

        </div>


        {/* 
            PAY
         */}

        <button
          type="button"
          className="appointment-payment-pay-button"
          onClick={handlePayNow}
          disabled={paymentLoading}
        >

          {paymentLoading ? (

            <>
              <FaSpinner className="appointment-payment-spinner" />

              Opening Razorpay...

            </>

          ) : (

            <>
              <FaCreditCard />

              Pay ₹
              {(RAZORPAY_AMOUNT / 100).toFixed(2)}

            </>

          )}

        </button>


        {/* 
            SECURITY
         */}

        <div className="appointment-payment-security">

          <div>

            <FaLock />

            <span>
              Razorpay Secure Checkout
            </span>

          </div>


          <div>

            <FaShieldAlt />

            <span>
              Test Mode
            </span>

          </div>

        </div>


        {/* 
            TEST WARNING
         */}

        <div className="appointment-payment-test-warning">

          <strong>
            TEST MODE
          </strong>

          <span>
            No real money will be deducted.
          </span>

        </div>

      </div>

    </div>

  );

};


export default AppointmentPayment;