import React from "react";
import { Link } from "react-router-dom";
import ImageStory1 from "../../../public/assets/images/story1.png";
import ImageStory2 from "../../../public/assets/images/story2.png";
import "./OurStory.css";

const OurStory = () => {
  return (
    <div id="our-story" className="story-container">
      <div className="story-se1">
        <img src={ImageStory1} alt="img1" />
      </div>
      <div className="story-content">
        <h1>GymWhiz Team</h1>
        <h2>GymWhiz</h2>
        <p>
          Our fitness web app facilitates easy gym discovery with a dynamic
          search bar based on name, city, and category. Users can add gyms to
          favorites, share reviews, and filter options by city, rating, and
          category. The app includes a BMI calculator for personal fitness
          assessment and offers a subscription feature for gym-related updates.
          This multifunctional platform ensures a comprehensive and engaging
          fitness experience.
        </p>
        <Link to="/our-story-detail">
          <button className="story-btn">Read More</button>
        </Link>
      </div>
      <div className="story-se2">
        <img src={ImageStory2} alt="img2" />
      </div>
    </div>
  );
};

export default OurStory;
