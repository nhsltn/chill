import axios from "axios";

const userApi = axios.create({
  baseURL: import.meta.env.VITE_MOCKAPI_BASE_URL,
});

export const fetchAllUsers = () => userApi.get("/users");

export const fetchUser = (userId) => userApi.get(`/users/${userId}`);

export const createUser = (userData) => userApi.post("/users", userData);

export const updateUser = (userId, data) =>
  userApi.put(`/users/${userId}`, data);

export const deleteUser = (userId) => userApi.delete(`/users/${userId}`);
