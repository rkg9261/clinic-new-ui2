import React, { useMemo, useState } from "react";
import "./Facility.css";

import { therapyData } from "../../Components/Therapy/therapyData";

import { useNavigate } from "react-router-dom";

import {
    FaCheckCircle,
    FaSearch,
    FaFilter,
    FaChevronRight,
    FaStethoscope,
    FaHeartbeat,
    FaTimes,
    FaArrowRight
} from "react-icons/fa";


const Facility = () => {

    const navigate = useNavigate();


    /*====================================================
      STATE
    ====================================================*/

    const [selectedFilter, setSelectedFilter] = useState("ALL");

    const [searchTerm, setSearchTerm] = useState("");


    /*====================================================
      CREATE FILTER CATEGORIES
    ====================================================*/

    const filterCategories = useMemo(() => {

        const allUses = therapyData.flatMap(
            (item) => item.uses
        );

        return [
            ...new Set(allUses)
        ].sort();

    }, []);


    /*====================================================
      FILTER DATA
    ====================================================*/

    const filteredFacilities = useMemo(() => {

        return therapyData.filter((item) => {

            const matchesCategory =
                selectedFilter === "ALL" ||
                item.uses.includes(selectedFilter);


            const searchValue =
                searchTerm
                    .toLowerCase()
                    .trim();


            const matchesSearch =
                !searchValue ||

                item.name
                    .toLowerCase()
                    .includes(searchValue) ||

                item.shortName
                    .toLowerCase()
                    .includes(searchValue) ||

                item.description
                    .toLowerCase()
                    .includes(searchValue) ||

                item.uses.some((use) =>
                    use
                        .toLowerCase()
                        .includes(searchValue)
                );


            return (
                matchesCategory &&
                matchesSearch
            );

        });

    }, [
        selectedFilter,
        searchTerm
    ]);


    /*====================================================
      FILTER CLICK
    ====================================================*/

    const handleFilter = (category) => {

        setSelectedFilter(category);

    };


    /*====================================================
      OPEN FACILITY DETAILS
    ====================================================*/

    const openFacilityDetails = (facilityId) => {

        navigate(
            `/facility/${facilityId}`
        );

    };


    /*====================================================
      CLEAR FILTERS
    ====================================================*/

    const clearFilters = () => {

        setSelectedFilter("ALL");

        setSearchTerm("");

    };


    /*====================================================
      RETURN
    ====================================================*/

    return (

        <section className="facility-page">


            {/*================================================
              BACKGROUND DECORATION
            ================================================*/}

            <div
                className="
                    facility-bg-circle
                    facility-bg-circle-one
                "
            ></div>


            <div
                className="
                    facility-bg-circle
                    facility-bg-circle-two
                "
            ></div>


            <div
                className="
                    facility-bg-circle
                    facility-bg-circle-three
                "
            ></div>


            <div
                className="
                    facility-bubble
                    facility-bubble-one
                "
            ></div>


            <div
                className="
                    facility-bubble
                    facility-bubble-two
                "
            ></div>


            <div
                className="
                    facility-bubble
                    facility-bubble-three
                "
            ></div>


            <div
                className="
                    facility-bubble
                    facility-bubble-four
                "
            ></div>


            {/*================================================
              HEADER
            ================================================*/}

            <div className="facility-header">

                <div className="facility-header-content">


                    <span className="facility-mini-title">

                        ADVANCED PHYSIOTHERAPY FACILITIES

                    </span>


                    <h1>

                        Modern Facilities for

                        <span>
                            {" "}Better Recovery
                        </span>

                    </h1>


                    <p>

                        Explore our advanced physiotherapy
                        modalities and rehabilitation facilities
                        designed to support faster, safer and
                        more comfortable recovery.

                    </p>


                </div>

            </div>


            {/*================================================
              MAIN CONTENT
            ================================================*/}

            <div className="facility-container">


                {/*================================================
                  LEFT FILTER
                ================================================*/}

                <aside className="facility-filter-panel">


                    {/* FILTER HEADING */}

                    <div className="facility-filter-heading">


                        <div className="facility-filter-icon">

                            <FaFilter />

                        </div>


                        <div>

                            <span>
                                EXPLORE
                            </span>

                            <h3>
                                Facilities
                            </h3>

                        </div>


                    </div>


                    {/*================================================
                      SEARCH
                    ================================================*/}

                    <div className="facility-search">

                        <FaSearch />


                        <input
                            type="text"
                            placeholder="Search facility..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }
                        />


                        {searchTerm && (

                            <button
                                type="button"
                                onClick={() =>
                                    setSearchTerm("")
                                }
                                aria-label="Clear search"
                            >

                                <FaTimes />

                            </button>

                        )}

                    </div>


                    {/*================================================
                      FILTER LIST
                    ================================================*/}

                    <div className="facility-filter-list">


                        {/* ALL FACILITIES */}

                        <button
                            type="button"
                            className={`
                                facility-filter-item
                                ${
                                    selectedFilter === "ALL"
                                        ? "active"
                                        : ""
                                }
                            `}
                            onClick={() =>
                                handleFilter("ALL")
                            }
                        >

                            <span className="facility-filter-left">

                                <FaStethoscope />

                                <span>
                                    All Facilities
                                </span>

                            </span>


                            <span className="facility-filter-count">

                                {therapyData.length}

                            </span>

                        </button>


                        {/*================================================
                          CATEGORY FILTERS
                        ================================================*/}

                        {filterCategories.map(
                            (category) => {


                                const count =
                                    therapyData.filter(
                                        (item) =>
                                            item.uses.includes(
                                                category
                                            )
                                    ).length;


                                return (

                                    <button
                                        key={category}
                                        type="button"
                                        className={`
                                            facility-filter-item
                                            ${
                                                selectedFilter ===
                                                category
                                                    ? "active"
                                                    : ""
                                            }
                                        `}
                                        onClick={() =>
                                            handleFilter(
                                                category
                                            )
                                        }
                                    >


                                        <span className="facility-filter-left">

                                            <FaChevronRight />

                                            <span>
                                                {category}
                                            </span>

                                        </span>


                                        <span className="facility-filter-count">

                                            {count}

                                        </span>


                                    </button>

                                );

                            }
                        )}

                    </div>


                    {/*================================================
                      FILTER NOTE
                    ================================================*/}

                    <div className="facility-filter-note">

                        <FaHeartbeat />

                        <p>

                            Choose a treatment area to
                            discover suitable facilities.

                        </p>

                    </div>


                </aside>


                {/*================================================
                  RIGHT CONTENT
                ================================================*/}

                <div className="facility-content">


                    {/*================================================
                      CONTENT TOP
                    ================================================*/}

                    <div className="facility-content-top">


                        <div>

                            <span className="facility-results-label">

                                {selectedFilter === "ALL"
                                    ? "ALL FACILITIES"
                                    : selectedFilter.toUpperCase()
                                }

                            </span>


                            <h2>

                                {selectedFilter === "ALL"
                                    ? "Our Advanced Facilities"
                                    : `${selectedFilter} Facilities`
                                }

                            </h2>

                        </div>


                        {/* RESULT COUNT */}

                        <div className="facility-result-count">

                            <strong>

                                {filteredFacilities.length}

                            </strong>


                            <span>

                                {filteredFacilities.length === 1
                                    ? "Facility"
                                    : "Facilities"
                                }

                            </span>

                        </div>


                    </div>


                    {/*================================================
                      FACILITY GRID
                    ================================================*/}

                    {filteredFacilities.length > 0 ? (

                        <div className="facility-grid">


                            {filteredFacilities.map(
                                (item, index) => (

                                    <article
                                        key={item.id}
                                        className="facility-card"
                                        style={{
                                            animationDelay:
                                                `${index * 0.08}s`
                                        }}
                                        onClick={() =>
                                            openFacilityDetails(
                                                item.id
                                            )
                                        }
                                    >


                                        {/*================================================
                                          CARD NUMBER
                                        ================================================*/}

                                        <div className="facility-card-number">

                                            {String(item.id)
                                                .padStart(
                                                    2,
                                                    "0"
                                                )}

                                        </div>


                                        {/*================================================
                                          IMAGE
                                        ================================================*/}

                                        <div className="facility-card-image">


                                            <div className="facility-image-glow"></div>


                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />


                                        </div>


                                        {/*================================================
                                          CARD CONTENT
                                        ================================================*/}

                                        <div className="facility-card-content">


                                            {/* TAG */}

                                            <span className="facility-card-tag">

                                                {item.shortName}

                                            </span>


                                            {/* NAME */}

                                            <h3>

                                                {item.name}

                                            </h3>


                                            {/* DESCRIPTION */}

                                            <p>

                                                {item.description}

                                            </p>


                                            {/*================================================
                                              USES
                                            ================================================*/}

                                            <div className="facility-use-list">


                                                {item.uses
                                                    .slice(0, 3)
                                                    .map(
                                                        (
                                                            use,
                                                            useIndex
                                                        ) => (

                                                            <span
                                                                key={
                                                                    useIndex
                                                                }
                                                            >

                                                                <FaCheckCircle />

                                                                {use}

                                                            </span>

                                                        )
                                                    )}


                                            </div>


                                            {/*================================================
                                              EXPLORE BUTTON
                                            ================================================*/}

                                            <button
                                                type="button"
                                                className="facility-read-more"
                                                onClick={(e) => {

                                                    e.stopPropagation();

                                                    openFacilityDetails(
                                                        item.id
                                                    );

                                                }}
                                            >

                                                <span>

                                                    Explore Facility

                                                </span>


                                                <FaArrowRight />

                                            </button>


                                        </div>


                                    </article>

                                )
                            )}


                        </div>

                    ) : (


                        /*================================================
                          NO RESULT
                        ================================================*/

                        <div className="facility-no-result">


                            <div className="facility-no-result-icon">

                                <FaSearch />

                            </div>


                            <h3>

                                No Facilities Found

                            </h3>


                            <p>

                                We couldn't find a facility
                                matching your selected filter
                                or search.

                            </p>


                            <button
                                type="button"
                                onClick={clearFilters}
                            >

                                View All Facilities

                            </button>


                        </div>

                    )}


                </div>


            </div>


        </section>

    );

};


export default Facility;