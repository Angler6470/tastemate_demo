import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import statsRoutes from "./routes/stats.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3001;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/tastemate";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`),
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log("Running in demo mode without database");
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT} (demo mode)`),
    );
  });
