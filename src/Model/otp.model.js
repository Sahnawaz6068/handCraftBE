import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    identifier:{
        type:String,
        required:true,
        index:true
    },
    otp:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        enum:["email_verification"],
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    attempts:{
        type:Number,
        default:0
    }
},
{timestamps:true}
);

otpSchema.index({expiresAt:1},{ expireAfterSeconds: 0 })

const Otp =  mongoose.model("Otp",otpSchema);

export default Otp;