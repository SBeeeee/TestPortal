import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedOption: String,
  timeSpent: { type: Number, default: 0 } // in seconds
});

const resultSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answers: [answerSchema],
  score: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ["in-progress", "submitted"], 
    default: "in-progress" 
  },
  violations: { type: Number, default: 0 }, // anti-cheating
}, { timestamps: true });

export default mongoose.model("Result", resultSchema);
