import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: [true, 'Name is required']
    },

    email:{
        type:String,
        trim:true,
        lowercase:true,
        sparse:true, //Allow null without unique conflict
        unique:true
    },
    phone:{
        type:String,
        trim:true,
        sparse:true,
        unique:true
    },
    role:{
        type:String,
        enum:['customer','vender','admin'],
        default:'customer',
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false  // Make true after otp verification
    },
    isActive:{
        type:Boolean,
        default:true // we can deactivate customer or vendor 
    },
    addresses:[{
        lable :{type:String , default: 'Home'},
        line1:String,
        line2:String,
        city:String,
        state:String,
        pinCode:String,
        country:{type:String, default:'India'},
        isDefault: {type:Boolean,default:false}
    }],

    avtar:{
        type:String,
        default:''        
    },

    lastLoginAt:{
        type:Date        
    },
},
    {timestamps:true}
)

const User = mongoose.model('User',userSchema);

export default User;