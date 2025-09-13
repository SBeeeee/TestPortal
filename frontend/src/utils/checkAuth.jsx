// utils/checkAuth.jsx
import { setUser } from "../store/user/slice";
import axiosInstance from "./axiosInstance";

export const checkAuth = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/users/me");
    if (response?.data?.data) {
      const userData = response.data.data; // ✅ just user object
      dispatch(setUser(userData));
      return userData;
    }
    return null;
  } catch (error) {
    console.error("Auth check failed:", error);
    return null;
  }
};
