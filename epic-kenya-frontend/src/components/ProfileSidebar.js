// src/components/ProfileSidebar.js
import React from "react";
import "../styles/Profile.css";

const ProfileSidebar = ({ user, activeTab, setActiveTab }) => {
  return (
    <div className="profile-sidebar">
      <img
        src={`http://localhost:5000${user.profile_picture || "/default-user.png"}`}
        alt="Profile"
        className="profile-pic"
      />
      <h3>{user.username}</h3>

      <ul className="profile-tabs">
        <li onClick={() => setActiveTab("uploads")} className={activeTab === "uploads" ? "active" : ""}>📸 Uploads</li>
        <li onClick={() => setActiveTab("likes")} className={activeTab === "likes" ? "active" : ""}>❤️ Likes</li>
        <li onClick={() => setActiveTab("comments")} className={activeTab === "comments" ? "active" : ""}>💬 Comments</li>
        <li onClick={() => setActiveTab("edit")} className={activeTab === "edit" ? "active" : ""}>⚙️ Edit</li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
