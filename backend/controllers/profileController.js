
const db = require("../config/db");

const updateUserProfile = (req, res) => {
  const userId = req.user.id; // from authenticate middleware
  const { username, email, bio } = req.body;

  const query = `
    UPDATE users 
    SET username = ?, email = ?, bio = ?
    WHERE id = ?
  `;

  db.query(query, [username, email, bio, userId], (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ message: "Failed to update profile." });
    }

    res.json({ message: "Profile updated successfully." });
  });
};
