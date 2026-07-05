import express from 'express';
import config from './src/config/env.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";


import apiRoute from './src/routes/index.js'

dotenv.config();

const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN'
];

const app = express();

app.use(express.json());
// app.use(cookieParser());


//Routes
app.use('/api',apiRoute);

app.get("/",(req,res)=>{
    console.log("server start");
    res.json("Server test");
});

app.listen(config.port,async ()=>{
    try{
        await connectDB();
        console.log("app is listening on port"+config.port)
    }catch(err){

    }
});