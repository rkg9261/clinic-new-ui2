import React, { useEffect, useState } from "react";
import "./AddFrequentlyAskedQuestion.css";

import { API } from "../../config/api";
import { getAuthHeaders } from "../../utils/auth";

const AddFrequentlyAskedQuestion = () => {

  // FORM DATA


  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");


  // FAQ LIST


  const [faqs, setFaqs] = useState([]);


  // EDIT STATE


  const [editingId, setEditingId] = useState(null);


  // SEARCH


  const [search, setSearch] = useState("");


  // LOADING STATES


  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);


  // MESSAGE


  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // GET FAQ API


  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError("");

      const headers = getAuthHeaders();

      const response = await fetch(API.FAQS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(headers || {}),
        },
      });

      const result = await response.json();

      console.log("FAQ GET RESPONSE:", result);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to fetch FAQs."
        );
      }

      let faqData = [];

      if (Array.isArray(result?.data)) {
        faqData = result.data;
      } else if (Array.isArray(result?.data?.data)) {
        faqData = result.data.data;
      } else if (Array.isArray(result)) {
        faqData = result;
      }

      setFaqs(faqData);
    } catch (err) {
      console.error("FAQ GET ERROR:", err);

      setError(
        err.message || "Unable to load FAQs."
      );

      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };


  // GET FAQ ON PAGE LOAD


  useEffect(() => {
    fetchFAQs();
  }, []);


  // ADD FAQ - POST


  const handleAddFAQ = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

 
    // VALIDATION
 

    if (!question.trim()) {
      setError("Please enter the question.");
      return;
    }

    if (!answer.trim()) {
      setError("Please enter the answer.");
      return;
    }

    try {
      setSaving(true);

    
      // POST DATA
    

      const faqData = {
        question: question.trim(),
        answer: answer.trim(),
        isActive: true,
      };

      console.log("FAQ POST DATA:", faqData);

    
      // AUTH HEADERS
    

      const headers = getAuthHeaders();

    
      // POST API
    

      const response = await fetch(API.FAQS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(headers || {}),
        },
        body: JSON.stringify(faqData),
      });

      const result = await response.json();

      console.log("FAQ POST RESPONSE:", result);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to add FAQ."
        );
      }

    
      // SUCCESS
    

      setMessage(
        result?.message || "FAQ added successfully."
      );

      setQuestion("");
      setAnswer("");

    
      // REFRESH GET API
    

      await fetchFAQs();
    } catch (err) {
      console.error("FAQ POST ERROR:", err);

      setError(
        err.message || "Unable to add FAQ."
      );
    } finally {
      setSaving(false);
    }
  };


  // EDIT FAQ


  const handleEdit = (faq) => {
    setEditingId(faq.id);

    setQuestion(faq.question || "");
    setAnswer(faq.answer || "");

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // UPDATE FAQ - PUT


  const handleUpdateFAQ = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

 
    // VALIDATION
 

    if (!question.trim()) {
      setError("Please enter the question.");
      return;
    }

    if (!answer.trim()) {
      setError("Please enter the answer.");
      return;
    }

    if (editingId === null) {
      setError("Please select an FAQ to edit.");
      return;
    }

    try {
      setSaving(true);

    
      // UPDATE DATA
    

      const faqData = {
        question: question.trim(),
        answer: answer.trim(),
        isActive: true,
      };

      console.log(
        "FAQ UPDATE ID:",
        editingId
      );

      console.log(
        "FAQ UPDATE DATA:",
        faqData
      );

    
      // AUTH HEADERS
    

      const headers = getAuthHeaders();

    
      // PUT API
    

      const response = await fetch(
        `${API.FAQS}/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(headers || {}),
          },
          body: JSON.stringify(faqData),
        }
      );

      const result = await response.json();

      console.log(
        "FAQ UPDATE RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to update FAQ."
        );
      }

    
      // SUCCESS
    

      setMessage(
        result?.message ||
          "FAQ updated successfully."
      );

      setEditingId(null);
      setQuestion("");
      setAnswer("");

    
      // REFRESH TABLE
    

      await fetchFAQs();
    } catch (err) {
      console.error(
        "FAQ UPDATE ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to update FAQ."
      );
    } finally {
      setSaving(false);
    }
  };


  // DELETE FAQ - DELETE


  const handleDelete = async () => {
    if (editingId === null) {
      setError("Please select an FAQ to delete.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setMessage("");
      setError("");

      console.log(
        "FAQ DELETE ID:",
        editingId
      );

    
      // AUTH HEADERS
    

      const headers = getAuthHeaders();

    
      // DELETE API
    

      const response = await fetch(
        `${API.FAQS}/${editingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(headers || {}),
          },
        }
      );

      const result = await response.json();

      console.log(
        "FAQ DELETE RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to delete FAQ."
        );
      }

    
      // SUCCESS
    

      setMessage(
        result?.message ||
          "FAQ deleted successfully."
      );

      setEditingId(null);
      setQuestion("");
      setAnswer("");

    
      // REFRESH TABLE
    

      await fetchFAQs();
    } catch (err) {
      console.error(
        "FAQ DELETE ERROR:",
        err
      );

      setError(
        err.message ||
          "Unable to delete FAQ."
      );
    } finally {
      setDeleting(false);
    }
  };


  // CANCEL EDIT


  const handleCancel = () => {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setMessage("");
    setError("");
  };


  // SEARCH FILTER


  const filteredFAQs = faqs.filter((faq) => {
    const searchText = search
      .toLowerCase()
      .trim();

    return (
      String(faq.question || "")
        .toLowerCase()
        .includes(searchText) ||
      String(faq.answer || "")
        .toLowerCase()
        .includes(searchText)
    );
  });





  return (
    <div className="add-frequently-asked-question-page">

      {/* PAGE HEADER   */}
         
   

      <div className="add-frequently-asked-question-header">

        <div className="add-frequently-asked-question-heading">

          <h1>
            Frequently Asked Questions
          </h1>

          <p>
            Add and manage frequently asked questions
          </p>

        </div>

        <div className="add-frequently-asked-question-total">

          <strong>
            {faqs.length}
          </strong>

          <span>
            Total FAQs
          </span>

        </div>

      </div>


      {/*FORM CARD   */}
   
          

      <div className="add-frequently-asked-question-form-card">

        <div className="add-frequently-asked-question-form-header">

          <div>

            <h2>
              {editingId !== null
                ? "Edit Frequently Asked Question"
                : "Add Frequently Asked Question"}
            </h2>

            <p>
              {editingId !== null
                ? "Update the selected FAQ below."
                : "Enter the question and answer below."}
            </p>

          </div>

          {editingId !== null && (
            <span className="add-frequently-asked-question-edit-badge">
              EDITING
            </span>
          )}

        </div>


        {/*SUCCESS MESSAGE*/}
        
            

        {message && (
          <div className="add-frequently-asked-question-success">
            {message}
          </div>
        )}


        {/*ERROR MESSAGE*/}
        
            

        {error && (
          <div className="add-frequently-asked-question-error">
            {error}
          </div>
        )}


        {/*FORM*/}
        
            

        <form
          className="add-frequently-asked-question-form"
          onSubmit={
            editingId !== null
              ? handleUpdateFAQ
              : handleAddFAQ
          }
        >

          {/* QUESTION */}

          <div className="add-frequently-asked-question-field">

            <label htmlFor="faq-question">
              Question
              <span>*</span>
            </label>

            <input
              id="faq-question"
              type="text"
              placeholder="Enter frequently asked question"
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
            />

          </div>


          {/* ANSWER */}

          <div className="add-frequently-asked-question-field">

            <label htmlFor="faq-answer">
              Answer
              <span>*</span>
            </label>

            <textarea
              id="faq-answer"
              rows="6"
              placeholder="Enter answer"
              value={answer}
              onChange={(event) =>
                setAnswer(event.target.value)
              }
            />

          </div>


          {/*
              FORM BUTTONS
          */}

          <div className="add-frequently-asked-question-actions">

            {editingId === null ? (

              <button
                type="submit"
                className="add-frequently-asked-question-add-btn"
                disabled={saving}
              >
                {saving
                  ? "Adding..."
                  : "+ Add FAQ"}
              </button>

            ) : (

              <>
                <button
                  type="submit"
                  className="add-frequently-asked-question-save-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="add-frequently-asked-question-cancel-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
              </>

            )}

          </div>


          {/*
              DELETE BUTTON
          */}

          {editingId !== null && (

            <div className="add-frequently-asked-question-delete-area">

              <button
                type="button"
                className="add-frequently-asked-question-delete-btn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting
                  ? "Deleting..."
                  : "Delete FAQ"}
              </button>

            </div>

          )}

        </form>

      </div>


      {/*
          FAQ TABLE
      */}

      <div className="add-frequently-asked-question-table-card">

        {/* TABLE HEADER */}

        <div className="add-frequently-asked-question-table-header">

          <div>

            <h2>
              FAQ List
            </h2>

            <p>
              FAQs loaded from the server
            </p>

          </div>


          {/* SEARCH */}

          <div className="add-frequently-asked-question-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search FAQ..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

        </div>


        {/*
            TABLE
        */}

        <div className="add-frequently-asked-question-table-wrapper">

          <table className="add-frequently-asked-question-table">

            <thead>

              <tr>

                <th>
                  #
                </th>

                <th>
                  Question
                </th>

                <th>
                  Answer
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="add-frequently-asked-question-no-data"
                  >
                    Loading FAQs...
                  </td>

                </tr>

              ) : filteredFAQs.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="add-frequently-asked-question-no-data"
                  >
                    No FAQs found
                  </td>

                </tr>

              ) : (

                filteredFAQs.map((faq, index) => (

                  <tr key={faq.id}>

                    <td className="add-frequently-asked-question-index">
                      {index + 1}
                    </td>

                    <td className="add-frequently-asked-question-question-cell">
                      {faq.question}
                    </td>

                    <td className="add-frequently-asked-question-answer-cell">
                      {faq.answer}
                    </td>

                    <td>

                      {Number(faq.is_active) === 1 ||
                      faq.is_active === true ||
                      Number(faq.isActive) === 1 ||
                      faq.isActive === true ? (

                        <span className="add-frequently-asked-question-active">
                          Active
                        </span>

                      ) : (

                        <span className="add-frequently-asked-question-inactive">
                          Inactive
                        </span>

                      )}

                    </td>

                    <td className="add-frequently-asked-question-action-cell">

                      <button
                        type="button"
                        className="add-frequently-asked-question-edit-btn"
                        onClick={() => handleEdit(faq)}
                      >
                        Edit
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AddFrequentlyAskedQuestion;