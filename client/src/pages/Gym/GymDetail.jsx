import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/Navbar/Navbar";
import { AiOutlinePhone } from "react-icons/ai";
import "./GymDetail.css";
import Rating from "../../components/Rating/Rating";
import Favorites from "../../components/Favorite/Favorites";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import hours from "../../../public/assets/images/hours.png";
import location from "../../../public/assets/images/location.png";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "react-avatar";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";

const GymDetail = () => {
  const { user } = useAuth();
  const [gym, setGym] = useState(null);
  const { id } = useParams();
  const [users, setUsers] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 4,
    comment: "",
    reviewer: "",
  });

  const onSuccessGym = (data) => {
    setGym(data.result);
  };

  const onSuccessUsers = (data) => {
    setUsers(data.result);
  };

  const onSuccessReviews = (data) => {
    setReviews(data.reviews);
  };

  const onSuccessCreateReview = (data) => {
    setReviews([...reviews, data.review]);
    setNewReview({ rating: 4, comment: "", reviewer: "" });
  };

  const { isLoading: isLoadingDetail, performFetch: fetchGym } = useFetch(
    `/gym/${id}`,
    onSuccessGym
  );

  const { performFetch: fetchReviews } = useFetch(
    `/reviews/${id}`,
    onSuccessReviews
  );

  const { isLoading: isCreatingReview, performFetch: createReviewFetch } =
    useFetch("/reviews/create", onSuccessCreateReview);

  const { isLoading: isLoadingUsers, performFetch: fetchUsers } = useFetch(
    "/user",
    onSuccessUsers
  );

  useEffect(() => {
    fetchGym();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-DE").format(price);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.warning(<div>You must be logged in to submit a review!</div>);
      return;
    } else if (!newReview.comment.length > 0) {
      toast.warning(<div>Please write a review to submit!</div>);
      return;
    } else {
      // Prepare the review data
      const reviewData = {
        userId: user._id,
        gymId: id,
        rating: newReview.rating,
        comment: newReview.comment,
        reviewer: user.firstName,
      };

      // Call the performFetch function from your useFetch hook
      createReviewFetch({
        method: "POST",
        body: JSON.stringify(reviewData),
      });
    }
  };

  return (
    <div>
      {isLoadingDetail || isLoadingUsers ? (
        <Loading />
      ) : (
        <>
          <div className="gym-detail-page-navbar">
            <Navbar />
          </div>
          {gym ? (
            <div className="gym-detail-page">
              <div className="gym-general-info">
                <div className="gym-img">
                  <img src={gym.picture[0]} alt={gym.name} />
                  <Favorites gymId={id} />
                </div>
                <div className="info-container">
                  <div className="gym-info">
                    <p className="category-line">{gym.category?.join(", ")}</p>
                    <hr />
                    <h1>{gym.name}</h1>
                    <hr />
                    <p className="address-line">
                      {gym.gymInfo.street}, {gym.city}
                    </p>
                    <p className="address-line">{gym.gymInfo.zipCode}</p>
                    <div className="phone-section">
                      <span className="phone-icon">
                        <AiOutlinePhone />
                      </span>
                      <span className="phone-number">
                        {gym.gymInfo.phoneNumber}
                      </span>
                    </div>
                    <p className="gym-detail-price">
                      €{formatPrice(gym.price)}
                    </p>
                    <Rating rating={gym.rating} />
                  </div>
                  <div className="social-media-icon">
                    <p className="share">Share</p>
                    <div className="social-icons">
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook />
                      </a>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram />
                      </a>
                      <a
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opening-hours-container">
                <div className="opening-hours-header gym-detail-sub-header">
                  <hr />
                  <h2>Opening Hours</h2>
                  <hr />
                </div>
                <div className="opening-times">
                  <div className="opening-hours centered-section">
                    <ul>
                      {gym.openingHours.map((hour, index) => (
                        <li className="week-list-item" key={index}>
                          <span>{hour.day} </span>
                          <span>{hour.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="opening-times-img-container centered-section">
                    <img src={hours} alt="hours" />
                  </div>
                </div>
              </div>
              <div className="map-location-container">
                <div className="map-location-header gym-detail-sub-header">
                  <hr />
                  <h2>Map Location</h2>
                  <hr />
                </div>
                <div className="map-location-section">
                  <div className="map-location-icon-container centered-section">
                    <img src={location} alt="location" />
                  </div>
                  <div className="map-iframe centered-section">
                    <iframe src={gym.location?.iframe}></iframe>
                  </div>
                </div>
              </div>
              <div className="review-section">
                <div className="review-header gym-detail-sub-header">
                  <hr />
                  <h2>Reviews</h2>
                  <hr />
                </div>
                <div className="reviews-container">
                  <div className="reviews-list">
                    {reviews.map((review) => (
                      <div key={review._id} className="review">
                        <div className="reviewer-container">
                          {users
                            ?.filter((user) => user._id === review.user)
                            .map((reviewer) => {
                              return reviewer.profilePhoto ? (
                                <img
                                  key={review._id}
                                  src={reviewer.profilePhoto}
                                  alt="review-profile"
                                  className="review-profile-photo"
                                />
                              ) : (
                                <Avatar
                                  key={review._id}
                                  className="reviewer-avatar"
                                  name={review.reviewer}
                                  round={true}
                                  size="36"
                                />
                              );
                            })}
                          <span className="review-span">{review.reviewer}</span>
                        </div>
                        <Rating rating={review.rating} />
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  <div className="review-writing-section">
                    <h3>Write a review</h3>
                    <form className="review-form" onSubmit={submitReview}>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        name="comment"
                        id="comment"
                        value={newReview.comment}
                        onChange={handleReviewChange}
                        placeholder="Write your review here..."
                      />
                      <div className="review-submit-container">
                        <div className="review-rating-section">
                          <label className="rating-label" htmlFor="rating">
                            Rating
                          </label>
                          <select
                            name="rating"
                            id="rating"
                            value={newReview.rating}
                            onChange={handleReviewChange}
                          >
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                          </select>
                        </div>
                        <button className="review-submit-button" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {isCreatingReview && <p>Submitting review...</p>}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </div>
  );
};

export default GymDetail;
