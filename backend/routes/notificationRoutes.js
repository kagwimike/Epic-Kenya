const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Fetch user notifications
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT n.*, u.username AS sender_name 
    FROM notifications n 
    LEFT JOIN users u ON n.sender_id = u.id 
    WHERE n.user_id = ?
    ORDER BY n.created_at DESC
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Mark notification as read
router.put("/read/:id", (req, res) => {
  const sql = "UPDATE notifications SET is_read = TRUE WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});


// Create a new notification
router.post("/", (req, res) => {
  const { user_id, sender_id, message } = req.body;

  if (!user_id || !message) {
    return res.status(400).json({ error: "User ID and message are required." });
  }

  const sql = "INSERT INTO notifications (user_id, sender_id, message) VALUES (?, ?, ?)";
  db.query(sql, [user_id, sender_id, message], (err, result) => {
    if (err) {
      console.error("❌ Notification insert error:", err.message);
      return res.status(500).json({ error: "Failed to create notification." });
    }

    res.status(201).json({ success: true, notificationId: result.insertId });
  });
});

module.exports = router;
