import React from "react";
import GymCard from "../GymCard/GymCard";
import "./GymList.css";
import { useGyms } from "../../contexts/GymContext";
import PropTypes from "prop-types";

const GymList = ({
  isHomePage,
  filteredGyms,
  isFiltered,
  firstIndex,
  lastIndex,
}) => {
  const { gyms, isLoading, error } = useGyms();

  const getRandomGyms = (count) => {
    if (gyms && gyms.length > 0) {
      const shuffledGyms = gyms.sort(() => Math.random() - 0.5);
      return shuffledGyms.slice(0, count);
    } else {
      return [];
    }
  };

  return (
    <div>
      {error !== null ? (
        <div>Something went wrong! Error: {error.toString()}</div>
      ) : null}
      {!isLoading && error === null ? (
        <div>
          <ul className="gym-list">
            {filteredGyms?.length > 0 && isFiltered === true
              ? filteredGyms?.slice(firstIndex, lastIndex).map((gym) => (
                  <li className="gym-card-list" key={gym._id}>
                    <GymCard gym={gym} />
                  </li>
                ))
              : isHomePage === true
              ? getRandomGyms(4).map((gym) => (
                  <li className="gym-card-list" key={gym._id}>
                    <GymCard gym={gym} />
                  </li>
                ))
              : gyms?.slice(firstIndex, lastIndex).map((gym) => (
                  <li className="gym-card-list" key={gym._id}>
                    <GymCard gym={gym} />
                  </li>
                ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

GymList.propTypes = {
  isHomePage: PropTypes.bool.isRequired,
  filteredGyms: PropTypes.array,
  isFiltered: PropTypes.bool,
  firstIndex: PropTypes.number,
  lastIndex: PropTypes.number,
};

export default GymList;
