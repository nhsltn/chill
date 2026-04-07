import axios from "axios";

const tmdbClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
  params: {
    language: "id-ID",
  },
});

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("TMDB Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const getTopRatedMovies = () => tmdbClient.get("/movie/top_rated");
export const getTopRatedTV = () => tmdbClient.get("/tv/top_rated");

export const getTrendingMovies = () => tmdbClient.get("/trending/movie/day");
export const getTrendingTV = () => tmdbClient.get("/trending/tv/day");

export const getNewReleaseMovies = () => tmdbClient.get("/movie/now_playing");
export const getNewReleaseTV = () => tmdbClient.get("/tv/on_the_air");

export const getTrendingAll = () =>
  tmdbClient.get("/trending/all/day", {
    params: {
      language: "en-US",
    },
  });

export const getDataById = (id, mediatype) =>
  tmdbClient.get(`/${mediatype}/${id}`, {
    params: {
      language: "en-US",
      include_video_language: "en,id,null",
    },
  });

export const getTrailerById = (id, mediatype) =>
  tmdbClient.get(`/${mediatype}/${id}/videos`, {
    params: {
      language: "en-US",
      include_video_language: "en,id,null",
    },
  });

export const getAgeRating = (id, mediaType) =>
  tmdbClient.get(
    `/${mediaType}/${id}/${mediaType === "movie" ? "release_dates" : "content_ratings"}`,
  );
