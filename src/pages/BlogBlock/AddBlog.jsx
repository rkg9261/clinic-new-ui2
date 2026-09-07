import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBlog.css";
import { API } from "../../config/api";
import { getAuthHeaders } from "../../utils/auth";

const AddBlog = () => {

  const navigate = useNavigate();

  // ============================================
  // FORM DATA
  // ============================================

  const [formData, setFormData] = useState({

    title: "",

    slug: "",

    shortDescription: "",

    intro: "",

    featuredImage: "",

    isActive: true,

    publishedAt: "",

  });


  // ============================================
  // SECTIONS
  // ============================================

  const [sections, setSections] = useState([
    {
      heading: "",
      paragraphs: [""],
      exercises: [""],
    },
  ]);


  // ============================================
  // IMAGE STATE
  // ============================================

  const [imagePreview, setImagePreview] = useState("");

  const [imageName, setImageName] = useState("");


  // ============================================
  // LOADING / MESSAGE
  // ============================================

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");


  // ============================================
  // HANDLE INPUT
  // ============================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setFormData((previous) => ({

      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    }));

  };


  // ============================================
  // AUTO SLUG
  // ============================================

  const createSlug = (title) => {

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


  const handleTitleChange = (e) => {

    const title = e.target.value;


    setFormData((previous) => ({

      ...previous,

      title,

      slug: createSlug(title),

    }));

  };


  // ============================================
  // IMAGE FILE TO BASE64 / DATA URL
  // ============================================

  const imageToDataURL = (file) => {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();


      reader.onload = () => {

        resolve(reader.result);

      };


      reader.onerror = () => {

        reject(
          new Error(
            "Unable to read image."
          )
        );

      };


      reader.readAsDataURL(file);

    });

  };


  // ============================================
  // FEATURED IMAGE CHANGE
  // ============================================

  const handleImageChange = async (e) => {

    const file = e.target.files?.[0];


    if (!file) {
      return;
    }


    setError("");

    setMessage("");


    // ==========================================
    // IMAGE VALIDATION
    // ==========================================

    if (!file.type.startsWith("image/")) {

      setError(
        "Please select a valid image file."
      );

      e.target.value = "";

      return;
    }


    // ==========================================
    // IMAGE SIZE
    // ==========================================

    const maxSize =
      5 * 1024 * 1024;


    if (file.size > maxSize) {

      setError(
        "Image size must be less than 5 MB."
      );

      e.target.value = "";

      return;
    }


    try {

      // ========================================
      // IMAGE NAME
      // ========================================

      setImageName(file.name);


      // ========================================
      // CONVERT IMAGE
      // ========================================

      const dataURL =
        await imageToDataURL(file);


      // ========================================
      // PREVIEW
      // ========================================

      setImagePreview(dataURL);


      // ========================================
      // STORE IMAGE IN FORM DATA
      // ========================================

      setFormData((previous) => ({

        ...previous,

        featuredImage: dataURL,

      }));


    } catch (imageError) {

      console.error(
        "IMAGE ERROR:",
        imageError
      );


      setError(
        "Unable to process selected image."
      );


      setImageName("");

      setImagePreview("");

      setFormData((previous) => ({

        ...previous,

        featuredImage: "",

      }));

    }

  };


  // ============================================
  // REMOVE IMAGE
  // ============================================

  const removeImage = () => {

    setImagePreview("");

    setImageName("");


    setFormData((previous) => ({

      ...previous,

      featuredImage: "",

    }));


    const imageInput =
      document.getElementById(
        "featuredImageInput"
      );


    if (imageInput) {

      imageInput.value = "";

    }

  };


  // ============================================
  // SECTION CHANGE
  // ============================================

  const handleSectionChange = (
    sectionIndex,
    field,
    value
  ) => {

    setSections((previous) => {

      const updated = [...previous];


      updated[sectionIndex] = {

        ...updated[sectionIndex],

        [field]: value,

      };


      return updated;

    });

  };


  // ============================================
  // PARAGRAPH CHANGE
  // ============================================

  const handleParagraphChange = (
    sectionIndex,
    paragraphIndex,
    value
  ) => {

    setSections((previous) => {

      const updated = [...previous];


      const paragraphs = [
        ...updated[sectionIndex].paragraphs,
      ];


      paragraphs[paragraphIndex] = value;


      updated[sectionIndex] = {

        ...updated[sectionIndex],

        paragraphs,

      };


      return updated;

    });

  };


  // ============================================
  // EXERCISE CHANGE
  // ============================================

  const handleExerciseChange = (
    sectionIndex,
    exerciseIndex,
    value
  ) => {

    setSections((previous) => {

      const updated = [...previous];


      const exercises = [
        ...updated[sectionIndex].exercises,
      ];


      exercises[exerciseIndex] = value;


      updated[sectionIndex] = {

        ...updated[sectionIndex],

        exercises,

      };


      return updated;

    });

  };


  // ============================================
  // ADD SECTION
  // ============================================

  const addSection = () => {

    setSections((previous) => [

      ...previous,

      {
        heading: "",
        paragraphs: [""],
        exercises: [""],
      },

    ]);

  };


  // ============================================
  // ADD PARAGRAPH
  // ============================================

  const addParagraph = (
    sectionIndex
  ) => {

    setSections((previous) => {

      const updated = [...previous];


      updated[sectionIndex] = {

        ...updated[sectionIndex],

        paragraphs: [
          ...updated[sectionIndex]
            .paragraphs,

          "",
        ],

      };


      return updated;

    });

  };


  // ============================================
  // ADD EXERCISE
  // ============================================

  const addExercise = (
    sectionIndex
  ) => {

    setSections((previous) => {

      const updated = [...previous];


      updated[sectionIndex] = {

        ...updated[sectionIndex],

        exercises: [
          ...updated[sectionIndex]
            .exercises,

          "",
        ],

      };


      return updated;

    });

  };


  // ============================================
  // FORMAT PUBLISHED DATE
  // ============================================

  const formatPublishedDate = (value) => {

    if (!value) {

      return null;

    }


    return `${value.replace(
      "T",
      " "
    )}:00`;

  };


  // ============================================
  // SUBMIT
  // ============================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    setLoading(true);

    setMessage("");

    setError("");


    try {

      // ========================================
      // VALIDATION
      // ========================================

      if (!formData.title.trim()) {

        throw new Error(
          "Blog title is required."
        );

      }


      if (!formData.slug.trim()) {

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


      if (!formData.intro.trim()) {

        throw new Error(
          "Blog introduction is required."
        );

      }


      // ========================================
      // FEATURED IMAGE VALIDATION
      // ========================================

      if (!formData.featuredImage) {

        throw new Error(
          "Please select a featured image."
        );

      }


      // ========================================
      // GET AUTH HEADERS
      // FROM YOUR auth.js
      // ========================================

      const authHeaders =
        getAuthHeaders();


      console.log(
        "BLOG AUTH HEADERS:",
        authHeaders
      );


      if (!authHeaders) {

        throw new Error(
          "Unauthorized. Token missing. Please login again."
        );

      }


      // ========================================
      // CONTENT JSON
      // ========================================

      const contentObject = {

        intro:
          formData.intro.trim(),


        sections:

          sections.map(
            (section) => ({

              heading:
                section.heading.trim(),


              paragraphs:
                section.paragraphs.filter(
                  (item) =>
                    item.trim() !== ""
                ),


              exercises:
                section.exercises.filter(
                  (item) =>
                    item.trim() !== ""
                ),

            })
          ),

      };


      const content =
        JSON.stringify(
          contentObject
        );


      // ========================================
      // API PAYLOAD
      // ========================================

      const payload = {

        title:
          formData.title.trim(),


        slug:
          formData.slug.trim(),


        shortDescription:
          formData.shortDescription.trim(),


        content,


        // ======================================
        // SELECTED LOCAL IMAGE
        // STORED AS DATA URL
        // ======================================

        featuredImage:
          formData.featuredImage,


        isActive:
          formData.isActive,


        publishedAt:
          formatPublishedDate(
            formData.publishedAt
          ),

      };


      console.log(
        "CREATE BLOG PAYLOAD:",
        payload
      );


      // ========================================
      // POST BLOG API
      // ONLY API USED
      // ========================================

      const response =
        await fetch(
          API.BLOGS,
          {

            method: "POST",

            headers: authHeaders,

            body:
              JSON.stringify(
                payload
              ),

          }
        );


      // ========================================
      // READ RESPONSE SAFELY
      // ========================================

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
            responseText,

        };

      }


      console.log(
        "CREATE BLOG API RESPONSE:",
        result
      );


      // ========================================
      // UNAUTHORIZED
      // ========================================

      if (
        response.status === 401
      ) {

        throw new Error(
          "Unauthorized. Your login token is missing or expired. Please login again."
        );

      }


      // ========================================
      // FORBIDDEN
      // ========================================

      if (
        response.status === 403
      ) {

        throw new Error(
          "You do not have permission to create a blog."
        );

      }


      // ========================================
      // OTHER API ERROR
      // ========================================

      if (!response.ok) {

        throw new Error(

          result?.message ||

          result?.error ||

          result?.title ||

          "Failed to create blog."

        );

      }


      // ========================================
      // SUCCESS
      // ========================================

      setMessage(
        "Blog added successfully!"
      );


      console.log(
        "Blog created successfully."
      );


      // ========================================
      // GO TO BLOG PAGE
      // ========================================

      setTimeout(() => {

        navigate("/blog");

      }, 1000);


    } catch (error) {

      console.error(
        "Create Blog Error:",
        error
      );


      setError(
        error.message ||
        "Something went wrong."
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="add-blog-page">

      <div className="add-blog-container">

        <h1>
          Add New Blog
        </h1>


        <form
          onSubmit={handleSubmit}
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
              value={formData.title}
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
              value={formData.slug}
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
              required
            />

          </div>


          {/* =====================================
              INTRO
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
            />

          </div>


          {/* =====================================
              FEATURED IMAGE
          ====================================== */}

          <div className="add-blog-field">

            <label>
              Featured Image
            </label>


            <input
              id="featuredImageInput"
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
            />


            {/* =================================
                IMAGE NAME
            ================================== */}

            {imageName && (

              <div>
                {imageName}
              </div>

            )}


            {/* =================================
                IMAGE PREVIEW
            ================================== */}

            {imagePreview && (

              <div>

                <img
                  src={imagePreview}
                  alt="Featured Preview"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "250px",
                    objectFit: "cover",
                    display: "block",
                    marginTop: "15px",
                    borderRadius: "10px",
                  }}
                />


                <button
                  type="button"
                  onClick={
                    removeImage
                  }
                >
                  Remove Image
                </button>

              </div>

            )}

          </div>


          {/* =====================================
              SECTIONS
          ====================================== */}

          {sections.map(
            (section, sectionIndex) => (

              <div
                className="add-blog-section"
                key={sectionIndex}
              >

                <h3>
                  Section{" "}
                  {sectionIndex + 1}
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


                {/* =================================
                    PARAGRAPHS
                ================================== */}

                <h4>
                  Paragraphs
                </h4>


                {section.paragraphs.map(
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
                )}


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


                {/* =================================
                    EXERCISES
                ================================== */}

                <h4>
                  Exercises
                </h4>


                {section.exercises.map(
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
                )}


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
          )}


          {/* =====================================
              ADD SECTION
          ====================================== */}

          <button
            type="button"
            onClick={addSection}
          >
            + Add Section
          </button>


          {/* =====================================
              PUBLISHED DATE
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
              MESSAGES
          ====================================== */}

          {message && (

            <div className="add-blog-success">

              {message}

            </div>

          )}


          {error && (

            <div className="add-blog-error">

              {error}

            </div>

          )}


          {/* =====================================
              SUBMIT
          ====================================== */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Saving..."
              : "Save Blog"}

          </button>

        </form>

      </div>

    </div>

  );

};


export default AddBlog;