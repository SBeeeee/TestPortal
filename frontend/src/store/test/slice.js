import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tests: [],
  selectedTest: null,
  loading: false,
  error: null,
};

const testSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    setTests(state, action) {
      state.tests = action.payload;
    },
    addTest(state, action) {
      state.tests.push(action.payload);
    },
    setSelectedTest(state, action) {
      state.selectedTest = action.payload;
    },
    updateTest(state, action) {
      const index = state.tests.findIndex(t => t._id === action.payload._id);
      if (index !== -1) state.tests[index] = action.payload;
    },
    removeTest(state, action) {
      state.tests = state.tests.filter(t => t._id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setTests, addTest, setSelectedTest, updateTest, removeTest, setLoading, setError } = testSlice.actions;

export default testSlice.reducer;
