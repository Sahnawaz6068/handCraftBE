
import { StatusCodes } from "http-status-codes";
import adminService from "../services/admin.service.js";
import responsebody from "../utils/responsebody.js";

async function getPendingVendors(req, res) {
  try {
    const pendingVendors = await adminService.getPendingVendors();

    const successResponse = { ...responsebody.successResponseBody };
    successResponse.data = pendingVendors;
    successResponse.message = "Pending vendor applications fetched successfully";

    res.status(StatusCodes.OK).json({ successResponse });
  } catch (error) {
    const errorResponse = { ...responsebody.errorResponseBody };
    errorResponse.message = error.message;

    res.status(StatusCodes.BAD_REQUEST).json({ errorResponse });
  }
}

async function approveVendor(req, res) {
  try {
    const { vendorId } = req.params;

    const user = await adminService.approveVendor(vendorId);

    const successResponse = { ...responsebody.successResponseBody };
    successResponse.data = user;
    successResponse.message = "Vendor approved successfully";

    res.status(StatusCodes.OK).json({ successResponse });
  } catch (error) {
    const errorResponse = { ...responsebody.errorResponseBody };
    errorResponse.message = error.message;

    res.status(StatusCodes.BAD_REQUEST).json({ errorResponse });
  }
}

export default { getPendingVendors, approveVendor };