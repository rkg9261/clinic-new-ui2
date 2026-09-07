import React, {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "./AddBlog.css";

import {
    API
} from "../../config/api";

import {
    getAuthHeaders
} from "../../utils/auth";


const AddBlog = () => {

    const navigate =
        useNavigate();


  
    // FORM DATA
  

    const [
        formData,
        setFormData
    ] = useState({

        title: "",

        slug: "",

        shortDescription: "",

        intro: "",

        featuredImage: "",

        isActive: true,

        publishedAt: "",

    });


  
    // SECTIONS
  

    const [
        sections,
        setSections
    ] = useState([

        {
            heading: "",

            paragraphs: [""],

            exercises: [""],

        },

    ]);


  
    // IMAGE PREVIEW
  

    const [
        imagePreview,
        setImagePreview
    ] = useState("");


  
    // IMAGE SOURCE
    //
    // upload = local image
    // url    = pasted URL
  

    const [
        imageSource,
        setImageSource
    ] = useState("upload");


  
    // IMAGE FILE
  

    const [
        selectedImage,
        setSelectedImage
    ] = useState(null);


  
    // LOADING / MESSAGE
  

    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        message,
        setMessage
    ] = useState("");


    const [
        error,
        setError
    ] = useState("");


  
    // HANDLE INPUT
  

    const handleChange = (
        e
    ) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;


        setFormData(
            (
                previous
            ) => ({

                ...previous,

                [name]:
                    type === "checkbox"
                        ? checked
                        : value,

            })
        );


        setError("");

        setMessage("");

    };


  
    // CREATE SLUG
  

    const createSlug = (
        title
    ) => {

        return title

            .toLowerCase()

            .trim()

            .replace(
                /[^a-z0-9\s-]/g,
                ""
            )

            .replace(
                /\s+/g,
                "-"
            )

            .replace(
                /-+/g,
                "-"
            );

    };


  
    // TITLE CHANGE
  

    const handleTitleChange = (
        e
    ) => {

        const title =
            e.target.value;


        setFormData(
            (
                previous
            ) => ({

                ...previous,

                title,

                slug:
                    createSlug(
                        title
                    ),

            })
        );


        setError("");

        setMessage("");

    };


  
    // IMAGE FILE TO BASE64
  

    const convertImageToBase64 = (
        file
    ) => {

        return new Promise(
            (
                resolve,
                reject
            ) => {

                const reader =
                    new FileReader();


                reader.onload = () => {

                    resolve(
                        reader.result
                    );

                };


                reader.onerror = () => {

                    reject(
                        new Error(
                            "Unable to read the selected image."
                        )
                    );

                };


                reader.readAsDataURL(
                    file
                );

            }
        );

    };

  

    const handleImageUpload = async (
        e
    ) => {

        const file =
            e.target.files?.[0];


        if (!file) {

            return;

        }


        setError("");

        setMessage("");


      
        // IMAGE TYPE
      

        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            setError(
                "Please select a valid image file."
            );

            return;

        }


      
        // IMAGE SIZE
        //
        // 5 MB maximum
      

        const maxSize =
            5 * 1024 * 1024;


        if (
            file.size > maxSize
        ) {

            setError(
                "Image size must be less than 5 MB."
            );

            return;

        }


        try {

            setLoading(true);


            console.log(
                "===================================="
            );

            console.log(
                "IMAGE SELECTED"
            );

            console.log(
                "NAME:",
                file.name
            );

            console.log(
                "TYPE:",
                file.type
            );

            console.log(
                "SIZE:",
                file.size
            );

            console.log(
                "===================================="
            );


            // ====================================
            // CONVERT TO BASE64
            // ====================================

            const base64Image =
                await convertImageToBase64(
                    file
                );


            console.log(
                "BASE64 IMAGE LENGTH:",
                base64Image.length
            );


            // ====================================
            // STORE IN FORM
            // ====================================

            setFormData(
                (
                    previous
                ) => ({

                    ...previous,

                    featuredImage:
                        base64Image,

                })
            );


            // ====================================
            // PREVIEW
            // ====================================

            setImagePreview(
                base64Image
            );


            setSelectedImage(
                file
            );


            setImageSource(
                "upload"
            );


        } catch (
            uploadError
        ) {

            console.error(
                "IMAGE UPLOAD ERROR:",
                uploadError
            );


            setError(
                uploadError.message ||
                "Unable to process image."
            );

        } finally {

            setLoading(false);

        }

    };


  
    // FEATURED IMAGE URL
  

    const handleImageUrlChange = (
        e
    ) => {

        const value =
            e.target.value;


        setFormData(
            (
                previous
            ) => ({

                ...previous,

                featuredImage:
                    value,

            })
        );


        setImagePreview(
            value
        );


        setSelectedImage(
            null
        );


        setImageSource(
            "url"
        );


        setError("");

        setMessage("");

    };


  
    // URL IMAGE ERROR
  

    const handleImageError = () => {

        setError(
            "Unable to load this image URL. Please check the URL."
        );

    };


  
    // IMAGE LOADED
  

    const handleImageLoad = () => {

        setError("");

    };


  
    // REMOVE IMAGE
  

    const removeImage = () => {

        setFormData(
            (
                previous
            ) => ({

                ...previous,

                featuredImage: "",

            })
        );


        setImagePreview(
            ""
        );


        setSelectedImage(
            null
        );


        setImageSource(
            "upload"
        );


        setError("");

        setMessage("");

    };


  
    // CHANGE TO URL MODE
  

    const selectUrlMode = () => {

        setImageSource(
            "url"
        );


        setError("");

        setMessage("");

    };


  
    // CHANGE TO UPLOAD MODE
  

    const selectUploadMode = () => {

        setImageSource(
            "upload"
        );


        setError("");

        setMessage("");

    };


  
    // SECTION CHANGE
  

    const handleSectionChange = (
        sectionIndex,
        field,
        value
    ) => {

        setSections(
            (
                previous
            ) => {

                const updated =
                    [
                        ...previous
                    ];


                updated[
                    sectionIndex
                ] = {

                    ...updated[
                        sectionIndex
                    ],

                    [field]:
                        value,

                };


                return updated;

            }
        );

    };


  
    // PARAGRAPH CHANGE
  

    const handleParagraphChange = (
        sectionIndex,
        paragraphIndex,
        value
    ) => {

        setSections(
            (
                previous
            ) => {

                const updated =
                    [
                        ...previous
                    ];


                const paragraphs =
                    [
                        ...updated[
                            sectionIndex
                        ].paragraphs
                    ];


                paragraphs[
                    paragraphIndex
                ] = value;


                updated[
                    sectionIndex
                ] = {

                    ...updated[
                        sectionIndex
                    ],

                    paragraphs,

                };


                return updated;

            }
        );

    };


  
    // EXERCISE CHANGE
  

    const handleExerciseChange = (
        sectionIndex,
        exerciseIndex,
        value
    ) => {

        setSections(
            (
                previous
            ) => {

                const updated =
                    [
                        ...previous
                    ];


                const exercises =
                    [
                        ...updated[
                            sectionIndex
                        ].exercises
                    ];


                exercises[
                    exerciseIndex
                ] = value;


                updated[
                    sectionIndex
                ] = {

                    ...updated[
                        sectionIndex
                    ],

                    exercises,

                };


                return updated;

            }
        );

    };


  
    // ADD SECTION
  

    const addSection = () => {

        setSections(
            (
                previous
            ) => [

                ...previous,

                {
                    heading: "",

                    paragraphs: [""],

                    exercises: [""],

                },

            ]
        );

    };


  
    // ADD PARAGRAPH
  

    const addParagraph = (
        sectionIndex
    ) => {

        setSections(
            (
                previous
            ) => {

                const updated =
                    [
                        ...previous
                    ];


                updated[
                    sectionIndex
                ] = {

                    ...updated[
                        sectionIndex
                    ],

                    paragraphs: [

                        ...updated[
                            sectionIndex
                        ].paragraphs,

                        "",

                    ],

                };


                return updated;

            }
        );

    };


  
    // ADD EXERCISE
  

    const addExercise = (
        sectionIndex
    ) => {

        setSections(
            (
                previous
            ) => {

                const updated =
                    [
                        ...previous
                    ];


                updated[
                    sectionIndex
                ] = {

                    ...updated[
                        sectionIndex
                    ],

                    exercises: [

                        ...updated[
                            sectionIndex
                        ].exercises,

                        "",

                    ],

                };


                return updated;

            }
        );

    };


  
    // FORMAT PUBLISHED DATE
  

    const formatPublishedDate = (
        value
    ) => {

        if (!value) {

            return null;

        }


        /*
          datetime-local:

          2026-09-07T10:00

          API:

          2026-09-07 10:00:00
        */

        return (
            `${value.replace(
                "T",
                " "
            )}:00`
        );

    };


  
    // SUBMIT
  

    const handleSubmit = async (
        e
    ) => {

        e.preventDefault();


        setLoading(
            true
        );

        setMessage(
            ""
        );

        setError(
            ""
        );


        try {

            // ====================================
            // VALIDATION
            // ====================================

            if (
                !formData.title.trim()
            ) {

                throw new Error(
                    "Blog title is required."
                );

            }


            if (
                !formData.slug.trim()
            ) {

                throw new Error(
                    "Blog slug is required."
                );

            }


            if (
                !formData.shortDescription.trim()
            ) {

                throw new Error(
                    "Short description is required."
                );

            }


            if (
                !formData.intro.trim()
            ) {

                throw new Error(
                    "Blog introduction is required."
                );

            }


            // ====================================
            // IMAGE VALIDATION
            // ====================================

            if (
                !formData.featuredImage.trim()
            ) {

                throw new Error(
                    "Please upload an image or paste an image URL."
                );

            }


            // ====================================
            // URL VALIDATION
            //
            // Only validate when user is
            // using URL mode.
            // ====================================

            if (
                imageSource === "url"
            ) {

                try {

                    const imageUrl =
                        new URL(
                            formData.featuredImage.trim()
                        );


                    if (
                        ![
                            "http:",
                            "https:"
                        ].includes(
                            imageUrl.protocol
                        )
                    ) {

                        throw new Error();

                    }

                } catch {

                    throw new Error(
                        "Please enter a valid image URL."
                    );

                }

            }


            // ====================================
            // BASE64 VALIDATION
            // ====================================

            if (
                formData.featuredImage
                    .startsWith(
                        "data:image/"
                    )
            ) {

                const commaIndex =
                    formData.featuredImage
                        .indexOf(",");


                if (
                    commaIndex === -1
                ) {

                    throw new Error(
                        "Invalid uploaded image data."
                    );

                }


                const base64Data =
                    formData.featuredImage
                        .substring(
                            commaIndex + 1
                        )
                        .trim();


                if (
                    !base64Data
                ) {

                    throw new Error(
                        "Uploaded image data is empty."
                    );

                }


                console.log(
                    "FINAL BASE64 LENGTH:",
                    formData.featuredImage.length
                );

            }


            // ====================================
            // AUTH
            // ====================================

            const authHeaders =
                getAuthHeaders();


            console.log(
                "BLOG AUTH HEADERS:",
                authHeaders
            );


            if (
                !authHeaders
            ) {

                throw new Error(
                    "Unauthorized. Token missing. Please login again."
                );

            }


            // ====================================
            // CONTENT OBJECT
            // ====================================

            const contentObject = {

                intro:
                    formData.intro.trim(),


                sections:
                    sections.map(
                        (
                            section
                        ) => ({

                            heading:
                                section.heading.trim(),


                            paragraphs:
                                section.paragraphs
                                    .filter(
                                        (
                                            item
                                        ) =>
                                            item.trim() !== ""
                                    ),


                            exercises:
                                section.exercises
                                    .filter(
                                        (
                                            item
                                        ) =>
                                            item.trim() !== ""
                                    ),

                        })
                    ),

            };


            // ====================================
            // CONTENT JSON
            // ====================================

            const content =
                JSON.stringify(
                    contentObject
                );


            // ====================================
            // PUBLISHED DATE
            // ====================================

            const publishedAt =
                formatPublishedDate(
                    formData.publishedAt
                );


            // ====================================
            // EXACT POST API PAYLOAD
            //
            // Backend POST:
            //
            // title
            // slug
            // shortDescription
            // content
            // featuredImage
            // isActive
            // publishedAt
            // ====================================

            const payload = {

                title:
                    formData.title.trim(),


                slug:
                    formData.slug.trim(),


                shortDescription:
                    formData.shortDescription.trim(),


                content:
                    content,


                featuredImage:
                    formData.featuredImage.trim(),


                isActive:
                    formData.isActive,


                publishedAt:
                    publishedAt,

            };


            // ====================================
            // REQUEST LOG
            // ====================================

            console.log(
                "===================================="
            );

            console.log(
                "CREATE BLOG API"
            );

            console.log(
                "URL:",
                API.BLOGS
            );

            console.log(
                "METHOD:",
                "POST"
            );

            console.log(
                "IMAGE SOURCE:",
                imageSource
            );

            console.log(
                "IMAGE FILE:",
                selectedImage
            );

            console.log(
                "FEATURED IMAGE LENGTH:",
                payload.featuredImage.length
            );

            console.log(
                "PAYLOAD:",
                payload
            );

            console.log(
                "PUBLISHED AT:",
                payload.publishedAt
            );

            console.log(
                "===================================="
            );


            // ====================================
            // POST API
            // ====================================

            const response =
                await fetch(
                    API.BLOGS,
                    {

                        method:
                            "POST",

                        headers: {

                            ...authHeaders,

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json",

                        },

                        body:
                            JSON.stringify(
                                payload
                            ),

                    }
                );


            // ====================================
            // RESPONSE
            // ====================================

            const responseText =
                await response.text();


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
                        responseText,

                };

            }


            console.log(
                "===================================="
            );

            console.log(
                "CREATE BLOG RESPONSE"
            );

            console.log(
                "STATUS:",
                response.status
            );

            console.log(
                "RESPONSE:",
                result
            );

            console.log(
                "===================================="
            );


            // ====================================
            // 401
            // ====================================

            if (
                response.status === 401
            ) {

                throw new Error(
                    "Unauthorized. Your login token is missing or expired. Please login again."
                );

            }


            // ====================================
            // 403
            // ====================================

            if (
                response.status === 403
            ) {

                throw new Error(
                    "You do not have permission to create a blog."
                );

            }


            // ====================================
            // OTHER ERROR
            // ====================================

            if (
                !response.ok
            ) {

                throw new Error(

                    result?.message ||

                    result?.error ||

                    result?.title ||

                    "Failed to create blog."

                );

            }


            // ====================================
            // SUCCESS
            // ====================================

            setMessage(
                "Blog added successfully!"
            );


            console.log(
                "BLOG CREATED SUCCESSFULLY"
            );


            // ====================================
            // REDIRECT
            // ====================================

            setTimeout(
                () => {

                    navigate(
                        "/blog"
                    );

                },
                1000
            );

        } catch (
            submitError
        ) {

            console.error(
                "CREATE BLOG ERROR:",
                submitError
            );


            setError(
                submitError.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(
                false
            );

        }

    };


  
    // RETURN
  

    return (

        <div className="add-blog-page">

            <div className="add-blog-container">

                <h1>
                    Add New Blog
                </h1>


                <form
                    onSubmit={
                        handleSubmit
                    }
                >


                    {/* =====================================
                        TITLE
                    ====================================== */}

                    <div className="add-blog-field">

                        <label>
                            Blog Title
                        </label>


                        <input
                            type="text"

                            name="title"

                            value={
                                formData.title
                            }

                            onChange={
                                handleTitleChange
                            }

                            placeholder="Enter blog title"

                            required
                        />

                    </div>


                    {/* =====================================
                        SLUG
                    ====================================== */}

                    <div className="add-blog-field">

                        <label>
                            Slug
                        </label>


                        <input
                            type="text"

                            name="slug"

                            value={
                                formData.slug
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="blog-slug"

                            required
                        />

                    </div>


                    {/* =====================================
                        SHORT DESCRIPTION
                    ====================================== */}

                    <div className="add-blog-field">

                        <label>
                            Short Description
                        </label>


                        <textarea
                            name="shortDescription"

                            value={
                                formData.shortDescription
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Short description"

                            rows="4"

                            required
                        />

                    </div>


                    {/* =====================================
                        INTRODUCTION
                    ====================================== */}

                    <div className="add-blog-field">

                        <label>
                            Introduction
                        </label>


                        <textarea
                            name="intro"

                            value={
                                formData.intro
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Blog introduction"

                            rows="5"

                            required
                        />

                    </div>


                    {/* =====================================
                        FEATURED IMAGE
                    ====================================== */}

                    <div className="add-blog-field">

                        <label>
                            Featured Image
                        </label>


                        {/* =================================
                            IMAGE MODE BUTTONS
                        ================================== */}

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginBottom: "15px",
                                flexWrap: "wrap"
                            }}
                        >

                            <button
                                type="button"

                                onClick={
                                    selectUploadMode
                                }

                                style={{
                                    padding: "10px 18px",
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    background:
                                        imageSource === "upload"
                                            ? "#00796b"
                                            : "#fff",
                                    color:
                                        imageSource === "upload"
                                            ? "#fff"
                                            : "#333"
                                }}
                            >

                                Upload Image

                            </button>


                            <button
                                type="button"

                                onClick={
                                    selectUrlMode
                                }

                                style={{
                                    padding: "10px 18px",
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    background:
                                        imageSource === "url"
                                            ? "#00796b"
                                            : "#fff",
                                    color:
                                        imageSource === "url"
                                            ? "#fff"
                                            : "#333"
                                }}
                            >

                                Paste Image URL

                            </button>

                        </div>


                        {/* =================================
                            UPLOAD IMAGE
                        ================================== */}

                        {
                            imageSource === "upload" && (

                                <div>

                                    <input
                                        type="file"

                                        accept="image/*"

                                        onChange={
                                            handleImageUpload
                                        }
                                    />


                                    <small
                                        style={{
                                            display: "block",
                                            marginTop: "8px"
                                        }}
                                    >

                                        Select JPG, JPEG, PNG,
                                        WEBP or another image.

                                    </small>

                                </div>

                            )
                        }


                        {/* =================================
                            IMAGE URL
                        ================================== */}

                        {
                            imageSource === "url" && (

                                <div>

                                    <input
                                        type="url"

                                        name="featuredImage"

                                        value={
                                            imageSource === "url"
                                                ? formData.featuredImage
                                                : ""
                                        }

                                        onChange={
                                            handleImageUrlChange
                                        }

                                        placeholder="https://example.com/image.jpg"

                                        style={{
                                            width: "100%"
                                        }}
                                    />


                                    <small
                                        style={{
                                            display: "block",
                                            marginTop: "8px"
                                        }}
                                    >

                                        Paste a direct image URL.

                                    </small>

                                </div>

                            )
                        }


                        {/* =================================
                            IMAGE PREVIEW
                        ================================== */}

                        {
                            imagePreview && (

                                <div
                                    style={{
                                        marginTop: "15px"
                                    }}
                                >

                                    <img
                                        src={
                                            imagePreview
                                        }

                                        alt="Featured Preview"

                                        onLoad={
                                            handleImageLoad
                                        }

                                        onError={
                                            handleImageError
                                        }

                                        style={{
                                            width: "100%",
                                            maxWidth: "400px",
                                            height: "250px",
                                            objectFit: "cover",
                                            display: "block",
                                            borderRadius: "10px"
                                        }}
                                    />


                                    <button
                                        type="button"

                                        onClick={
                                            removeImage
                                        }

                                        style={{
                                            marginTop: "10px",
                                            cursor: "pointer"
                                        }}
                                    >

                                        Remove Image

                                    </button>

                                </div>

                            )
                        }

                    </div>


                    {/* =====================================
                        SECTIONS
                    ====================================== */}

                    {
                        sections.map(
                            (
                                section,
                                sectionIndex
                            ) => (

                                <div
                                    className="add-blog-section"

                                    key={
                                        sectionIndex
                                    }
                                >

                                    <h3>

                                        Section{" "}

                                        {
                                            sectionIndex + 1
                                        }

                                    </h3>


                                    {/* HEADING */}

                                    <input
                                        type="text"

                                        value={
                                            section.heading
                                        }

                                        onChange={(e) =>
                                            handleSectionChange(
                                                sectionIndex,
                                                "heading",
                                                e.target.value
                                            )
                                        }

                                        placeholder="Section heading"
                                    />


                                    {/* PARAGRAPHS */}

                                    <h4>
                                        Paragraphs
                                    </h4>


                                    {
                                        section.paragraphs.map(
                                            (
                                                paragraph,
                                                paragraphIndex
                                            ) => (

                                                <textarea
                                                    key={
                                                        paragraphIndex
                                                    }

                                                    value={
                                                        paragraph
                                                    }

                                                    onChange={(e) =>
                                                        handleParagraphChange(
                                                            sectionIndex,
                                                            paragraphIndex,
                                                            e.target.value
                                                        )
                                                    }

                                                    placeholder="Enter paragraph"

                                                />

                                            )
                                        )
                                    }


                                    <button
                                        type="button"

                                        onClick={() =>
                                            addParagraph(
                                                sectionIndex
                                            )
                                        }
                                    >

                                        + Add Paragraph

                                    </button>


                                    {/* EXERCISES */}

                                    <h4>
                                        Exercises
                                    </h4>


                                    {
                                        section.exercises.map(
                                            (
                                                exercise,
                                                exerciseIndex
                                            ) => (

                                                <input
                                                    key={
                                                        exerciseIndex
                                                    }

                                                    type="text"

                                                    value={
                                                        exercise
                                                    }

                                                    onChange={(e) =>
                                                        handleExerciseChange(
                                                            sectionIndex,
                                                            exerciseIndex,
                                                            e.target.value
                                                        )
                                                    }

                                                    placeholder="Exercise"

                                                />

                                            )
                                        )
                                    }


                                    <button
                                        type="button"

                                        onClick={() =>
                                            addExercise(
                                                sectionIndex
                                            )
                                        }
                                    >

                                        + Add Exercise

                                    </button>

                                </div>

                            )
                        )
                    }


                    {/* =====================================
                        ADD SECTION
                    ====================================== */}

                    <button
                        type="button"

                        onClick={
                            addSection
                        }
                    >

                        + Add Section

                    </button>


                    {/* =====================================
                        PUBLISHED AT
                    ====================================== */}

                    <div className="add-blog-field">

                        <label>
                            Published At
                        </label>


                        <input
                            type="datetime-local"

                            name="publishedAt"

                            value={
                                formData.publishedAt
                            }

                            onChange={
                                handleChange
                            }
                        />

                    </div>


                    {/* =====================================
                        ACTIVE
                    ====================================== */}

                    <div className="add-blog-field">

                        <label>

                            <input
                                type="checkbox"

                                name="isActive"

                                checked={
                                    formData.isActive
                                }

                                onChange={
                                    handleChange
                                }
                            />

                            {" "}

                            Active

                        </label>

                    </div>


                    {/* =====================================
                        SUCCESS
                    ====================================== */}

                    {
                        message && (

                            <div className="add-blog-success">

                                {
                                    message
                                }

                            </div>

                        )
                    }


                    {/* =====================================
                        ERROR
                    ====================================== */}

                    {
                        error && (

                            <div className="add-blog-error">

                                {
                                    error
                                }

                            </div>

                        )
                    }


                    {/* =====================================
                        SUBMIT
                    ====================================== */}

                    <button
                        type="submit"

                        disabled={
                            loading
                        }
                    >

                        {
                            loading
                                ? "Saving..."
                                : "Save Blog"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

};


export default AddBlog;