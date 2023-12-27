import React from "react";
import { MdStarOutline, MdStar, MdStarHalf } from "react-icons/md";
import PropTypes from "prop-types";
import "./Rating.css";

const Rating = ({ rating }) => {
  return (
    <div>
      <ul className="star-rating">
        {[...Array(5)].map((_, index) => {
          return (
            <li key={index}>
              {rating > index + 0.5 ? (
                <MdStar className="svg-star" />
              ) : rating > index ? (
                <MdStarHalf className="svg-star" />
              ) : (
                <MdStarOutline className="svg-star" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
