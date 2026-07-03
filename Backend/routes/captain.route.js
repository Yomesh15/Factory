import express from "express";
import { body } from "express-validator";
import { CaptainProfile, LoginCaptain, LogoutCaptain, RegisterCaptain, resendCaptainOtp, verifyCaptainOtp } from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.js";

const captain_router = express.Router();

captain_router.post("/register", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname').isLength({ min: 2 }).withMessage('Name Must be at Least 2 Characters Long'),
    body('password').isLength({ min: 6 }).withMessage('Password Must be at Least 6 Characters Long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color Must be at Least 3 Characters Long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate Must be at Least 3 Characters Long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity Must be at Least 1'),
    body('vehicle.vehicleType')
        .isIn(['car', 'bike', 'auto'])
        .withMessage('Invalid Vehicle'),
], RegisterCaptain);


captain_router.post("/login", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage("Password Must be at Least 6 Characters Long")
], LoginCaptain)


captain_router.get("/profile", authCaptain, CaptainProfile)


captain_router.get("/logout", authCaptain, LogoutCaptain)


captain_router.post("/verify-otp", verifyCaptainOtp);

captain_router.post("/resend-otp", resendCaptainOtp);


export default captain_router;