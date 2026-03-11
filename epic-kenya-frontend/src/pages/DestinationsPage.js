// src/pages/DestinationsPage.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/DestinationsPage.css";

const destinations = [
  {
    name: "Mombasa",
    path: "mombasa",
    image: "/images/mombasa.jpg",
  },
  {
    name: "Lake Nakuru",
    path: "lake-nakuru",
    image: "/images/lake-nakuru.jpg",
  },
  {
    name: "Maasai Mara",
    path: "maasai-mara",
    image: "/images/maasai-mara.jpg",
  },
  {
    name: "Mount Kenya",
    path: "mount-kenya",
    image: "/images/mount-kenya.jpg",
  },
];

const DestinationsPage = () => {
  return (
    <div className="destinations-page">
      <h2>Explore Destinations in Kenya</h2>
      <div className="destination-card-grid">
        {destinations.map((dest, index) => (
          <Link to={`/destination/${dest.path}`} key={index} className="destination-card">
            <img src={dest.image} alt={dest.name} />
            <div className="card-content">
              <h3>{dest.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
