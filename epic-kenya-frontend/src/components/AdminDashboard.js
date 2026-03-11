// src/components/AdminDashboard.js

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

const API = "http://localhost:5000/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  /**
   * Fetch Admin Data
   */
  const fetchAdminData = useCallback(async () => {
    try {
      setLoading(true);

      const [userRes, imageRes] = await Promise.all([
        axios.get(`${API}/admin/users`, config),
        axios.get(`${API}/admin/images`, config),
      ]);

      setUsers(userRes.data);
      setImages(imageRes.data);
    } catch (err) {
      console.error("❌ Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  /**
   * Delete User
   */
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`${API}/admin/users/${id}`, config);

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete user:", err);
    }
  };

  /**
   * Delete Image
   */
  const handleDeleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(`${API}/admin/images/${id}`, config);

      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete image:", err);
    }
  };

  if (loading) {
    return <p className="admin-loading">Loading dashboard...</p>;
  }

  return (
    <div className="admin-dashboard">

      <h1 className="admin-title">Admin Dashboard</h1>

      {/* USERS */}
      <div className="admin-section">

        <h2>Users</h2>

        {users.length === 0 ? (
          <p className="admin-empty">No users found</p>
        ) : (
          <table className="admin-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

      {/* IMAGES */}
      <div className="admin-section">

        <h2>Uploaded Images</h2>

        {images.length === 0 ? (
          <p className="admin-empty">No images uploaded</p>
        ) : (
          <table className="admin-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Preview</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {images.map((img) => (
                <tr key={img.id}>
                  <td>{img.id}</td>
                  <td>{img.user_id}</td>

                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${img.image_path}`}
                      alt="upload"
                      className="admin-thumbnail"
                    />
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteImage(img.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;