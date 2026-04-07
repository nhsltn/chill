import axios from "axios";

const mockClient = axios.create({
  baseURL: import.meta.env.VITE_MOCKAPI_BASE_URL,
});

export const getWatchlist = (userId) =>
  mockClient.get(`/watchlists?userId=${userId}`);

export const addToWatchlist = (data) => mockClient.post("/watchlists", data);

export const removeFromWatchlist = (watchlistId) =>
  mockClient.delete(`/watchlists/${watchlistId}`);
