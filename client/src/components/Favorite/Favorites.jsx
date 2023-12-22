import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./Favorites.css";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

const Favorites = ({ gymId }) => {
  const { user, login } = useAuth();
  const [inFavorites, setInFavorites] = useState(false);

  const onSuccess = (userData) => {
    login(userData.user);
    if (userData?.user?.favoriteGyms.includes(gymId)) {
      setInFavorites(true);
    } else {
      setInFavorites(false);
    }
  };

  const { performFetch, cancelFetch } = useFetch(
    `/user/${user?._id}/favorite-gyms`,
    onSuccess
  );

  const handleFavorite = () => {
    if (user) {
      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ gymId }),
      });
    } else {
      toast.error("Please login to add favorites!");
    }
  };

  useEffect(() => {
    if (user?.favoriteGyms.includes(gymId)) {
      setInFavorites(true);
    }
    return cancelFetch;
  }, []);

  return (
    <div className="favorite-heart">
      <div
        className="favorite-heart-click"
        onClick={(e) => {
          handleFavorite();
          e.stopPropagation();
        }}
      >
        {inFavorites ? <AiFillHeart /> : <AiOutlineHeart />}
      </div>
    </div>
  );
};

Favorites.propTypes = {
  gymId: PropTypes.string.isRequired,
};

export default Favorites;
