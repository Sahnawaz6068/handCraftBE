import express from "express";
import restrictTo from "../../middleware/role.js";
import auth from "../../middleware/auth.js";
import cartController from "../../controller/cart.controller.js";

const router = express.Router();

router.use(auth, restrictTo("customer"));

router.get("/", cartController.getCart);
router.post("/items", cartController.addItem);
router.patch("/items/:productId", cartController.updateItem);
router.delete("/items/:productId", cartController.removeItem);
router.delete("/", cartController.clearCart);

export default router; 