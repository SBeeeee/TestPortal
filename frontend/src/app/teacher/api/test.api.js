import axiosInstance from "@/utils/axiosInstance";

// ✅ Create a test (Teacher only)
export const createTestAPI = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/tests", payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ✅ Get all tests (Teacher → created tests, Student → assigned tests)
export const getAllTestsAPI = async () => {
  try {
    const data = await axiosInstance.get("/tests");
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ✅ Get single test by ID
export const getTestByIdAPI = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/tests/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ✅ Update a test
export const updateTestAPI = async (id, updates) => {
  try {
    const { data } = await axiosInstance.put(`/tests/${id}`, updates);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ✅ Delete a test
export const deleteTestAPI = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/tests/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
