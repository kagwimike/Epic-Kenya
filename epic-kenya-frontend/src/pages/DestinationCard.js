import React, { useState } from "react";
import DestinationCard from "./DestinationCard";

const Destinations = () => {
  const [activeVideo, setActiveVideo] = useState(null); 

  const destinationData = [
    {
      name: "Mombasa",
      description: "Explore the coastal beauty of Mombasa.",
      image: "/uploads/images/mombasa.jpg",
      video: "/uploads/videos/mombasa.mp4",
    },
    {
      name: "Lake Nakuru",
      description: "Famous for flamingos and scenic views.",
      image: "/uploads/images/lake-nakuru.jpg",
      video: "/uploads/videos/lake-nakuru.mp4",
    },
    {
      name: "Mount Kenya",
      description: "Adventure on Kenya's highest mountain.",
      image: "/uploads/images/mt-kenya.jpg",
      video: "/uploads/videos/mt-kenya.mp4",
    },
    {
      name: "Maasai Mara",
      description: "Experience the Great Migration.",
      image: "/uploads/images/maasai-mara.jpg",
      video: "/uploads/videos/maasai-mara.mp4",
    },
  ];

  const openModal = (videoUrl) => {
    setActiveVideo(videoUrl);
  };

  const closeModal = () => {
    setActiveVideo(null);
  };

  return (
    <div className="destinations-page">
      {destinationData.map((dest, index) => (
        <DestinationCard
          key={index}
          name={dest.name}
          description={dest.description}
          image={dest.image}
          video={dest.video}
          onWatchVideo={() => openModal(dest.video)}
        />
      ))}

      {activeVideo && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
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

export default Destinations;
