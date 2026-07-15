// order.routes.js
import express from "express";
import auth from "../../middleware/auth.js";
import restrictTo from "../../middleware/role.js";
import orderController from "../../controller/order.controller.js";

const router = express.Router();

router.post("/buy-now", auth, restrictTo("customer"), orderController.buyNow);

export default router;