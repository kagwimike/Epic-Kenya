const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require("../middleware/authMiddleware");

// Storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ✅ POST /api/gallery/upload
router.post('/upload', verifyToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded.' });

  const { caption, destination } = req.body;
  const filename = req.file.filename;
  const user_id = req.user.id; // ✅ Use real user from token

  if (!destination) {
    return res.status(400).json({ error: "Destination is required." });
  }

  const sql = `INSERT INTO images (filename, caption, destination, user_id) VALUES (?, ?, ?, ?)`;
  db.query(sql, [filename, caption, destination.toLowerCase(), user_id], (err, result) => {
    if (err) {
      console.error("❌ DB Insert Error:", err);
      return res.status(500).json({ error: 'Failed to save image in database.' });
    }

    res.status(200).json({
      message: '✅ Image uploaded and saved to DB.',
      imagePath: `/uploads/${filename}`,
      imageId: result.insertId
    });
  });
});

// ✅ GET /api/gallery?destination=mombasa
router.get('/', (req, res) => {
  const destination = req.query.destination;

  const sql = `
    SELECT images.*, 
      (SELECT COUNT(*) FROM likes WHERE likes.image_id = images.id) AS likes,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT('id', comments.id, 'username', users.username, 'comment', comments.comment, 'created_at', comments.created_at)
        ) 
        FROM comments 
        JOIN users ON comments.user_id = users.id 
        WHERE comments.image_id = images.id
      ) AS comments
    FROM images
    ${destination ? 'WHERE images.destination = ?' : ''}
    ORDER BY images.created_at DESC
  `;

  const params = destination ? [destination.toLowerCase()] : [];

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("❌ Gallery fetch error:", err);
      return res.status(500).json({ error: "Failed to fetch images" });
    }

    const formatted = results.map(img => ({
      id: img.id,
      imagePath: `/uploads/${img.filename}`,
      caption: img.caption,
      destination: img.destination,
      likes: img.likes || 0,
      comments: img.comments ? JSON.parse(img.comments) : []
    }));

    res.json(formatted);
  });
});

module.exports = router;
