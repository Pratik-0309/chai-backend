import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApiError } from "./utils/apiError.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes Import
import userRouter from "./routes/user.route.js";
import videoRouter from "./routes/video.route.js"

// Route Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);

app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  // If it's an instance of ApiError, send a clean JSON response
  if (err instanceof ApiError) {
    return res.status(err.statusCode || 500).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // For any other errors
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export { app };
