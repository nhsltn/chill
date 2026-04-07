import axios from "axios";

const userApi = axios.create({
  baseURL: import.meta.env.VITE_MOCKAPI_BASE_URL,
});

userApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("User API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const fetchAllUsers = () => userApi.get("/users");

export const fetchUser = (userId) => userApi.get(`/users/${userId}`);

export const createUser = (userData) => userApi.post("/users", userData);

export const updateUser = (userId, data) =>
  userApi.put(`/users/${userId}`, data);

export const deleteUser = (userId) => userApi.delete(`/users/${userId}`);
