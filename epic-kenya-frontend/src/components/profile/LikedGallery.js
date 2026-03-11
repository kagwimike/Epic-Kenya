// src/components/profile/LikedGallery.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ProfileGallery.css";

const LikedGallery = ({ userId }) => {
  const [likedImages, setLikedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedImages = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/profile/likes/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikedImages(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch liked images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedImages();
  }, [userId]);

  if (loading) return <p>Loading liked images...</p>;
  if (likedImages.length === 0) return <p>No liked images yet.</p>;

  return (
    <div className="gallery-grid">
      {likedImages.map((img) => (
        <div className="gallery-card" key={img.id}>
          <img src={`http://localhost:5000${img.imagePath}`} alt={img.caption || "Liked Image"} />
          <div className="card-caption">
            <p>{img.caption}</p>
            <p>❤️ {img.likes} likes</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedGallery;
