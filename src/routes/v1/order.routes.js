import express from "express";
import auth from "../../middleware/auth.js";
import restrictTo from "../../middleware/role.js";
import orderController from "../../controller/order.controller.js";

const router = express.Router();

// Customer → Buy Product
router.post(
  "/buy-now",
  auth,
  restrictTo("customer"),
  orderController.buyNow
);


// Customer → Get All Orders
router.get(
  "/",
  auth,
  restrictTo("customer"),
  orderController.getAllOrders
);

// Vendor → Get only their SubOrders
router.get(
  "/vendor/:vendorId",
  auth,
 
  orderController.getVendorSubOrders
);

export default router;