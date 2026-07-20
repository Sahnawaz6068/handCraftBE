import express from "express";
import restrictTo from "../../middleware/role.js";
import auth from "../../middleware/auth.js";
import cartController from "../../controller/cart.controller.js";

const router = express.Router();

router.use(auth, restrictTo("customer"));

router.get("/",auth,restrictTo('customer'), cartController.getCart);
router.post("/items",auth,restrictTo('customer'), cartController.addItem);
router.patch("/items/:productId",auth,restrictTo('customer'), cartController.updateItem);
router.delete("/items/:productId",auth,restrictTo('customer'), cartController.removeItem);
router.delete("/",auth,restrictTo('customer'), cartController.clearCart);

export default router; 