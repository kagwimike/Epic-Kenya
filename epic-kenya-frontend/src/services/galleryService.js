import axios from "axios";

/*
|--------------------------------------------------------------------------
| API CONFIG
|--------------------------------------------------------------------------
*/

const API_BASE = "http://localhost:5000/api";

/*
|--------------------------------------------------------------------------
| AXIOS INSTANCE
|--------------------------------------------------------------------------
*/

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  }
});

/*
|--------------------------------------------------------------------------
| AUTH TOKEN INTERCEPTOR
|--------------------------------------------------------------------------
*/

api.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

/*
|--------------------------------------------------------------------------
| ERROR HANDLER
|--------------------------------------------------------------------------
*/

const handleError = (error) => {
  console.error(
    "Gallery API Error:",
    error?.response?.data || error.message
  );
  throw error;
};

/*
|--------------------------------------------------------------------------
| GALLERY SERVICES
|--------------------------------------------------------------------------
*/

const galleryService = {

  /*
  -------------------------------------------------
  Fetch Gallery Images
  -------------------------------------------------
  */

  async fetchGallery(destination) {
    try {

      const url = destination
        ? `/gallery?destination=${destination}`
        : `/gallery`;

      const res = await api.get(url);

      return res.data;

    } catch (error) {
      handleError(error);
    }
  },

  /*
  -------------------------------------------------
  Like Image
  -------------------------------------------------
  */

  async likeImage(imageId) {
    try {

      const res = await api.post(`/gallery/${imageId}/like`);

      return res.data;

    } catch (error) {
      handleError(error);
    }
  },

  /*
  -------------------------------------------------
  Add Comment
  -------------------------------------------------
  */

  async addComment(imageId, text) {
    try {

      const res = await api.post(
        `/gallery/${imageId}/comment`,
        { comment: text }   // backend usually expects "comment"
      );

      return res.data;

    } catch (error) {
      handleError(error);
    }
  },

  /*
  -------------------------------------------------
  Edit Comment
  -------------------------------------------------
  */

  async editComment(commentId, text) {
    try {

      const res = await api.put(
        `/comments/${commentId}`,
        { comment: text }
      );

      return res.data;

    } catch (error) {
      handleError(error);
    }
  },

  /*
  -------------------------------------------------
  Delete Comment
  -------------------------------------------------
  */

  async deleteComment(commentId) {
    try {

      const res = await api.delete(
        `/comments/${commentId}`
      );

      return res.data;

    } catch (error) {
      handleError(error);
    }
  },

  /*
  -------------------------------------------------
  Edit Image
  -------------------------------------------------
  */

  async editImage(imageId, updates) {
    try {

      const res = await api.put(
        `/gallery/${imageId}`,
        updates
      );

      return res.data;

    } catch (error) {
      handleError(error);
    }
  },

  /*
  -------------------------------------------------
  Delete Image
  -------------------------------------------------
  */

  async deleteImage(imageId) {
    try {

      const res = await api.delete(
        `/gallery/${imageId}`
      );

      return res.data;

    } catch (error) {
      handleError(error);
    }
  }

};

export default galleryService;