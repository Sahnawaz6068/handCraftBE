// admin.routes.js
import express from "express";
import auth from "../../middleware/auth.js";
import restrictTo from "../../middleware/role.js";
import adminController from "../../controller/admin.controller.js";

const router = express.Router();

//restrictTo("admin")
router.get(
  "/vendors/pending",
  auth,
  restrictTo("admin"),
  adminController.getPendingVendors,
);
router.patch(
  "/vendors/:vendorId/approve",
  auth,
  restrictTo("admin"),
  adminController.approveVendor,
);
router.get(
  "/vendors",
  auth,
  restrictTo("admin"),
  adminController.getAllAprovedVendors,
); //All approved vendor

export default router;
