import User from "../Model/user.model.js";

const createUser =  async (req,res)=>{
    try{
        const user =await User.create(req.body);
        return res.status(200).json({
            success:true,
            error:{},
            data:user,
            message:"sucessfully created a new User"
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            error:e,
            data:{},
            message:"Something went wrong"
        })
    }
}

export default {createUser};