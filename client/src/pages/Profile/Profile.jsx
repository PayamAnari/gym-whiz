import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";
import useFetch from "../../hooks/useFetch";
import { validateName, validatePassword } from "../../util/inputsValidation";
import NavBar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import UserProfile from "./UserProfile";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [error, setError] = useState(null);
  const userData = user ? user : null;
  const [profileData, setProfileData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    age: userData.age || "",
    weight: userData.weight || "",
    height: userData.height || "",
    password: "",
    passwordConfirmation: "",
  });

  const userId = user ? user._id : null;

  const onSuccess = (updatedUser) => {
    updateUser(updatedUser.user);
    toast.success("Your account updated successfully!");
  };

  const { performFetch, cancelFetch } = useFetch(`/user/${userId}`, onSuccess);

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (validateName(profileData.firstName)) {
      setError(validateName(profileData.firstName));
      return;
    }
    if (validateName(profileData.lastName)) {
      setError(validateName(profileData.lastName));
      return;
    }

    // Construct the update payload
    const updatePayload = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      age: profileData.age,
      weight: profileData.weight,
      height: profileData.height,
    };

    // check password field changed and confirmed
    if (
      profileData.password.trim() &&
      profileData.password === profileData.passwordConfirmation
    ) {
      if (validatePassword(profileData.password)) {
        setError(validatePassword(profileData.password));
        return;
      }
      updatePayload.password = profileData.password;
    } else if (
      profileData.password.trim() ||
      profileData.passwordConfirmation.trim()
    ) {
      setError("Please ensure the new password and confirmation match.");
      return;
    }

    performFetch({
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatePayload),
    });
  };

  useEffect(() => {
    toast.error(error);
    setError(null);
  }, [error]);

  return (
    <>
      <div className="container">
        <NavBar />
        <div className="profile-container">
          <div className="profile-photo">
            <h1>Profile Picture</h1>
            <UserProfile userId={userId} />
            <div className="profile-email">{user && user.email}</div>
          </div>
          <div className="profile-info">
            <h1>Welcome, {user && user.firstName}!</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="profile-label" htmlFor="firstName">
                  First Name:
                </label>
                <input
                  className="profile-input"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                />
                <label className="profile-label" htmlFor="lastName">
                  Last Name:
                </label>
                <input
                  className="profile-input"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <div className="age-group">
                  <label className="profile-label" htmlFor="age">
                    Age:
                  </label>
                  <input
                    className="profile-input"
                    type="text"
                    id="age"
                    name="age"
                    value={profileData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                  />
                  <label className="profile-label" htmlFor="weight">
                    Weight:
                  </label>
                  <input
                    className="profile-input"
                    type="text"
                    id="weight"
                    name="weight"
                    value={profileData.weight}
                    onChange={handleInputChange}
                    placeholder="Enter your weight"
                  />
                  <label className="profile-label" htmlFor="height">
                    Height:
                  </label>
                  <input
                    className="profile-input"
                    type="text"
                    id="height"
                    name="height"
                    value={profileData.height}
                    onChange={handleInputChange}
                    placeholder="Enter your height"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="profile-label" htmlFor="password">
                  New Password:
                </label>
                <input
                  className="profile-input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter new password"
                  value={profileData.password}
                  onChange={handleInputChange}
                />
                <label className="profile-label" htmlFor="passwordConfirmation">
                  Confirm New Password:
                </label>
                <input
                  className="profile-input"
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  placeholder="Confirm new password"
                  value={profileData.passwordConfirmation}
                  onChange={handleInputChange}
                />
                <p className="account-creation-date">
                  Account Created: {/**/}
                  {new Date(userData.createdAt).toLocaleString()}
                </p>
                <p className="account-update-date">
                  Account Updated: {/**/}
                  {new Date(userData.updatedAt).toLocaleString()}
                </p>
              </div>
              <button className="profile-btn" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
