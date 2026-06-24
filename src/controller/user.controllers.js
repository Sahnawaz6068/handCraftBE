import User from "../Model/user.model.js";
import response from "../utils/responsebody.js";
import userService from "../services/user.service.js";

// const createUser = async (req, res) => {
//     try {
//         const user = await User.create(req.body);

//         const successResponse = {
//             ...response.successResponseBody
//         };

//         successResponse.data = user;
//         successResponse.message = "Successfully created a new user";

//         return res.status(201).json(successResponse);

//     } catch (e) {

//         const errorResponse = {
//             ...response.errorResponseBody
//         };

//         errorResponse.error = e.message;

//         return res.status(500).json(errorResponse);
//     }
// };

const createUser = async (req,res)=>{
    const data = req.body;
    try{
        const user = await userService.createUser(data);

        const successResponse = {
            ...response.successResponseBody
        }

        successResponse.data= user;
        successResponse.message = "User create sucessfully";

        return res.status(200).json({
            successResponse
        })
        
    }catch(err){
        const errorResponse = {
            ...response.errorResponseBody
        }

        errorResponse.message = err.message;

        return res.status(500).json({errorResponse});
    }
}

export default { createUser };