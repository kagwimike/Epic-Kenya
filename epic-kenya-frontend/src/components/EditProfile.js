import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMessage("⚠️ You're not logged in.");
      return;
    }

    axios
      .get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { username, email, profile_picture } = res.data;
        setForm((prev) => ({
          ...prev,
          username: username || "",
          email: email || "",
          password: "",
        }));
        if (profile_picture) {
          setPreview(`http://localhost:5000/${profile_picture}`);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to load user:", err);
        setMessage("Failed to load profile. Please log in again.");
      });
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture" && files.length > 0) {
      const file = files[0];
      setForm((prev) => ({ ...prev, profilePicture: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value || "" }));
    }
  };

  const handleRemovePicture = async () => {
    try {
      await axios.delete("http://localhost:5000/api/users/remove-picture", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPreview(null);
      setForm((prev) => ({ ...prev, profilePicture: null }));
      setMessage("🗑️ Profile picture removed.");
    } catch (err) {
      console.error("❌ Failed to remove picture:", err);
      setMessage("Failed to remove profile picture.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("⚠️ Login expired. Please log in again.");
      return;
    }

    try {
      const data = new FormData();
      data.append("username", form.username);
      data.append("email", form.email);
      if (form.password) data.append("password", form.password);
      if (form.profilePicture) data.append("profilePicture", form.profilePicture);

      await axios.put("http://localhost:5000/api/users/me", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Update failed:", err);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Your Profile</h2>
      {message && <p className="message">{message}</p>}

      {preview && (
        <div className="profile-preview">
          <img src={preview} alt="Preview" />
          <button type="button" className="remove-btn" onClick={handleRemovePicture}>
            Remove Current Picture
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>New Password (optional)</label>
        <input
          type="password"
          name="password"
          value={form.password || ""}
          onChange={handleChange}
        />

        <label>Profile Picture (optional)</label>
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
