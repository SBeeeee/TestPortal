import Test from "../models/test.model.js";
import User from "../models/user.models.js";

export const createTest = async ({ title, description, duration, questions, createdBy, assignedTo }) => {
  const test = new Test({
    title,
    description,
    duration,
    questions,
    createdBy,
    assignedTo
  });

  await test.save();
  return test;
};

export const getAllTests = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Fixed: Added missing parentheses
  if (user.role.toLowerCase() === "teacher") {
    return await Test.find({ createdBy: user._id })
      .populate("questions")
      .populate("assignedTo", "name email");
  } else {
    // Students can see all tests
    return await Test.find()
      .populate("questions")
      .populate("createdBy", "name email");
  }
};

export const getTestById = async (id, userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const test = await Test.findById(id)
    .populate("questions")
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email");

  if (!test) throw new Error("Test not found");

  // REMOVED: The authorization check that was blocking students
  // This line was preventing students from accessing tests:
  // if (user.role === "student" && !test.assignedTo.some(s => s._id.equals(user._id))) {
  //   throw new Error("Not authorized to access this test");
  // }

  // Now all students can access any test
  return test;
};

export const updateTest = async (id, updates, userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const test = await Test.findById(id);
  if (!test) throw new Error("Test not found");

  if (!test.createdBy.equals(user._id)) {
    throw new Error("Not authorized to update this test");
  }

  Object.assign(test, updates);
  await test.save();

  return test;
};

export const deleteTest = async (id, userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const test = await Test.findById(id);
  if (!test) throw new Error("Test not found");

  if (!test.createdBy.equals(user._id)) {
    throw new Error("Not authorized to delete this test");
  }

  await test.deleteOne();
  return { message: "Test deleted successfully" };
};