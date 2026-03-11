// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import UploadsGallery from "../components/UploadsGallery";
import LikedGallery from "../components/LikedGallery";
import CommentsList from "../components/CommentsList";
import EditProfileForm from "../components/EditProfileForm";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("uploads");
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("❌ Profile fetch failed:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <ProfileSidebar user={userData} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="profile-content">
        {activeTab === "uploads" && <UploadsGallery userId={userData.id} />}
        {activeTab === "likes" && <LikedGallery />}
        {activeTab === "comments" && <CommentsList />}
        {activeTab === "edit" && <EditProfileForm user={userData} />}
      </div>
    </div>
  );
};

export default ProfilePage;
