import User from "../models/formDataModel.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Please provide both username and password",
            });
        }

        let user = await User.findOne({ username });

        if (user) {
            return res.status(401).json({
                message: "User with this username already exists",
            });
        }

        user = await User.create({
            username,
            password,
        });

        return sendToken(res, user, "Account registered and logged in successfully.", 200);

    } catch (error) {
        console.error("Registration error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error during registration",
            error: error.message,
        });
    }
};

export const login = async (req, res, next) => {
    try {
        const { username, password, remember } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Please provide both username and password",
            });
        }

        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return res.status(401).json({
                message: "Incorrect Username or Password",
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect Username or Password",
            });
        }

        sendToken(res, user, "Login successful", 200, remember);
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error during login",
            error: error.message,
        });
    }
};

export const getMyProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({ message: "Session Expired, Login again!" });
        }

        const member = await User.findById(userId);

        if (!member) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            member,
        });
    } catch (error) {
        console.error("Get profile error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const logout = async (req, res, next) => {
    try {
        res
            .status(200)
            .clearCookie("token", {
                httpOnly: true,
                secure: false,
                sameSite: "none",
            })
            .json({
                success: true,
                message: "Logged out successfully",
            });
    } catch (error) {
        console.error("Logout error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};