import Result from "../models/result.models.js";
import Test from "../models/test.model.js";
import Question from "../models/question.model.js";

export const startResult = async (testId, studentId) => {
  
  let result = await Result.findOne({ 
    test: testId, 
    student: studentId, 
   
  });


  if (result) {
    if (result.status === "submitted") {
    
      return result;
    }
    if (result.status === "in-progress") {
    
      return result;
    }
  }
  if (!result) {
    result = await Result.create({
      test: testId,
      student: studentId,
      status: "in-progress",
      answers: [],
      startTime: new Date(), // ✅ Add start time tracking
      violations: 0
    });
  }

  return result;
};

export const saveAnswer = async (resultId, { question, selectedOption, timeSpent }) => {
  const result = await Result.findById(resultId);
  if (!result) throw new Error("Result not found");
  if (result.status === "submitted") throw new Error("Test already submitted");

  // Check if test time has expired
  const test = await Test.findById(result.test);
  if (test && result.startTime) {
    const elapsed = Math.floor((Date.now() - result.startTime.getTime()) / 1000);
    const duration = (test.duration || 60) * 60;
    
    if (elapsed >= duration) {
      // Auto-submit expired test
      result.status = "submitted";
      await result.save();
      throw new Error("Test time expired");
    }
  }

  // Find if answer exists
  const answerIndex = result.answers.findIndex(a => a.question.toString() === question);

  if (answerIndex >= 0) {
    // Update existing answer
    result.answers[answerIndex].selectedOption = selectedOption;
    result.answers[answerIndex].timeSpent += timeSpent;
    result.answers[answerIndex].lastModified = new Date(); // ✅ Track when answer was last changed
  } else {
    // Add new answer
    result.answers.push({ 
      question, 
      selectedOption, 
      timeSpent, 
      lastModified: new Date() 
    });
  }

  await result.save();
  return result;
};

export const getResultById = async (resultId) => {
  const result = await Result.findById(resultId)
    .populate("answers.question")
    .populate("test")
    .populate("student", "name email");

  if (!result) throw new Error("Result not found");

  // ✅ Calculate time remaining if still in progress
  if (result.status === "in-progress" && result.test && result.startTime) {
    const elapsed = Math.floor((Date.now() - result.startTime.getTime()) / 1000);
    const duration = (result.test.duration || 60) * 60;
    result.timeRemaining = Math.max(0, duration - elapsed);
    
    // Auto-submit if time expired
    if (result.timeRemaining === 0) {
      await submitResult(resultId);
      result.status = "submitted";
    }
  }

  return result;
};

export const submitResult = async (resultId) => {
  const result = await Result.findById(resultId)
    .populate("answers.question")
    .populate("test");

  if (!result) throw new Error("Result not found");
  if (result.status === "submitted") throw new Error("Already submitted");

  let score = 0;
  let totalMarks = 0;

  for (const ans of result.answers) {
    const q = ans.question;
    if (q) {
      const questionMarks = q.marks || 1;
      totalMarks += questionMarks;
      
      if (ans.selectedOption === q.correctOption) {
        score += questionMarks;
      }
    }
  }

  result.score = score;
  result.totalMarks = totalMarks;
  result.percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;
  result.status = "submitted";
  result.submittedAt = new Date(); // ✅ Track submission time
  
  await result.save();
  return result;
};

export const addViolation = async (resultId) => {
  const result = await Result.findById(resultId);
  if (!result) throw new Error("Result not found");

  result.violations += 1;
  result.violationLog = result.violationLog || [];
  result.violationLog.push({
    type: "tab_switch",
    timestamp: new Date()
  });

  // Auto-submit after 3 violations
  if (result.violations >= 3) {
    result.status = "submitted";
    result.submittedAt = new Date();
  }

  await result.save();
  return result;
};



export const getResultsByStudent = async (studentId) => {
  const results = await Result.find({ student: studentId })
    .populate("test")      
    .populate("student", "name email"); 

  return results;
};
