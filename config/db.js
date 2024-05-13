import mongoose from "mongoose";
import colors from 'colors';

const connectDB = async()=>{
    try{
        console.log("hdehdskh")
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To Mongo Database ${mongoose.connection.host}`.bgMagenta);
    }catch(error){
        console.log(`MongoDB Error ${error} `.bgRed.white)
    }
}

export default connectDB;