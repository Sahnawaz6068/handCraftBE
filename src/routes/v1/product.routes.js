import express from "express";

import controller from "../../controller/product.controllers.js";
import auth from "../../middleware/auth.js";
import restrictTo from "../../middleware/role.js";

const router = express.Router();

//api/v1/product/
router.get("/:id", controller.getProductById);
router.get("/", controller.getProducts); // pagination query
router.get("/", controller.getAllProduct); //

//This is done by the vendor (Autorized by the vendor)
router.post("/", auth, restrictTo("vendor"), controller.createProduct);
router.delete("/:id", auth, restrictTo("vendor"), controller.deleteProductById);
router.patch("/:id", auth, restrictTo("vendor"), controller.updateProductById);

export default router;
