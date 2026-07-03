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

async function signin(req, res) {
  try {
    if(!req.body.identifier ||!req.body.password ){
      throw new Error("Enter your details");
    }

    const result = await userService.signIn(req.body);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    });

    const successResponse = {
      ...responsebody.successResponseBody,
    };

    successResponse.data = {
      user: result.user,
      accessToken: result.accessToken,
    };

    successResponse.message = "User signed in successfully";

    return res.status(StatusCodes.OK).json({
      successResponse,
    });
  } catch (error) {
    const errorResponse = {
      ...responsebody.errorResponseBody,
    };

    errorResponse.message = error.message;

    return res.status(StatusCodes.BAD_REQUEST).json({
      errorResponse,
    });
  }
}
export default {
  signUp,
  getUserDetails,
  signin
};
