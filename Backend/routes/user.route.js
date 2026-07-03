import express from "express"
import { body } from "express-validator"
import { auth } from "../middlewares/auth.js"
import { LoginUser, LogoutUser, RegisterUser, UserProfile } from "../controllers/user.controller.js"
import { resendOtp, verifyOtpAndCreateUser } from "../controllers/mail.controller.js"

const user_router = express.Router()


user_router.post("/register", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname').isLength({ min: 2 }).withMessage("Name Must be at Least 2 Characters Long"),
    body('password').isLength({ min: 6 }).withMessage("Password Must be at Least 6 Character Long")
], RegisterUser)


user_router.post("/login", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage("Password Must be at Least 6 Character Long")
], LoginUser)


user_router.get("/profile", auth, UserProfile)

user_router.get("/logout", auth, LogoutUser)


user_router.post("/verify-otp", verifyOtpAndCreateUser);

user_router.post("/resend-otp", resendOtp);


export default user_router