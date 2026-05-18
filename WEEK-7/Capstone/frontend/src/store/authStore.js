// frontend/src/store/authStore.js
import { create } from "zustand";
import { commonApi } from "../api/axiosClient";  

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  
  login: async (userCred) => {
    try {
      set({ loading: true, currentUser: null, isAuthenticated: false, error: null });
      
      const res = await commonApi.post("/login", userCred);
      
      if (res.status === 200) {
        set({
          currentUser: res.data?.payload,
          loading: false,
          isAuthenticated: true,
          error: null,
        });
      }
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed",
      });
    }
  },
  
  logout: async () => {
    try {
      const res = await commonApi.get("/logout");
      
      if (res.status === 200) {
        set({
          currentUser: null,
          isAuthenticated: false,
          error: null,
          loading: false,
        });
      }
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Logout failed",
      });
    }
  },
  
  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await commonApi.get("/check-auth");
      
      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        set({ currentUser: null, isAuthenticated: false, loading: false });
        return;
      }
      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  },
}));
