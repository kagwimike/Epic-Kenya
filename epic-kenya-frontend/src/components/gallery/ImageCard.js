import React, { useState, useCallback } from "react";
import "./ImageCard.css";
import CommentItem from "./CommentItem";

const ImageCard = ({
  image,
  currentUser,
  onLike,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onEditImage,
  onDeleteImage,
}) => {
  const [commentText, setCommentText] = useState("");
  const [editingImage, setEditingImage] = useState(false);
  const [caption, setCaption] = useState(image.caption || "");
  const [showMenu, setShowMenu] = useState(false); // New: action menu

  // Owner check
  const userId = Number(currentUser?.userId || currentUser?.id);
  const imageOwnerId = Number(image?.user_id || image?.userId);
  const isOwner = userId && imageOwnerId && userId === imageOwnerId;

  // IMAGE SOURCE
  const imageSrc =
    image.image_url ||
    (image.imagePath
      ? `http://localhost:5000${image.imagePath}`
      : "https://via.placeholder.com/600x400?text=Image");

  /*-----------------------------------------------------------------------
   COMMENT HANDLER
  -----------------------------------------------------------------------*/
  const handleAddComment = useCallback(() => {
    if (!userId) return alert("Please login to comment");
    if (!commentText.trim()) return;

    onAddComment(image.id, commentText, currentUser);
    setCommentText("");
  }, [commentText, image, currentUser, onAddComment, userId]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddComment();
    }
  };

  /*-----------------------------------------------------------------------
   EDIT IMAGE
  -----------------------------------------------------------------------*/
  const handleEditImage = useCallback(() => {
    if (!caption.trim()) return alert("Caption cannot be empty");

    onEditImage(image.id, { caption });
    setEditingImage(false);
    setShowMenu(false);
  }, [caption, image, onEditImage]);

  /*-----------------------------------------------------------------------
   DELETE IMAGE
  -----------------------------------------------------------------------*/
  const handleDeleteImage = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    onDeleteImage(image.id);
    setShowMenu(false);
  }, [image, onDeleteImage]);

  /*-----------------------------------------------------------------------
   LIKE IMAGE
  -----------------------------------------------------------------------*/
  const handleLike = useCallback(() => {
    if (!userId) return alert("Please login to like images");
    onLike(image.id);
  }, [image, onLike, userId]);

  /*-----------------------------------------------------------------------
   IMAGE CLICK TO SHOW MENU
  -----------------------------------------------------------------------*/
  const handleImageClick = () => {
    if (isOwner) setShowMenu((prev) => !prev);
  };

  return (
    <div className="image-card">
      {/* IMAGE */}
      <div className="image-wrapper" onClick={handleImageClick}>
        <img
          src={imageSrc}
          alt={image.caption || "Gallery image"}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/600x400?text=Image+Unavailable";
          }}
        />
      </div>

      {/* ACTION MENU */}
      {showMenu && isOwner && !editingImage && (
        <div className="image-menu">
          <button onClick={() => setEditingImage(true)}>Edit Caption</button>
          <button onClick={handleDeleteImage}>Delete Image</button>
          <button onClick={() => setShowMenu(false)}>Cancel</button>
        </div>
      )}

      {/* CAPTION */}
      <div className="image-caption">
        {editingImage ? (
          <div className="edit-caption">
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Update caption..."
            />
            <div className="caption-actions">
              <button onClick={handleEditImage}>Save</button>
              <button onClick={() => setEditingImage(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <p>{image.caption || "No caption provided"}</p>
        )}
      </div>

      {/* LIKES */}
      <div className="image-likes">
        <button className="like-btn" onClick={handleLike}>
          ❤️ {image.likes || 0}
        </button>
      </div>

      {/* COMMENTS */}
      <div className="image-comments">
        {image.comments?.length ? (
          image.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              imageId={image.id}
              currentUser={currentUser}
              editComment={onEditComment}
              deleteComment={onDeleteComment}
            />
          ))
        ) : (
          <p className="no-comments">No comments yet</p>
        )}
      </div>

      {/* ADD COMMENT */}
      <div className="add-comment">
        <input
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleAddComment} disabled={!commentText.trim()}>
          Post
        </button>
      </div>
    </div>
  );
};

export default React.memo(ImageCard);