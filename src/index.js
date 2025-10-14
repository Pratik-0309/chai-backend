import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

// Connect to DB
connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`App is Listening on port ${process.env.PORT}`);
  });
});
