import React, {
    useEffect
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

import {    useNavigate,    useParams} from "react-router-dom";

import {  blogData} from "../BlogBlock/blogblockData";

const BlogDetail = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    /* FIND BLOG */
     
   

    const blog = blogData.find(
        (item) =>
            item.id === Number(id)
    );


    /*SCROLL TO TOP */
      
   

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, [id]);


    /* BLOG NOT FOUND*/
     
    

    if (!blog) {

        return (

            <section className=" blog-detail-not-found">
                 <FaBookOpen />
             <h2> Blog Not Found</h2>
               <p> The blog you are looking for is not available.</p>
   
                <button
                    type="button"

                    onClick={() =>
                        navigate("/blogs")
                    }
                >

                    <FaArrowLeft />

                    Back to Blogs

                </button>

            </section>

        );

    }


    /*RELATED BLOGS */
      
   

    const relatedBlogs = blogData
        .filter(
            (item) =>
                item.id !== blog.id &&
                item.category === blog.category
        )
        .concat(
            blogData.filter(
                (item) =>
                    item.id !== blog.id &&
                    item.category !== blog.category
            )
        )
        .slice(0, 3);


    /*BOOK APPOINTMENT*/
      
    

    const bookAppointment = () => {

        navigate(
            "/book-appointment"
        );

    };


    /*  OPEN RELATED BLOG */
    
   

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


            {/*  MAIN LAYOUT*/}
            
           

            <div className=" blog-detail-layout  ">
               
          


                {/* MAIN ARTICLE*/}

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


                    {/*MAIN IMAGE*/}
                      
                   

                    <div className="blog-detail-main-image">
                        
                    

                        <img
                            src={blog.image}

                            alt={blog.title}
                        />


                        <span className="blog-detail-image-category">
                            
                        

                            {blog.category}

                        </span>

                    </div>


                    {/*META*/}
                      
                   

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

                        <p> {blog.intro} </p>
                    </div>


                    {/*ARTICLE SECTIONS */}
                      
                  

                    <div className="blog-detail-article">
                        
                    

                        {blog.sections.map(
                            (
                                section,
                                index
                            ) => (

                                <section
                                    className="blog-detail-section "
                                       key={index} >

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
                                        section.exercises.length > 0 && (

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
                        <div className="  blog-detail-cta-icon ">
                          <FaUserMd />
                     </div>   

                        <div className=" blog-detail-cta-content">

                            <h3>Need personalised care?</h3>

                            <p>  Book an assessment at
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


                {/*  RIGHT SIDEBAR */}
                
              

                <aside className="blog-detail-sidebar">
 
                    {/* RELATED BLOGS*/}

                    <div className=" blog-detail-related ">

                        <div className=" blog-detail-related-heading">
 
                            <span>  EXPLORE MORE </span>

                            <h3> Related Blogs </h3>
                               
                           

                        </div>


                        <div className=" blog-detail-related-list">
                           
                        

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


                                        <div className=" blog-detail-related-image">
                                           
                                        

                                            <img
                                                src={
                                                    relatedBlog.image
                                                }

                                                alt={
                                                    relatedBlog.title
                                                }
                                            />

                                        </div>


                                        <div className=" blog-detail-related-content">
                                           
                                        

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

                     
                  
                    <div className=" blog-detail-category-box">

                        <div className=" blog-detail-category-box-icon ">

                            <FaBookOpen />

                        </div>


                        <span> CURRENT TOPIC </span>


                        <h3>  {blog.category}</h3>

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
                     
                  

                    <div className=" blog-detail-appointment-box">
                       
                    

                        <div className=" blog-detail-appointment-icon">
                           
                        

                            <FaCalendarAlt />

                        </div>


                        <h3>Ready to feel better? </h3>

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


            {/* BOTTOM NAVIGATION*/}
             
           

            <div className="  blog-detail-bottom-navigation">
              
            

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