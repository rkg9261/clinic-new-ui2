import React, {
  useEffect
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import "./ClinicPhotoDetails.css";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCamera,
  FaCheckCircle,
  FaImages,
  FaTimes
} from "react-icons/fa";

import { clinicPhotoData } from "../ClinicPhotos/ClinicPhotoData";


const ClinicPhotoDetails = () => {

  const navigate = useNavigate();

  const { id } = useParams();


  /* FIND CURRENT PHOTO  */
   


  const photoId = Number(id);

  const currentPhoto =
    clinicPhotoData.find(
      (photo) => photo.id === photoId
    );


  /*BODY SCROLL  */
    


  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, [id]);


  /* NOT FOUND */
   
 

  if (!currentPhoto) {

    return (

      <section className="clinic-photo-detail-not-found">

        <FaImages />

        <h2> Photo Not Found </h2>

         
       
        <p>
          The clinic photo you are looking for
          could not be found.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/clinic-photos")
          }
        >

          <FaArrowLeft />

          Back to Clinic Photos

        </button>

      </section>

    );

  }


  /*CURRENT INDEX  */
    


  const currentIndex =
    clinicPhotoData.findIndex(
      (photo) => photo.id === currentPhoto.id
    );


  /*PREVIOUS PHOTO  */
    


  const previousPhoto =
    currentIndex > 0
      ? clinicPhotoData[currentIndex - 1]
      : clinicPhotoData[
          clinicPhotoData.length - 1
        ];


  /*  NEXT PHOTO  */
  


  const nextPhoto =
    currentIndex <
    clinicPhotoData.length - 1
      ? clinicPhotoData[currentIndex + 1]
      : clinicPhotoData[0];


  /*RELATED PHOTOS  */
    


  const relatedPhotos =
    clinicPhotoData
      .filter(
        (photo) =>
          photo.category ===
          currentPhoto.category &&
          photo.id !== currentPhoto.id
      )
      .slice(0, 3);


  return (

    <section className="clinic-photo-detail-page">


      {/* BACKGROUND */}
       
     

      <div className="clinic-photo-detail-blob clinic-photo-detail-blob-one" />

      <div className="clinic-photo-detail-blob clinic-photo-detail-blob-two" />

      <div className="clinic-photo-detail-blob clinic-photo-detail-blob-three" />


      <div className="clinic-photo-detail-bubble clinic-photo-detail-bubble-one" />

      <div className="clinic-photo-detail-bubble clinic-photo-detail-bubble-two" />

      <div className="clinic-photo-detail-bubble clinic-photo-detail-bubble-three" />


      {/*  HERO*/}
      
      

      <div className="clinic-photo-detail-hero">

        <div className="clinic-photo-detail-hero-inner">


          {/* CATEGORY */}

          <span className="clinic-photo-detail-category">

            {currentPhoto.category}

          </span>


          {/* TITLE */}

          <h1> {currentPhoto.title} </h1>

          {/* DESCRIPTION */}

          <p>  {currentPhoto.description} </p>

        </div>

      </div>


      {/* MAIN LAYOUT*/}
       
      

      <div className="clinic-photo-detail-layout">


        {/*MAIN ARTICLE   =*/}
          
     

        <main className="clinic-photo-detail-main">


          {/* BACK */}

          <button
            type="button"
            className="clinic-photo-detail-back"
            onClick={() =>
              navigate("/clinic-photos")
            }
          >

            <FaArrowLeft />

            Back to Clinic Photos

          </button>


          {/* IMAGE=*/}
           
          

          <div className="clinic-photo-detail-image">

            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
            />


            <div className="clinic-photo-detail-image-overlay">

              <span>
                {currentPhoto.category}
              </span>

            </div>

          </div>


          {/*PHOTO META =*/}
            
         

          <div className="clinic-photo-detail-meta">

            <span>

              <FaCamera />

              Clinic Gallery

            </span>


            <span>

              <FaImages />

              Photo {currentIndex + 1}
              {" / "}
              {clinicPhotoData.length}

            </span>

          </div>


          {/* INTRO */}
           
       

          <div className="clinic-photo-detail-intro">

            <p> {currentPhoto.description} </p>
          </div>


          {/*PHOTO INFORMATION*/}
            
          

          <div className="clinic-photo-detail-section">

            <h2>  About This Photo </h2>
            <p>
              This image represents the professional
              environment and patient-focused approach
              at Krishna Advance Physio Clinic. Our
              clinic is designed to provide a comfortable,
              clean and supportive environment for
              physiotherapy and rehabilitation.
            </p>

            <p>
              Every area of our clinic is arranged to
              support safe treatment, guided exercise
              and personalized recovery programs.
            </p>

          </div>


          {/* HIGHLIGHTS*/}
           
        

          <div className="clinic-photo-detail-section">

            <h2>Clinic Experience</h2>
            <div className="clinic-photo-detail-points">

              <div>

                <FaCheckCircle />

                <span> Professional treatment environment</span>

              </div>


              <div>

                <FaCheckCircle />

                <span> Patient-friendly clinical setup</span>
        
              </div>


              <div>

                <FaCheckCircle />

                <span>
                  Modern physiotherapy facilities
                </span>

              </div>


              <div>

                <FaCheckCircle />

                <span>
                  Personalized rehabilitation support
                </span>

              </div>

            </div>

          </div>


          {/*
            CTA
          =*/}

          <div className="clinic-photo-detail-cta">

            <div className="clinic-photo-detail-cta-icon">

              <FaCalendarAlt />

            </div>


            <div className="clinic-photo-detail-cta-content">

              <h3>
                Want to Visit Our Clinic?
              </h3>

              <p>
                Book an appointment and experience
                personalized physiotherapy care
                designed around your recovery.
              </p>


              <button
                type="button"
                onClick={() =>
                  navigate("/book-appointment")
                }
              >

                <FaCalendarAlt />

                Book Appointment

                <FaArrowRight />

              </button>

            </div>

          </div>

        </main>


        {/*
          SIDEBAR
        =*/}

        <aside className="clinic-photo-detail-sidebar">


          {/* RELATED PHOTOS */}

          <div className="clinic-photo-detail-related">

            <div className="clinic-photo-detail-related-heading">

              <span>
                EXPLORE MORE
              </span>

              <h3>
                Related Photos
              </h3>

            </div>


            <div className="clinic-photo-detail-related-list">

              {relatedPhotos.length > 0 ? (

                relatedPhotos.map(
                  (photo) => (

                    <button
                      type="button"
                      key={photo.id}
                      className="clinic-photo-detail-related-card"
                      onClick={() =>
                        navigate(
                          `/clinic-photos/${photo.id}`
                        )
                      }
                    >

                      <div className="clinic-photo-detail-related-image">

                        <img
                          src={photo.image}
                          alt={photo.title}
                        />

                      </div>


                      <div className="clinic-photo-detail-related-content">

                        <span>
                          {photo.category}
                        </span>

                        <h4>
                          {photo.title}
                        </h4>

                      </div>

                    </button>

                  )
                )

              ) : (

                <p className="clinic-photo-detail-no-related">
                  No related photos available.
                </p>

              )}

            </div>

          </div>


          {/* CATEGORY BOX */}

          <div className="clinic-photo-detail-category-box">

            <div className="clinic-photo-detail-category-icon">

              <FaImages />

            </div>


            <span>
              CURRENT CATEGORY
            </span>


            <h3>
              {currentPhoto.category}
            </h3>


            <p>
              Explore more photos from this
              section of our clinic gallery.
            </p>


            <button
              type="button"
              onClick={() =>
                navigate("/clinic-photos")
              }
            >

              View All Photos

              <FaArrowRight />

            </button>

          </div>


          {/* APPOINTMENT */}

          <div className="clinic-photo-detail-appointment">

            <div className="clinic-photo-detail-appointment-icon">

              <FaCalendarAlt />

            </div>


            <h3>
              Ready to Feel Better?
            </h3>


            <p>
              Get personalized guidance from
              our physiotherapy team.
            </p>


            <button
              type="button"
              onClick={() =>
                navigate("/book-appointment")
              }
            >

              Book Appointment

            </button>

          </div>

        </aside>

      </div>


      {/*
        BOTTOM NAVIGATION
      */}

      <div className="clinic-photo-detail-navigation">


        <button
          type="button"
          onClick={() =>
            navigate(
              `/clinic-photos/${previousPhoto.id}`
            )
          }
        >

          <FaArrowLeft />

          Previous Photo

        </button>


        <button
          type="button"
          onClick={() =>
            navigate("/clinic-photos")
          }
        >

          <FaImages />

          All Photos

        </button>


        <button
          type="button"
          onClick={() =>
            navigate(
              `/clinic-photos/${nextPhoto.id}`
            )
          }
        >

          Next Photo

          <FaArrowRight />

        </button>

      </div>

    </section>

  );

};


export default ClinicPhotoDetails;