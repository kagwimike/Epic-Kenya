import React from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../assets/hero-bg.jpg";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Welcome to Epic Kenya</h1>
          <p>Discover breathtaking destinations and cultural wonders.</p>
          <button className="cta-button" onClick={() => navigate("/destinations")}>
            Explore Destinations
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
