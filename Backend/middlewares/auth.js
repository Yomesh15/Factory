import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import BlackList from "../models/blacklisttoken.model.js";
import CaptainModel from "../models/captain.model.js";

export const auth = async (req, res, next) => {
    try {
        const token =
            req.cookies.userToken ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isBlacklisted = await BlackList.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};



export const authCaptain = async (req, res, next) => {
    try { 
        const token =
            req.cookies.captainToken ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
 
        const isBlacklisted = await BlackList.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
        const captain = await CaptainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({
                message: "Captain not found"
            });
        }
 
        req.captain = captain;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};