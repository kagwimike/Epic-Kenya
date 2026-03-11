import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ImagePage = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/images/${id}`)
      .then((res) => setImage(res.data))
      .catch((err) => setError("Image not found or failed to load."));
  }, [id]);

  if (error) return <div style={{ padding: "20px" }}>{error}</div>;
  if (!image) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{image.title || "Untitled Image"}</h2>
      <img
        src={`http://localhost:5000/uploads/${image.filename}`}
        alt={image.title}
        style={{ width: "100%", maxWidth: "600px", borderRadius: "8px" }}
      />
      <p style={{ marginTop: "10px" }}>{image.description}</p>
      <p><strong>Uploaded by:</strong> User #{image.user_id}</p>
      <p><strong>Uploaded at:</strong> {new Date(image.uploaded_at).toLocaleString()}</p>
    </div>
  );
};

export default ImagePage;
