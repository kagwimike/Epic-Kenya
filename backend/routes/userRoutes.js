const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const { updateProfile, getCurrentUser } = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");

// ✅ Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads/profile-pics");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use full path instead of string
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${req.user.id}-${unique}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only .jpg, .png, .webp files allowed"));
    }
    cb(null, true);
  },
});

// ✅ Routes
router.get("/me", authenticate, getCurrentUser);
router.put("/me", authenticate, upload.single("profilePicture"), updateProfile);

module.exports = router;
