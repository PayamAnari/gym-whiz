import React from "react";
import { Link } from "react-router-dom";
import body from "../../../public/assets/images/body.png";
import "./Advertisement.css";

const Advertisement = () => {
  return (
    <div className="advertisement-area">
      <div className="ad">
        <div className="ad1-div-description">
          <h3>Train your body!</h3>
          <p>
            Training your body is a journey of self-improvement. Consistency and
            dedication are your tracks, and sweat is the fuel. As you push your
            limits, you sculpt a stronger, healthier you. <br />
            <Link to="/tips">
              <button className="ad-btn">Read More Tips</button>
            </Link>
          </p>
        </div>
        <div className="ad-img-div">
          <img src={body} alt="body" className="ad1-img" />
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
