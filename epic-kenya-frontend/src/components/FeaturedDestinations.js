import React, { useState } from "react";
import "../styles/FeaturedDestinations.css";

const destinations = [
  {
    name: "Maasai Mara",
    image: "/assets/maasai-mara.jpg",
    video: "http://localhost:5000/uploads/videos/maasai-mara.mp4"
  },
  {
    name: "Mombasa",
    image: "/assets/Mombasa.jpg",
    video: "http://localhost:5000/uploads/videos/mombasa.mp4"
  },
  {
    name: "Mount Kenya",
    image: "/assets/mount-kenya.jpg",
    video: "http://localhost:5000/uploads/videos/mount-kenya.mp4"
  },
  {
    name: "Nakuru",
    image: "/assets/nakuru.jpg",
    video: "http://localhost:5000/uploads/videos/nakuru.mp4"
  }
];

const FeaturedDestinations = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");

  const openModal = (videoUrl) => {
    setActiveVideo(videoUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveVideo("");
  };

  return (
    <div className="featured-destinations">
      <h2 className="magic-text">Top Destinations</h2>
      <div className="destinations-grid">
        {destinations.map((dest, index) => (
          <div key={index} className="destination-card">
            <img src={dest.image} alt={dest.name} />
            <p>{dest.name}</p>
            <button
              className="video-link"
              onClick={() => openModal(dest.video)}
            >
              🎥 Watch Video
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div className="video-modal scale-in" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <video
              controls
              autoPlay
              className="video-player"
              controlsList="nodownload"
            >
              <source src={activeVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedDestinations;
