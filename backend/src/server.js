import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js"

const app = express();
app.use(express.json());

connectDB();

// Mount routes
app.use("/api/notes", noteRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

