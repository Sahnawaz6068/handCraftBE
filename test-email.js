import "dotenv/config";
import { sendEmailOtp } from "./src/utils/notify.js";

sendEmailOtp("sahnawaz643786@gmail.com", "123456")
  .then(() => console.log("Email sent successfully"))
  .catch((err) => console.error("Failed:", err.message));