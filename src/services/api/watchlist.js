import axios from "axios";

const mockClient = axios.create({
  baseURL: import.meta.env.VITE_MOCKAPI_BASE_URL,
});

mockClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "Watchlist API Error:",
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

export const getWatchlist = (userId) =>
  mockClient.get(`/watchlists?userId=${userId}`);

export const addToWatchlist = (data) => mockClient.post("/watchlists", data);

export const removeFromWatchlist = (watchlistId) =>
  mockClient.delete(`/watchlists/${watchlistId}`);
