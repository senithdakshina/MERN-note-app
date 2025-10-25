import express from "express";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();
app.use(express.json());

// Mount routes
app.use("/api/notes", noteRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});


