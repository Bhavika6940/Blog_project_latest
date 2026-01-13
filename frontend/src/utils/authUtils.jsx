// src/utils/authUtils.jsx
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- Token Management ---
export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");

// --- User Management ---
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
export const setUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));
export const removeUser = () => localStorage.removeItem("user");

// --- Axios Instance (FIXED) ---
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Login ---
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/api/user/login`, {
    email,
    password,
  });
  setToken(res.data.token);
  setUser(res.data.user);
  return res.data;
};

// --- Logout ---
export const logoutUser = () => {
  removeToken();
  removeUser();
};

export const getImageUrl  = (filename) => {
  if(!filename) return "/default-image.png"; // fallback
  return `${import.meta.env.VITE_API_BASE_URL}/public/${filename}`;
}

export default axiosInstance;
