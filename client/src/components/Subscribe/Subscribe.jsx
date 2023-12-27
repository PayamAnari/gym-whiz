import React, { useRef } from "react";
import "./Subscribe.css";
import { sendEmail } from "../../hooks/fetchEmailjs";
import subImage from "../../../public/assets/images/sub.png";
import { toast } from "react-toastify";

const Subscribe = () => {
  const form = useRef();

  const handleSubscribe = (e) => {
    e.preventDefault();

    sendEmail(form.current)
      .then(() => {
        toast.success("Thank you for subscribing!");
        form.current.reset();
      })
      .catch(() => {
        toast.error("Error subscribing. Please try again.");
      });
  };

  return (
    <div className="news-container">
      <div className="card-container">
        <div className="news-detail">
          <div className="inner-container">
            <h1>Hey, wait...</h1>
            <h3>Subscribe to our newsletter!</h3>
            <p>
              You will never miss our fitness tips, workout routines, healthy
              recipes, and more. Our newsletter is sent once a week, every
              Wednesday.
            </p>
          </div>
          <form
            id="newsletter-form"
            ref={form}
            onSubmit={handleSubscribe}
            className="form"
          >
            <div>
              <input
                className="subscribe-input"
                type="email"
                name="user-email"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div>
              <button type="submit">Subscribe</button>
            </div>
          </form>
        </div>
        <div className="news-image">
          <img src={subImage} alt="subImage" className="news-img" />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
