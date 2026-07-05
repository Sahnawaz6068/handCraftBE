import { StatusCodes } from "http-status-codes";
import responsebody from "../utils/responsebody.js";
import cartService from "../services/cart.service.js";

async function getCart(req, res) {
  try {

    const cart = await cartService.getOrCreateCart(req.user.id);

    const successResponse = {
      ...responsebody.successResponseBody,
    };
    successResponse.data = cart;
    successResponse.message = "Cart fetched successfully";

    res.status(StatusCodes.OK).json({
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

async function addItem(req, res) {
  try {
    const cart = await cartService.addItem(req.user.id, req.body);

    const successResponse = {
      ...responsebody.successResponseBody,
    };
    successResponse.data = cart;
    successResponse.message = "Item added to cart successfully";

    res.status(StatusCodes.OK).json({
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

async function updateItem(req, res) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await cartService.updateItemQuantity(req.user.id, productId, quantity);

    const successResponse = {
      ...responsebody.successResponseBody,
    };
    successResponse.data = cart;
    successResponse.message = "Cart item updated successfully";

    res.status(StatusCodes.OK).json({
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

async function removeItem(req, res) {
  try {
    const { productId } = req.params;

    const cart = await cartService.removeItem(req.user.id, productId);

    const successResponse = {
      ...responsebody.successResponseBody,
    };
    successResponse.data = cart;
    successResponse.message = "Item removed from cart successfully";

    res.status(StatusCodes.OK).json({
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

async function clearCart(req, res) {
  try {
    const cart = await cartService.clearCart(req.user.id);

    const successResponse = {
      ...responsebody.successResponseBody,
    };
    successResponse.data = cart;
    successResponse.message = "Cart cleared successfully";

    res.status(StatusCodes.OK).json({
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

export default { getCart, addItem, updateItem, removeItem, clearCart };