// backend/routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  getUserImages,
  getLikedImages
} = require("../controllers/profileController");
const authenticate = require("../middleware/authenticate");

// 📸 Multer setup for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile_pics");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// 👤 Get a user's public profile
router.get("/user/:userId", getUserProfile);

// 👤 Get own profile + images
router.get("/me", authenticate, getUserProfile);

// 📝 Update profile info
router.put("/me", authenticate, updateUserProfile);

// 📸 Upload profile picture
router.post("/me/profile-picture", authenticate, upload.single("profile"), uploadProfilePicture);

// 🖼️ Get images user uploaded
router.get("/me/images", authenticate, getUserImages);

// ❤️ Get images user liked or commented on
router.get("/me/activity", authenticate, getLikedImages);

module.exports = router;
