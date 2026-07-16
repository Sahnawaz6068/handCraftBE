//Vendor can see the order detail or suborder detail
//Vedor can do RUD operation on the order they can not create an order
//Vendor profile edit

import { StatusCodes } from "http-status-codes";
import vendor from "../services/vendor.js";
import responsebody from "../utils/responsebody.js";

async function AllSubOrder(req,res) {
  try {
    const subOrders = await vendor.getAllSuborder();
    const sucessResponse = {
      ...responsebody.successResponseBody,
    };
    sucessResponse.data = subOrders;
    sucessResponse.success = true;
    sucessResponse.message = "All the suborder for you";

    res.status(StatusCodes.OK).json({
      sucessResponse,
    });
  } catch (err) {
    const errorResponse = {
      ...responsebody.errorResponseBody,
    };

    errorResponse.message = err.message;

    res.status(500).json({ errorResponse });
  }
}

async function updateOrderStatus(req,res) {
  try {
    const updateSuborder = await vendor.getSubOrderAndUpdate(
      req.params.id,
      req.body,
    );
    const sucessResponse = {
      ...responsebody.successResponseBody,
    };
    sucessResponse.data = updateSuborder;
    sucessResponse.success = true;
    sucessResponse.message = "updated suborder f";

    res.status(StatusCodes.OK).json({
      sucessResponse,
    });
  } catch (err) {
    const errorResponse = {
      ...responsebody.errorResponseBody,
    };

    errorResponse.message = err.message;

    res.status(500).json({ errorResponse });
  }
}

async function deleteSubOrder(req,res) {
  try {
    const deletedSubOrder = await vendor.deleteSubOrder(req.params.id);
    const sucessResponse = {
      ...responsebody.successResponseBody,
    };
    sucessResponse.data = deleteSubOrder;
    sucessResponse.success = true;
    sucessResponse.message = "Suborder deleted Sucessfull";

    res.status(StatusCodes.OK).json({
      sucessResponse,
    });

  } catch (err) {
    const errorResponse = {
      ...responsebody.errorResponseBody,
    };

    errorResponse.message = err.message;

    res.status(500).json({ errorResponse });
  }
}

export default {
  AllSubOrder,
  updateOrderStatus,
  deleteSubOrder
};
