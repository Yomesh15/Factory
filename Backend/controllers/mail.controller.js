import transporter from "../config/mail.js";
import UserModel from "../models/user.model.js";


export const sendTestMail = async (req, res) => {

    try {
        const { fullname, email, password } = req.body;


        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);

        console.log("EMAIL:", email);
        console.log("OTP:", otp);

        const hashedPassword = await UserModel.hashPassword(password);

        // store temporary user in memory
        global.tempUsers = global.tempUsers || {};

        global.tempUsers[email] = {
            fullname,
            email,
            password: hashedPassword,
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        };

        await transporter.sendMail({
            from: `"Factory" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email - Factory",
            html: `
<div style="font-family:Arial;padding:20px">
    <h2>Welcome to Factory 🚖</h2>
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

    <p>This OTP will expire in 5 minutes.</p>
</div>
`
        });

        return res.status(200).json({
            success: true,
            message: "OTP sent to email"
        });

    } catch (error) {
        console.error("MAIL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




export const verifyOtpAndCreateUser = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const tempUser = global.tempUsers?.[email];

        if (!tempUser) {
            return res.status(400).json({
                success: false,
                message: "OTP expired or request invalid"
            });
        }

        // check expiry
        if (Date.now() > tempUser.expiresAt) {
            delete global.tempUsers[email];

            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        // check OTP (safe compare)
        if (String(tempUser.otp) !== String(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        const user = await UserModel.create({
            fullname: tempUser.fullname,
            email: tempUser.email,
            password: tempUser.password
        });

        // delete temp data
        delete global.tempUsers[email];

        return res.status(201).json({
            success: true,
            message: "Email verified & user created successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const tempUser = global.tempUsers?.[email];

        if (!tempUser) {
            return res.status(400).json({
                success: false,
                message: "Signup session expired. Please register again."
            });
        }

        // Generate new OTP
        const otp = Math.floor(1000 + Math.random() * 9000);

        // Update OTP and expiry
        tempUser.otp = otp;
        tempUser.expiresAt = Date.now() + 5 * 60 * 1000;

        console.log("RESEND OTP:", otp);

        await transporter.sendMail({
            from: `"Factory" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your New Verification OTP - Factory",
            html: `
            <div style="font-family:Arial;padding:20px">
                <h2>Factory 🚖</h2>

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

                <p>If you didn't request this, you can ignore this email.</p>
            </div>
            `
        });

        return res.status(200).json({
            success: true,
            message: "New OTP sent successfully."
        });

    } catch (error) {
        console.error("RESEND OTP ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};