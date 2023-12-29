import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Avatar from "react-avatar";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploadDisabled, setUploadDisabled] = useState(true);
  const [isDeleteDisabled, setDeleteDisabled] = useState(true);
  const { setUser } = useAuth();
  const inputFileRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_SERVER_URL}/api/user/${userId}/profile`
        );
        setUserData(response.data.user);
      } catch (error) {
        setError("Error fetching user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    selectedFile ? setUploadDisabled(false) : setUploadDisabled(true);
  }, [selectedFile]);

  useEffect(() => {
    setDeleteDisabled(!userData || !userData.profilePhoto);
  }, [userData]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError("No file selected.");
      toast.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", selectedFile);

    try {
      const response = await axios.put(
        `${process.env.BASE_SERVER_URL}/api/user/${userData._id}/profile-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePhoto: response.data.user.profilePhoto,
      }));
      setUser((prevUserData) => ({
        ...prevUserData,
        profilePhoto: response.data.user.profilePhoto,
      }));
      inputFileRef.current.value = null;
      setSelectedFile(null);
      toast.success("Profile photo updated successfully!");
    } catch (error) {
      setError("Error uploading profile photo. Please try again.");
      toast.error("Error uploading profile photo. Please try again.");
    }
  };

  const handleDeletePhoto = async () => {
    try {
      await axios.delete(
        `${process.env.BASE_SERVER_URL}/api/user/${userData._id}/profile-photo`
      );
      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePhoto: null,
      }));
      setUser((prevUserData) => ({
        ...prevUserData,
        profilePhoto: null,
      }));
      inputFileRef.current.value = null;
      setSelectedFile(null);
      toast.success("Profile photo deleted successfully!");
    } catch (error) {
      setError("Error deleting profile photo. Please try again.");
      toast.error("Error deleting profile photo. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const imageUrl = userData.profilePhoto ? userData.profilePhoto : null;

  return (
    <div className="user-profile">
      <h1>
        {userData.firstName} {userData.lastName}
      </h1>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile" />
      ) : (
        <Avatar
          className="avatar"
          name={`${userData.firstName} ${userData.lastName}`}
          size="90"
          round={true}
        />
      )}
      <div className="upload-profile-photo">
        <h3>Change Profile Photo</h3>
        <input
          className="upload-photo-input"
          type="file"
          ref={inputFileRef}
          onChange={handleFileChange}
          accept="image/*"
        />
        <div className="btn-container">
          <button
            className="upload-photo-btn"
            onClick={handleFileUpload}
            disabled={isUploadDisabled}
          >
            Upload Photo
          </button>
          <button
            className="delete-photo-btn"
            onClick={handleDeletePhoto}
            disabled={isDeleteDisabled}
          >
            Delete Photo
          </button>
        </div>
      </div>
      {error && <p className="profile-photo-error">{error}</p>}
    </div>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.string,
};

export default UserProfile;
