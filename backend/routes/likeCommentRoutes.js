const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
  toggleLike,
  getLikes,
  addComment,
  getComments,
  editComment,
  deleteComment,
} = require("../controllers/likeCommentController");

// ✅ Like/unlike an image (authenticated)
router.post("/likes/:imageId", verifyToken, toggleLike);

// ✅ Get total likes for an image (public)
router.get("/likes/:imageId", getLikes);

// ✅ Add a comment to an image (authenticated)
router.post("/comments/:imageId", verifyToken, addComment);

// ✅ Get comments for an image (public)
router.get("/comments/:imageId", getComments);

// ✅ Edit a comment (authenticated)
router.put("/comments/:commentId", verifyToken, editComment);

// ✅ Delete a comment (authenticated)
router.delete("/comments/:commentId", verifyToken, deleteComment);

module.exports = router;
