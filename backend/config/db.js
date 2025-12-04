import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ghimireroshan00_db_user:resume123@cluster0.krxzvdv.mongodb.net/RESUME')
    .then(()=>{
        console.log("Database connected successfully");
    })
}