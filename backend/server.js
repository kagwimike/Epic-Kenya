const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const socketIO = require("socket.io");
const path = require("path");
const followRoutes = require("./routes/followRoutes");

dotenv.config();

const app = express();
const server = http.createServer(app);
const db = require("./config/db");

// ✅ Middleware Setup (CORS, Body Parsing)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Destination"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (profile pics, gallery uploads, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Route Imports
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");
const chatRoutes = require("./routes/chatRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const likeCommentRoutes = require("./routes/likeCommentRoutes");
const userRoutes = require("./routes/userRoutes");

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/gallery", galleryRoutes); // includes multer logic
app.use("/api/follow", followRoutes);
app.use("/api", likeCommentRoutes); // handles likes/comments

// ✅ Socket.IO Setup
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

// ✅ Real-time communication
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("chatMessage", ({ userId, message }) => {
    const sql = "INSERT INTO messages (user_id, message) VALUES (?, ?)";
    db.query(sql, [userId, message], (err, result) => {
      if (err) {
        console.error("❌ DB insert error:", err.message);
        return;
      }
      io.emit("chatMessage", {
        id: result.insertId,
        userId,
        message,
        sentAt: new Date(),
      });
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅ Launch the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
