import React from "react";
import "./Gallery.css";

import img1 from "../../assets/gallery1.jpeg";
import img2 from "../../assets/gallery2.jpeg";
import img3 from "../../assets/gallery3.jpeg";
import img4 from "../../assets/gallery4.jpeg";
import img5 from "../../assets/gallery5.jpeg";
import img6 from "../../assets/gallery6.jpeg";
import img7 from "../../assets/gallery7.jpeg";
import img8 from "../../assets/gallery8.jpeg";

const Gallery = () => {

  const images = [
    { image: img1, },
    { image: img2, },
    { image: img3, },
    { image: img4, },
    { image: img5, },
    { image: img6,},
    { image: img7,},
    { image: img8, },
  ];

  return (
    <section className="gallery">

      <div className="gallery-title">
        <p>Clinic</p>
        <h2>Clinic Photos</h2>
      </div>

      <div className="slider-gallery">

        <div className="slide-track-gallery">

          {[...images, ...images].map((item, index) => (
            <div className="slide-gallery" key={index}>
              <img src={item.image}  />
              
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Gallery;