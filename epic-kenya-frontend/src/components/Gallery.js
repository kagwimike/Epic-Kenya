import React, { useState, useEffect, useMemo, useCallback } from "react";
import useGallery from "../hooks/useGallery";
import { FaHeart, FaRegHeart, FaPaperPlane } from "react-icons/fa";
import CommentItem from "./CommentItem";
import "../styles/Gallery.css";

const Gallery = ({ destination }) => {
  const {
    images,
    loading,
    likeImage,
    addComment,
    editComment,
    deleteComment,
    editImage,
    deleteImage,
  } = useGallery(destination);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [commentText, setCommentText] = useState("");

  /*
  |--------------------------------------------------------------------------
  | CURRENT USER
  |--------------------------------------------------------------------------
  */

  const currentUser = useMemo(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user")) ||
        {}
      );
    } catch {
      return {};
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | AUTO IMAGE SLIDER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  /*
  |--------------------------------------------------------------------------
  | RESET INDEX IF IMAGES CHANGE (important after delete)
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images.length, currentIndex]);

  /*
  |--------------------------------------------------------------------------
  | CURRENT IMAGE
  |--------------------------------------------------------------------------
  */

  const currentImage = images[currentIndex];

  /*
  |--------------------------------------------------------------------------
  | HANDLERS
  |--------------------------------------------------------------------------
  */

  const handleLike = useCallback(() => {
    if (!currentUser?.userId) {
      alert("Please login to like images");
      return;
    }

    likeImage(currentImage.id);
  }, [likeImage, currentImage, currentUser]);

  const handleSubmitComment = useCallback(
    (e) => {
      e.preventDefault();

      if (!currentUser?.userId) {
        alert("Please login to comment");
        return;
      }

      if (!commentText.trim()) return;

      addComment(currentImage.id, commentText, currentUser);
      setCommentText("");
    },
    [addComment, commentText, currentImage, currentUser]
  );

  const handleDeleteImage = useCallback(() => {
    if (!window.confirm("Delete this image?")) return;
    deleteImage(currentImage.id);
  }, [deleteImage, currentImage]);

  /*
  |--------------------------------------------------------------------------
  | LOADING STATE
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="loader">
        Loading Masterpieces...
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | EMPTY STATE
  |--------------------------------------------------------------------------
  */

  if (!images.length) {
    return (
      <div className="empty-state">
        No images found for this destination.
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="modern-gallery-container">
      <div className="glass-card">

        {/* IMAGE VIEWPORT */}
        <div className="image-viewport">
          <img
            src={`http://localhost:5000${currentImage.imagePath}`}
            alt={currentImage.caption || "Gallery Image"}
            className="main-gallery-img"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/900x500?text=Image+Unavailable";
            }}
          />

          <div className="image-overlay-info">
            <h3>{currentImage.caption}</h3>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="gallery-content-area">

          {/* LIKE BAR */}
          <div className="stats-bar">
            <button
              className={`like-trigger ${
                currentImage.isLiked ? "active" : ""
              }`}
              onClick={handleLike}
            >
              {currentImage.isLiked ? (
                <FaHeart color="#ff4d4d" />
              ) : (
                <FaRegHeart />
              )}

              <span>{currentImage.likes || 0} Likes</span>
            </button>
          </div>

          {/* COMMENTS */}
          <div className="comments-section">

            <div className="comments-scroll-area">

              {currentImage.comments?.length ? (
                currentImage.comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    imageId={currentImage.id}
                    currentUser={currentUser}
                    editComment={editComment}
                    deleteComment={deleteComment}
                  />
                ))
              ) : (
                <p className="no-comments"></p>
              )}

            </div>

            {/* COMMENT FORM */}

            <form
              className="modern-comment-form"
              onSubmit={handleSubmitComment}
            >
              <input
                type="text"
                placeholder="Share your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />

              <button
                type="submit"
                disabled={!commentText.trim()}
              >
                <FaPaperPlane />
              </button>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Gallery;