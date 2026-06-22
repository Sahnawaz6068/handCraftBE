import express from 'express';

const router = express.Router();

//api/v1/product/
router.get('/',(req,res)=>{
    res.json("hello check");
})

export default router;