// order.controller.js
import { StatusCodes } from "http-status-codes";
import orderService from "../services/order.service.js";
import responsebody from "../utils/responsebody.js";

async function buyNow(req, res) {
  try {
    const { productId, quantity, shippingAddress } = req.body;

    if (!productId || !quantity || !shippingAddress) {
      throw new Error("productId, quantity, and shippingAddress are required");
    }

    const result = await orderService.buyNow(req.user.id, { productId, quantity }, shippingAddress);

    const successResponse = { ...responsebody.successResponseBody };
    successResponse.data = result;
    successResponse.message = "Order prepared, proceed to payment";

    res.status(StatusCodes.CREATED).json({ successResponse });
  } catch (error) {
    const errorResponse = { ...responsebody.errorResponseBody };
    errorResponse.message = error.message;

    res.status(StatusCodes.BAD_REQUEST).json({ errorResponse });
  }
}

export default { buyNow };