import React, { useState } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const CommentItem = ({
  comment,
  imageId,
  currentUser,
  editComment,
  deleteComment
}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(comment.comment);

  const isOwner = comment.user_id === currentUser?.userId;

  const handleUpdate = async () => {
    if (!tempText.trim()) return;

    await editComment(comment.id, imageId, tempText);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;

    await deleteComment(comment.id, imageId);
  };

  return (
    <div className="comment-bubble">

      {/* Comment header */}
      <div className="comment-meta">

        <strong>@{comment.username}</strong>

        {isOwner && !isEditing && (
          <div className="comment-actions">

            <FaEdit
              title="Edit comment"
              onClick={() => setIsEditing(true)}
              style={{ cursor: "pointer", marginLeft: "8px" }}
            />

            <FaTrash
              title="Delete comment"
              onClick={handleDelete}
              style={{ cursor: "pointer", marginLeft: "8px" }}
            />

          </div>
        )}

      </div>

      {/* Comment body */}
      {isEditing ? (

        <div className="edit-mode">

          <input
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            autoFocus
          />

          <button onClick={handleUpdate}>
            Save
          </button>

          <FaTimes
            title="Cancel"
            onClick={() => {
              setTempText(comment.comment);
              setIsEditing(false);
            }}
            style={{ cursor: "pointer", marginLeft: "8px" }}
          />

        </div>

      ) : (

        <p>{comment.comment}</p>

      )}

    </div>
  );
};

export default CommentItem;