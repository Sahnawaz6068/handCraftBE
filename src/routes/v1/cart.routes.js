import express from "express";
import restrictTo from "../../middleware/role.js";
// import auth from "../../middleware/auth.js";
import cartController from "../../controller/cart.controller.js";

const router = express.Router();

// router.use(auth, restrictTo("buyer")); // only buyers have carts

router.get("/cart", cartController.getCart);
router.post("/cart/items", cartController.addItem);
router.patch("/cart/items/:productId", cartController.updateItem);
router.delete("/cart/items/:productId", cartController.removeItem);
router.delete("/cart", cartController.clearCart);

export default router;