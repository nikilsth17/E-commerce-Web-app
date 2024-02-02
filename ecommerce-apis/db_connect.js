import mongoose from "mongoose";


export const db_connnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connection OK.");
    } catch (error) {
        console.log("DB connection failed!");
        console.log(error.message);
        
    }
}