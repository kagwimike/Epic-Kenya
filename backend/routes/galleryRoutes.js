const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/uploadConfig");

const {
  uploadImage,
  getGallery,
  getGalleryByDestination,
  addLike,
  addComment,
  getComments,
  deleteComment
} = require("../controllers/galleryController");

// 📸 Upload image
router.post(
  "/upload",
  authenticate,
  upload.single("image"),
  uploadImage
);

// 🖼️ Get gallery
router.get("/", getGallery);

// 🖼️ Get gallery by destination
router.get("/destination/:destination", getGalleryByDestination);

// ❤️ Like image
router.post("/:imageId/like", authenticate, addLike);

// 💬 Add comment
router.post("/:imageId/comment", authenticate, addComment);

// 💬 Get comments
router.get("/:imageId/comments", getComments);

// 🗑️ Delete comment
router.delete("/comments/:commentId", authenticate, deleteComment);

module.exports = router;