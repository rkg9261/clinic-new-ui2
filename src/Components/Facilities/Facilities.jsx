import React, { useState } from "react";
import "./Facilities.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import img1 from "../../assets/facility1.jpeg";
import img2 from "../../assets/facility2.jpeg";
import img3 from "../../assets/facility3.jpeg";
import img4 from "../../assets/facility4.jpeg";
import img5 from "../../assets/facility5.jpeg";
import img6 from "../../assets/facility6.jpeg";
import img7 from "../../assets/facility7.jpeg";
import img8 from "../../assets/facility8.jpeg";
import img9 from "../../assets/facility9.jpg";
import img10 from "../../assets/facility10.jpg";
import img11 from "../../assets/facility11.jpg";
import img12 from "../../assets/facility12.jpg";
import img13 from "../../assets/facility13.png";
import img14 from "../../assets/facility14.jpg";
import img15 from "../../assets/facility15.jpeg";
import img16 from "../../assets/facility16.jpg";
import img17 from "../../assets/facility17.jpg";

const Facilities = () => {

  const [selectedImage, setSelectedImage] =
    useState(null);

  const facilitiesData = [
    { image: img1, title: "Electro-Massage" },
    { image: img2, title: "PEMF Therapy" },
    { image: img3, title: "Shockwave Therapy" },
    { image: img4, title: "Laser Therapy" },
    { image: img5, title: "CPM-Therapy" },
    { image: img6, title: "IFT-Therapy" },
    { image: img7, title: "Ultrasonic Therapy(US)" },
    { image: img8, title: "Russian Current Therapy" },
    { image: img9, title: "Cervical Spondylities & Neck Pain" },
    { image: img10, title: "Sports & Gym Injury" },
    { image: img11, title: "Knee Pain & Osteoarthrities" },
    { image: img12, title: "Sciatica Pain" },
    { image: img13, title: "Numbness & Sensation" },
    { image: img14, title: "Frozen Shoulder" },
    { image: img15, title: "Kinesio Taping" },
    { image: img16, title: "Cuppping Therapy-Hijama" },
    { image: img17, title: "Actual Back Pain" },
  ];

  return (
    <section className="facilities">

      <div className="title">
        <p>OUR FACILITIES</p>
        <h2>World Class Facilities</h2>
      </div>

      <Swiper  modules={[Navigation, Autoplay]}
        navigation  loop={true}  autoplay={{delay: 4000,
      disableOnInteraction: false,}}
       spaceBetween={20}
       breakpoints={{    0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
        }}>
          
        {facilitiesData.map((item, index) => (

          <SwiperSlide key={index}>

            <div className="slide">

              <img src={item.image}  alt={item.title}
                className="facility-image" onClick={() => setSelectedImage(item) } />
              
                <div className="caption">
                <h3>{item.title}</h3>
              </div>
            </div>   
          </SwiperSlide>        
         ))}       
      </Swiper>       

      {selectedImage && (

        <div  className="image-modal"  onClick={() => setSelectedImage(null)}>
          <div  className="image-modal-content" onClick={(e) => e.stopPropagation()} >
          
        <button className="close-modal"  onClick={() => setSelectedImage(null)}>
         ✕    
          </button>    
         <img src={selectedImage.image} alt={selectedImage.title}/>
         <h2>  {selectedImage.title}   </h2>   
          </div>    
        </div>     
)}
          
 </section>             
  );
};           

export default Facilities;         

       

      

   


