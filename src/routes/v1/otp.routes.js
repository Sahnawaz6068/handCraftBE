import express from "express";
import otpController from "../../controller/otp.controller.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

router.post("/send",auth, otpController.sendOtp);
router.post("/verify",auth, otpController.verifyOtp);

export default router;