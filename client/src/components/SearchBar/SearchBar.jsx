import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./search-bar.css";
import { useGyms } from "../../contexts/GymContext.js";
import { toast } from "react-toastify";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);
  const { gyms, error } = useGyms();

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setResults([]);
      return;
    }

    // Filter gyms based on the search query
    const filteredResults = gyms.filter(
      (gym) =>
        gym.name.toLowerCase().includes(query.toLowerCase()) ||
        gym.category.some((category) =>
          category.toLowerCase().includes(query.toLowerCase())
        ) ||
        gym.city.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  const handleGymClick = (gymId) => {
    navigate(`/gym/${gymId}`);
  };

  const handleDocumentClick = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target)
    ) {
      setSearchQuery("");
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (error === "Not found") {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="search-container" ref={searchContainerRef}>
      <div className="searchBar-container">
        <input
          className="searchBar-name"
          placeholder="Search your gym..."
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      {results.length !== 0 && (
        <div className="search-result-container">
          {results.map((gym, index) => (
            <div
              className="search-result-item"
              key={index}
              onClick={() => handleGymClick(gym._id)}
            >
              {gym.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
