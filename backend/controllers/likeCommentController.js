const db = require("../config/db");

// Toggle like/unlike an image
const toggleLike = (req, res) => {
  const user_id = req.user.id;
  const image_id = req.params.imageId;

  const checkQuery = "SELECT * FROM likes WHERE user_id = ? AND image_id = ?";
  db.query(checkQuery, [user_id, image_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err.message });

    if (results.length > 0) {
      // Unlike
      db.query("DELETE FROM likes WHERE user_id = ? AND image_id = ?", [user_id, image_id], (err) => {
        if (err) return res.status(500).json({ error: "Failed to unlike", details: err.message });
        return res.json({ message: "Image unliked", liked: false });
      });
    } else {
      // Like
      db.query("INSERT INTO likes (user_id, image_id) VALUES (?, ?)", [user_id, image_id], (err) => {
        if (err) return res.status(500).json({ error: "Failed to like", details: err.message });
        return res.json({ message: "Image liked", liked: true });
      });
    }
  });
};

// Get total likes for an image
const getLikes = (req, res) => {
  const image_id = req.params.imageId;
  db.query("SELECT COUNT(*) AS totalLikes FROM likes WHERE image_id = ?", [image_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch likes", details: err.message });
    res.json({ imageId: image_id, totalLikes: results[0].totalLikes });
  });
};

// Add a comment to an image
const addComment = (req, res) => {
  const user_id = req.user.id;
  const image_id = req.params.imageId;
  const { comment } = req.body;

  if (!comment || comment.trim() === "") {
    return res.status(400).json({ error: "Comment cannot be empty." });
  }

  const sql = "INSERT INTO comments (user_id, image_id, comment) VALUES (?, ?, ?)";
  db.query(sql, [user_id, image_id, comment.trim()], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to post comment", details: err.message });
    res.status(201).json({
      message: "Comment added",
      commentId: result.insertId,
      userId: user_id,
      imageId: image_id,
      comment,
    });
  });
};

// Get all comments for an image
const getComments = (req, res) => {
  const image_id = req.params.imageId;

  const sql = `
    SELECT comments.id, comments.comment, comments.created_at, users.username 
    FROM comments 
    JOIN users ON comments.user_id = users.id 
    WHERE comments.image_id = ?
    ORDER BY comments.created_at ASC
  `;
  db.query(sql, [image_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch comments", details: err.message });
    res.json({ imageId: image_id, comments: results });
  });
};

// ✅ Edit a comment
const editComment = (req, res) => {
  const user_id = req.user.id;
  const comment_id = req.params.commentId;
  const { comment } = req.body;

  if (!comment || comment.trim() === "") {
    return res.status(400).json({ error: "Comment cannot be empty." });
  }

  const sql = "UPDATE comments SET comment = ? WHERE id = ? AND user_id = ?";
  db.query(sql, [comment.trim(), comment_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to edit comment", details: err.message });
    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "Unauthorized or comment not found." });
    }
    res.json({ message: "Comment updated" });
  });
};

// ✅ Delete a comment
const deleteComment = (req, res) => {
  const user_id = req.user.id;
  const comment_id = req.params.commentId;

  const sql = "DELETE FROM comments WHERE id = ? AND user_id = ?";
  db.query(sql, [comment_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete comment", details: err.message });
    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "Unauthorized or comment not found." });
    }
    res.json({ message: "Comment deleted" });
  });
};

module.exports = {
  toggleLike,
  getLikes,
  addComment,
  getComments,
  editComment,
  deleteComment,
};
