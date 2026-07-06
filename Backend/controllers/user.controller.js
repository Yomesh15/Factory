import BlackList from "../models/blacklisttoken.model.js";
import UserModel from "../models/user.model.js";
import transporter from "../config/mail.js";
import { validationResult } from "express-validator";

// register
export const RegisterUser = async (req, res) => {
    try {
        console.log("====== Register API Called ======");

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log("❌ Validation Error:", errors.array());

            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        console.log("✅ Validation Passed");

        const { fullname, email, password } = req.body;

        console.log("📧 Email:", email);

        const exists = await UserModel.findOne({ email });

        console.log("✅ Database Checked");

        if (exists) {
            console.log("❌ User Already Exists");

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        console.log("✅ User Doesn't Exist");

        const otp = Math.floor(1000 + Math.random() * 9000);

        console.log("🔑 OTP Generated:", otp);

        console.log("📨 Sending Email...");

        try {
            await transporter.sendMail({
                from: `"Factory" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Verify Your Email - Factory",
                html: `<h1>Your OTP: ${otp}</h1>`
            });

            console.log("✅ Email Sent Successfully");
        } catch (mailError) {
            console.error("MAIL ERROR:", mailError);
            throw mailError;
        }

        console.log("✅ Email Sent Successfully");

        global.tempUsers = global.tempUsers || {};

        console.log("🔒 Hashing Password...");

        const hashedPassword = await UserModel.hashPassword(password);

        console.log("✅ Password Hashed");

        global.tempUsers[email] = {
            fullname,
            email,
            password: hashedPassword,
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        };

        console.log("✅ Temp User Saved");

        return res.status(200).json({
            success: true,
            message: "OTP sent to email"
        });

    } catch (error) {
        console.error("========== REGISTER ERROR ==========");
        console.error(error);
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
        console.error("====================================");

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