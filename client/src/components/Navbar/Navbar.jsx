import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav-bar.css";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/AuthContext";
import TEST_ID from "./Nav.testid";
import Avatar from "react-avatar";
import { AiOutlineHeart } from "react-icons/ai";
import { CgHomeAlt, CgGym, CgWebsite } from "react-icons/cg";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { toast } from "react-toastify";
import { DiWebplatform } from "react-icons/di";
import { GoSignOut } from "react-icons/go";
import { AiOutlineEdit } from "react-icons/ai";

const Nav = ({ setCurrentPage, handleResetClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    await logout();

    toast.success("Logged out successfully!");
  };

  return (
    <nav className="nav-bar">
      <Link to="/">
        <h3 className="logo">
          Gym
          <DiWebplatform className="logo-icon" />
          hiz
        </h3>
      </Link>
      <div className="mobile-nav">
        <ul className="nav-menu">
          <Link to="/" data-testid={TEST_ID.linkToHome}>
            <div className="nav-item-container">
              <CgHomeAlt className="nav-box-logo" color="#fff" />
              <li className="nav-menu-item">Home</li>
            </div>
          </Link>
          <Link
            onClick={() => {
              setCurrentPage(1);
              handleResetClick();
            }}
            to="/gyms"
            data-testid={TEST_ID.linkToGyms}
          >
            <div className="nav-item-container">
              <CgGym className="nav-box-logo" color="#fff" />
              <li className="nav-menu-item">Gyms</li>
            </div>
          </Link>

          <Link to="/tips" data-testid={TEST_ID.linkToTips}>
            <div className="nav-item-container">
              <MdOutlineTipsAndUpdates className="nav-box-logo" color="#fff" />
              <li className="nav-menu-item">Tips</li>
            </div>
          </Link>
          <Link to="/our-story-detail" data-testid={TEST_ID.linkToOurStory}>
            <div className="nav-item-container">
              <CgWebsite className="nav-box-logo" color="#fff" />
              <li className="nav-menu-item">Our story</li>
            </div>
          </Link>
        </ul>
      </div>
      <section className="nav-authentication">
        {user && <p className="welcome-msg">{`Welcome, ${user.firstName}`}</p>}
        {user ? (
          <>
            {user && (
              <Link to="/favorites">
                <li className="favorite-icon">
                  <AiOutlineHeart className="favorite-icon-logo" color="#fff" />
                </li>
              </Link>
            )}
            <div className="dropdown-container">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="nav-profile"
                  className="profile-photo-navbar"
                />
              ) : (
                <Avatar
                  className="avatar"
                  name={`${user.firstName} ${user.lastName}`}
                  size={40}
                  round={true}
                />
              )}

              <div className={"dropdown-content"}>
                <button
                  className="dropdown-primary-btn
              "
                  onClick={() => navigate("/profile")}
                >
                  Edit Profile
                  <AiOutlineEdit className="dropdown-logo" />
                </button>
                <button className="dropdown-primary-btn" onClick={handleLogout}>
                  Sign Out
                  <GoSignOut className="dropdown-logo" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" data-testid={TEST_ID.linkToSignInUser}>
              <button className="primary-btn signIn">Sign-in</button>
            </Link>
            <Link to="/user/create" data-testid={TEST_ID.linkToSignUpUsers}>
              <button className="primary-btn signUp">Sign-up</button>
            </Link>
          </>
        )}
      </section>
    </nav>
  );
};

Nav.propTypes = {
  setCurrentPage: PropTypes.func,
  handleResetClick: PropTypes.func,
};

export default Nav;
