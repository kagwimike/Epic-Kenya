import React, { useState } from "react";
import axios from "axios";

// Normalize destination to lowercase and hyphenated (e.g., "Lake Nakuru" → "lake-nakuru")
const normalizeDestination = (name) => name.toLowerCase().replace(/\s+/g, "-");

const ImageUploadForm = ({ destination, onUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  /*
  |--------------------------------------------------------------------------
  | HANDLE FILE SELECTION
  |--------------------------------------------------------------------------
  */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setMessage("");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE FORM SUBMISSION
  |--------------------------------------------------------------------------
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("❗ Please select an image to upload.");
      return;
    }

    const normalizedDestination = destination
      ? normalizeDestination(destination.trim())
      : "unknown";

    const isStrict = !!destination;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("destination", normalizedDestination);

    try {
      // Only use res if needed (clean for linter)
      await axios.post(
        `http://localhost:5000/api/gallery/upload${isStrict ? "?strict=true" : ""}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setMessage("✅ Upload successful!");
      setImage(null);
      setPreview(null);
      setCaption("");

      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      setMessage(
        `❌ Upload failed: ${error.response?.data?.message || "Please try again."}`
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER COMPONENT
  |--------------------------------------------------------------------------
  */
  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "1rem" }}>
      <h2>
        Upload Image to{" "}
        <span style={{ color: "#0077cc" }}>
          {destination?.toUpperCase() || "General Gallery"}
        </span>
      </h2>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <br />
        <br />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            width="250"
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          />
        )}
        <br />
        <br />

        <textarea
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows="3"
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            resize: "vertical",
          }}
        />
        <br />
        <br />

        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Upload
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "1rem",
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ImageUploadForm;