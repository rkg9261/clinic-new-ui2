import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import "./BlogDetail.css";

import {
    FaArrowLeft,
    FaArrowRight,
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaBookOpen,
    FaUserMd
} from "react-icons/fa";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    API
} from "../../config/api";

import {
    getAuthHeaders
} from "../../utils/auth";


const BlogDetail = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    /*====================================================
      STATE
    ====================================================*/

    const [blogs, setBlogs] = useState([]);

    const [blog, setBlog] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    /*====================================================
      AUTH
    ====================================================*/

    const getHeaders = () => {

        const headers = getAuthHeaders();

        console.log(
            "BLOG DETAIL AUTH HEADERS:",
            headers
        );

        return headers;

    };


    /*====================================================
      IMAGE HANDLER
    ====================================================*/

    const getImageUrl = (imageValue) => {

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

                imageValue.image_url ||

                imageValue.imageUrl ||

                imageValue.url ||

                imageValue.src ||

                imageValue.path ||

                imageValue.file_path ||

                imageValue.filePath ||

                ""

            );

        }


        /*================================================
          STRING
        =================================================*/

        let image = String(imageValue).trim();


        if (!image) {

            return "";

        }


        /*================================================
          REMOVE JSON QUOTES
        =================================================*/

        if (
            image.startsWith('"') &&
            image.endsWith('"')
        ) {

            image = image.slice(1, -1);

        }


        if (
            image.startsWith("'") &&
            image.endsWith("'")
        ) {

            image = image.slice(1, -1);

        }


        image = image.trim();


        /*================================================
          BASE64 IMAGE

          DO NOT MODIFY THE BASE64 DATA.

          This is very important.
        =================================================*/

        if (
            image.startsWith("data:image/")
        ) {

            return image;

        }


        /*================================================
          HTTP / HTTPS
        =================================================*/

        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {

            return image;

        }


        /*================================================
          BLOB
        =================================================*/

        if (
            image.startsWith("blob:")
        ) {

            return image;

        }


        /*================================================
          RELATIVE URL
        =================================================*/

        let apiOrigin = "";

        try {

            apiOrigin =
                new URL(
                    API.BLOGS
                ).origin;

        } catch {

            apiOrigin = "";

        }


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
                image.substring(2);

        }


        return (
            apiOrigin +
            "/" +
            image
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
            "BLOG IMAGE FAILED"
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
            "IMAGE LENGTH:",
            currentBlog?.image?.length
        );

        console.error(
            "FINAL SRC:",
            event?.currentTarget?.src
        );

        console.error(
            "===================================="
        );

    };


    /*====================================================
      DATE
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


        return `${datePart} • ${timePart}`;

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

            text = content;

        } else {

            text =
                JSON.stringify(
                    content
                );

        }


        const words =
            text
                .replace(
                    /[{}[\]":,]/g,
                    " "
                )
                .split(/\s+/)
                .filter(Boolean)
                .length;


        const minutes =
            Math.max(
                1,
                Math.ceil(
                    words / 200
                )
            );


        return `${minutes} min read`;

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
                        (section) =>
                            Array.isArray(
                                section.paragraphs
                            )
                                ? section.paragraphs
                                : []
                    );


            return {

                intro:
                    content.intro || "",

                sections,

                paragraphs

            };

        }


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
                                (section) =>
                                    Array.isArray(
                                        section.paragraphs
                                    )
                                        ? section.paragraphs
                                        : []
                            );


                    return {

                        intro:
                            parsed.intro || "",

                        sections,

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
      CONVERT BLOG
    ====================================================*/

    const convertBlog = (
        apiBlog
    ) => {

        if (!apiBlog) {

            return null;

        }


        console.log(
            "===================================="
        );

        console.log(
            "BLOG DETAIL API OBJECT:",
            apiBlog
        );

        console.log(
            "===================================="
        );


        const featuredImage =
            apiBlog.featured_image ??
            apiBlog.featuredImage ??
            "";


        const content =
            apiBlog.content ?? "";


        const parsedContent =
            parseContent(
                content
            );


        const image =
            getImageUrl(
                featuredImage
            );


        console.log(
            "BLOG DETAIL FEATURED IMAGE:",
            featuredImage
        );

        console.log(
            "BLOG DETAIL FINAL IMAGE:",
            image
        );

        console.log(
            "BLOG DETAIL IMAGE LENGTH:",
            image.length
        );

        console.log(
            "BLOG DETAIL IS BASE64:",
            image.startsWith(
                "data:image/"
            )
        );


        return {

            id:
                apiBlog.id,

            branch_id:
                apiBlog.branch_id,

            title:
                apiBlog.title || "",

            slug:
                apiBlog.slug || "",

            short_description:
                apiBlog.short_description || "",

            content:
                content,

            featured_image:
                featuredImage,

            is_active:
                apiBlog.is_active,

            published_at:
                apiBlog.published_at || "",

            created_at:
                apiBlog.created_at || "",

            updated_at:
                apiBlog.updated_at || "",


            category:
                apiBlog.title || "Physiotherapy",

            image:

                image,

            shortDescription:
                apiBlog.short_description || "",

            date:
                formatPublishedAt(
                    apiBlog.published_at
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
      EXTRACT SINGLE BLOG
    ====================================================*/

    const extractBlog = (
        result
    ) => {

        if (
            result &&
            !Array.isArray(result) &&
            (
                result.id !== undefined ||
                result.title !== undefined ||
                result.slug !== undefined
            )
        ) {

            return result;

        }


        if (
            result?.data &&
            !Array.isArray(result.data)
        ) {

            return result.data;

        }


        if (
            Array.isArray(result?.data)
        ) {

            return result.data[0] || null;

        }


        if (
            result?.blog &&
            !Array.isArray(result.blog)
        ) {

            return result.blog;

        }


        if (
            result?.result &&
            !Array.isArray(result.result)
        ) {

            return result.result;

        }


        if (
            result?.result?.data &&
            !Array.isArray(result.result.data)
        ) {

            return result.result.data;

        }


        return null;

    };


    /*====================================================
      EXTRACT BLOG ARRAY
    ====================================================*/

    const extractBlogs = (
        result
    ) => {

        if (
            Array.isArray(result)
        ) {

            return result;

        }


        if (
            Array.isArray(result?.data)
        ) {

            return result.data;

        }


        if (
            Array.isArray(result?.blogs)
        ) {

            return result.blogs;

        }


        if (
            Array.isArray(result?.data?.blogs)
        ) {

            return result.data.blogs;

        }


        if (
            Array.isArray(result?.result)
        ) {

            return result.result;

        }


        if (
            Array.isArray(result?.result?.data)
        ) {

            return result.result.data;

        }


        if (
            Array.isArray(result?.result?.blogs)
        ) {

            return result.result.blogs;

        }


        return [];

    };


    /*====================================================
      FETCH BLOG
    ====================================================*/

    const fetchBlog = async () => {

        try {

            setLoading(true);

            setError("");


            if (!id) {

                throw new Error(
                    "Blog ID is missing."
                );

            }


            const authHeaders =
                getHeaders();


            if (!authHeaders) {

                throw new Error(
                    "Unauthorized. Token missing. Please login again."
                );

            }


            const blogUrl =
                `${API.BLOGS}/${id}`;


            console.log(
                "GET BLOG DETAIL:",
                blogUrl
            );


            const response =
                await fetch(
                    blogUrl,
                    {

                        method: "GET",

                        headers: {

                            ...authHeaders,

                            Accept:
                                "application/json"

                        }

                    }
                );


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
                "BLOG DETAIL RESPONSE:",
                result
            );


            if (
                response.status === 401
            ) {

                throw new Error(
                    "Unauthorized. Your login token is missing or expired. Please login again."
                );

            }


            if (
                response.status === 404
            ) {

                throw new Error(
                    "Blog Not Found"
                );

            }


            if (
                !response.ok
            ) {

                throw new Error(

                    result?.message ||

                    result?.error ||

                    "Failed to fetch blog."

                );

            }


            const apiBlog =
                extractBlog(
                    result
                );


            if (!apiBlog) {

                throw new Error(
                    "Blog data was not found in API response."
                );

            }


            const convertedBlog =
                convertBlog(
                    apiBlog
                );


            setBlog(
                convertedBlog
            );

        } catch (fetchError) {

            console.error(
                "BLOG DETAIL API ERROR:",
                fetchError
            );


            setError(
                fetchError.message ||
                "Unable to load blog."
            );


            setBlog(null);

        } finally {

            setLoading(false);

        }

    };


    /*====================================================
      RELATED BLOGS
    ====================================================*/

    const fetchRelatedBlogs =
        async () => {

            try {

                const authHeaders =
                    getHeaders();


                if (!authHeaders) {

                    return;

                }


                const response =
                    await fetch(
                        API.BLOGS,
                        {

                            method: "GET",

                            headers: {

                                ...authHeaders,

                                Accept:
                                    "application/json"

                            }

                        }
                    );


                if (!response.ok) {

                    return;

                }


                const responseText =
                    await response.text();


                if (!responseText) {

                    return;

                }


                const result =
                    JSON.parse(
                        responseText
                    );


                const apiBlogs =
                    extractBlogs(
                        result
                    );


                const convertedBlogs =
                    apiBlogs
                        .map(
                            (item) =>
                                convertBlog(
                                    item
                                )
                        )
                        .filter(Boolean);


                setBlogs(
                    convertedBlogs
                );

            } catch (relatedError) {

                console.error(
                    "RELATED BLOG API ERROR:",
                    relatedError
                );

            }

        };


    /*====================================================
      LOAD
    ====================================================*/

    useEffect(() => {

        fetchBlog();

        fetchRelatedBlogs();

    }, [id]);


    /*====================================================
      SCROLL TOP
    ====================================================*/

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, [id]);


    /*====================================================
      RELATED BLOGS
    ====================================================*/

    const relatedBlogs =
        useMemo(() => {

            if (!blog) {

                return [];

            }


            return blogs
                .filter(
                    (item) =>
                        String(item.id) !==
                        String(blog.id)
                )
                .slice(0, 3);

        }, [blogs, blog]);


    /*====================================================
      NAVIGATION
    ====================================================*/

    const bookAppointment = () => {

        navigate(
            "/book-appointment"
        );

    };


    const openRelatedBlog = (
        blogId
    ) => {

        navigate(
            `/blog/${blogId}`
        );

    };


    /*====================================================
      LOADING
    ====================================================*/

    if (loading) {

        return (

            <section className=" blog-detail-not-found">

                <FaBookOpen />

                <h2>
                    Loading Blog
                </h2>

                <p>
                    Please wait while the blog is loading.
                </p>

            </section>

        );

    }


    /*====================================================
      NOT FOUND
    ====================================================*/

    if (!blog) {

        return (

            <section className=" blog-detail-not-found">

                <FaBookOpen />

                <h2>
                    Blog Not Found
                </h2>

                <p>

                    {
                        error ||
                        "The blog you are looking for is not available."
                    }

                </p>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/blog")
                    }
                >

                    <FaArrowLeft />

                    Back to Blogs

                </button>

            </section>

        );

    }


    return (

        <section className="
            blog-detail-page
        ">


            {/*================================================
              BACKGROUND
            =================================================*/}

            <div className="
                blog-detail-background-one
            "></div>


            <div className="
                blog-detail-background-two
            "></div>


            <span className="
                blog-detail-bubble-one
            "></span>


            <span className="
                blog-detail-bubble-two
            "></span>


            <span className="
                blog-detail-bubble-three
            "></span>


            {/*================================================
              HERO
            =================================================*/}

            <header className="
                blog-detail-hero
            ">

                <div className="
                    blog-detail-hero-inner
                ">


                    <span className="
                        blog-detail-category
                    ">

                        {
                            blog.title
                        }

                    </span>


                    <h1>

                        {
                            blog.title
                        }

                    </h1>


                    <p>

                        {
                            blog.shortDescription
                        }

                    </p>

                </div>

            </header>


            {/*================================================
              MAIN
            =================================================*/}

            <div className=" blog-detail-layout  ">


                <main className=" blog-detail-main ">


                    {/* BACK */}

                    <button
                        type="button"
                        className="blog-detail-back "
                        onClick={() =>
                            navigate("/blog")
                        }
                    >

                        <FaArrowLeft />

                        Back to Blogs

                    </button>


                    {/*================================================
                      IMAGE
                    =================================================*/}

                    <div className="blog-detail-main-image">

                        {
                            blog.image ? (

                                <img
                                    src={blog.image}
                                    alt={blog.title}

                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block"
                                    }}

                                    onLoad={() => {

                                        console.log(
                                            "BLOG DETAIL IMAGE LOADED:",
                                            blog.id
                                        );

                                    }}

                                    onError={(event) => {

                                        handleImageError(
                                            event,
                                            blog
                                        );

                                    }}
                                />

                            ) : (

                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >

                                    <FaBookOpen />

                                </div>

                            )
                        }


                        <span className="blog-detail-image-category">

                            {
                                blog.title
                            }

                        </span>

                    </div>


                    {/*================================================
                      META
                    =================================================*/}

                    <div className=" blog-detail-meta ">

                        <span>

                            <FaCalendarAlt />

                            {
                                blog.date
                            }

                        </span>


                        <span>

                            <FaClock />

                            {
                                blog.readTime
                            }

                        </span>

                    </div>


                    {/*================================================
                      INTRO
                    =================================================*/}

                    <div className=" blog-detail-intro ">

                        <p>

                            {
                                blog.shortDescription
                            }

                        </p>

                    </div>


                    {/*================================================
                      ARTICLE
                    =================================================*/}

                    <div className="blog-detail-article">


                        {
                            blog.intro &&
                            blog.intro !==
                                blog.shortDescription && (

                                <section className="blog-detail-section ">

                                    <p>

                                        {
                                            blog.intro
                                        }

                                    </p>

                                </section>

                            )
                        }


                        {
                            blog.sections?.map(
                                (
                                    section,
                                    index
                                ) => (

                                    <section
                                        className="blog-detail-section "
                                        key={
                                            section.id ||
                                            index
                                        }
                                    >

                                        {
                                            section.heading && (

                                                <h2>

                                                    {
                                                        section.heading
                                                    }

                                                </h2>

                                            )
                                        }


                                        {
                                            Array.isArray(
                                                section.paragraphs
                                            ) &&
                                            section.paragraphs.map(
                                                (
                                                    paragraph,
                                                    paragraphIndex
                                                ) => (

                                                    <p
                                                        key={
                                                            paragraphIndex
                                                        }
                                                    >

                                                        {
                                                            paragraph
                                                        }

                                                    </p>

                                                )
                                            )
                                        }


                                        {
                                            Array.isArray(
                                                section.exercises
                                            ) &&
                                            section.exercises.length > 0 && (

                                                <ul className="
                                                    blog-detail-exercise-list
                                                ">

                                                    {
                                                        section.exercises.map(
                                                            (
                                                                exercise,
                                                                exerciseIndex
                                                            ) => (

                                                                <li
                                                                    key={
                                                                        exerciseIndex
                                                                    }
                                                                >

                                                                    <FaCheckCircle />

                                                                    <span>

                                                                        {
                                                                            exercise
                                                                        }

                                                                    </span>

                                                                </li>

                                                            )
                                                        )
                                                    }

                                                </ul>

                                            )
                                        }

                                    </section>

                                )
                            )
                        }


                        {
                            blog.sections?.length === 0 &&
                            blog.paragraphs?.length > 0 && (

                                <section className="blog-detail-section ">

                                    {
                                        blog.paragraphs.map(
                                            (
                                                paragraph,
                                                index
                                            ) => (

                                                <p key={index}>

                                                    {
                                                        paragraph
                                                    }

                                                </p>

                                            )
                                        )
                                    }

                                </section>

                            )
                        }

                    </div>


                    {/*================================================
                      CTA
                    =================================================*/}

                    <div className=" blog-detail-cta ">

                        <div className="
                            blog-detail-cta-icon
                        ">

                            <FaUserMd />

                        </div>


                        <div className="
                            blog-detail-cta-content
                        ">

                            <h3>
                                Need personalised care?
                            </h3>


                            <p>

                                Book an assessment at
                                Krishna Advance Physio Clinic
                                and get a recovery plan built
                                around your condition.

                            </p>


                            <button
                                type="button"
                                onClick={
                                    bookAppointment
                                }
                            >

                                Book Appointment

                                <FaArrowRight />

                            </button>

                        </div>

                    </div>

                </main>


                {/*================================================
                  SIDEBAR
                =================================================*/}

                <aside className="
                    blog-detail-sidebar
                ">


                    {/* RELATED */}

                    <div className="
                        blog-detail-related
                    ">

                        <div className="
                            blog-detail-related-heading
                        ">

                            <span>
                                EXPLORE MORE
                            </span>

                            <h3>
                                Related Blogs
                            </h3>

                        </div>


                        <div className="
                            blog-detail-related-list
                        ">

                            {
                                relatedBlogs.map(
                                    (
                                        relatedBlog
                                    ) => (

                                        <article
                                            key={
                                                relatedBlog.id
                                            }

                                            className="
                                                blog-detail-related-card
                                            "

                                            onClick={() =>
                                                openRelatedBlog(
                                                    relatedBlog.id
                                                )
                                            }
                                        >

                                            <div className="
                                                blog-detail-related-image
                                            ">

                                                {
                                                    relatedBlog.image ? (

                                                        <img
                                                            src={
                                                                relatedBlog.image
                                                            }

                                                            alt={
                                                                relatedBlog.title
                                                            }

                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                                display: "block"
                                                            }}

                                                            onError={(event) => {

                                                                console.error(
                                                                    "RELATED IMAGE FAILED:",
                                                                    relatedBlog.id
                                                                );

                                                                event.currentTarget.style.display =
                                                                    "none";

                                                            }}
                                                        />

                                                    ) : (

                                                        <FaBookOpen />

                                                    )
                                                }

                                            </div>


                                            <div className="
                                                blog-detail-related-content
                                            ">

                                                <span>

                                                    {
                                                        relatedBlog.title
                                                    }

                                                </span>


                                                <h4>

                                                    {
                                                        relatedBlog.title
                                                    }

                                                </h4>


                                                <small>

                                                    {
                                                        relatedBlog.date
                                                    }

                                                </small>

                                            </div>

                                        </article>

                                    )
                                )
                            }

                        </div>

                    </div>


                    {/* CATEGORY */}

                    <div className="
                        blog-detail-category-box
                    ">

                        <div className="
                            blog-detail-category-box-icon
                        ">

                            <FaBookOpen />

                        </div>


                        <span>
                            CURRENT TOPIC
                        </span>


                        <h3>

                            {
                                blog.title
                            }

                        </h3>


                        <p>

                            Explore more physiotherapy
                            articles and practical health
                            guidance.

                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/blog")
                            }
                        >

                            View All Blogs

                            <FaArrowRight />

                        </button>

                    </div>


                    {/* APPOINTMENT */}

                    <div className="
                        blog-detail-appointment-box
                    ">

                        <div className="
                            blog-detail-appointment-icon
                        ">

                            <FaCalendarAlt />

                        </div>


                        <h3>
                            Ready to feel better?
                        </h3>


                        <p>

                            Get professional guidance
                            from our physiotherapy team.

                        </p>


                        <button
                            type="button"
                            onClick={
                                bookAppointment
                            }
                        >

                            Book Appointment

                        </button>

                    </div>

                </aside>

            </div>


            {/*================================================
              BOTTOM NAVIGATION
            =================================================*/}

            <div className="
                blog-detail-bottom-navigation
            ">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/blog")
                    }
                >

                    <FaArrowLeft />

                    All Blogs

                </button>


                <button
                    type="button"
                    onClick={
                        bookAppointment
                    }
                >

                    Book Appointment

                    <FaArrowRight />

                </button>

            </div>

        </section>

    );

};


export default BlogDetail;