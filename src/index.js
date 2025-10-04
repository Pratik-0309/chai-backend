import dotenv from "dotenv";
import connectDB from "./db/index.js";

// Load environment variables first
dotenv.config({ path: "./env" });

// Connect to DB
connectDB();
