import { StatusCodes } from "http-status-codes";
import orderService from "../services/order.service.js";
import responsebody from "../utils/responsebody.js";

import Order from "../Model/order.model.js";

// BUY NOW
async function buyNow(req, res) {
  try {
    const { productId, quantity, shippingAddress } = req.body;

    if (!productId || quantity === undefined || !shippingAddress) {
      throw new Error(
        "productId, quantity, and shippingAddress are required"
      );
    }

    const result = await orderService.buyNow(
      req.user.id,
      {
        productId,
        quantity,
      },
      shippingAddress
    );

    const successResponse = {
      ...responsebody.successResponseBody,
    };

    successResponse.data = result;
    successResponse.message = "Order created successfully";

    return res.status(StatusCodes.CREATED).json({
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

async function getAllOrders(req, res) {
  try {
    const userId = req.user.id;

    const orders = await Order.find({
      userId,
    })
      .populate("subOrders")
      .sort({ createdAt: -1 });

    const successResponse = {
      ...responsebody.successResponseBody,
    };

    successResponse.data = orders;
    successResponse.message = "Orders fetched successfully";

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


// GET ALL SUBORDERS OF VENDOR
async function getVendorSubOrders(req, res) {
  try {
    const { vendorId } = req.params;

    if (!vendorId) {
      throw new Error("vendorId is required");
    }

    const result = await orderService.getVendorSubOrders(vendorId);

    const successResponse = {
      ...responsebody.successResponseBody,
    };

    successResponse.data = result;
    successResponse.message = "Vendor SubOrders fetched successfully";

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
  buyNow,
  getVendorSubOrders,
  getAllOrders
};