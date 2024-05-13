import mongoose from "mongoose";
  
//schema
const supplementSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required:true,
         
    },
    supplementImageUrl:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"Auth",
    }
},
    { timestamps: true }            //When the new user create then User creation time will be print
);


export default mongoose.model('Supplement', supplementSchema);