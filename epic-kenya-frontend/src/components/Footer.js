import React from "react";
import "../styles/Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section about">
          <h3>Epic Kenya</h3>
          <p>Explore the wild beauty of Kenya with our guided safaris and cultural experiences. Your adventure starts here.</p>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p><FaPhone /> +254 712 345 678</p>
          <p><FaEnvelope /> info@epickenya.com</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/upload">Upload</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Epic Kenya. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
