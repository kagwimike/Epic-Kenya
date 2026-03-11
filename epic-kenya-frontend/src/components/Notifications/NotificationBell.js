// src/components/Notifications/NotificationBell.js
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../sockets/socket";
// import "./NotificationBell.css"; // Import the new CSS file

const NotificationBell = ({ loggedInUserId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUserId) return;

    socket.emit("join", loggedInUserId);

    socket.on("notification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off("notification");
    };
  }, [loggedInUserId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    if (!dropdownOpen) {
      setUnreadCount(0);
    }
  };

  const handleNotificationClick = (relatedId) => {
    navigate(`/images/${relatedId}`);
    setDropdownOpen(false);
  };

  return (
    <div className="notification-container" ref={dropdownRef}>
      <div
        className="bell-icon"
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <span role="img" aria-label="bell">🔔</span>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
      </div>

      {dropdownOpen && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <p className="no-notifications">No notifications yet</p>
          ) : (
            <ul className="notification-list">
              {notifications.map((notif, index) => (
                <li
                  key={index}
                  className="notification-item"
                  onClick={() => handleNotificationClick(notif.relatedId)}
                >
                  <strong>{notif.type === "like" ? "👍 Like" : "💬 Comment"}</strong>
                  {" "}from user <em>{notif.fromUserId}</em>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;