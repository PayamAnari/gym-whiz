import React from "react";
import heroImage from "../../../public/assets/images/header-image.png";
import Navbar from "../Navbar/Navbar";
import "./header.css";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  return (
    <>
      <header
        className="header-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <Navbar />
        <div className="header-content">
          <h2>
            {" "}
            <span className="span">Awaken</span> to a healthier, happier you.
          </h2>
          <p className="header-text">
            Discover a world of in-person and virtual fitness, <br /> wellness,
            and beauty services.
          </p>
        </div>
        <SearchBar />
      </header>
    </>
  );
};

export default Header;
