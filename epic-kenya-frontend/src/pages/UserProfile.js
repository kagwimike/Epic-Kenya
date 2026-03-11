// src/pages/UserProfile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProfilePictureUpload from "../components/Profile/ProfilePictureUpload";

import "../styles/UserProfile.css";

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const res = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(res.data);
        setFormData({ username: res.data.username, email: res.data.email });
        setIsOwnProfile(res.data.isOwnProfile);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("profilePic", file);

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      await axios.post("/api/users/upload-profile-pic", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (err) {
      console.error("Profile pic upload failed", err);
    }
  };

  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      await axios.put("/api/users/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditMode(false);
      window.location.reload();
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  if (!userData) return <div>Loading profile...</div>;

  return (
    <div className="user-profile-container">
      <h2>{userData.username}'s Profile</h2>

      <div className="profile-picture-section">
        <img
          src={userData.profilePicUrl || "/default-avatar.png"}
          alt="Profile"
          className="profile-pic"
        />
        {isOwnProfile && (
          <input type="file" onChange={handleProfilePicChange} />
        )}
      </div>

      <div className="profile-info">
        {editMode ? (
          <>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <button onClick={handleEditSubmit}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Email:</strong> {userData.email}</p>
            {isOwnProfile && (
              <button onClick={() => setEditMode(true)}>Edit</button>
            )}
          </>
        )}
      </div>

      <div className="user-gallery-section">
        <h3>Uploaded Images</h3>
        <div className="user-gallery">
          {userData.uploadedImages && userData.uploadedImages.length === 0 ? (
            <p>No uploads yet.</p>
          ) : (
            userData.uploadedImages.map((img) => (
              <img key={img.id} src={img.url} alt="User Upload" />
            ))
          )}
        </div>
      </div>

      <div className="user-interactions">
        <h3>Liked / Commented Images</h3>
        <div className="user-gallery">
          {userData.likedImages && userData.likedImages.length === 0 ? (
            <p>No activity yet.</p>
          ) : (
            userData.likedImages.map((img) => (
              <img key={img.id} src={img.url} alt="Interaction" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
