const db = require("../config/db");

// 📤 Upload image
const uploadImage = (req, res) => {
  const { description, destination } = req.body;
  const user_id = req.user.id;

  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }

  const image_path = req.file.filename;

  const sql = `
    INSERT INTO images (user_id, image_path, description, destination)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [user_id, image_path, description, destination], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "✅ Image uploaded successfully",
      image: {
        id: result.insertId,
        user_id,
        description,
        destination,
        image_url: `http://localhost:5000/uploads/${image_path}`,
      },
    });
  });
};

// 📥 Get all images (for gallery)
const getAllImages = (req, res) => {
  const sql = `
    SELECT images.*, users.username 
    FROM images 
    JOIN users ON images.user_id = users.id 
    ORDER BY images.uploaded_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const formatted = results.map(img => ({
      ...img,
      image_url: `http://localhost:5000/uploads/${img.image_path.replace(/\\/g, "/")}`,
    }));

    res.json(formatted);
  });
};

// 📁 Get all images uploaded by a specific user
const getImagesByUser = (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT id, image_path, description, destination 
    FROM images 
    WHERE user_id = ?
    ORDER BY uploaded_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch uploads" });

    const formatted = results.map((img) => ({
      id: img.id,
      description: img.description,
      destination: img.destination,
      image_url: `http://localhost:5000/uploads/${img.image_path.replace(/\\/g, "/")}`,
    }));

    res.json(formatted);
  });
};

module.exports = {
  uploadImage,
  getAllImages,
  getImagesByUser,
};
