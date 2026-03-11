import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchImages();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users");
    setUsers(res.data);
  };

  const fetchImages = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/images");
    setImages(res.data);
  };

  const confirmDeleteImage = (img) => {
    setSelectedImage(img);
    setShowPreview(true);
  };

  const deleteImage = async () => {
    if (selectedImage) {
      await axios.delete(`http://localhost:5000/api/admin/images/${selectedImage.id}`);
      fetchImages();
      setShowPreview(false);
      setSelectedImage(null);
    }
  };

  const cancelPreview = () => {
    setShowPreview(false);
    setSelectedImage(null);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section>
        <h3>All Users</h3>
        <table>
          <thead>
            <tr><th>ID</th><th>Username</th><th>Email</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>All Images</h3>
        <table>
          <thead>
            <tr><th>ID</th><th>Image</th><th>Uploader ID</th><th>Action</th></tr>
          </thead>
          <tbody>
            {images.map(img => (
              <tr key={img.id}>
                <td>{img.id}</td>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${img.image_path}`}
                    alt="thumbnail"
                    width="100"
                  />
                </td>
                <td>{img.user_id}</td>
                <td><button onClick={() => confirmDeleteImage(img)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showPreview && selectedImage && (
        <div className="image-preview-modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete this image?</h3>
            <img
              src={`http://localhost:5000/uploads/${selectedImage.image_path}`}
              alt="Preview"
              className="preview-img"
            />
            <div className="modal-buttons">
              <button onClick={deleteImage}>Yes, Delete</button>
              <button onClick={cancelPreview}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
