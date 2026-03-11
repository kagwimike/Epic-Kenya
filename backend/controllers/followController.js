const db = require("../config/db");

// ✅ Follow a user
const followUser = (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.userId;

  if (followerId == followingId) {
    return res.status(400).json({ message: "❌ You cannot follow yourself." });
  }

  const sql = `
    INSERT IGNORE INTO followers (follower_id, following_id)
    VALUES (?, ?)
  `;

  db.query(sql, [followerId, followingId], (err, result) => {
    if (err) {
      console.error("❌ Follow failed:", err);
      return res.status(500).json({ message: "Follow operation failed." });
    }

    if (result.affectedRows === 0) {
      return res.json({ message: "⚠️ You are already following this user." });
    }

    res.json({ message: "✅ Now following this user." });
  });
};

// ✅ Unfollow a user
const unfollowUser = (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.userId;

  const sql = `
    DELETE FROM followers
    WHERE follower_id = ? AND following_id = ?
  `;

  db.query(sql, [followerId, followingId], (err, result) => {
    if (err) {
      console.error("❌ Unfollow failed:", err);
      return res.status(500).json({ message: "Unfollow operation failed." });
    }

    if (result.affectedRows === 0) {
      return res.json({ message: "⚠️ You were not following this user." });
    }

    res.json({ message: "❎ Unfollowed this user." });
  });
};

// ✅ Check follow status
const checkFollowStatus = (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.userId;

  const sql = `
    SELECT 1 FROM followers 
    WHERE follower_id = ? AND following_id = ?
    LIMIT 1
  `;

  db.query(sql, [followerId, followingId], (err, results) => {
    if (err) {
      console.error("❌ Error checking follow status:", err);
      return res.status(500).json({ message: "Failed to check follow status." });
    }

    res.json({ isFollowing: results.length > 0 });
  });
};

module.exports = {
  followUser,
  unfollowUser,
  checkFollowStatus,
};
