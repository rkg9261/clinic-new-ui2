import React, {
    useEffect,
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
    API
} from "../../config/api";


const BlogBlock = () => {

    const navigate = useNavigate();


    /*====================================================
      STATE
    ====================================================*/

    const [
        selectedCategory,
        setSelectedCategory
    ] = useState("ALL");


    /*
      DYNAMIC BLOG DATA
    */

    const [
        blogs,
        setBlogs
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    /*====================================================
      GET AUTH TOKEN
    ====================================================*/

    const getToken = () => {

        return (
            localStorage.getItem("token") ||
            localStorage.getItem("authToken") ||
            localStorage.getItem("accessToken")
        );

    };


    /*====================================================
      FORMAT DATE
    ====================================================*/

    const formatDate = (
        publishedAt
    ) => {

        if (!publishedAt) {

            return "";

        }


        const date =
            new Date(
                publishedAt
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return publishedAt;

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    /*====================================================
      PARSE CONTENT
    ====================================================*/

    const parseContent = (
        content
    ) => {

        if (!content) {

            return {
                intro: "",
                sections: []
            };

        }


        try {

            if (
                typeof content ===
                "object"
            ) {

                return {

                    intro:
                        content.intro ||
                        "",

                    sections:
                        Array.isArray(
                            content.sections
                        )
                            ? content.sections
                            : []

                };

            }


            const parsed =
                JSON.parse(
                    content
                );


            return {

                intro:
                    parsed?.intro ||
                    "",

                sections:
                    Array.isArray(
                        parsed?.sections
                    )
                        ? parsed.sections
                        : []

            };

        } catch {

            return {

                intro:
                    content || "",

                sections: []

            };

        }

    };


    /*====================================================
      CONVERT API BLOG
    ====================================================*/

    const convertBlog = (
        blog
    ) => {

        const content =
            parseContent(
                blog.content
            );


        return {

            ...blog,

            /*
              API featuredImage
              becomes existing
              frontend image field
            */

            image:
                blog.featuredImage ||
                blog.image ||
                "",


            /*
              API shortDescription
              becomes existing
              frontend subtitle
            */

            subtitle:
                blog.shortDescription ||
                blog.subtitle ||
                "",


            /*
              API publishedAt
              becomes existing
              frontend date
            */

            date:
                formatDate(
                    blog.publishedAt ||
                    blog.date
                ),


            /*
              Existing detail
              structure
            */

            intro:
                content.intro,

            sections:
                content.sections,

        };

    };


    /*====================================================
      GET BLOG LIST
    ====================================================*/

    const fetchBlogs = async () => {

        try {

            setLoading(true);

            setError("");


            const token =
                getToken();


            console.log(
                "BLOG LIST TOKEN:",
                token
            );


            if (!token) {

                throw new Error(
                    "Unauthorized. Token missing. Please login again."
                );

            }


            /*================================================
              GET /api/blogs
            =================================================*/

            const response =
                await fetch(
                    API.BLOGS,
                    {

                        method: "GET",

                        headers: {

                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json"

                        }

                    }
                );


            /*================================================
              READ RESPONSE
            =================================================*/

            const responseText =
                await response.text();


            let result = null;


            try {

                result =
                    responseText
                        ? JSON.parse(
                            responseText
                        )
                        : null;

            } catch {

                result = {

                    message:
                        responseText

                };

            }


            console.log(
                "BLOG GET API RESPONSE:",
                result
            );


            /*================================================
              UNAUTHORIZED
            =================================================*/

            if (
                response.status ===
                401
            ) {

                throw new Error(
                    "Unauthorized. Your login token is missing or expired. Please login again."
                );

            }


            /*================================================
              OTHER ERROR
            =================================================*/

            if (
                !response.ok
            ) {

                throw new Error(

                    result?.message ||

                    result?.error ||

                    result?.title ||

                    "Failed to fetch blogs."

                );

            }


            /*================================================
              RESPONSE DATA
            =================================================*/

            let apiBlogs = [];


            if (
                Array.isArray(
                    result
                )
            ) {

                apiBlogs =
                    result;

            } else if (
                Array.isArray(
                    result?.data
                )
            ) {

                apiBlogs =
                    result.data;

            } else if (
                Array.isArray(
                    result?.blogs
                )
            ) {

                apiBlogs =
                    result.blogs;

            } else if (
                Array.isArray(
                    result?.data?.blogs
                )
            ) {

                apiBlogs =
                    result.data.blogs;

            }


            /*================================================
              CONVERT API DATA
            =================================================*/

            const convertedBlogs =
                apiBlogs.map(
                    (blog) =>
                        convertBlog(
                            blog
                        )
                );


            setBlogs(
                convertedBlogs
            );


        } catch (error) {

            console.error(
                "Blog API Error:",
                error
            );


            setError(
                error.message ||
                "Unable to load blogs."
            );


            setBlogs([]);

        } finally {

            setLoading(false);

        }

    };


    /*====================================================
      GET BLOGS FROM API
    ====================================================*/

    useEffect(() => {

        fetchBlogs();

    }, []);


    /*====================================================
      GET UNIQUE CATEGORIES
    ====================================================*/

    const categories = useMemo(() => {

        return [
            ...new Set(
                blogs
                    .map(
                        (blog) =>
                            blog.category
                    )
                    .filter(Boolean)
            )
        ];

    }, [blogs]);


    /*====================================================
      FILTER BLOGS
    ====================================================*/

    const filteredBlogs = useMemo(() => {

        if (
            selectedCategory ===
            "ALL"
        ) {

            return blogs;

        }


        return blogs.filter(
            (blog) =>
                blog.category ===
                selectedCategory
        );

    }, [
        selectedCategory,
        blogs
    ]);


    /*====================================================
      CATEGORY COUNT
    ====================================================*/

    const getCategoryCount = (
        category
    ) => {

        return blogs.filter(
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


    /*====================================================
      LOADING
    ====================================================*/

    if (loading) {

        return (

            <section className="blog-block-section">

                <div className="blog-block-no-results">

                    <FaBookOpen />

                    <h3>
                        Loading Blogs
                    </h3>

                    <p>
                        Please wait while blogs are loading.
                    </p>

                </div>

            </section>

        );

    }


    /*====================================================
      ERROR
    ====================================================*/

    if (error) {

        return (

            <section className="blog-block-section">

                <div className="blog-block-no-results">

                    <FaBookOpen />

                    <h3>
                        Unable to Load Blogs
                    </h3>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"

                        onClick={
                            fetchBlogs
                        }
                    >

                        Try Again

                    </button>

                </div>

            </section>

        );

    }


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
                            {blogs.length}
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