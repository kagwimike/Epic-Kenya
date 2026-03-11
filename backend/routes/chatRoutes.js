const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/messages", (req, res) => {
  const sql = `
    SELECT messages.*, users.username 
    FROM messages 
    JOIN users ON messages.user_id = users.id 
    ORDER BY messages.sent_at ASC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST /api/chat/messages
router.post("/messages", (req, res) => {
  const { user_id, message } = req.body;

  if (!user_id || !message) {
    return res.status(400).json({ error: "User ID and message are required" });
  }

  const sql = "INSERT INTO messages (user_id, message) VALUES (?, ?)";
  db.query(sql, [user_id, message], (err, result) => {
    if (err) {
      console.error("❌ Chat insert error:", err.message);
      return res.status(500).json({ error: "Failed to send message" });
    }

    res.status(201).json({ success: true, message: "Message sent", messageId: result.insertId });
  });
});

module.exports = router;
