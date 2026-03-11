import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LiveChat from "./LiveChat";
import NotificationBell from "./Notifications/NotificationBell";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showDestinations, setShowDestinations] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDestinations(!showDestinations);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("You’ve been logged out.", { position: "top-right", autoClose: 2500 });
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to="/" className="nav-item">Home</Link></li>

          <li
            className="nav-item dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <span className="dropdown-label">Destinations ▾</span>
            {showDestinations && (
              <ul className="dropdown-menu">
                <li><Link to="/mombasa">Mombasa</Link></li>
                <li><Link to="/lake-nakuru">Lake Nakuru</Link></li>
                <li><Link to="/maasai-mara">Maasai Mara</Link></li>
                <li><Link to="/mount-kenya">Mount Kenya</Link></li>
              </ul>
            )}
          </li>
          
          <li><Link to="/about">About</Link></li>


          <li><Link to="/gallery" className="nav-item">Gallery</Link></li>

          {!isAuthenticated ? (
            <>
              <li><Link to="/login" className="nav-item">Login</Link></li>
              <li><Link to="/signup" className="nav-item">Sign Up</Link></li>
            </>
          ) : (
            <li className="nav-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </li>
          )}
        </ul>

        {/* Icons on top-right */}
        <div className="navbar-icons">
          {isAuthenticated && (
            <>
              {/* <div onClick={() => setShowChat(prev => !prev)} className="chat-icon" title="Live Chat">
                💬
              </div> */}
              {/* <NotificationBell loggedInUserId={"admin"} /> */}
            </>
          )}
        </div>
      </nav>

      {/* Live Chat Component */}
      {showChat && <LiveChat />}

      <ToastContainer />
    </>
  );
};

export default Navbar;
