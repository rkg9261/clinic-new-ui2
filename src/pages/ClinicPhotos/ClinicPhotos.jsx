import React, {
  useMemo,
  useState
} from "react";

import "./ClinicPhotos.css";

import { clinicPhotoData } from "./ClinicPhotoData";

import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaFilter,
  FaImages,
  FaChevronRight,
  FaTimes,
  FaArrowRight,
  FaExpand,
  FaHeart,
  FaCamera
} from "react-icons/fa";


const ClinicPhotos = () => {

  const navigate = useNavigate();

  /*  STATES  */
  


  const [selectedCategory, setSelectedCategory] =
    useState("ALL");

  const [searchTerm, setSearchTerm] =
    useState("");


  /*  GET UNIQUE CATEGORIES */
  
 

  const categories = useMemo(() => {

    return [
      ...new Set(
        clinicPhotoData.map(
          (photo) => photo.category
        )
      )
    ];

  }, []);


  /*    FILTER PHOTOS  */



  const filteredPhotos = useMemo(() => {

    return clinicPhotoData.filter((photo) => {

      const categoryMatch =
        selectedCategory === "ALL" ||
        photo.category === selectedCategory;


      const search =
        searchTerm
          .toLowerCase()
          .trim();


      const searchMatch =
        !search ||
        photo.title
          .toLowerCase()
          .includes(search) ||

        photo.category
          .toLowerCase()
          .includes(search) ||

        photo.description
          .toLowerCase()
          .includes(search);


      return (
        categoryMatch &&
        searchMatch
      );

    });

  }, [
    selectedCategory,
    searchTerm
  ]);


  /* CATEGORY COUNT */
   
 

  const getCategoryCount = (category) => {

    return clinicPhotoData.filter(
      (photo) =>
        photo.category === category
    ).length;

  };


  /* OPEN PHOTO DETAILS  */
   


  const openPhotoDetails = (photo) => {

    navigate(
      `/clinic-photos/${photo.id}`
    );

  };


  return (

    <section className="clinic-photos-page">

      {/* BACKGROUND BLOBS  */}
    
       

      <div
        className="
          clinic-photos-blob
          clinic-photos-blob-one
        "
      />

      <div
        className="
          clinic-photos-blob
          clinic-photos-blob-two
        "
      />

      <div
        className="
          clinic-photos-blob
          clinic-photos-blob-three
        "
      />


      {/* BUBBLES*/}
       
      

      <div className="  clinic-photos-bubble  clinic-photos-bubble-one "  />      
       
      <div className=" clinic-photos-bubble  clinic-photos-bubble-two"  />
       
      <div  className=" clinic-photos-bubbleclinic-photos-bubble-three" />
      
      <div
        className="clinic-photos-bubbleclinic-photos-bubble-four "/>

                      {/* HEADER  */}
       
    

      <div className="clinic-photos-header">

        <div className="clinic-photos-header-content">

          <span className="clinic-photos-mini-title">
            OUR CLINIC
          </span>
          <h1> Explore Our
            <span> {" "}Clinic Photos </span>
           </h1>
             
             <p>

            Take a closer look at our modern clinic,
            advanced equipment, treatment environment
            and rehabilitation facilities.

          </p>

        </div>

      </div>


      {/*MAIN CONTAINER*/}
        
      

      <div className="clinic-photos-container">


        {/* LEFT FILTER */}
         
       

        <aside className="clinic-photos-filter-panel">


          {/* FILTER HEADING */}

          <div className="clinic-photos-filter-heading">

            <div className="clinic-photos-filter-icon">

              <FaFilter />

            </div>


            <div>

              <span>
                BROWSE GALLERY
              </span>

              <h3>
                Photo Categories
              </h3>

            </div>

          </div>


          {/* SEARCH */}

          <div className="clinic-photos-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />


            {searchTerm && (

              <button
                type="button"
                onClick={() =>
                  setSearchTerm("")
                }
              >

                <FaTimes />

              </button>

            )}

          </div>


          {/* CATEGORY LIST */}

          <div className="clinic-photos-filter-list">


            {/* ALL PHOTOS */}

            <button
              type="button"
              className={`
                clinic-photos-filter-item
                ${
                  selectedCategory === "ALL"
                    ? "active"
                    : ""
                }
              `}
              onClick={() =>
                setSelectedCategory("ALL")
              }
            >

              <span className="clinic-photos-filter-left">

                <FaImages />

                <span>
                  All Photos
                </span>

              </span>


              <span className="clinic-photos-filter-count">

                {clinicPhotoData.length}

              </span>

            </button>


            {/* CATEGORIES */}

            {categories.map(
              (category) => (

                <button
                  type="button"
                  key={category}
                  className={`
                    clinic-photos-filter-item
                    ${
                      selectedCategory === category
                        ? "active"
                        : ""
                    }
                  `}
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                >

                  <span className="clinic-photos-filter-left">

                    <FaChevronRight />

                    <span>
                      {category}
                    </span>

                  </span>


                  <span className="clinic-photos-filter-count">

                    {getCategoryCount(category)}

                  </span>

                </button>

              )
            )}

          </div>


          {/* FILTER FOOTER */}

          <div className="clinic-photos-filter-footer">

            <FaCamera />

            <p>

              Browse our gallery to see
              the environment where your
              recovery begins.

            </p>

          </div>

        </aside>


        {/*
          RIGHT CONTENT
        */}

        <div className="clinic-photos-content">


          {/* CONTENT HEADER */}

          <div className="clinic-photos-content-top">

            <div>

              <span className="clinic-photos-result-label">

                {selectedCategory === "ALL"
                  ? "COMPLETE GALLERY"
                  : selectedCategory}

              </span>


              <h2>

                {selectedCategory === "ALL"
                  ? "Our Clinic Gallery"
                  : selectedCategory}

              </h2>

            </div>


            <div className="clinic-photos-result-count">

              <strong>
                {filteredPhotos.length}
              </strong>

              <span>

                {filteredPhotos.length === 1
                  ? "Photo"
                  : "Photos"}

              </span>

            </div>

          </div>


          {/*
            PHOTO GRID
          */}

          {filteredPhotos.length > 0 ? (

            <div className="clinic-photos-grid">

              {filteredPhotos.map(
                (photo, index) => (

                  <article
                    key={photo.id}
                    className={`
                      clinic-photo-card
                      clinic-photo-card-${index % 5}
                    `}
                    style={{
                      animationDelay:
                        `${index * 0.08}s`
                    }}
                    onClick={() =>
                      openPhotoDetails(photo)
                    }
                  >


                    {/* IMAGE */}

                    <div className="clinic-photo-image">

                      <img
                        src={photo.image}
                        alt={photo.title}
                        loading="lazy"
                      />


                      {/* IMAGE OVERLAY */}

                      <div className="clinic-photo-overlay">

                        <div className="clinic-photo-expand">

                          <FaExpand />

                        </div>

                      </div>


                      {/* CATEGORY */}

                      <span className="clinic-photo-category">

                        {photo.category}

                      </span>


                      {/* HEART */}

                      <div className="clinic-photo-heart">

                        <FaHeart />

                      </div>

                    </div>


                    {/* CARD CONTENT */}

                    <div className="clinic-photo-card-content">

                      <span className="clinic-photo-small-label">

                        CLINIC GALLERY

                      </span>


                      <h3>
                        {photo.title}
                      </h3>


                      <p>
                        {photo.description}
                      </p>


                      {/* VIEW DETAILS */}

                      <button
                        type="button"
                        onClick={(event) => {

                          event.stopPropagation();

                          openPhotoDetails(photo);

                        }}
                      >

                        <span>
                          View Photo
                        </span>

                        <FaArrowRight />

                      </button>

                    </div>

                  </article>

                )
              )}

            </div>

          ) : (

            /*
              EMPTY
            */

            <div className="clinic-photos-empty">

              <div className="clinic-photos-empty-icon">

                <FaSearch />

              </div>


              <h3>
                No Photos Found
              </h3>


              <p>

                We couldn't find any photos
                matching your search or category.

              </p>


              <button
                type="button"
                onClick={() => {

                  setSelectedCategory("ALL");

                  setSearchTerm("");

                }}
              >

                View All Photos

              </button>

            </div>

          )}

        </div>

      </div>

    </section>

  );

};


export default ClinicPhotos;