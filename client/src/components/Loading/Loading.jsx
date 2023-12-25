import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <FontAwesomeIcon icon={faDumbbell} flip style={{ color: "#1db619" }} />
    </div>
  );
};

export default Loading;
