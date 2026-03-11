import { useState, useEffect, useCallback, useRef } from "react";
import galleryService from "../services/galleryService";

/*
|--------------------------------------------------------------------------
| useGallery Hook
|--------------------------------------------------------------------------
| Handles:
| - fetching images
| - likes
| - comments
| - edit/delete comments
| - edit/delete images
| - optimistic UI updates
| - rollback on failure
*/

const useGallery = (destination = null) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // store previous state for rollback
  const previousState = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | FETCH IMAGES
  |--------------------------------------------------------------------------
  */

  const fetchImages = useCallback(async () => {
    setLoading(true);

    try {
      const data = await galleryService.fetchGallery(destination);

      const normalized = (data || []).map((img) => ({
        ...img,
        comments: img.comments || [],
        likes: img.likes || 0,
        isLiked: img.isLiked || false,
      }));

      setImages(normalized);
      setError(null);
    } catch (err) {
      console.error("Gallery fetch error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [destination]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  /*
  |--------------------------------------------------------------------------
  | LIKE IMAGE
  |--------------------------------------------------------------------------
  */

  const likeImage = useCallback(async (imageId) => {

    previousState.current = images;

    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId && !img.isLiked
          ? {
              ...img,
              likes: img.likes + 1,
              isLiked: true,
            }
          : img
      )
    );

    try {
      await galleryService.likeImage(imageId);
    } catch (err) {
      console.error("Like failed:", err);
      setImages(previousState.current);
    }

  }, [images]);

  /*
  |--------------------------------------------------------------------------
  | ADD COMMENT
  |--------------------------------------------------------------------------
  */

  const addComment = useCallback(async (imageId, text, user) => {

    if (!text?.trim()) return;

    const tempId = Date.now();

    const tempComment = {
      id: tempId,
      comment: text,
      username: user.username,
      user_id: user.userId,
      temp: true,
    };

    previousState.current = images;

    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, comments: [...img.comments, tempComment] }
          : img
      )
    );

    try {
     const response = await galleryService.addComment(imageId, text);

const savedComment = {
  id: response?.id || tempId,
  comment: response?.comment || text,
  username: user.username,
  user_id: user.userId
};

setImages((prev) =>
  prev.map((img) =>
    img.id === imageId
      ? {
          ...img,
          comments: img.comments.map((c) =>
            c.id === tempId ? savedComment : c
          ),
        }
      : img
  )
);
    

    } catch (err) {

      console.error("Add comment failed:", err);
      setImages(previousState.current);

    }

  }, [images]);

  /*
  |--------------------------------------------------------------------------
  | EDIT COMMENT
  |--------------------------------------------------------------------------
  */

  const editComment = useCallback(async (commentId, imageId, newText) => {

    if (!newText?.trim()) return;

    let oldText;

    previousState.current = images;

    setImages((prev) =>
      prev.map((img) => {

        if (img.id !== imageId) return img;

        return {
          ...img,
          comments: img.comments.map((c) => {

            if (c.id === commentId) {
              oldText = c.comment;
              return { ...c, comment: newText };
            }

            return c;

          }),
        };

      })
    );

    try {

      await galleryService.editComment(commentId, newText);

    } catch (err) {

      console.error("Edit comment failed:", err);

      setImages((prev) =>
        prev.map((img) =>
          img.id === imageId
            ? {
                ...img,
                comments: img.comments.map((c) =>
                  c.id === commentId ? { ...c, comment: oldText } : c
                ),
              }
            : img
        )
      );

    }

  }, [images]);

  /*
  |--------------------------------------------------------------------------
  | DELETE COMMENT
  |--------------------------------------------------------------------------
  */

  const deleteComment = useCallback(async (commentId, imageId) => {

    previousState.current = images;

    setImages((prev) =>
      prev.map((img) => {

        if (img.id !== imageId) return img;

        return {
          ...img,
          comments: img.comments.filter((c) => c.id !== commentId),
        };

      })
    );

    try {

      await galleryService.deleteComment(commentId);

    } catch (err) {

      console.error("Delete comment failed:", err);
      setImages(previousState.current);

    }

  }, [images]);

  /*
  |--------------------------------------------------------------------------
  | EDIT IMAGE
  |--------------------------------------------------------------------------
  */

  const editImage = useCallback(async (imageId, updates) => {

    previousState.current = images;

    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, ...updates }
          : img
      )
    );

    try {

      await galleryService.editImage(imageId, updates);

    } catch (err) {

      console.error("Edit image failed:", err);
      setImages(previousState.current);

    }

  }, [images]);

  /*
  |--------------------------------------------------------------------------
  | DELETE IMAGE
  |--------------------------------------------------------------------------
  */

  const deleteImage = useCallback(async (imageId) => {

    previousState.current = images;

    setImages((prev) =>
      prev.filter((img) => img.id !== imageId)
    );

    try {

      await galleryService.deleteImage(imageId);

    } catch (err) {

      console.error("Delete image failed:", err);
      setImages(previousState.current);

    }

  }, [images]);

  /*
  |--------------------------------------------------------------------------
  | HOOK API
  |--------------------------------------------------------------------------
  */

  return {
    images,
    loading,
    error,
    fetchImages,
    likeImage,
    addComment,
    editComment,
    deleteComment,
    editImage,
    deleteImage,
  };
};

export default useGallery;