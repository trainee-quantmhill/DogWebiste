import mongoose from "mongoose";
import validator from "validator";



//schema
const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        validate: validator.isEmail,
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type: String,
        required:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"Auth",
    }
},
    { timestamps: true }            //When the new user create then User creation time will be print
);


export default mongoose.model('ContactUs', contactUsSchema);