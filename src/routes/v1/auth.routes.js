//Signup // --> req.body -->check the user with the email (Verify the otp)or phone(verify the otp) if no exist process, pass -> Hash Store user detail
//Signin -->req.body --> Pass compair --> if true token create
//logout --> Loout button that logout the user and delete the token from the db (if not able to delete then store on redis and block the req that come from that token)
//Delete Their Account  (Verify email or phone no for update process OTP)
// Update their Account (Verify email or phone number for update process OTP)

import express from "express";
import authController from "../../controller/auth.controller.js";

const router = express.Router();

router.post("/signUp", authController.signUp);
router.get("/:id", authController.getUserDetails);

export default router;
