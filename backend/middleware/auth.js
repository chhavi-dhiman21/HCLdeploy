import jwt from "jsonwebtoken";
import User from "../models/formDataModel.js";
import dotenv from 'dotenv';

dotenv.config();

export const isAuthenticatedUser = async (req, res, next) => {
    let token = req.cookies.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            message: "Not authorized. Please log in.",
        });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decodedData._id);

        if (!user) {
            return res.status(401).json({
                message: "User associated with this token no longer exists.",
            });
        }
        
        req.user = user;
        
        next();
        
    } catch (error) {
        console.error("Authentication Error:", error.message);
        let errorMessage = "Invalid or expired token. Please log in again.";

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'none',
        });
        
        return res.status(401).json({
            message: errorMessage,
        });
    }
};