import * as questionService from "../services/question.service.js";

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { text, options, correctOption, marks, testId, subject } = req.body;
    const createdBy = req.id; // set by auth middleware

    const question = await questionService.createQuestion({
      text,
      options,
      correctOption,
      marks,
      createdBy,
      testId,
      subject
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const userId = req.id;
    const questions = await questionService.getAllQuestions(userId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a question by ID
export const getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await questionService.getQuestionById(questionId);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a question
export const updateQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const updates = req.body;
    const userId = req.id;

    const updatedQuestion = await questionService.updateQuestion(questionId, updates, userId);
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const userId = req.id;

    const result = await questionService.deleteQuestion(questionId, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add existing question to a test
export const addQuestionToTest = async (req, res) => {
  try {
    const { testId, questionId } = req.body;
    const userId = req.id;

    const test = await questionService.addQuestionToTest(testId, questionId, userId);
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove question from a test
export const removeQuestionFromTest = async (req, res) => {
  try {
    const { testId, questionId } = req.body;
    const userId = req.id;

    const test = await questionService.removeQuestionFromTest(testId, questionId, userId);
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
