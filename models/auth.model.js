import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


//schema
const authSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required:true,
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        require: true,
        minlength:6,
        select: true
    },
    address:{
        type:String
    },
    newPassword:{
        type: String,
    },
    confirmPassword:{
        type: String,
    }
},
    { timestamps: true }            //When the new user create then User creation time will be print
);


//'pre' middleware
authSchema.pre('save', async function () {
    if(!this.isModified){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



//jwt TOKEN.createJWT  is a userdefined method 
authSchema.methods.createJWT = function () {
    return JWT.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );
}


//to compare password 
authSchema.methods.comparePassword = async function (userPassword) { 
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}


export default mongoose.model('Auth', authSchema);