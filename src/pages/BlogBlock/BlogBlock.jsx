import React, {
    useMemo,
    useState
} from "react";

import "./BlogBlock.css";

import {
    FaFilter,
    FaArrowRight,
    FaBookOpen,
    FaCalendarAlt
} from "react-icons/fa";

import {
    useNavigate
} from "react-router-dom";

import {
    blogData
} from "./blogblockData";


const BlogBlock = () => {

    const navigate = useNavigate();


    /*====================================================
      STATE
    ====================================================*/

    const [
        selectedCategory,
        setSelectedCategory
    ] = useState("ALL");


    /*====================================================
      GET UNIQUE CATEGORIES
    ====================================================*/

    const categories = useMemo(() => {

        return [
            ...new Set(
                blogData.map(
                    (blog) =>
                        blog.category
                )
            )
        ];

    }, []);


    /*====================================================
      FILTER BLOGS
    ====================================================*/

    const filteredBlogs = useMemo(() => {

        if (
            selectedCategory === "ALL"
        ) {

            return blogData;

        }

        return blogData.filter(
            (blog) =>
                blog.category ===
                selectedCategory
        );

    }, [selectedCategory]);


    /*====================================================
      CATEGORY COUNT
    ====================================================*/

    const getCategoryCount = (
        category
    ) => {

        return blogData.filter(
            (blog) =>
                blog.category ===
                category
        ).length;

    };


    /*====================================================
      OPEN BLOG DETAIL
    ====================================================*/

    const openBlog = (blog) => {

        navigate(
            `/blog/${blog.id}`
        );

    };


    return (

        <section className="blog-block-section">


            {/*================================================
              BACKGROUND BLOBS
            =================================================*/}

            <div
                className="
                    blog-block-blob
                    blog-block-blob-1
                "
            ></div>


            <div
                className="
                    blog-block-blob
                    blog-block-blob-2
                "
            ></div>


            {/*================================================
              FLOATING BUBBLES
            =================================================*/}

            <span
                className="
                    blog-block-bubble
                    blog-block-b1
                "
            ></span>


            <span
                className="
                    blog-block-bubble
                    blog-block-b2
                "
            ></span>


            <span
                className="
                    blog-block-bubble
                    blog-block-b3
                "
            ></span>


            <span
                className="
                    blog-block-bubble
                    blog-block-b4
                "
            ></span>


            {/*================================================
              HEADER
            =================================================*/}

            <div className="blog-block-header">

                <div className="
                    blog-block-header-content
                ">

                    <p className="
                        blog-block-subtitle
                    ">

                        LATEST BLOGS

                    </p>


                    <h1 className="
                        blog-block-title
                    ">

                        Health Tips &amp; Insights

                    </h1>


                    <p className="
                        blog-block-description
                    ">

                        Explore our physiotherapy tips,
                        recovery guidance, exercise advice
                        and expert health insights.

                    </p>

                </div>

            </div>


            {/*================================================
              MAIN LAYOUT
            =================================================*/}

            <div className="
                blog-block-layout
            ">


                {/*================================================
                  LEFT FILTER
                =================================================*/}

                <aside className="
                    blog-block-filter
                ">


                    <div className="
                        blog-block-filter-header
                    ">

                        <div className="
                            blog-block-filter-icon
                        ">

                            <FaFilter />

                        </div>


                        <div>

                            <h3>
                                Blog Categories
                            </h3>

                            <span>
                                Filter by topic
                            </span>

                        </div>

                    </div>


                    {/*================================================
                      ALL BLOGS
                    =================================================*/}

                    <button
                        type="button"

                        className={`
                            blog-block-filter-button
                            ${
                                selectedCategory ===
                                "ALL"
                                    ? "active-blog-block-filter"
                                    : ""
                            }
                        `}

                        onClick={() =>
                            setSelectedCategory(
                                "ALL"
                            )
                        }
                    >

                        <span>
                            All Blogs
                        </span>

                        <strong>
                            {blogData.length}
                        </strong>

                    </button>


                    {/*================================================
                      CATEGORY BUTTONS
                    =================================================*/}

                    <div className="
                        blog-block-category-list
                    ">

                        {categories.map(
                            (category) => (

                                <button
                                    type="button"

                                    key={category}

                                    className={`
                                        blog-block-filter-button
                                        ${
                                            selectedCategory ===
                                            category
                                                ? "active-blog-block-filter"
                                                : ""
                                        }
                                    `}

                                    onClick={() =>
                                        setSelectedCategory(
                                            category
                                        )
                                    }
                                >

                                    <span>
                                        {category}
                                    </span>

                                    <strong>
                                        {
                                            getCategoryCount(
                                                category
                                            )
                                        }
                                    </strong>

                                </button>

                            )
                        )}

                    </div>


                    {/*================================================
                      FILTER INFORMATION
                    =================================================*/}

                    <div className="
                        blog-block-filter-info
                    ">

                        <FaBookOpen />

                        <p>

                            Select a category to
                            discover related health
                            and physiotherapy articles.

                        </p>

                    </div>

                </aside>


                {/*================================================
                  RIGHT CONTENT
                =================================================*/}

                <div className="
                    blog-block-content
                ">


                    {/*================================================
                      RESULTS HEADER
                    =================================================*/}

                    <div className="
                        blog-block-results-header
                    ">

                        <div>

                            <span>
                                Showing blogs from
                            </span>

                            <h2>

                                {
                                    selectedCategory ===
                                    "ALL"
                                        ? "All Categories"
                                        : selectedCategory
                                }

                            </h2>

                        </div>


                        <div className="
                            blog-block-result-count
                        ">

                            {filteredBlogs.length}

                            <span>

                                {
                                    filteredBlogs.length ===
                                    1
                                        ? " Article"
                                        : " Articles"
                                }

                            </span>

                        </div>

                    </div>


                    {/*================================================
                      BLOG GRID
                    =================================================*/}

                    {filteredBlogs.length > 0 ? (

                        <div className="
                            blog-block-grid
                        ">

                            {filteredBlogs.map(
                                (blog, index) => (

                                    <article
                                        className="
                                            blog-block-card
                                        "

                                        key={blog.id}

                                        style={{
                                            animationDelay:
                                                `${index * 0.08}s`
                                        }}
                                    >

                                        <div className="
                                            blog-block-card-inner
                                        ">


                                            {/* IMAGE */}

                                            <div className="
                                                blog-block-image-box
                                            ">

                                                <span className="
                                                    blog-block-shine
                                                "></span>


                                                <img
                                                    src={
                                                        blog.image
                                                    }

                                                    alt={
                                                        blog.title
                                                    }

                                                    className="
                                                        blog-block-image
                                                    "
                                                />


                                                <span className="
                                                    blog-block-category
                                                ">

                                                    {
                                                        blog.category
                                                    }

                                                </span>

                                            </div>


                                            {/* CONTENT */}

                                            <div className="
                                                blog-block-card-content
                                            ">


                                                <div className="
                                                    blog-block-date
                                                ">

                                                    <FaCalendarAlt />

                                                    <span>
                                                        {blog.date}
                                                    </span>

                                                </div>


                                                <h3>
                                                    {blog.title}
                                                </h3>


                                                <p className="
                                                    blog-block-short-description
                                                ">

                                                    {
                                                        blog.subtitle
                                                    }

                                                </p>


                                                {/* READ MORE */}

                                                <button
                                                    type="button"

                                                    className="
                                                        blog-block-read-more
                                                    "

                                                    onClick={() =>
                                                        openBlog(
                                                            blog
                                                        )
                                                    }
                                                >

                                                    Read More

                                                    <FaArrowRight />

                                                </button>

                                            </div>

                                        </div>

                                    </article>

                                )
                            )}

                        </div>

                    ) : (

                        <div className="
                            blog-block-no-results
                        ">

                            <FaBookOpen />

                            <h3>
                                No Blogs Found
                            </h3>

                            <p>
                                No blogs are available
                                for this category.
                            </p>

                            <button
                                type="button"

                                onClick={() =>
                                    setSelectedCategory(
                                        "ALL"
                                    )
                                }
                            >

                                View All Blogs

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </section>

    );

};


export default BlogBlock;