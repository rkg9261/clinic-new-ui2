import React, {  useEffect,  useRef, useState,} from "react";
import "./About.css";

import aboutImg from "../../assets/about-clinic.jpeg"

const About = () => {

  const aboutRef = useRef(null);

  const [showAnimation, setShowAnimation] =
    useState(false);

  useEffect(() => {

    const observer =
      new IntersectionObserver(
        ([entry]) => {

          if (entry.isIntersecting) {
            setShowAnimation(true);
          }

        },
        {
          threshold: 0.3,
        }
      );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();

  }, []);

  return (
   
    <section  ref={aboutRef} 
     className={`about ${ showAnimation ? "show" : "" }`}>
     
      <div className="about-left">
        <img src={aboutImg} alt="Krishna Advance Physio Clinic"  className="about-img"/>
       </div>  
        

      <div className="about-right">
        <h4>ABOUT CLINIC</h4>
        <h2>  Krishna Advance Physio Clinic </h2>
        <p>
          Krishna Advance Physio Clinic is dedicated to helping
          patients recover from pain, injuries, and movement
          disorders through advanced physiotherapy treatments.
          Our goal is to improve mobility, reduce discomfort,
          and enhance overall quality of life for every patient.
        </p>

        <p>
          We provide personalized treatment plans designed for
          orthopedic conditions, sports injuries, back pain,
          neck pain, joint stiffness, post-surgery rehabilitation,
          and neurological disorders. Our clinic uses modern
          physiotherapy techniques and equipment to ensure
          effective recovery and long-term wellness.
        </p>

        <p>
          At Krishna Advance Physio Clinic, patient care and
          satisfaction are our highest priorities. We focus on
          delivering professional treatment in a comfortable,
          friendly, and supportive environment.
        </p>

        {/* <div className="clinic-info">

          <div className="info-box">
            <span>📍 Address</span>
            <p>  M-38, Shiv Mandir Road,  Hakikat Nagar,   Saharanpur </p>
            </div>  
            
        
          <div className="info-box">
            <span>📞 Contact Number</span>
            <p>7467067466</p>
          </div>

          <div className="info-box">
            <span>🏥 Services</span>
            <p>
              Physiotherapy, Pain Management,
              Rehabilitation, Sports Injury Treatment,
              Posture Correction & Exercise Therapy
            </p>
          </div>

        </div> */}

      </div>

    </section>
  );
};

export default About;