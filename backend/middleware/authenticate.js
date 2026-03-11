const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("❌ JWT_SECRET is not defined in environment variables.");
    return res.status(500).json({ message: "Server misconfiguration. JWT secret missing." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // attaches user info to the request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
