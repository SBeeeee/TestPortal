import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userroutes from './src/routes/user.routes.js'
import { connectDB } from "./src/lib/database.js";

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

  app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:" + process.env.PORT);
    connectDB();
   
  });