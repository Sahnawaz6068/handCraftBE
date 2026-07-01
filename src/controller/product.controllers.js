import { StatusCodes } from "http-status-codes";
import productService from "../services/product.service.js";
import responsebody from "../utils/responsebody.js";

async function createProduct(req, res, next) {
  try {
    const respons = await productService.createProducts(req.body);
    const successResponse = {
      ...responsebody.successResponseBody,
    };

    successResponse.data = respons;
    successResponse.message = "Product created successfully";
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

async function getProductById(req, res) {
  try {
    const products = await productService.productById(req.params.id);
    const successResponse = {
      ...responsebody.successResponseBody,
    };

    successResponse.data = products;
    successResponse.message = `Product detail for the product is ${req.params.id}`;

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

async function getAllProduct(req, res) {
  try {
    const products = await productService.getAllProduct();

    const successResponse = {
      ...responsebody.successResponseBody,
    };

    successResponse.data = products;
    successResponse.message = "There is all product";

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

async function deleteProductById(req, res) {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    const successResponse = {
      ...responsebody.successResponseBody,
    };

    successResponse.data = deletedProduct;
    successResponse.message = "Product is deleted";

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

async function updateProductById(req, res) {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body,
    );

    const successResponse = {
      ...responsebody.successResponseBody,
    };

    successResponse.data = updatedProduct;
    successResponse.message = "Product is updated sucessfully";

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

export default {
  createProduct,
  getProductById,
  getAllProduct,
  deleteProductById,
  updateProductById,
};

//sucess respons
// error response
//App error
