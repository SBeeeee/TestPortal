import axiosInstance from "@/utils/axiosInstance";

// ✅ Create question
export const createQuestionAPI = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/questions", payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ✅ Get all questions
export const getAllQuestionsAPI = async () => {
  try {
    const { data } = await axiosInstance.get("/questions");
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ✅ Get single question
export const getQuestionByIdAPI = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/questions/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ✅ Update a question
export const updateQuestionAPI = async (id, updates) => {
  try {
    const { data } = await axiosInstance.put(`/questions/${id}`, updates);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ✅ Delete a question
export const deleteQuestionAPI = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/questions/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ✅ Add existing question to test
export const addQuestionToTestAPI = async (testId, questionId) => {
  try {
    const { data } = await axiosInstance.post("/questions/add-to-test", {
      testId,
      questionId,
    });
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// ✅ Remove question from test
export const removeQuestionFromTestAPI = async (testId, questionId) => {
  try {
    const { data } = await axiosInstance.post("/questions/remove-from-test", {
      testId,
      questionId,
    });
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
