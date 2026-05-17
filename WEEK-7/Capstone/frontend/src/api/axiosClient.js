import axios from "axios";

export const commonApi = axios.create({
  baseURL: "http://localhost:5000/api/common",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const authorApi = axios.create({
  baseURL: "http://localhost:5000/author-api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const adminApi = axios.create({
  baseURL: "http://localhost:5000/admin-api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const userApi = axios.create({
  baseURL: "http://localhost:5000/user-api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const api = commonApi;
export default api;
