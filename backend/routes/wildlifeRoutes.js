// routes/wildlifeRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");

const upload = multer({ dest: "uploads/wildlife/" });

router.post("/upload", upload.single("image"), (req, res) => {
  const { animal_tag, location, caption, user_id } = req.body;
  const filename = req.file.filename;

  const query = `
    INSERT INTO wildlife_photos (user_id, filename, animal_tag, location, caption)
    VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [user_id, filename, animal_tag, location, caption], (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.status(201).json({ success: true, photoId: result.insertId });
  });
});

module.exports = router;
