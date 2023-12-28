import React, { useEffect, useState } from "react";
import Nav from "../../components/Navbar/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import GymCard from "../../components/GymCard/GymCard";
import { useGyms } from "../../contexts/GymContext";
import "./favorite-gyms.css";

const FavoriteGyms = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { gyms } = useGyms();
  const [favoriteGyms, setFavoriteGyms] = useState([]);

  useEffect(() => {
    if (gyms && user?.favoriteGyms) {
      const filteredGyms = gyms.filter((gym) =>
        user.favoriteGyms.includes(gym._id)
      );
      setFavoriteGyms(filteredGyms);
    }
  }, [gyms, user]);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <div className="gyms-page-navbar">
        <Nav />
      </div>
      <div className="favorite-gyms-container">
        {favoriteGyms.length > 0 ? (
          favoriteGyms.map((gym) => <GymCard key={gym._id} gym={gym} />)
        ) : (
          <p className="no-favorites-message">You have no favorite gyms yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteGyms;
