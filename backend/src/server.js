import 'dotenv/config';
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing");

import { connectDB } from "./config/db.js"
import express from "express";
import noteRoutes from "./routes/noteRoutes.js";


const app = express();
app.use(express.json());

await connectDB();

// Mount routes
app.use("/api/notes", noteRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
  
});

