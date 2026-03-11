
import React from "react";
import { Link } from "react-router-dom";

import Gallery from "../components/Gallery";
import "../styles/GalleryPage.css";

const GalleryPage = () => {
  return (
    <div className="gallery-page">
      <h2 className="magic-text">Photo Gallery</h2>
      <Link to="/upload" className="upload-link">Upload Image</Link>
      <Gallery />
    </div>
  );
};

export default GalleryPage;
