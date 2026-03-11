const express = require("express");
const router = express.Router();
const {
  uploadImage,
  getAllImages,
  getImagesByUser
} = require("../controllers/imageController");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// 🔼 Upload image (with auth & multer)
router.post("/upload", verifyToken, upload.single("image"), uploadImage);

// 🌐 Get all images
router.get("/", getAllImages);

// 👤 Get images uploaded by a specific user
router.get("/user/:userId", getImagesByUser);

module.exports = router;
