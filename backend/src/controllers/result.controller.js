import * as resultService from "../services/result.services.js";

export const start = async (req, res) => {
  try {
    const { testId } = req.body;
    const studentId = req.id; // from auth middleware
    const result = await resultService.startResult(testId, studentId);

    res.status(201).json({
      success: true,
      resultId: result._id,
      data: result,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const save = async (req, res) => {
  try {
    const { resultId } = req.params;
    const { question, selectedOption, timeSpent } = req.body;
    const result = await resultService.saveAnswer(resultId, { question, selectedOption, timeSpent });

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const submit = async (req, res) => {
  try {
    const { resultId } = req.params;
    const result = await resultService.submitResult(resultId);

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const violation = async (req, res) => {
  try {
    const { resultId } = req.params;
    const result = await resultService.addViolation(resultId);

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// controllers/result.controller.js
export const getResult = async (req, res) => {
  try {
    const { resultId } = req.params;
    const result = await resultService.getResultById(resultId);

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



export const getStudentResults = async (req, res) => {
  try {
    const studentId = req.id; // from auth middleware
    const results = await resultService.getResultsByStudent(studentId);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
