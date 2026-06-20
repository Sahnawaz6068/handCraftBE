import mongoose from "mongoose";
// const mongoUri="fcnsjkdc";//come form env file
// import { mongoUri } from "./env";
import config from "./env.js";

const connectDB= async ()=>{
    try{
        mongoose.connect(config.mongoUri,{
            maxPoolSize:10,
            serverSelectionTimeoutMS:5000,
        })
    }catch(err){
        console.log("Mongoo connection failed" + err.message);
        process.exit(1);
    }
}

export default connectDB;