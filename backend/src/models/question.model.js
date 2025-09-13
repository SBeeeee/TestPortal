import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correctAnswer: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    default: 1,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // teacher
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Question", questionSchema);
