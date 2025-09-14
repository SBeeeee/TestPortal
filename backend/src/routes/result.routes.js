import express from "express";
import * as resultController from "../controllers/result.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/start", verifyUser, resultController.start);
router.patch("/:resultId/answer", verifyUser, resultController.save);
router.patch("/:resultId/submit", verifyUser, resultController.submit);
router.patch("/:resultId/violation", verifyUser, resultController.violation);
router.get("/:resultId", verifyUser,resultController.getResult);
router.get("/mine/my", verifyUser, resultController.getStudentResults); 
export default router;
