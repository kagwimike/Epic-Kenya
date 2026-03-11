import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="intro">
        <h1>About Epic Kenya</h1>
        <p>
          <strong>Epic Kenya</strong> is an immersive travel and cultural discovery platform
          built to showcase the breathtaking beauty, destinations, and heritage of Kenya. Whether you're a tourist,
          a local explorer, or a nature lover, this app connects you to the most iconic places and vibrant stories of Kenya.
        </p>
      </section>

      <section className="features">
        <h2>What You Can Explore</h2>
        <ul>
          <li><strong>🌍 Destinations:</strong> Discover Lake Nakuru, Mombasa, Mount Kenya, and Maasai Mara with rich descriptions and images.</li>
          <li><strong>🖼️ Gallery:</strong> Upload and view user-submitted images in a stunning 3D slider format.</li>
          <li><strong>👍 Likes & 💬 Comments:</strong> Interact with shared experiences through likes and comments.</li>
          <li><strong>💬 Live Chat:</strong> Engage in real-time conversations with fellow explorers.</li>
          <li><strong>🔔 Notifications:</strong> Stay updated with alerts for new uploads, likes, and comments.</li>
          <li><strong>🛡️ Admin Panel:</strong> Moderation and content control tools for a safe, quality experience.</li>
        </ul>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          To promote local tourism and cultural appreciation by leveraging technology to bring Kenya’s natural wonders and
          vibrant communities closer to everyone — globally and locally.
        </p>

        <h2>Our Vision</h2>
        <p>
          To become the leading digital platform for discovering and sharing the true spirit of Kenya through visual storytelling,
          community interaction, and tech-powered travel experiences.
        </p>
      </section>
    </div>
  );
};

export default About;
