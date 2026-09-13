import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    FaCalendarAlt,
    FaArrowRight,
    FaBookOpen,
    FaFilter
} from "react-icons/fa";

import "./BlogBlock.css";

import {
    API
} from "../../config/api";

import {
    getAuthHeaders
} from "../../utils/auth";


const BlogBlock = () => {

    const navigate =
        useNavigate();


    /*====================================================
      STATE
    ====================================================*/

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


    const [
        selectedCategory,
        setSelectedCategory
    ] = useState("All");


    const [
        showAll,
        setShowAll
    ] = useState(false);


    /*====================================================
      GET API ORIGIN
    ====================================================*/

    const getApiOrigin = () => {

        try {

            return new URL(
                API.BLOGS
            ).origin;

        } catch {

            return "";

        }

    };


    /*====================================================
      CHECK BASE64
    ====================================================*/

    const isBase64Image = (
        value
    ) => {

        if (
            !value ||
            typeof value !== "string"
        ) {

            return false;

        }


        if (
            value.startsWith(
                "http://"
            ) ||
            value.startsWith(
                "https://"
            ) ||
            value.startsWith(
                "blob:"
            ) ||
            value.startsWith(
                "/"
            )
        ) {

            return false;

        }


        const cleanValue =
            value.replace(
                /\s/g,
                ""
            );


        return (
            cleanValue.length > 100 &&
            /^[A-Za-z0-9+/]+={0,2}$/.test(
                cleanValue
            )
        );

    };


    /*====================================================
      IMAGE URL HANDLER
    ====================================================*/

    const getImageUrl = (
        imageValue
    ) => {

        if (
            imageValue === null ||
            imageValue === undefined
        ) {

            return "";

        }


        /*================================================
          OBJECT
        =================================================*/

        if (
            typeof imageValue === "object"
        ) {

            return getImageUrl(

                imageValue.featured_image ||

                imageValue.featuredImage ||

                imageValue.image ||

                imageValue.image_url ||

                imageValue.imageUrl ||

                imageValue.url ||

                imageValue.src ||

                imageValue.path ||

                imageValue.file_path ||

                imageValue.filePath ||

                imageValue.location ||

                ""

            );

        }


        /*================================================
          STRING
        =================================================*/

        let image =
            String(
                imageValue
            ).trim();


        if (!image) {

            return "";

        }


        /*================================================
          REMOVE QUOTES
        =================================================*/

        if (
            (
                image.startsWith('"') &&
                image.endsWith('"')
            ) ||
            (
                image.startsWith("'") &&
                image.endsWith("'")
            )
        ) {

            image =
                image.slice(
                    1,
                    -1
                ).trim();

        }


        /*================================================
          DATA IMAGE BASE64
        =================================================*/

        if (
            /^data:image\/[^;]+;base64,/i.test(
                image
            )
        ) {

            /*
              IMPORTANT:

              Do not use encodeURIComponent().
              Do not decode Base64.

              Browser can directly display it.
            */

            const commaIndex =
                image.indexOf(",");


            if (
                commaIndex !== -1
            ) {

                const prefix =
                    image.substring(
                        0,
                        commaIndex
                    );


                const base64 =
                    image
                        .substring(
                            commaIndex + 1
                        )
                        .replace(
                            /\s/g,
                            ""
                        );


                return (
                    prefix +
                    "," +
                    base64
                );

            }


            return image;

        }


        /*================================================
          BASE64 WITHOUT PREFIX
        =================================================*/

        if (
            isBase64Image(
                image
            )
        ) {

            return (
                "data:image/jpeg;base64," +
                image.replace(
                    /\s/g,
                    ""
                )
            );

        }


        /*================================================
          HTTP URL
        =================================================*/

        if (
            image.startsWith(
                "http://"
            ) ||
            image.startsWith(
                "https://"
            )
        ) {

            return image;

        }


        /*================================================
          BLOB
        =================================================*/

        if (
            image.startsWith(
                "blob:"
            )
        ) {

            return image;

        }


        /*================================================
          RELATIVE PATH
        =================================================*/

        const apiOrigin =
            getApiOrigin();


        if (
            image.startsWith("/")
        ) {

            return (
                apiOrigin +
                image
            );

        }


        if (
            image.startsWith("./")
        ) {

            image =
                image.substring(
                    2
                );

        }


        return (
            apiOrigin +
            "/" +
            image
        );

    };


    /*====================================================
      FORMAT DATE
    ====================================================*/

    const formatPublishedAt = (
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

            return String(
                publishedAt
            );

        }


        const datePart =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );


        const timePart =
            date.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                }
            );


        return (
            `${datePart} • ${timePart}`
        );

    };


    /*====================================================
      READ TIME
    ====================================================*/

    const calculateReadTime = (
        content
    ) => {

        if (!content) {

            return "1 min read";

        }


        let text = "";


        if (
            typeof content === "string"
        ) {

            text =
                content;

        } else {

            text =
                JSON.stringify(
                    content
                );

        }


        let words =
            text
                .replace(
                    /[{}[\]":,]/g,
                    " "
                )
                .split(
                    /\s+/
                )
                .filter(
                    Boolean
                )
                .length;


        const minutes =
            Math.max(
                1,
                Math.ceil(
                    words / 200
                )
            );


        return (
            `${minutes} min read`
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

                sections: [],

                paragraphs: []

            };

        }


        /*================================================
          OBJECT
        =================================================*/

        if (
            typeof content === "object"
        ) {

            const sections =
                Array.isArray(
                    content.sections
                )
                    ? content.sections
                    : [];


            const paragraphs =
                Array.isArray(
                    content.paragraphs
                )
                    ? content.paragraphs
                    : sections.flatMap(
                        (
                            section
                        ) =>
                            Array.isArray(
                                section.paragraphs
                            )
                                ? section.paragraphs
                                : []
                    );


            return {

                intro:
                    content.intro ||
                    "",

                sections:
                    sections,

                paragraphs:
                    paragraphs

            };

        }


        /*================================================
          JSON STRING
        ====================================================*/

        if (
            typeof content === "string"
        ) {

            try {

                const parsed =
                    JSON.parse(
                        content
                    );


                if (
                    parsed &&
                    typeof parsed === "object"
                ) {

                    const sections =
                        Array.isArray(
                            parsed.sections
                        )
                            ? parsed.sections
                            : [];


                    const paragraphs =
                        Array.isArray(
                            parsed.paragraphs
                        )
                            ? parsed.paragraphs
                            : sections.flatMap(
                                (
                                    section
                                ) =>
                                    Array.isArray(
                                        section.paragraphs
                                    )
                                        ? section.paragraphs
                                        : []
                            );


                    return {

                        intro:
                            parsed.intro ||
                            "",

                        sections:
                            sections,

                        paragraphs:
                            paragraphs

                    };

                }

            } catch {

                return {

                    intro:
                        content,

                    sections: [],

                    paragraphs: [
                        content
                    ]

                };

            }

        }


        return {

            intro: "",

            sections: [],

            paragraphs: []

        };

    };


    /*====================================================
      CONVERT API BLOG
    ====================================================*/

    const convertBlog = (
        apiBlog
    ) => {

        if (!apiBlog) {

            return null;

        }


        /*================================================
          EXACT API FIELDS
        =================================================*/

        const id =
            apiBlog.id;


        const title =
            apiBlog.title ||
            "";


        const slug =
            apiBlog.slug ||
            "";


        const shortDescription =
            apiBlog.short_description ??
            apiBlog.shortDescription ??
            "";


        const content =
            apiBlog.content ??
            "";


        /*================================================
          IMPORTANT IMAGE FIELD

          GET API:

          featured_image
        =================================================*/

        const featuredImage =
            apiBlog.featured_image ??
            apiBlog.featuredImage ??
            apiBlog.image ??
            apiBlog.image_url ??
            apiBlog.imageUrl ??
            apiBlog.url ??
            "";


        const isActive =
            apiBlog.is_active ??
            apiBlog.isActive;


        const publishedAt =
            apiBlog.published_at ??
            apiBlog.publishedAt ??
            "";


        const createdAt =
            apiBlog.created_at ??
            apiBlog.createdAt ??
            "";


        const updatedAt =
            apiBlog.updated_at ??
            apiBlog.updatedAt ??
            "";


        /*================================================
          CONTENT
        ====================================================*/

        const parsedContent =
            parseContent(
                content
            );


        /*================================================
          IMAGE
        ====================================================*/

        const image =
            getImageUrl(
                featuredImage
            );


        console.log(
            "===================================="
        );

        console.log(
            "BLOG BLOCK IMAGE"
        );

        console.log(
            "BLOG ID:",
            id
        );

        console.log(
            "FEATURED IMAGE:",
            featuredImage
        );

        console.log(
            "FINAL IMAGE:",
            image
        );

        console.log(
            "IMAGE LENGTH:",
            image.length
        );

        console.log(
            "IS BASE64:",
            image.startsWith(
                "data:image/"
            )
        );

        console.log(
            "===================================="
        );


        return {

            id:
                id,

            branch_id:
                apiBlog.branch_id ??
                apiBlog.branchId ??
                null,

            title:
                title,

            slug:
                slug,

            short_description:
                shortDescription,

            content:
                content,

            featured_image:
                featuredImage,

            is_active:
                isActive,

            published_at:
                publishedAt,

            created_at:
                createdAt,

            updated_at:
                updatedAt,


            /*============================================
              FRONTEND FIELDS
            ============================================*/

            category:
                apiBlog.category ||
                apiBlog.category_name ||
                title ||
                "Physiotherapy",

            image:
                image,

            shortDescription:
                shortDescription,

            date:
                formatPublishedAt(
                    publishedAt
                ),

            readTime:
                calculateReadTime(
                    content
                ),

            intro:
                parsedContent.intro,

            sections:
                parsedContent.sections,

            paragraphs:
                parsedContent.paragraphs

        };

    };


    /*====================================================
      EXTRACT BLOG ARRAY
    ====================================================*/

    const extractBlogs = (
        result
    ) => {

        if (
            Array.isArray(
                result
            )
        ) {

            return result;

        }


        if (
            Array.isArray(
                result?.data
            )
        ) {

            return result.data;

        }


        if (
            Array.isArray(
                result?.blogs
            )
        ) {

            return result.blogs;

        }


        if (
            Array.isArray(
                result?.data?.blogs
            )
        ) {

            return result.data.blogs;

        }


        if (
            Array.isArray(
                result?.result
            )
        ) {

            return result.result;

        }


        if (
            Array.isArray(
                result?.result?.data
            )
        ) {

            return result.result.data;

        }


        if (
            Array.isArray(
                result?.result?.blogs
            )
        ) {

            return result.result.blogs;

        }


        return [];

    };


    /*====================================================
      FETCH BLOGS
    ====================================================*/

    const fetchBlogs = async () => {

        try {

            setLoading(
                true
            );

            setError("");


            /*============================================
              AUTH
            ============================================*/

            const authHeaders =
                getAuthHeaders();


            console.log(
                "BLOG BLOCK AUTH HEADERS:",
                authHeaders
            );


            if (!authHeaders) {

                throw new Error(
                    "Unauthorized. Token missing. Please login again."
                );

            }


            /*============================================
              GET API
            ============================================*/

            console.log(
                "===================================="
            );

            console.log(
                "GET BLOG LIST"
            );

            console.log(
                "URL:",
                API.BLOGS
            );

            console.log(
                "===================================="
            );


            const response =
                await fetch(
                    API.BLOGS,
                    {

                        method:
                            "GET",

                        headers: {

                            ...authHeaders,

                            Accept:
                                "application/json"

                        }

                    }
                );


            /*============================================
              RESPONSE
            ============================================*/

            const responseText =
                await response.text();


            console.log(
                "BLOG BLOCK RESPONSE TEXT:",
                responseText
            );


            let result =
                null;


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
                "BLOG BLOCK API RESPONSE:",
                result
            );


            /*============================================
              401
            ============================================*/

            if (
                response.status === 401
            ) {

                throw new Error(
                    "Unauthorized. Your login token is missing or expired. Please login again."
                );

            }


            /*============================================
              OTHER ERROR
            ============================================*/

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


            /*============================================
              EXTRACT
            ============================================*/

            const apiBlogs =
                extractBlogs(
                    result
                );


            console.log(
                "BLOG BLOCK API BLOG COUNT:",
                apiBlogs.length
            );


            /*============================================
              CONVERT
            ============================================*/

            const convertedBlogs =
                apiBlogs
                    .map(
                        (
                            item
                        ) =>
                            convertBlog(
                                item
                            )
                    )
                    .filter(
                        Boolean
                    )
                    .filter(
                        (
                            item
                        ) =>
                            item.is_active !== false
                    );


            console.log(
                "BLOG BLOCK FINAL BLOGS:",
                convertedBlogs
            );


            setBlogs(
                convertedBlogs
            );

        } catch (
            fetchError
        ) {

            console.error(
                "BLOG BLOCK API ERROR:",
                fetchError
            );


            setError(
                fetchError.message ||
                "Unable to load blogs."
            );


            setBlogs(
                []
            );

        } finally {

            setLoading(
                false
            );

        }

    };


    /*====================================================
      LOAD BLOGS
    ====================================================*/

    useEffect(() => {

        fetchBlogs();

    }, []);


    /*====================================================
      CATEGORIES
    ====================================================*/

    const categories =
        useMemo(
            () => {

                const values =
                    blogs
                        .map(
                            (
                                blog
                            ) =>
                                blog.category
                        )
                        .filter(
                            Boolean
                        );


                return [
                    "All",
                    ...Array.from(
                        new Set(
                            values
                        )
                    )
                ];

            },
            [
                blogs
            ]
        );


    /*====================================================
      FILTER BLOGS
    ====================================================*/

    const filteredBlogs =
        useMemo(
            () => {

                if (
                    selectedCategory ===
                    "All"
                ) {

                    return blogs;

                }


                return blogs.filter(
                    (
                        blog
                    ) =>
                        blog.category ===
                        selectedCategory
                );

            },
            [
                blogs,
                selectedCategory
            ]
        );


    /*====================================================
      VISIBLE BLOGS
    ====================================================*/

    const visibleBlogs =
        showAll
            ? filteredBlogs
            : filteredBlogs.slice(
                0,
                6
            );


    /*====================================================
      OPEN BLOG
    ====================================================*/

    const openBlog = (
        blogId
    ) => {

        navigate(
            `/blog/${blogId}`
        );

    };


    /*====================================================
      IMAGE ERROR
    ====================================================*/

    const handleImageError = (
        event,
        currentBlog
    ) => {

        console.error(
            "===================================="
        );

        console.error(
            "BLOG BLOCK IMAGE FAILED"
        );

        console.error(
            "BLOG ID:",
            currentBlog?.id
        );

        console.error(
            "FEATURED IMAGE:",
            currentBlog?.featured_image
        );

        console.error(
            "FINAL IMAGE:",
            currentBlog?.image
        );

        console.error(
            "IMAGE LENGTH:",
            currentBlog?.image?.length
        );

        console.error(
            "SRC:",
            event?.currentTarget?.src
        );

        console.error(
            "===================================="
        );


        if (
            event?.currentTarget
        ) {

            event.currentTarget.style.display =
                "none";

        }

    };


    /*====================================================
      LOADING
    ====================================================*/

    if (
        loading
    ) {

        return (

            <section className="
                blog-block-section
            ">

                <div className="
                    blog-block-header
                ">

                    <div className="
                        blog-block-header-content
                    ">

                        <span className="
                            blog-block-subtitle
                        ">

                            OUR BLOG

                        </span>


                        <h2 className="
                            blog-block-title
                        ">

                            Physiotherapy Insights

                        </h2>


                        <p className="
                            blog-block-description
                        ">

                            Loading our latest
                            physiotherapy articles...

                        </p>

                    </div>

                </div>

            </section>

        );

    }


    return (

        <section className="
            blog-block-section
        ">


            {/*================================================
              BACKGROUND
            =================================================*/}

            <div className="
                blog-block-blob
                blog-block-blob-1
            "></div>


            <div className="
                blog-block-blob
                blog-block-blob-2
            "></div>


            <span className="
                blog-block-bubble
                blog-block-b1
            "></span>


            <span className="
                blog-block-bubble
                blog-block-b2
            "></span>


            <span className="
                blog-block-bubble
                blog-block-b3
            "></span>


            <span className="
                blog-block-bubble
                blog-block-b4
            "></span>


            {/*================================================
              HEADER
            =================================================*/}

            <div className="
                blog-block-header
            ">

                <div className="
                    blog-block-header-content
                ">

                    <span className="
                        blog-block-subtitle
                    ">

                        PHYSIOTHERAPY BLOG

                    </span>


                    <h2 className="
                        blog-block-title
                    ">

                        Expert Guidance for
                        Better Recovery

                    </h2>


                    <p className="
                        blog-block-description
                    ">

                        Explore practical physiotherapy
                        advice, recovery techniques and
                        expert health guidance.

                    </p>

                </div>

            </div>


            {/*================================================
              LAYOUT
            =================================================*/}

            <div className="
                blog-block-layout
            ">


                {/*================================================
                  FILTER
                =================================================*/}

                <aside className="
                    blog-block-filter
                ">


                    <div className="
                        blog-block-filter-header
                    ">

                        <FaFilter className="
                            blog-block-filter-icon
                        " />

                        <span>
                            Categories
                        </span>

                    </div>


                    <div className="
                        blog-block-category-list
                    ">


                        {
                            categories.map(
                                (
                                    category
                                ) => (

                                    <button
                                        key={
                                            category
                                        }

                                        type="button"

                                        className={`
                                            blog-block-filter-button
                                            ${
                                                selectedCategory ===
                                                category
                                                    ? "active-blog-block-filter"
                                                    : ""
                                            }
                                        `}

                                        onClick={() => {

                                            setSelectedCategory(
                                                category
                                            );

                                            setShowAll(
                                                false
                                            );

                                        }}
                                    >

                                        {
                                            category
                                        }

                                    </button>

                                )
                            )
                        }

                    </div>


                    <div className="
                        blog-block-filter-info
                    ">

                        <FaBookOpen />

                        <p>

                            Select a blog title to
                            discover practical
                            physiotherapy articles.

                        </p>

                    </div>

                </aside>


                {/*================================================
                  CONTENT
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

                        <span className="
                            blog-block-result-count
                        ">

                            {
                                filteredBlogs.length
                            }

                            {" "}

                            {
                                filteredBlogs.length === 1
                                    ? "Article"
                                    : "Articles"
                            }

                        </span>

                    </div>


                    {/*================================================
                      ERROR
                    =================================================*/}

                    {
                        error && (

                            <div className="
                                blog-block-no-results
                            ">

                                <FaBookOpen />

                                <p>
                                    {error}
                                </p>

                            </div>

                        )
                    }


                    {/*================================================
                      GRID
                    =================================================*/}

                    {
                        !error &&
                        visibleBlogs.length > 0 && (

                            <div className="
                                blog-block-grid
                            ">


                                {
                                    visibleBlogs.map(
                                        (
                                            blog
                                        ) => (

                                            <article
                                                key={
                                                    blog.id
                                                }

                                                className="
                                                    blog-block-card
                                                "

                                                onClick={() =>
                                                    openBlog(
                                                        blog.id
                                                    )
                                                }
                                            >

                                                <div className="
                                                    blog-block-card-inner
                                                ">


                                                    {/* IMAGE */}

                                                    <div className="
                                                        blog-block-image-box
                                                    ">


                                                        {
                                                            blog.image ? (

                                                                <>

                                                                    <img
                                                                        className="
                                                                            blog-block-image
                                                                        "

                                                                        src={
                                                                            blog.image
                                                                        }

                                                                        alt={
                                                                            blog.title
                                                                        }

                                                                        loading="lazy"

                                                                        onError={(event) => {

                                                                            handleImageError(
                                                                                event,
                                                                                blog
                                                                            );

                                                                        }}

                                                                    />

                                                                    <div className="
                                                                        blog-block-shine
                                                                    "></div>

                                                                </>

                                                            ) : (

                                                                <div
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        minHeight: "220px",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center"
                                                                    }}
                                                                >

                                                                    <FaBookOpen />

                                                                </div>

                                                            )
                                                        }


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

                                                            {
                                                                blog.date
                                                            }

                                                        </div>


                                                        <h3>

                                                            {
                                                                blog.title
                                                            }

                                                        </h3>


                                                        <p className="
                                                            blog-block-short-description
                                                        ">

                                                            {
                                                                blog.shortDescription
                                                            }

                                                        </p>


                                                        <button
                                                            type="button"

                                                            className="
                                                                blog-block-read-more
                                                            "

                                                            onClick={(event) => {

                                                                event.stopPropagation();

                                                                openBlog(
                                                                    blog.id
                                                                );

                                                            }}
                                                        >

                                                            Read More

                                                            <FaArrowRight />

                                                        </button>

                                                    </div>

                                                </div>

                                            </article>

                                        )
                                    )
                                }

                            </div>

                        )
                    }


                    {/*================================================
                      NO RESULTS
                    =================================================*/}

                    {
                        !error &&
                        visibleBlogs.length === 0 && (

                            <div className="
                                blog-block-no-results
                            ">

                                <FaBookOpen />

                                <h3>
                                    No Blogs Found
                                </h3>

                                <p>
                                    There are no blogs available
                                    for this category.
                                </p>

                            </div>

                        )
                    }


                    {/*================================================
                      SHOW ALL
                    =================================================*/}

                    {
                        filteredBlogs.length > 6 && (

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "35px"
                                }}
                            >

                                <button
                                    type="button"

                                    className="
                                        blog-block-filter-button
                                    "

                                    onClick={() =>
                                        setShowAll(
                                            (previous) =>
                                                !previous
                                        )
                                    }
                                >

                                    {
                                        showAll
                                            ? "Show Less"
                                            : `View All Blogs (${filteredBlogs.length})`
                                    }

                                    <FaArrowRight />

                                </button>

                            </div>

                        )
                    }

                </div>

            </div>

        </section>

    );

};


export default BlogBlock;