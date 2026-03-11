const db = require("../config/db");

// Get all users
exports.getAllUsers = (req, res) => {
  db.query("SELECT id, username, email, is_admin FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", [userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully" });
  });
};

// Get all uploaded images
exports.getAllImages = (req, res) => {
  db.query("SELECT * FROM images", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Delete image
exports.deleteImage = (req, res) => {
  const imageId = req.params.id;
  db.query("DELETE FROM images WHERE id = ?", [imageId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Image deleted successfully" });
  });
};

// Get all comments
exports.getAllComments = (req, res) => {
  db.query("SELECT * FROM comments", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Delete comment
exports.deleteComment = (req, res) => {
  const commentId = req.params.id;
  db.query("DELETE FROM comments WHERE id = ?", [commentId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Comment deleted successfully" });
  });
};
