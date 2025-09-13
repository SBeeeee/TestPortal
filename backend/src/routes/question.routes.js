import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  addQuestionToTest,
  removeQuestionFromTest,
} from "../controllers/question.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyUser);


router.post("/", createQuestion);          
router.get("/", getAllQuestions);           
router.get("/:id", getQuestionById);          
router.put("/:id", updateQuestion);           
router.delete("/:id", deleteQuestion);        

// Manage test-question relationships
router.post("/add-to-test", addQuestionToTest);       // Add existing Q to test
router.post("/remove-from-test", removeQuestionFromTest); // Remove Q from test

export default router;
