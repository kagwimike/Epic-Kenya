// src/components/DestinationLayout.js
import React from "react";
import ImageUploadForm from "./ImageUploadForm";
import Gallery from "./Gallery";
import "../styles/Destination.css";

const DestinationLayout = ({ 
  title, 
  description, 
  backgroundImage, 
  destination, 
  activities = [], 
  videoUrl, 
  mapEmbed 
}) => {
  return (
    <div className="destination-page">
      {/* 🔥 Hero Banner */}
      <div
        className="destination-hero"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay">
          <h1 className="destination-title animated-title">{title}</h1>
        </div>
      </div>

      <div className="destination-content">
        {/* 📝 Description */}
        <section className="destination-section">
          <h2>About {title}</h2>
          <p className="destination-description">{description}</p>
        </section>

        {/* ⭐ Activities */}
        {activities.length > 0 && (
          <section className="destination-section">
            <h2>Top Things to Do in {title}</h2>
            <ul className="destination-activities">
              {activities.map((item, idx) => (
                <li key={idx}>🎯 {item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* 🎥 Video */}
        {videoUrl && (
          <section className="destination-section">
            <h2>Watch</h2>
            <div className="destination-video">
              <iframe
                width="100%"
                height="400"
                src={videoUrl}
                title={`${title} Travel Video`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}

        {/* 🗺️ Map Embed */}
        {mapEmbed && (
          <section className="destination-section">
            <h2>Location</h2>
            <div className="destination-map">
              <iframe
                src={mapEmbed}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title={`${title} Map`}
              ></iframe>
            </div>
          </section>
        )}

        {/* 📸 Image Upload & Gallery */}
        <section className="destination-section">
          <h2>{title} Gallery</h2>
          <ImageUploadForm destination={destination} />
          <Gallery destination={destination} />
        </section>
      </div>
    </div>
  );
};

export default DestinationLayout;
