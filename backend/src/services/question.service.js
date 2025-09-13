import Question from "../models/question.model.js";
import User from "../models/user.models.js";
import Test from "../models/test.model.js";

export const createQuestion = async ({ text, options, correctOption, marks, createdBy, testId, subject }) => {
  const user = await User.findById(createdBy);
  if (!user) throw new Error("User not found");
  if (user.role !== "teacher") throw new Error("Only teachers can create questions");

  const question = new Question({
    text,
    options,
    correctOption,
    marks,
    createdBy,
    subject
  });

  await question.save();

  if (testId) {
    const test = await Test.findById(testId);
    if (!test) throw new Error("Test not found");
    if (!test.createdBy.equals(user._id)) throw new Error("Not authorized to modify this test");

    test.questions.push(question._id);
    await test.save();
  }

  return question;
};

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

export const updateQuestion = async (id, updates, userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.role !== "teacher") throw new Error("Only teachers can update questions");

  const question = await Question.findById(id);
  if (!question) throw new Error("Question not found");

  if (!question.createdBy.equals(user._id)) throw new Error("Not authorized to update this question");

  Object.assign(question, updates);
  await question.save();
  return question;
};

export const deleteQuestion = async (id, userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.role !== "teacher") throw new Error("Only teachers can delete questions");

  const question = await Question.findById(id);
  if (!question) throw new Error("Question not found");

  if (!question.createdBy.equals(user._id)) throw new Error("Not authorized to delete this question");

  await question.deleteOne();
  return { message: "Question deleted successfully" };
};
