import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://capstone-24eg105k62.onrender.com";

export const commonApi = axios.create({
  baseURL: `${BACKEND_URL}/api/common`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const authorApi = axios.create({
  baseURL: `${BACKEND_URL}/author-api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const adminApi = axios.create({
  baseURL: `${BACKEND_URL}/admin-api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const userApi = axios.create({
  baseURL: `${BACKEND_URL}/user-api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Default export for backward compatibility
const api = commonApi;
export default api;
