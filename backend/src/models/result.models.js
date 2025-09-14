import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["in-progress", "submitted"],
    default: "in-progress"
  },
  startTime: {
    type: Date,
    default: Date.now // ✅ Track when test started
  },
  submittedAt: {
    type: Date // ✅ Track when test was submitted
  },
  answers: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    selectedOption: {
      type: String,
      required: true
    },
    timeSpent: {
      type: Number,
      default: 0
    },
    lastModified: {
      type: Date,
      default: Date.now // ✅ Track when answer was last changed
    }
  }],
  score: {
    type: Number,
    default: 0
  },
  totalMarks: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  violations: {
    type: Number,
    default: 0
  },
  violationLog: [{
    type: {
      type: String,
      enum: ["tab_switch", "copy_paste", "right_click"]
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// ✅ Compound index to quickly find in-progress tests for a student
resultSchema.index({ test: 1, student: 1, status: 1 });

export default mongoose.model("Result", resultSchema);