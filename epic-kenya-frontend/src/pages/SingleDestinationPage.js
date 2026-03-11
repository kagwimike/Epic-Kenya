// src/pages/SingleDestinationPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageCard from "../components/ImageCard";

const SingleDestinationPage = () => {
  const { destination } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/gallery/destination/${destination}`
        );

        setImages(res.data);
      } catch (err) {
        console.error("❌ Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [destination]);

  return (
    <div className="destination-page">
      <h2>{destination.replace("-", " ")}</h2>

      {loading ? (
        <p>Loading images...</p>
      ) : images.length === 0 ? (
        <p>No images uploaded for this destination yet.</p>
      ) : (
        <div className="image-grid">
          {images.map((img) => (
            <ImageCard key={img.id} image={img} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleDestinationPage;