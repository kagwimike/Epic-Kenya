import React from "react";
import "../styles/UploadsGallery.css";

const UploadsGallery = ({ images = [] }) => {
  if (images.length === 0) {
    return <p className="no-uploads">You haven't uploaded any images yet.</p>;
  }

  return (
    <div className="uploads-gallery">
      {images.map((img) => (
        <div className="upload-card" key={img.id}>
          <img src={`http://localhost:5000${img.imagePath}`} alt={img.caption} />
          <div className="upload-info">
            <p className="caption">{img.caption}</p>
            <p className="meta">❤️ {img.likes} Likes</p>
            <p className="meta">💬 {img.comments.length} Comments</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadsGallery;
