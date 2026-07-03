import BlackList from "../models/blacklisttoken.model.js";
import UserModel from "../models/user.model.js";
import transporter from "../config/mail.js";
import { validationResult } from "express-validator";

// register
export const RegisterUser = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        
        const { fullname, email, password } = req.body;

        const exists = await UserModel.findOne({ email });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);


        await transporter.sendMail({
            from: `"Factory" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email - Factory",
            html: `<h1>Your OTP: ${otp}</h1>`
        });

        global.tempUsers = global.tempUsers || {};

        global.tempUsers[email] = {
            fullname,
            email,
            password: await UserModel.hashPassword(password),
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        };

        return res.status(200).json({
            success: true,
            message: "OTP sent to email"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// login 
export const LoginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not Exist"
        });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid Credentials"
        });
    }

    const token = user.generateAuthToken();

    res.cookie('userToken', token)

    return res.status(200).json({
        success: true,
        token,
        user
    });
};


// profile
export const UserProfile = async (req, res) => {
    try {
        return res.status(201).json(req.user)
    } catch (error) {
        return res.status(400).json({ success: false })
    }
}


export const LogoutUser = async (req, res) => {
    res.clearCookie('userToken')
    const token = req.cookies.userToken || req.headers.authorization?.split(' ')[1]

    await BlackList.create({ token })

    res.status(201).json({ message: "Logged Out" })
}