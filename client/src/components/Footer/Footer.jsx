import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { sendMessage } from "../../hooks/fetchEmailjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DiWebplatform } from "react-icons/di";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLocationArrow,
  FaMobile,
  FaAt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const form = useRef();

  const sendMessageHandler = (e) => {
    e.preventDefault();

    sendMessage(form.current)
      .then(() => {
        toast.success("Your message has been sent");
        form.current.reset();
      })
      .catch(() => {
        toast.error("Error. Please try again.");
      });
  };

  return (
    <footer>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="main-content">
        <div className="left box">
          <h2>Links</h2>
          <div className="content">
            <ul className="links">
              <li>
                <Link className="footer-link" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <ul className="links">
              <li>
                <Link className="footer-link" to="/gyms">
                  Gyms
                </Link>
              </li>
            </ul>
            <ul className="links">
              <li>
                <Link className="footer-link" to="/tips">
                  Tips
                </Link>
              </li>
            </ul>
            <ul className="links">
              <li>
                <Link className="footer-link" to="/our-story-detail">
                  Our Story
                </Link>
              </li>
            </ul>
            <div className="social">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com/"
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
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
        <div className="center box">
          <h2>Address</h2>
          <div className="content">
            <div className="place">
              <FaLocationArrow />
              <span className="text">Sarphatistraat 370 Amsterdam</span>
            </div>
            <div className="phone">
              <FaMobile />
              <span className="text">+31-888888888</span>
            </div>
            <div className="email">
              <FaAt />
              <span className="text">gymwhiz@gymwhiz.com</span>
            </div>
          </div>
          <div className="footer-logo">
            Gym
            <DiWebplatform className="footer-logo-icon" />
            hiz
          </div>
        </div>
        <div className="right box">
          <h2>Contact us</h2>
          <div className="content">
            <form
              className="footer-form"
              action="#"
              ref={form}
              onSubmit={sendMessageHandler}
            >
              <div>
                <div className="text">Email</div>
                <input
                  className="footer-input"
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="msg">
                <div className="text">Message</div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="footer-text-area"
                  rows="3"
                  cols="25"
                  required
                ></textarea>
              </div>
              <div className="btn">
                <button className="footer-btn" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr className="footer-line" />
      <div className="bottom">
        <center>
          <span className="credit">Created By | GymWhiz </span>
          <span> 2023 All rights reserved.</span>
          <ul className="links-last">
            <li>
              <Link className="footer-last" to="#">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="footer-last" to="#">
                Term & conditions
              </Link>
            </li>
            <li>
              <Link className="footer-last" to="#">
                Reporting
              </Link>
            </li>
            <li>
              <Link className="footer-last" to="#">
                Support Policy
              </Link>
            </li>
            <li>
              <Link className="footer-last" to="#">
                Privacy
              </Link>
            </li>
          </ul>
        </center>
      </div>
    </footer>
  );
};

export default Footer;
