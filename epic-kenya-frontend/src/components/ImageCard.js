// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaHeart, FaRegHeart, FaComment, FaTrash, FaEdit } from "react-icons/fa";
// import "../styles/ImageCard.css"

// const ImageCard = ({ image }) => {
//   const [likes, setLikes] = useState(image.likes || 0);
//   const [liked, setLiked] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(`/api/gallery/${image.id}/comments`);
//       setComments(res.data);
//     } catch (err) {
//       console.error("Error fetching comments", err);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       await axios.post(
//         `/api/gallery/${image.id}/like`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setLikes(likes + 1);
//       setLiked(true);
//     } catch (err) {
//       console.error("Like failed", err);
//     }
//   };

//   const handleComment = async () => {
//     if (!commentText) return;

//     try {
//       await axios.post(
//         `/api/gallery/${image.id}/comment`,
//         { text: commentText },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setCommentText("");
//       fetchComments();
//     } catch (err) {
//       console.error("Comment failed", err);
//     }
//   };

//   const deleteComment = async (commentId) => {
//     try {
//       await axios.delete(`/api/comments/${commentId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setComments(comments.filter((c) => c.id !== commentId));
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   return (
//     <div className="image-card">

//       <img
//         src={`http://localhost:5000/${image.image_url}`}
//         alt={image.caption}
//         className="gallery-image"
//       />

//       {/* ACTION ICONS */}
//       <div className="actions">

//         <span onClick={handleLike}>
//           {liked ? <FaHeart color="red" /> : <FaRegHeart />}
//         </span>

//         <span>
//           <FaComment />
//         </span>

//       </div>

//       <p>{likes} likes</p>

//       {/* COMMENTS */}
//       <div className="comments">
//         {comments.map((c) => (
//           <div key={c.id} className="comment">
//             <span>{c.username}: {c.text}</span>

//             <div className="comment-actions">
//               <FaEdit />
//               <FaTrash onClick={() => deleteComment(c.id)} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* COMMENT INPUT */}
// <div className="comment-box">

//   <div className="comment-avatar">
//     <img
//       src="https://i.pravatar.cc/40"
//       alt="user"
//     />
//   </div>

//   <div className="comment-input-area">

//     <textarea
//       rows="1"
//       placeholder="Write a comment..."
//       value={commentText}
//       onChange={(e) => setCommentText(e.target.value)}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//           e.preventDefault();
//           handleComment();
//         }
//       }}
//     />

//     {commentText && (
//       <button
//         className="post-comment-btn"
//         onClick={handleComment}
//       >
//         Post
//       </button>
//     )}

//   </div>

// </div>

//     </div>
//   );
// };

// export default ImageCard;