import React from "react";
import { TbFaceIdError } from "react-icons/tb";
import "./GymNotFound.css";

const GymNotFound = () => {
  return (
    <div className="not-found-section">
      <h2 className="not-found-text">
        We could not find any gym that matched your search!
      </h2>
      <TbFaceIdError className="not-found-icon" />
    </div>
  );
};

export default GymNotFound;
