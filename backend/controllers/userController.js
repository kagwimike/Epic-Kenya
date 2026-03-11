const db = require("../config/db");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

// 🔄 Update user profile (username, email, password, profile picture)
const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, email, password } = req.body;
  let profilePicPath;

  try {
    // If a new profile picture is uploaded
    if (req.file) {
      profilePicPath = req.file.filename;

      // Remove old profile picture
      db.query("SELECT profile_picture FROM users WHERE id = ?", [userId], (err, results) => {
        if (!err && results[0]?.profile_picture) {
          const oldPath = path.join(__dirname, "..", "uploads", "profile-pics", results[0].profile_picture);
          fs.unlink(oldPath, (err) => {
            if (err) console.warn("⚠️ Failed to delete old profile picture:", err.message);
          });
        }
      });
    }

    const getCurrentUser = (req, res) => {
  const userId = req.user.id;
  const sql = `SELECT id, username, email, profile_picture FROM users WHERE id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch user" });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const user = results[0];
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profile_picture
        ? `/uploads/profile-pics/${user.profile_picture}`
        : null,
    });
  });
};

    // Prepare update fields
    const updateFields = [];
    const params = [];

    if (username) {
      updateFields.push("username = ?");
      params.push(username);
    }
    if (email) {
      updateFields.push("email = ?");
      params.push(email);
    }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateFields.push("password = ?");
      params.push(hashed);
    }
    if (profilePicPath) {
      updateFields.push("profile_picture = ?");
      params.push(profilePicPath);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No update fields provided." });
    }

    const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
    params.push(userId);

    db.query(sql, params, (err) => {
      if (err) {
        console.error("❌ DB update error:", err);
        return res.status(500).json({ message: "Failed to update profile." });
      }

      res.json({ message: "✅ Profile updated successfully." });
    });
  } catch (error) {
    console.error("❌ Profile update server error:", error);
    res.status(500).json({ message: "Server error during profile update." });
  }
};

// 🌍 Public profile data with follower count
const getPublicProfile = (req, res) => {
  const userId = req.params.userId;

  const userQuery = `
    SELECT id, username, email, profile_picture 
    FROM users 
    WHERE id = ?
  `;

  db.query(userQuery, [userId], (err, userResults) => {
    if (err) {
      console.error("❌ DB error fetching user:", err);
      return res.status(500).json({ message: "Failed to fetch user" });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResults[0];

    const countQuery = `
      SELECT COUNT(*) AS followerCount 
      FROM follows 
      WHERE following_id = ?
    `;

    db.query(countQuery, [userId], (err, countResults) => {
      if (err) {
        console.error("❌ DB error fetching follower count:", err);
        return res.status(500).json({ message: "Failed to fetch follower count" });
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profile_picture
          ? `/uploads/profile-pics/${user.profile_picture}`
          : null,
        followerCount: countResults[0].followerCount,
      });
    });
  });
};
 // Example controller function
const getCurrentUser = (req, res) => {
  const user = req.user; // assuming you use middleware to attach user
  res.json(user);
};

module.exports = {
  updateProfile,
  getPublicProfile,
   getCurrentUser,
};
