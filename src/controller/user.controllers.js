import response from "../utils/responsebody.js";
import userService from "../services/user.service.js";
import { StatusCodes } from "http-status-codes";

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

const createUser = async (req, res) => {
  const data = req.body;
  try {
    const user = await userService.createUser(data);

    const successResponse = {
      ...response.successResponseBody,
    };

    successResponse.data = user;
    successResponse.message = "User create sucessfully";

    return res.status(200).json({
      successResponse,
    });
  } catch (err) {
    const errorResponse = {
      ...response.errorResponseBody,
    };

    errorResponse.message = err.message;

    return res.status(500).json({ errorResponse });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser =  await userService.alluser();

    return res.status(200).json({
        allUser
    })
  } catch (err) {
    const errorResponse = {
      ...response.errorResponseBody,
    };

    errorResponse.message = err.message;

    return res.status(500).json({ errorResponse });
  }
};

const getUser  = async (req, res)=> {
  try {
    const user =  await userService.getUser(req.params.id);

    const successResponse  =  {
      ...response.successResponseBody
    }
    successResponse.data = user;
    successResponse.message =  `This is the user details for the userId ${req.params.id}`

    res.status(StatusCodes.OK).json({
      successResponse
    })
  } catch (error) {
    const errorResponse = {
      ...response.errorResponseBody
    }

    errorResponse.message = error.message;

    res.status(StatusCodes.BAD_REQUEST).json({
      errorResponse
    })
  }
}

export default { createUser,getAllUser,getUser };
