import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { FaComments } from "react-icons/fa";
import "../styles/LiveChat.css";

const socket = io("http://localhost:5000");

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
      if (!isChatOpen) setUnreadCount((prev) => prev + 1);
    });

    socket.on("userTyping", () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000); // reset after 2s
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
    };
  }, [isChatOpen]);

  useEffect(() => {
    if (isChatOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen) setUnreadCount(0);
  };

  const sendMessage = () => {
    const trimmed = message.trim();
    if (trimmed) {
      const newMsg = { senderId: "admin", message: trimmed };
      socket.emit("sendMessage", newMsg);
      setMessages((prev) => [...prev, newMsg]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
    else socket.emit("typing");
  };

  return (
    <div className="live-chat-wrapper">
      <div className="chat-icon-wrapper" onClick={toggleChat}>
        <FaComments className="chat-icon" />
        {unreadCount > 0 && <span className="chat-badge">{unreadCount}</span>}
      </div>

      {isChatOpen && (
        <div className="chat-box-container">
          <div className="chat-header">💬 Live Chat</div>

          <div className="chat-box">
            {messages.length === 0 ? (
              <div className="no-messages">No messages yet.</div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`chat-msg ${msg.senderId === "admin" ? "admin-msg" : "user-msg"}`}>
                  <span className="sender-tag">{msg.senderId === "admin" ? "You" : "User"}:</span>
                  {msg.message}
                </div>
              ))
            )}
            {isTyping && <div className="typing-indicator">User is typing...</div>}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="chat-input-group">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} disabled={!message.trim()}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
