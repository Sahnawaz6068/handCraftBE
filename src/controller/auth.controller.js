import { StatusCodes } from "http-status-codes";
import userService from "../services/auth.services.js";
import responsebody from "../utils/responsebody.js";

async function signUp(req, res) {
  try {
    const user = await userService.registerUser(req.body);

    const successResponse = {
      ...responsebody.successResponseBody,
    };
    successResponse.data = user;
    successResponse.message = "User Register sucessfully";

    res.status(StatusCodes.CREATED).json({
      successResponse,
    }); 
  } catch (error) {
    const errorResponse = {
      ...responsebody.errorResponseBody,
    };

    errorResponse.message = error.message;

    res.status(StatusCodes.BAD_REQUEST).json({
      errorResponse,
    });
  }
}

async function getUserDetails(req, res) {
  try {
    const userDetail = await userService.getUserDetail(req.params.id);
    const successResponse = {
      ...responsebody.successResponseBody,
    };
    successResponse.data = userDetail;
    successResponse.message = "User Detail";

    res.status(StatusCodes.CREATED).json({
      successResponse,
    });
  } catch (error) {
    const errorResponse = {
      ...responsebody.errorResponseBody,
    };

    errorResponse.message = error.message;

    res.status(StatusCodes.BAD_REQUEST).json({
      errorResponse,
    });
  }
}

export default {
    signUp,
    getUserDetails
}
