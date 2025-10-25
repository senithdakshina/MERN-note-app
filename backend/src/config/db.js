import mongoose from "mongoose"
const connectDb = async () => {
    try{
        mongoose.connect("mongodb+srv://senithdakshina_db_user:t7iHtRfRycdQg8EH@cluster0.bcjiz5c.mongodb.net/?appName=Cluster0")
        console.log("MogoDB is successfully connected!");
    }catch(error){
        console.error("Error connecting MongoDB",error);
    }
    
}