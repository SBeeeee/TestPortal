import axiosInstance from "@/utils/axiosInstance";

// ✅ Create a test (Teacher only)
export const createTestAPI = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/tests", payload);
    console.log("🔌 createTestAPI response:", data);
    return data;
  } catch (err) {
    console.error("❌ createTestAPI error:", err.response?.data || err.message || err);
    throw err.response?.data || err;
  }
};

// ✅ Get all tests (Teacher → created tests, Student → assigned tests)
export const getAllTestsAPI = async () => {
  try {
    const { data } = await axiosInstance.get("/tests");
    console.log("🔌 getAllTestsAPI response:", data);
    return data;
  } catch (err) {
    console.error("❌ getAllTestsAPI error:", err.response?.data || err.message || err);
    throw err.response?.data || err;
  }
};

// ✅ Get single test by ID
export const getTestByIdAPI = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/tests/${id}`);
    console.log("🔌 getTestByIdAPI response:", data);
    return data.data; // unwrap
  } catch (err) {
    console.error("❌ getTestByIdAPI error:", err.response?.data || err.message || err);
    throw err.response?.data || err;
  }
};

// ✅ Update a test
export const updateTestAPI = async (id, updates) => {
  try {
    const { data } = await axiosInstance.put(`/tests/${id}`, updates);
    console.log("🔌 updateTestAPI response:", data);
    return data;
  } catch (err) {
    console.error("❌ updateTestAPI error:", err.response?.data || err.message || err);
    throw err.response?.data || err;
  }
};

// ✅ Delete a test
export const deleteTestAPI = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/tests/${id}`);
    console.log("🔌 deleteTestAPI response:", data);
    return data;
  } catch (err) {
    console.error("❌ deleteTestAPI error:", err.response?.data || err.message || err);
    throw err.response?.data || err;
  }
};
