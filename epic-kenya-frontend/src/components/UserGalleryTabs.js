import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserGalleryTabs.css";

const destinations = ["All", "mombasa", "lake-nakuru", "mount-kenya", "maasai-mara"];

const UserGalleryTabs = ({ userId, token }) => {
  const [activeTab, setActiveTab] = useState("uploaded");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [commentedImages, setCommentedImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("All");

  useEffect(() => {
    if (!userId || !token) return;

    const fetchImages = async () => {
      try {
        const [uploadedRes, commentedRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${userId}/uploaded-images`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5000/api/users/${userId}/commented-images`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUploadedImages(uploadedRes.data);
        setCommentedImages(commentedRes.data);
      } catch (err) {
        console.error("❌ Failed to load galleries:", err);
      }
    };

    fetchImages();
  }, [userId, token]);

  // Filter images based on tab and selected destination
  useEffect(() => {
    const source = activeTab === "uploaded" ? uploadedImages : commentedImages;

    const filtered =
      selectedDestination === "All"
        ? source
        : source.filter((img) => img.destination === selectedDestination);

    setFilteredImages(filtered);
  }, [activeTab, uploadedImages, commentedImages, selectedDestination]);

  return (
    <div className="tabbed-gallery">
      <div className="tab-buttons">
        <button
          className={activeTab === "uploaded" ? "active" : ""}
          onClick={() => setActiveTab("uploaded")}
        >
          Uploaded
        </button>
        <button
          className={activeTab === "commented" ? "active" : ""}
          onClick={() => setActiveTab("commented")}
        >
          Commented
        </button>
      </div>

      <div className="filter-dropdown">
        <label>Filter by Destination:</label>
        <select
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
        >
          {destinations.map((dest) => (
            <option key={dest} value={dest}>
              {dest.charAt(0).toUpperCase() + dest.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="image-grid">
        {filteredImages.length === 0 ? (
          <p>No images found for selected tab and destination.</p>
        ) : (
          filteredImages.map((img) => (
            <div key={img.id} className="image-card">
              <img src={`http://localhost:5000${img.imagePath}`} alt={img.caption} />
              <p>{img.caption}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserGalleryTabs;
