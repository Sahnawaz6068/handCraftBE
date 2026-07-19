import { StatusCodes } from "http-status-codes";
import vendorService from "../services/vendor.service.js";
import responsebody from "../utils/responsebody.js";

async function applyForVendor(req,res) {
  try {
    const { shopName, description, logo } = req.body;
    const user = await vendorService.applyForVendor(req.user.id, {
      shopName,
      description,
      logo,
    });
    const successResponse = { ...responsebody.successResponseBody };
    successResponse.data = user;
    successResponse.message =
      "Vendor application submitted. Awaiting admin approval.";

    res.status(StatusCodes.OK).json({ successResponse });
  } catch (error) {
    const errorResponse = { ...responsebody.errorResponseBody };
    errorResponse.message = error.message;
    res.status(StatusCodes.BAD_REQUEST).json({ errorResponse });
  }
}

async function getMyProfile(req, res) {
  try {
    const user = await vendorService.getVendorProfile(req.user.id);

    const successResponse = { ...responsebody.successResponseBody };
    successResponse.data = user;
    successResponse.message = "Vendor profile fetched successfully";

    res.status(StatusCodes.OK).json({ successResponse });
  } catch (error) {
    const errorResponse = { ...responsebody.errorResponseBody };
    errorResponse.message = error.message;
    res.status(StatusCodes.BAD_REQUEST).json({ errorResponse });
  }
}


export default {
    applyForVendor,
    getMyProfile
}