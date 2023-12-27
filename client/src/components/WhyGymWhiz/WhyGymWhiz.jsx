import React, { useRef } from "react";
import { CgGym } from "react-icons/cg";
import { TbDiscount2, TbTicket } from "react-icons/tb";
import "./WhyGymWhiz.css";

const WhyGymWhiz = () => {
  const advantageBoxesRef = useRef(null);

  const scrollNext = () => {
    advantageBoxesRef.current.scrollLeft += 200; // Scroll to the right
  };

  const scrollPrev = () => {
    advantageBoxesRef.current.scrollLeft -= 200; // Scroll to the left
  };

  return (
    <div className="advantages">
      <div className="advantages-info">
        <h1 className="advantages-title">Why GymWhiz?</h1>
        <p className="advantages-description">
          GymWhiz is a network of gyms, pools, spas, and health and fitness
          apps. With one pass, you can access fitness in exactly the way you
          want. And you get great advantages!
        </p>
      </div>
      <div className="advantage-container">
        <div className="scroll-buttons">
          <button onClick={scrollPrev}>&lt;</button>
          <button onClick={scrollNext}>&gt;</button>
        </div>
        <div className="advantage-boxes" ref={advantageBoxesRef}>
          <div className="advantage-box">
            <div className="box-logo">
              <TbDiscount2 />
            </div>

            <h2>Discount</h2>
            <div className="advantage-box_dec">
              <p>Get 10% discount for the membership!</p>
            </div>
          </div>
          <div className="advantage-box" id="advantage-box2">
            <div className="box-logo">
              <TbTicket color="#fff" />
            </div>

            <h2>Free Classes</h2>
            <div className="advantage-box_dec">
              <p>Get the membership and book 2 classes for free!</p>
            </div>
          </div>
          <div className="advantage-box">
            <div className="box-logo">
              <CgGym />
            </div>

            <h2>Personal Trainer</h2>
            <div className="advantage-box_dec">
              <p>Get a training program from the personal trainer for free!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyGymWhiz;
