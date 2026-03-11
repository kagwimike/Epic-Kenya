import React, { useState } from "react";
import ModalVideo from "./ModalVideo";
import "../styles/DestinationCard.css";

const DestinationCard = ({ name, description, image, video }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="destination-card">
      <h2>{name}</h2>
      <p>{description}</p>

      <div className="media-container">
        <img
          src={image}
          alt={`Thumbnail for ${name}`}
          className="destination-thumbnail"
          onClick={openModal}
          style={{ cursor: "pointer" }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openModal();
          }}
          role="button"
          aria-label={`Watch video about ${name}`}
        />
        <p className="click-text">Click to watch video</p>
      </div>

      {showModal && <ModalVideo videoUrl={video} onClose={closeModal} />}
    </div>
  );
};

export default DestinationCard;
