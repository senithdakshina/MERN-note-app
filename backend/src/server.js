import 'dotenv/config';
import cors from "cors"
import express from "express";
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing");

import { connectDB } from "./config/db.js"
import noteRoutes from "./routes/noteRoutes.js";
import ratelimmiter from './middleware/reteLimitter.js';



const app = express();
app.use(express.json());



//middlewhere
app.use(cors({
  origin:"http://localhost:5173",
}));

app.use(express.json())
app.use(ratelimmiter)

app.use((req,res,next)=> {

  console.log(`Request method is ${req.method} & request URL is ${req.url}`);
 
  next();

}); 
//middlewhere


// Mount routes
app.use("/api/notes", noteRoutes);
connectDB().then(() =>{
const PORT = 5001; 
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
  
});
});



