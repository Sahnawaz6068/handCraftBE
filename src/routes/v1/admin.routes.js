// admin.routes.js
import express from "express";
import auth from "../../middleware/auth.js";
import restrictTo from "../../middleware/role.js";
import adminController from "../../controller/admin.controller.js";

const router = express.Router();


//restrictTo("admin")
router.get("/vendors/pending", auth, adminController.getPendingVendors);
router.patch("/vendors/:vendorId/approve", auth, adminController.approveVendor);

export default router;