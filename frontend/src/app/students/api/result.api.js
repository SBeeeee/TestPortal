import axiosInstance from "@/utils/axiosInstance";

// ✅ Start a new test attempt
export const startResultAPI = async (testId) => {
  try {
    const { data } = await axiosInstance.post("/results/start", { testId });
    console.log("🔌 startResultAPI response:", data);
    return {
      resultId: data.resultId,
      result: data.data,
    };
  } catch (err) {
    console.error("❌ startResultAPI error:", err.response?.data || err.message || err);
    throw err.response?.data || err;
  }
};

// ✅ Save answer (auto-save or on option select)
export const saveAnswerAPI = async (resultId, payload) => {
  try {
    const { data } = await axiosInstance.patch(`/results/${resultId}/answer`, payload);
    console.log("🔌 saveAnswerAPI response:", data);
    return data;
  } catch (err) {
    console.error("❌ saveAnswerAPI error:", err.response?.data || err.message || err);
    throw err.response?.data || err;
  }
};

// ✅ Submit test
export const submitResultAPI = async (resultId) => {
  try {
    const { data } = await axiosInstance.patch(`/results/${resultId}/submit`);
    console.log("🔌 submitResultAPI response:", data);
    return data;
  } catch (err) {
    console.error("❌ submitResultAPI error:", err.response?.data || err.message || err);
    throw err.response?.data || err;
  }
};

// ✅ Report violation (tab switch, cheating attempt)
export const reportViolationAPI = async (resultId) => {
  try {
    const { data } = await axiosInstance.patch(`/results/${resultId}/violation`);
    console.log("🔌 reportViolationAPI response:", data);
    return data;
  } catch (err) {
    console.error("❌ reportViolationAPI error:", err.response?.data || err.message || err);
    throw err.response?.data || err;
  }
};

// result.api.js
export const getResultByIdAPI = async (resultId) => {
  try {
    const { data } = await axiosInstance.get(`/results/${resultId}`);
    console.log("🔌 getResultByIdAPI response:", data);
    return data.data; // unwrap
  } catch (err) {
    console.error("❌ getResultByIdAPI error:", err.response?.data || err.message || err);
    throw err.response?.data || err;
  }
};
