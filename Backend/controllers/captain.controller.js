import CaptainModel from "../models/captain.model.js"
import { validationResult } from "express-validator"
import BlackList from "../models/blacklisttoken.model.js";
import transporter from "../config/mail.js";


export const RegisterCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const {
            fullname,
            email,
            password,
            vehicle
        } = req.body;

        const exists = await CaptainModel.findOne({ email });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Captain already exists"
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);

        await transporter.sendMail({
            from: `"Factory" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email - Factory Captain",
            html: `
                <div style="font-family:Arial;padding:20px">
                    <h2>Welcome Captain 🚖</h2>

                    <p>Your OTP for verification is:</p>

                    <h1 style="
                        background:#facc15;
                        display:inline-block;
                        padding:15px 30px;
                        border-radius:10px;
                        letter-spacing:8px;
                        color:#000;
                    ">
                        ${otp}
                    </h1>

                    <p>This OTP will expire in <b>5 minutes</b>.</p>
                </div>
            `
        });

        global.tempCaptains = global.tempCaptains || {};

        global.tempCaptains[email] = {
            fullname,
            email,
            password: await CaptainModel.hashPassword(password),
            vehicle,
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


export const LoginCaptain = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
        return res.status(400).json({ message: "User not Exist", success: false })
    }

    const isMatch = await captain.comparePassword(password)
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials", success: false })
    }


    const token = captain.generateAuthToken()

    res.cookie('captainToken', token)

    return res.status(200).json({ success: true, token, captain })
}


export const CaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain })
}


export const LogoutCaptain = async (req, res) => {
    res.clearCookie('captainToken')
    const token = req.cookies.captainToken || req.headers.authorization?.split(' ')[1]

    await BlackList.create({ token })

    res.status(201).json({ message: "Logged Out" })
}



export const verifyCaptainOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const tempCaptain = global.tempCaptains?.[email];

        if (!tempCaptain) {
            return res.status(400).json({
                success: false,
                message: "OTP expired or request invalid"
            });
        }

        if (Date.now() > tempCaptain.expiresAt) {
            delete global.tempCaptains[email];

            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        if (String(tempCaptain.otp) !== String(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        const captain = await CaptainModel.create({
            fullname: tempCaptain.fullname,
            email: tempCaptain.email,
            password: tempCaptain.password,
            vehicle: tempCaptain.vehicle
        });

        delete global.tempCaptains[email];

        return res.status(201).json({
            success: true,
            message: "Captain registered successfully",
            captain
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const resendCaptainOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const tempCaptain = global.tempCaptains?.[email];

        if (!tempCaptain) {
            return res.status(400).json({
                success: false,
                message: "Registration session expired. Please register again."
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);

        tempCaptain.otp = otp;
        tempCaptain.expiresAt = Date.now() + 5 * 60 * 1000;

        await transporter.sendMail({
            from: `"Factory" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Factory Captain - New Verification OTP",
            html: `
                <div style="font-family:Arial;padding:20px">
                    <h2>Factory Captain 🚖</h2>

                    <p>Your new verification OTP is:</p>

                    <h1 style="
                        background:#facc15;
                        display:inline-block;
                        padding:15px 30px;
                        border-radius:10px;
                        letter-spacing:8px;
                        color:#000;
                    ">
                        ${otp}
                    </h1>

                    <p>This OTP will expire in <b>5 minutes</b>.</p>

                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `
        });

        return res.status(200).json({
            success: true,
            message: "New OTP sent successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};