import question from "../models/question.model.js";
import User from "../models/user.models.js"
import Test from "../models/test.model.js"; 
import { create } from "../controllers/test.controller.js";

export const createQuestion = async ({ text, options, correctOption, marks, createdBy,testId }) => {
    const user = await User.findById(createdBy);
    if (!user) throw new Error("User not found");
    if (user.role !== "teacher") throw new Error("Only teachers can create questions");
  const question = new question({
    text,
    options,
    correctOption,
    marks,
    createdBy
  });

  await question.save();

  if (testId) {
    const test = await Test.findById(testId);
    if (!test) throw new Error("Test not found");
    if (!test.createdBy.equals(user._id)) throw new Error("Not authorized to modify this test");

    test.questions.push(question._id);
    await test.save();
  }
  if (testId) {
    const test = await Test.findById(testId);
    if (!test) throw new Error("Test not found");
    if (!test.createdBy.equals(user._id)) throw new Error("Not authorized to modify this test");

    test.questions.push(question._id);
    await test.save();
  }

  return question;
}

export const getAllQuestions = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
  
    if (user.role === "teacher") {
      return await Question.find({ createdBy: user._id }).populate("createdBy", "name email");
    } else {
     
      return await Question.find().populate("createdBy", "name email");
    }
  };


  export const getQuestionById = async (id) => {
    const question = await Question.findById(id).populate("createdBy", "name email");
    if (!question) throw new Error("Question not found");
    return question;
  };
  
  // Update a question (only teacher who created it)
  export const updateQuestion = async (id, updates, userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "teacher") throw new Error("Only teachers can update questions");
  
    const question = await Question.findById(id);
    if (!question) throw new Error("Question not found");
  
    if (!question.createdBy.equals(user._id)) {
      throw new Error("Not authorized to update this question");
    }
  
    Object.assign(question, updates);
    await question.save();
    return question;
  };
  
  // Delete a question (only teacher who created it)
  export const deleteQuestion = async (id, userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "teacher") throw new Error("Only teachers can delete questions");
  
    const question = await Question.findById(id);
    if (!question) throw new Error("Question not found");
  
    if (!question.createdBy.equals(user._id)) {
      throw new Error("Not authorized to delete this question");
    }
  
    await question.deleteOne();
    return { message: "Question deleted successfully" };
  };

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