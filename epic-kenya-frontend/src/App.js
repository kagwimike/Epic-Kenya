import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SingleDestinationPage from "./pages/SingleDestinationPage";
import Home from "./pages/Home";
import GalleryPage from "./pages/GalleryPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ImagePage from "./pages/ImagePage";
import AdminDashboard from "./components/AdminDashboard";
import DestinationsPage from "./pages/DestinationsPage";
import EditProfile from "./components/EditProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LiveChat from "./components/LiveChat";
import NotificationBell from "./components/Notifications/NotificationBell";
import ImageUploadForm from "./components/ImageUploadForm";
import PublicProfilePage from "./pages/PublicProfilePage";
import MombasaPage from "./pages/MombasaPage";
import LakeNakuruPage from "./pages/LakeNakuruPage";
import MaasaiMaraPage from "./pages/MaasaiMaraPage";
import MountKenyaPage from "./pages/MountKenyaPage";
import About from "./pages/About";
import ErrorBoundary from "./components/ErrorBoundary";
import socket from "./sockets/socket";
import "./styles/App.css";

// ✅ Auth check
const isAuthenticated = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return Boolean(token);
};

// ✅ Admin check
const isAdmin = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    console.log("🔑 Decoded JWT:", decoded); // <-- For debugging
    return decoded.isAdmin === true || decoded.is_admin === true;
  } catch (err) {
    console.error("❌ Failed to decode token:", err);
    return false;
  }
};

// 🔐 Protected route wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// 🔐 Admin-only route wrapper
const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) {
    console.warn("⚠️ Redirected to login: not authenticated");
    return <Navigate to="/login" />;
  }
  if (!isAdmin()) {
    console.warn("⚠️ Redirected to destinations: not admin");
    return <Navigate to="/destinations" />;
  }
  return children;
};

const App = () => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setLoggedInUserId(decoded.id);
      } catch (err) {
        console.error("❌ Failed to decode token:", err);
      }
    }

    socket.on("connect", () => {
      console.log("✅ Connected to socket server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.warn("⚠️ Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ErrorBoundary>
      <Navbar />
      <div className="notification-container">
        <NotificationBell loggedInUserId={loggedInUserId} />
      </div>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/user/:userId" element={<PublicProfilePage />} />
        <Route path="/mombasa" element={<MombasaPage />} />
        <Route path="/lake-nakuru" element={<LakeNakuruPage />} />
        <Route path="/maasai-mara" element={<MaasaiMaraPage />} />
        <Route path="/mount-kenya" element={<MountKenyaPage />} />
        <Route path="/destination/:destination" element={<SingleDestinationPage />} />
        {/* Protected Routes */}
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <ImageUploadForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/images/:id"
          element={
            <ErrorBoundary>
              <ImagePage />
            </ErrorBoundary>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <LiveChat />
      <Footer />
    </ErrorBoundary>
  );
};

export default App;
