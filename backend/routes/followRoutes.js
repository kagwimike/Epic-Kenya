const express = require("express");
const router = express.Router();
const {
  followUser,
  unfollowUser,
  checkFollowStatus, // ✅ Add this
} = require("../controllers/followController");

const verifyToken = require("../middleware/verifyToken");

// ✅ Routes
router.get("/status/:userId", verifyToken, checkFollowStatus);
router.post("/follow/:userId", verifyToken, followUser);
router.delete("/unfollow/:userId", verifyToken, unfollowUser);

module.exports = router;
