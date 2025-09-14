import Result from "../models/result.models.js";
import Test from "../models/test.model.js";
import Question from "../models/question.model.js";

export const startResult = async (testId, studentId) => {
  // check if already in-progress
  let result = await Result.findOne({ test: testId, student: studentId, status: "in-progress" });

  if (!result) {
    result = await Result.create({
      test: testId,
      student: studentId,
      status: "in-progress",
      answers: []
    });
  }

  return result;
};

export const saveAnswer = async (resultId, { question, selectedOption, timeSpent }) => {
  const result = await Result.findById(resultId);
  if (!result) throw new Error("Result not found");
  if (result.status === "submitted") throw new Error("Test already submitted");

  // find if answer exists
  const answerIndex = result.answers.findIndex(a => a.question.toString() === question);

  if (answerIndex >= 0) {
    // update
    result.answers[answerIndex].selectedOption = selectedOption;
    result.answers[answerIndex].timeSpent += timeSpent;
  } else {
    // add new
    result.answers.push({ question, selectedOption, timeSpent });
  }

  await result.save();
  return result;
};

export const submitResult = async (resultId) => {
  const result = await Result.findById(resultId)
    .populate("answers.question")
    .populate("test");

  if (!result) throw new Error("Result not found");
  if (result.status === "submitted") throw new Error("Already submitted");

  let score = 0;

  for (const ans of result.answers) {
    const q = ans.question;
    if (q && ans.selectedOption === q.correctOption) {
      score += q.marks || 1;
    }
  }

  result.score = score;
  result.status = "submitted";
  await result.save();

  return result;
};

export const addViolation = async (resultId) => {
  const result = await Result.findById(resultId);
  if (!result) throw new Error("Result not found");

  result.violations += 1;

  // e.g., auto-submit after 3 violations
  if (result.violations >= 3) {
    result.status = "submitted";
  }

  await result.save();
  return result;
};

// services/result.services.js
export const getResultById = async (resultId) => {
  const result = await Result.findById(resultId)
    .populate("answers.question")
    .populate("test");

  if (!result) throw new Error("Result not found");
  return result;
};
