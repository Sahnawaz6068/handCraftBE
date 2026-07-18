import { StatusCodes } from "http-status-codes";
import otpService from "../services/otp.service.js";
import responsebody from "../utils/responsebody.js";

async function sendOtp(req, res) {
  try {
    const { identifier } = req.body;
    if (!identifier) throw new Error("identifier is required");

    const result = await otpService.sendEmailVerificationOtp(identifier);

    const successResponse = { ...responsebody.successResponseBody };
    successResponse.data = result;
    successResponse.message = result.message;

    res.status(StatusCodes.OK).json({ successResponse });
  } catch (error) {
    const errorResponse = { ...responsebody.errorResponseBody };
    errorResponse.message = error.message;
    res.status(StatusCodes.BAD_REQUEST).json({ errorResponse });
  }
}

async function verifyOtp(req, res) {
  try {
    const { identifier, otp } = req.body;
    if (!identifier || !otp) throw new Error("identifier and otp are required");

    const result = await otpService.verifyEmailOtp(identifier, otp);

    const successResponse = { ...responsebody.successResponseBody };
    successResponse.data = result;
    successResponse.message = result.message;

    res.status(StatusCodes.OK).json({ successResponse });
  } catch (error) {
    const errorResponse = { ...responsebody.errorResponseBody };
    errorResponse.message = error.message;
    res.status(StatusCodes.BAD_REQUEST).json({ errorResponse });
  }
}

export default { sendOtp, verifyOtp };