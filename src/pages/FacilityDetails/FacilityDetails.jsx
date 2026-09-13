import React, { useEffect } from "react";

import "./FacilityDetails.css";

import {
    FaArrowLeft,
    FaArrowRight,
    FaCalendarAlt,
    FaCheckCircle,
    FaCog,
    FaHeartbeat,
    FaStethoscope,
    FaShieldAlt,
    FaTimes
} from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";

import { facilitiesData } from "./facilitiesData";


const FacilityDetails = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    /*  FIND FACILITY */
    
   

    const facility = facilitiesData.find(
        (item) => String(item.id) === String(id)
    );


    /*SCROLL TOP */
      
   

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, [id]);


    /*  NOT FOUND*/
    
    

    if (!facility) {

        return (

            <section className="facility-detail-not-found">

                <FaTimes />

                <h2> Facility Not Found </h2>
                   
               

                <p>
                    The facility you are looking for
                    could not be found.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/facility")} >
               

                    <FaArrowLeft />

                    Back to Facilities

                </button>

            </section>

        );

    }


    /*  RELATED FACILITIES */
    
   

    const relatedFacilities = facilitiesData
        .filter((item) => item.id !== facility.id)
        .filter((item) => {

            const sameUse = item.uses.some((use) =>
                facility.uses.includes(use)
            );

            return sameUse;

        })
        .slice(0, 3);


    /* FALLBACK RELATED */
     
   

    const finalRelatedFacilities =
        relatedFacilities.length > 0
            ? relatedFacilities
            : facilitiesData
                .filter((item) => item.id !== facility.id)
                .slice(0, 3);


    /* PREVIOUS / NEXT */
     
   

    const currentIndex = facilitiesData.findIndex(
        (item) => item.id === facility.id
    );


    const previousFacility =
        currentIndex > 0
            ? facilitiesData[currentIndex - 1]
            : null;


    const nextFacility =
        currentIndex < facilitiesData.length - 1
            ? facilitiesData[currentIndex + 1]
            : null;


    return (

        <section className="facility-detail-page">

            {/*BACKGROUND*/}
              
            

            <div className="facility-detail-background-one"></div>

            <div className="facility-detail-background-two"></div>

            <div className="facility-detail-bubble-one"></div>

            <div className="facility-detail-bubble-two"></div>

            <div className="facility-detail-bubble-three"></div>


            {/*  HERO*/}
            
            

            <div className="facility-detail-hero">

                <div className="facility-detail-hero-inner">

                    <span className="facility-detail-category">

                        {facility.category}

                    </span>


                    <h1>   {facility.name}</h1>

                    <p>  {facility.description}</p>

                </div>

            </div>


            {/* MAIN LAYOUT */}
             
           

            <div className="facility-detail-layout">


                {/*   MAIN ARTICLE */}
               
               

                <main className="facility-detail-main">

                    {/* Back */}

                    <button
                        type="button"
                        className="facility-detail-back"
                        onClick={() => navigate("/facility")}
                    >

                        <FaArrowLeft />

                        Back to Facilities

                    </button>


                    {/*IMAGE*/}
                      
                    

                    <div className="facility-detail-main-image">

                        <div className="facility-detail-image-glow"></div>

                        <div className="facility-detail-image-circle"></div>

                        <img
                            src={facility.image}
                            alt={facility.name}
                        />

                        <span className="facility-detail-image-category">

                            {facility.shortName}

                        </span>

                    </div>


                    {/*META*/}
                      
                    

                    <div className="facility-detail-meta">

                        <span>

                            <FaStethoscope />

                            Advanced Facility

                        </span>


                        <span>

                            <FaHeartbeat />

                            {facility.category}

                        </span>


                        <span>

                            <FaCheckCircle />

                            Professional Care

                        </span>

                    </div>


                    {/*INTRO */}
                      
                   

                    <div className="facility-detail-intro">

                        <p>

                            {facility.overview}

                        </p>

                    </div>


                    {/*CONTENT */}
                      
                   

                    <article className="facility-detail-article">


                        {/* ABOUT */}

                        <section className="facility-detail-section">

                            <h2>
                                About {facility.name}
                            </h2>

                            <p>
                                {facility.overview}
                            </p>

                            <p>
                                At Krishna Advance Physio Clinic,
                                treatment is planned according to
                                individual assessment, symptoms,
                                functional limitations and rehabilitation
                                goals.
                            </p>

                        </section>


                        {/* BENEFITS */}

                        <section className="facility-detail-section">

                            <h2>
                                Benefits of This Facility
                            </h2>

                            <p>
                                Depending on the patient's condition,
                                this facility may be incorporated into
                                a supervised physiotherapy program.
                            </p>


                            <ul className="facility-detail-benefit-list">

                                {facility.benefits.map(
                                    (benefit, index) => (

                                        <li key={index}>

                                            <FaCheckCircle />

                                            <span>
                                                {benefit}
                                            </span>

                                        </li>

                                    )
                                )}

                            </ul>

                        </section>


                        {/* COMMON USES */}

                        <section className="facility-detail-section">

                            <h2>
                                Common Uses
                            </h2>

                            <p>
                                This facility may be considered for
                                the following treatment areas after
                                professional assessment.
                            </p>


                            <div className="facility-detail-use-grid">

                                {facility.uses.map(
                                    (use, index) => (

                                        <div
                                            className="facility-detail-use"
                                            key={index}
                                        >

                                            <FaCheckCircle />

                                            <span>
                                                {use}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>


                        {/* WHO IS IT FOR */}

                        <section className="facility-detail-section">

                            <h2>
                                Who Can Benefit?
                            </h2>

                            <p>
                                {facility.suitableFor}
                            </p>

                        </section>


                        {/* HOW TREATMENT WORKS */}

                        <section className="facility-detail-section">

                            <h2>
                                How The Treatment Works
                            </h2>

                            <p>
                                {facility.treatment}
                            </p>

                        </section>


                        {/* SAFETY */}

                        <section className="facility-detail-section">

                            <h2>
                                Important Safety Information
                            </h2>

                            <div className="facility-detail-safety">

                                <FaShieldAlt />

                                <p>
                                    {facility.precautions}
                                </p>

                            </div>

                        </section>


                        {/* CTA */}

                        <div className="facility-detail-cta">

                            <div className="facility-detail-cta-icon">

                                <FaCalendarAlt />

                            </div>


                            <div className="facility-detail-cta-content">

                                <h3>
                                    Ready to Start Your Recovery?
                                </h3>

                                <p>
                                    Get professional guidance and
                                    find out whether this facility is
                                    suitable for your condition.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/book-appointment")
                                }
                            >

                                Book Appointment

                                <FaArrowRight />

                            </button>

                        </div>

                    </article>

                </main>


                {/*
                  SIDEBAR
                */}

                <aside className="facility-detail-sidebar">


                    {/* RELATED */}

                    <div className="facility-detail-related">

                        <div className="facility-detail-related-heading">

                            <span>
                                EXPLORE MORE
                            </span>

                            <h3>
                                Related Facilities
                            </h3>

                        </div>


                        <div className="facility-detail-related-list">

                            {finalRelatedFacilities.map(
                                (item) => (

                                    <button
                                        type="button"
                                        className="facility-detail-related-card"
                                        key={item.id}
                                        onClick={() =>
                                            navigate(
                                                `/facility/${item.id}`
                                            )
                                        }
                                    >

                                        <div className="facility-detail-related-image">

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />

                                        </div>


                                        <div className="facility-detail-related-content">

                                            <span>
                                                {item.category}
                                            </span>

                                            <h4>
                                                {item.name}
                                            </h4>

                                            <small>
                                                Explore Facility
                                            </small>

                                        </div>

                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* CATEGORY */}

                    <div className="facility-detail-category-box">

                        <div className="facility-detail-category-icon">

                            <FaCog />

                        </div>


                        <span>
                            CURRENT FACILITY
                        </span>


                        <h3>
                            {facility.name}
                        </h3>


                        <p>
                            {facility.shortName}
                        </p>


                        <button
                            type="button"
                            onClick={() => navigate("/facility")}
                        >

                            View All Facilities

                            <FaArrowRight />

                        </button>

                    </div>


                    {/* APPOINTMENT */}

                    <div className="facility-detail-appointment-box">

                        <div className="facility-detail-appointment-icon">

                            <FaCalendarAlt />

                        </div>


                        <h3>
                            Ready to feel better?
                        </h3>


                        <p>
                            Get professional guidance from
                            our physiotherapy team.
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/book-appointment")
                            }
                        >

                            Book Appointment

                            <FaArrowRight />

                        </button>

                    </div>

                </aside>

            </div>


            {/*BOTTOM NAVIGATION */}

              
           
            <div className="facility-detail-bottom-navigation">


                {previousFacility ? (

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/facility/${previousFacility.id}`
                            )
                        }
                    >

                        <FaArrowLeft />

                        <span>
                            {previousFacility.name}
                        </span>

                    </button>

                ) : (

                    <span></span>

                )}


                <button
                    type="button"
                    onClick={() => navigate("/facility")}
                >

                    All Facilities

                </button>


                {nextFacility ? (

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/facility/${nextFacility.id}`
                            )
                        }
                    >

                        <span>
                            {nextFacility.name}
                        </span>

                        <FaArrowRight />

                    </button>

                ) : (

                    <span></span>

                )}

            </div>

        </section>

    );

};


export default FacilityDetails;