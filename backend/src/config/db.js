// src/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI?.trim();
    if (!uri) {
      throw new Error("MONGO_URI is missing or empty.");
    }

    await mongoose.connect(uri); // ✅ pass the URI here
    console.log("MongoDB is successfully connected!");
  } catch (error) {
    console.error("Error connecting MongoDB:", error);
    process.exit(1);
  }
};
