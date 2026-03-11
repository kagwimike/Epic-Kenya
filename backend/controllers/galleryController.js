const db = require("../config/db");
const path = require("path");

/* ---------------------------------- */
/* 📸 Upload Image */
/* ---------------------------------- */
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "❗ No image file provided." });
  }

  let destination = req.body.destination?.trim().toLowerCase();

  if (!destination) {
    return res.status(400).json({ message: "❗ Destination is required." });
  }

  // convert slug to standard format
  destination = destination.replace(/-/g, " ");

  const userId = req.user.id;

  // store path relative to uploads folder
  const imagePath = req.file.path
    .replace(/\\/g, "/")
    .split("uploads/")[1];

  const caption = req.body.caption || "";

  const sql = `
    INSERT INTO images (user_id, destination, path, caption, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;

  db.query(sql, [userId, destination, imagePath, caption], (err, result) => {
    if (err) {
      console.error("❌ DB error on image insert:", err);
      return res.status(500).json({ message: "Failed to save image." });
    }

    res.status(201).json({
      id: result.insertId,
      imagePath: `/uploads/${imagePath}`,
      message: "✅ Image uploaded successfully.",
    });
  });
};


const deleteComment = (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user.id;

  const sql = `
    DELETE FROM comments 
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [commentId, userId], (err, result) => {
    if (err) {
      console.error("❌ Delete comment error:", err);
      return res.status(500).json({ message: "Failed to delete comment." });
    }

    res.json({ message: "🗑️ Comment deleted successfully." });
  });
};

/* ---------------------------------- */
/* 💬 Fetch Comments Helper */
/* ---------------------------------- */
const fetchCommentsForImages = (imageIds, callback) => {
  if (imageIds.length === 0) return callback(null, {});

  const sql = `
    SELECT c.id, c.image_id, c.text, c.user_id, u.username, c.created_at
    FROM comments c
    JOIN users u ON u.id = c.user_id
    WHERE c.image_id IN (?)
    ORDER BY c.created_at ASC
  `;

  db.query(sql, [imageIds], (err, comments) => {
    if (err) return callback(err);

    const map = {};

    comments.forEach((c) => {
      if (!map[c.image_id]) map[c.image_id] = [];

      map[c.image_id].push({
        id: c.id,
        comment: c.text,
        username: c.username,
        user_id: c.user_id,
        created_at: c.created_at,
      });
    });

    callback(null, map);
  });
};


/* ---------------------------------- */
/* 🖼️ Get Full Gallery */
/* ---------------------------------- */
const getGallery = (req, res) => {
  const destination = req.query.destination?.toLowerCase();

  let sql = `
    SELECT 
      i.id,
      i.path,
      i.caption,
      i.user_id,
      i.destination,
      u.username,
      (SELECT COUNT(*) FROM likes WHERE image_id = i.id) AS likeCount
    FROM images i
    JOIN users u ON u.id = i.user_id
  `;

  const params = [];

  if (destination) {
    sql += ` WHERE LOWER(i.destination) = ?`;
    params.push(destination.replace(/-/g, " "));
  }

  sql += ` ORDER BY i.created_at DESC`;

  db.query(sql, params, (err, images) => {
    if (err) {
      console.error("❌ DB error on fetch gallery:", err);
      return res.status(500).json({ message: "Failed to fetch gallery." });
    }

    const imageIds = images.map((img) => img.id);

    fetchCommentsForImages(imageIds, (err, commentsMap) => {
      if (err) {
        console.error("❌ DB error on fetch comments:", err);
        return res.status(500).json({ message: "Failed to fetch comments." });
      }

      const formatted = images.map((img) => ({
        id: img.id,
        userId: img.user_id,
        username: img.username,
        destination: img.destination,
        caption: img.caption,
        imagePath: `/uploads/${img.path.replace(/\\/g, "/")}`,
        likes: img.likeCount,
        comments: commentsMap[img.id] || [],
      }));

      res.json(formatted);
    });
  });
};


/* ---------------------------------- */
/* 🎯 Get Gallery by Destination */
/* ---------------------------------- */
const getGalleryByDestination = (req, res) => {
  let destination = req.params.destination?.toLowerCase();

  if (!destination) {
    return res.status(400).json({ message: "Destination required." });
  }

  destination = destination.replace(/-/g, " ");

  const sql = `
    SELECT 
      i.id,
      i.path,
      i.caption,
      i.user_id,
      i.destination,
      u.username,
      (SELECT COUNT(*) FROM likes WHERE image_id = i.id) AS likeCount
    FROM images i
    JOIN users u ON u.id = i.user_id
    WHERE LOWER(i.destination) = ?
    ORDER BY i.created_at DESC
  `;

  db.query(sql, [destination], (err, images) => {
    if (err) {
      console.error("❌ DB error on fetch gallery by destination:", err);
      return res
        .status(500)
        .json({ message: "Failed to fetch destination gallery." });
    }

    const imageIds = images.map((img) => img.id);

    fetchCommentsForImages(imageIds, (err, commentsMap) => {
      if (err) {
        console.error("❌ DB error on fetch comments:", err);
        return res.status(500).json({ message: "Failed to fetch comments." });
      }

      const formatted = images.map((img) => ({
        id: img.id,
        userId: img.user_id,
        username: img.username,
        destination: img.destination,
        caption: img.caption,
        imagePath: `/uploads/${img.path.replace(/\\/g, "/")}`,
        likes: img.likeCount,
        comments: commentsMap[img.id] || [],
      }));

      res.json(formatted);
    });
  });
};


/* ---------------------------------- */
/* ❤️ Like Image */
/* ---------------------------------- */
const addLike = (req, res) => {
  const userId = req.user.id;
  const imageId = req.params.imageId;

  const sql = `
    INSERT IGNORE INTO likes (user_id, image_id, created_at)
    VALUES (?, ?, NOW())
  `;

  db.query(sql, [userId, imageId], (err) => {
    if (err) {
      console.error("❌ DB error on like insert:", err);
      return res.status(500).json({ message: "Failed to like image." });
    }

    res.json({ message: "👍 Image liked." });
  });
};


/* ---------------------------------- */
/* 💬 Add Comment */
/* ---------------------------------- */
const addComment = (req, res) => {
  const userId = req.user.id;
  const imageId = req.params.imageId;
  const text = req.body.text?.trim();

  if (!text) {
    return res.status(400).json({ message: "❗ Comment cannot be empty." });
  }

  const sql = `
    INSERT INTO comments (user_id, image_id, text, created_at)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(sql, [userId, imageId, text], (err, result) => {
    if (err) {
      console.error("❌ DB error on comment insert:", err);
      return res.status(500).json({ message: "Failed to add comment." });
    }

    res.status(201).json({
      id: result.insertId,
      userId,
      imageId,
      text,
      createdAt: new Date(),
    });
  });
};


/* ---------------------------------- */
/* 💬 Get Comments */
/* ---------------------------------- */
const getComments = (req, res) => {
  const imageId = req.params.imageId;

  const sql = `
    SELECT c.id, c.text, c.user_id, u.username, c.created_at
    FROM comments c
    JOIN users u ON u.id = c.user_id
    WHERE c.image_id = ?
    ORDER BY c.created_at ASC
  `;

  db.query(sql, [imageId], (err, results) => {
    if (err) {
      console.error("❌ DB error on fetch comments:", err);
      return res.status(500).json({ message: "Failed to fetch comments." });
    }

    res.json(results);
  });
};


module.exports = {
  uploadImage,
  getGallery,
  getGalleryByDestination,
  addLike,
  addComment,
  getComments,
  deleteComment
};