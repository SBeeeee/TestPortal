import {
    createTest,
    getAllTests,
    getTestById,
    updateTest,
    deleteTest,
  } from "../services/test.service.js"; 
  
  // Create new test (Teacher only)
  export const create = async (req, res) => {
    try {
      const test = await createTest({ ...req.body, createdBy: req.id });
      res.status(201).json({
        success: true,
        message: "Test created successfully",
        data: test,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Failed to create test",
      });
    }
  };
  
  // Get all tests
  export const getAll = async (req, res) => {
    try {
      const tests = await getAllTests(req.id); // now passing userId
      res.status(200).json({
        success: true,
        count: tests.length,
        data: tests,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch tests",
      });
    }
  };
  
  // Get a single test
  export const getOne = async (req, res) => {
    try {
      const test = await getTestById(req.params.id, req.id);
      res.status(200).json({
        success: true,
        data: test,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Test not found",
      });
    }
  };
  
  // Update test
  export const update = async (req, res) => {
    try {
      const updated = await updateTest(req.params.id, req.body, req.id);
      res.status(200).json({
        success: true,
        message: "Test updated successfully",
        data: updated,
      });
    } catch (err) {
      res.status(403).json({
        success: false,
        message: err.message || "Failed to update test",
      });
    }
  };
  
  // Delete test
  export const remove = async (req, res) => {
    try {
      const result = await deleteTest(req.params.id, req.id);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (err) {
      res.status(403).json({
        success: false,
        message: err.message || "Failed to delete test",
      });
    }
  };
  