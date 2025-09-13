import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    duration: { 
      type: Number,
      required: true,
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    assignedTo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    }]
  }, { timestamps: true });
  
  export default mongoose.model("Test", testSchema);