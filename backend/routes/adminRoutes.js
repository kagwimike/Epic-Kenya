// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/users", adminController.getAllUsers);
router.delete("/users/:id", adminController.deleteUser);

router.get("/images", adminController.getAllImages);
router.delete("/images/:id", adminController.deleteImage);

router.get("/comments", adminController.getAllComments);
router.delete("/comments/:id", adminController.deleteComment);

module.exports = router;
