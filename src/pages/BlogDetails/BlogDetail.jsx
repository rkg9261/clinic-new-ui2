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


const BlogDetail = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    /*====================================================
      DYNAMIC BLOG DATA
    ====================================================*/

    const [
        blogs,
        setBlogs
    ] = useState([]);


    const [
        blog,
        setBlog
    ] = useState(null);


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
        apiBlog
    ) => {

        const content =
            parseContent(
                apiBlog?.content
            );


        return {

            ...apiBlog,


            /*
              API featuredImage
              -> existing image
            */

            image:
                apiBlog?.featuredImage ||
                apiBlog?.image ||
                "",


            /*
              API shortDescription
              -> existing subtitle
            */

            subtitle:
                apiBlog?.shortDescription ||
                apiBlog?.subtitle ||
                "",


            /*
              API publishedAt
              -> existing date
            */

            date:
                formatDate(
                    apiBlog?.publishedAt ||
                    apiBlog?.date
                ),


            /*
              API content
              -> existing detail structure
            */

            intro:
                content.intro,

            sections:
                content.sections

        };

    };


    /*====================================================
      GET BLOG BY ID
    ====================================================*/

    const fetchBlog = async () => {

        try {

            setLoading(true);

            setError("");


            const token =
                getToken();


            console.log(
                "BLOG DETAIL TOKEN:",
                token
            );


            if (!token) {

                throw new Error(
                    "Unauthorized. Token missing. Please login again."
                );

            }


            /*================================================
              GET /api/blogs/{id}
            =================================================*/

            const response =
                await fetch(
                    `${API.BLOGS}/${id}`,
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
              RESPONSE
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
                "BLOG DETAIL API RESPONSE:",
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
              NOT FOUND
            =================================================*/

            if (
                response.status ===
                404
            ) {

                throw new Error(
                    "Blog Not Found"
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

                    "Failed to fetch blog."

                );

            }


            /*================================================
              GET ACTUAL BLOG OBJECT
            =================================================*/

            let apiBlog =
                result;


            if (
                result?.data &&
                !Array.isArray(
                    result.data
                )
            ) {

                apiBlog =
                    result.data;

            } else if (
                result?.blog
            ) {

                apiBlog =
                    result.blog;

            }


            /*================================================
              CONVERT BLOG
            =================================================*/

            const convertedBlog =
                convertBlog(
                    apiBlog
                );


            setBlog(
                convertedBlog
            );


            /*================================================
              STORE FOR RELATED BLOGS
            =================================================*/

            setBlogs(
                previous => {

                    const exists =
                        previous.some(
                            (item) =>
                                String(
                                    item.id
                                ) ===
                                String(
                                    convertedBlog.id
                                )
                        );


                    if (exists) {

                        return previous.map(
                            (item) =>
                                String(
                                    item.id
                                ) ===
                                String(
                                    convertedBlog.id
                                )
                                    ? convertedBlog
                                    : item
                        );

                    }


                    return [
                        ...previous,
                        convertedBlog
                    ];

                }
            );


        } catch (error) {

            console.error(
                "Blog Detail API Error:",
                error
            );


            setError(
                error.message ||
                "Unable to load blog."
            );


            setBlog(null);

        } finally {

            setLoading(false);

        }

    };


    /*====================================================
      GET ALL BLOGS FOR RELATED BLOGS
    ====================================================*/

    const fetchRelatedBlogs =
        async () => {

            try {

                const token =
                    getToken();


                if (!token) {

                    return;

                }


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


                if (
                    response.status ===
                    401
                ) {

                    return;

                }


                if (
                    !response.ok
                ) {

                    return;

                }


                const result =
                    await response.json();


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


                const convertedBlogs =
                    apiBlogs.map(
                        (item) =>
                            convertBlog(
                                item
                            )
                    );


                setBlogs(
                    convertedBlogs
                );


            } catch (error) {

                console.error(
                    "Related Blog API Error:",
                    error
                );

            }

        };


    /*====================================================
      GET BLOG
    ====================================================*/

    useEffect(() => {

        fetchBlog();

        fetchRelatedBlogs();

    }, [id]);


    /*====================================================
      SCROLL TO TOP
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

    const relatedBlogs = useMemo(() => {

        if (!blog) {

            return [];

        }


        const sameCategoryBlogs =
            blogs.filter(
                (item) =>
                    String(item.id) !==
                        String(blog.id) &&
                    item.category ===
                        blog.category
            );


        const otherCategoryBlogs =
            blogs.filter(
                (item) =>
                    String(item.id) !==
                        String(blog.id) &&
                    item.category !==
                        blog.category
            );


        return [
            ...sameCategoryBlogs,
            ...otherCategoryBlogs
        ].slice(0, 3);

    }, [
        blogs,
        blog
    ]);


    /*====================================================
      BLOG NOT FOUND
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


    /*====================================================
      BOOK APPOINTMENT
    ====================================================*/

    const bookAppointment = () => {

        navigate(
            "/book-appointment"
        );

    };


    /*====================================================
      OPEN RELATED BLOG
    ====================================================*/

    const openRelatedBlog = (
        blogId
    ) => {

        navigate(
            `/blog/${blogId}`
        );

    };


    return (

        <section className="
            blog-detail-page
        ">


            {/*
              BACKGROUND
            */}

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


            {/*
              HERO
            */}

            <header className="
                blog-detail-hero
            ">

                <div className="
                    blog-detail-hero-inner
                ">


                    <span className="
                        blog-detail-category
                    ">

                        {blog.category}

                    </span>


                    <h1>

                        {blog.title}

                    </h1>


                    <p>

                        {blog.subtitle}

                    </p>

                </div>

            </header>


            {/* MAIN LAYOUT */}

            <div className=" blog-detail-layout  ">


                {/* MAIN ARTICLE */}

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


                    {/* MAIN IMAGE */}

                    <div className="blog-detail-main-image">


                        <img
                            src={blog.image}

                            alt={blog.title}
                        />


                        <span className="blog-detail-image-category">

                            {blog.category}

                        </span>

                    </div>


                    {/* META */}

                    <div className=" blog-detail-meta ">

                        <span>

                            <FaCalendarAlt />

                            {blog.date}

                        </span>


                        <span>

                            <FaClock />

                            {blog.readTime}

                        </span>

                    </div>


                    {/* INTRO */}

                    <div className=" blog-detail-intro ">

                        <p>
                            {blog.intro}
                        </p>

                    </div>


                    {/* ARTICLE SECTIONS */}

                    <div className="blog-detail-article">


                        {blog.sections?.map(
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

                                    <h2>

                                        {section.heading}

                                    </h2>


                                    {section.paragraphs?.map(
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
                                    )}


                                    {section.exercises &&
                                        section.exercises.length >
                                            0 && (

                                            <ul className="
                                                blog-detail-exercise-list
                                            ">

                                                {section.exercises.map(
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
                                                )}

                                            </ul>

                                        )}

                                </section>

                            )
                        )}

                    </div>


                    {/* CLINIC CTA */}

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


                {/* RIGHT SIDEBAR */}

                <aside className="
                    blog-detail-sidebar
                ">


                    {/* RELATED BLOGS */}

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


                            {relatedBlogs.map(
                                (relatedBlog) => (

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


                                            <img
                                                src={
                                                    relatedBlog.image
                                                }

                                                alt={
                                                    relatedBlog.title
                                                }
                                            />

                                        </div>


                                        <div className="
                                            blog-detail-related-content
                                        ">


                                            <span>

                                                {
                                                    relatedBlog.category
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
                            )}

                        </div>

                    </div>


                    {/* CURRENT CATEGORY */}

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
                            {blog.category}
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


            {/* BOTTOM NAVIGATION */}

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