import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/PublicProfilePage.css";

const PublicProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  let currentUserId = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      currentUserId = decoded.id;
    } catch (err) {
      console.error("❌ Token decode error:", err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, uploadsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${userId}`),
          axios.get(`http://localhost:5000/api/images/user/${userId}`)
        ]);

        setUser(userRes.data);
        setFollowerCount(userRes.data.followerCount || 0);
        setUploads(uploadsRes.data);

        if (token && currentUserId !== parseInt(userId)) {
          const statusRes = await axios.get(
            `http://localhost:5000/api/follow/status/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setIsFollowing(statusRes.data.isFollowing);
        }
      } catch (err) {
        console.error("❌ Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token, currentUserId]);

  const handleToggleFollow = async () => {
    try {
      const url = `http://localhost:5000/api/follow/${isFollowing ? "unfollow" : "follow"}/${userId}`;
      const method = isFollowing ? "delete" : "post";

      await axios({
        method,
        url,
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsFollowing(!isFollowing);
      setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("❌ Follow toggle failed:", err);
    }
  };

  if (loading || !user) return <div>Loading profile...</div>;

  return (
    <div className="public-profile">
      <div className="profile-header">
        {user.profilePicture && (
          <img
            src={`http://localhost:5000${user.profilePicture}`}
            alt="Profile"
            className="profile-pic"
          />
        )}
        <h2>{user.username}</h2>
        {user.email && <p>{user.email}</p>}
        <p className="follower-count">{followerCount} follower{followerCount !== 1 ? "s" : ""}</p>
      </div>

      {token && currentUserId !== parseInt(userId) && (
        <div className="profile-actions">
          <button className="btn-message">Message</button>
          <button className="btn-follow" onClick={handleToggleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      )}

      <div className="gallery-section">
        <h3>Uploaded Images</h3>
        <div className="gallery-grid">
          {uploads.map((img) => (
            <div key={img.id} className="gallery-item">
              <img src={`http://localhost:5000${img.imagePath}`} alt={img.caption} />
              <p>{img.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
