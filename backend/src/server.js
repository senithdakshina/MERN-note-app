// FILE: backend/src/server.js
import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
import ratelimmiter from "./middleware/reteLimitter.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ NEW

const app = express();
const __dirname = path.resolve();

console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing");

// JSON parsing
app.use(express.json());

// Enable CORS (dev only)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// Apply rate limiter
app.use(ratelimmiter);

// Logging middleware
app.use((req, res, next) => {
  console.log(`Request method: ${req.method} | URL: ${req.url}`);
  next();
});

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// ✅ Protected notes routes (auth applied inside)
app.use("/api/notes", noteRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect DB & start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
