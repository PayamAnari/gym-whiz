import React from "react";
import Navbar from "../Navbar/Navbar";
import DetailStoryImage from "../../../public/assets/images/story-detail.png";
import "./OurStory.css";

const OurStoryDetail = () => {
  return (
    <div className="detail-story-container">
      <Navbar />
      <div id="our-story-detail" className="detail-container">
        <div className="detail-content">
          <h1>GymWhiz Team</h1>
          <h2>About Us</h2>
          <p>
            Our fitness web app is a groundbreaking solution that transforms gym
            discovery into a seamless experience.
            <br /> With an intuitive search bar, users can effortlessly locate
            gyms based on name, city, and category.
            <br /> The personalization extends as users curate their fitness
            journey, adding preferred gyms to their favorites.
            <br /> The app&apos;s robust filtering capabilities enable users to
            fine-tune their choices by city, rating, and category,
            <br /> ensuring a tailored selection that aligns with their
            preferences. <br />
            Moreover, the inclusion of a BMI calculator adds an extra layer of
            personalization,
            <br /> allowing users to assess their fitness levels with ease.{" "}
            <br />
            The subscription feature further enhances user engagement,
            <br /> keeping them informed about the latest gym-related updates.
            <br /> In essence, our multifaceted platform is designed to create a
            captivating fitness experience,
            <br /> effortlessly connecting users with their ideal workout
            destinations.
          </p>
        </div>
        <div className="image-story">
          <img src={DetailStoryImage} alt="image-story" />
        </div>
      </div>
    </div>
  );
};

export default OurStoryDetail;
