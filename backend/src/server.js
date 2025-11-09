import 'dotenv/config';
import cors from "cors"
import express from "express";
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing");

import { connectDB } from "./config/db.js"
import noteRoutes from "./routes/noteRoutes.js";
import ratelimmiter from './middleware/reteLimitter.js';
import path from "path"


const app = express();
app.use(express.json());
const __dirname = path.resolve()


if(process.env.NODE_ENV !== "production"){
//middlewhere
app.use(cors({
  origin:"http://localhost:5173",
}) 
);
}




// const allowedOrigins = [
//   "http://localhost:5173",                  // local dev
//   "https://notesync-z33z.onrender.com"    // your deployed frontend
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));



app.use(express.json())
app.use(ratelimmiter)

app.use((req,res,next)=> {

  console.log(`Request method is ${req.method} & request URL is ${req.url}`);
 
  next();

}); 
//middlewhere


// Mount routes
app.use("/api/notes", noteRoutes);
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}


connectDB().then(() =>{
const PORT = process.env.PORT ||5001; 
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
  
});
});



