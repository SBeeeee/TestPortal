import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userroutes from './src/routes/user.routes.js'
import testroutes from './src/routes/test.routes.js'
import questionroutes from './src/routes/question.routes.js'
import { connectDB } from "./src/lib/database.js";
import resultroutes from "./src/routes/result.routes.js";
dotenv.config();

const app = express();

app.use(cookieParser());

app.use(
    cors({
      origin: [
        "http://localhost:3000", 
        
      ],
      credentials: true, // allow cookies/auth headers
    })
  );
  app.use(express.json());

  app.use("/api/users", userroutes);
  app.use("/api/tests", testroutes);
  app.use("/api/questions", questionroutes);
  app.use("/api/results", resultroutes);
  app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:" + process.env.PORT);
    connectDB();
   
  });