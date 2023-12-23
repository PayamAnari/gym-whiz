import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./GymCard.css";
import Rating from "../Rating/Rating";
import Favorites from "../Favorite/Favorites";

const GymCard = ({ gym }) => {
  GymCard.propTypes = {
    gym: PropTypes.object.isRequired,
  };

  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-DE").format(price);
  };

  return (
    <div
      className="gym-card-link"
      onClick={() => {
        navigate(`/gym/${gym._id}`);
      }}
    >
      <div className="gym-card">
        <Favorites gymId={gym._id} />
        <img className="gym-image" src={gym.picture[0]} alt={gym.title} />
        <div className="gym-card-info">
          <div>
            <p className="gym-name">{gym.name}</p>
            <p className="gym-category">{gym.category?.join(", ")}</p>
            <Rating rating={gym.rating} />
          </div>
          <p className="gym-price">€{formatPrice(gym.price)}</p>
        </div>
      </div>
    </div>
  );
};

export default GymCard;
