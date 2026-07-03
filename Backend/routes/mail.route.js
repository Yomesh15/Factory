import express from "express";
import { resendOtp, sendTestMail, verifyOtpAndCreateUser } from "../controllers/mail.controller.js";

const router = express.Router();

router.post("/mail", sendTestMail);
router.post("/verify-mail", verifyOtpAndCreateUser);
router.post("/resend-otp", resendOtp);


export default router;