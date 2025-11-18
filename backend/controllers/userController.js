import User from "../models/formDataModel.js";
import { sendToken } from "../utils/sendToken.js";
import { createDefaultWellnessGoals } from "../constants/wellnessDefaults.js";

export const register = async (req, res, next) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Please provide both username and password",
            });
        }

        const normalizedRole = ['doctor', 'patient'].includes((role || '').toLowerCase())
            ? role.toLowerCase()
            : 'patient';

        let user = await User.findOne({ username });

        if (user) {
            return res.status(401).json({
                message: "User with this username already exists",
            });
        }

        user = await User.create({
            username,
            password,
            role: normalizedRole,
            wellnessGoals: createDefaultWellnessGoals(),
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

export const getWellnessGoals = async (req, res) => {
    try {
        if (!req.user.wellnessGoals) {
            req.user.wellnessGoals = createDefaultWellnessGoals();
            await req.user.save();
        }

        res.status(200).json({
            success: true,
            wellnessGoals: req.user.wellnessGoals,
        });
    } catch (error) {
        console.error("Get wellness goals error:", error.message);
        res.status(500).json({
            message: "Failed to fetch wellness goals",
            error: error.message,
        });
    }
};

export const updateWellnessGoals = async (req, res) => {
    try {
        const { goalKey, values } = req.body;

        if (!goalKey || typeof values !== 'object') {
            return res.status(400).json({ message: "Invalid payload" });
        }

        const allowedKeys = ['steps', 'activeMinutes', 'sleep'];
        if (!allowedKeys.includes(goalKey)) {
            return res.status(400).json({ message: "Unsupported goal key" });
        }

        if (!req.user.wellnessGoals) {
            req.user.wellnessGoals = createDefaultWellnessGoals();
        }

        req.user.wellnessGoals = {
            ...req.user.wellnessGoals,
            [goalKey]: {
                ...req.user.wellnessGoals[goalKey],
                ...values,
            },
        };

        await req.user.save();

        res.status(200).json({
            success: true,
            wellnessGoals: req.user.wellnessGoals,
        });
    } catch (error) {
        console.error("Update wellness goals error:", error.message);
        res.status(500).json({
            message: "Failed to update wellness goals",
            error: error.message,
        });
    }
};

export const addCustomWellnessGoal = async (req, res) => {
    try {
        const { title, description, current, target, unit, color } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Goal title is required." });
        }

        if (!req.user.wellnessGoals) {
            req.user.wellnessGoals = createDefaultWellnessGoals();
        }

        const customGoal = {
            title,
            description: description || '',
            current: Number(current) || 0,
            target: Number(target) || 0,
            unit: unit || '',
            color: color || 'teal',
        };

        req.user.wellnessGoals.customGoals =
            Array.isArray(req.user.wellnessGoals.customGoals)
                ? [...req.user.wellnessGoals.customGoals, customGoal]
                : [customGoal];

        await req.user.save();

        res.status(201).json({
            success: true,
            wellnessGoals: req.user.wellnessGoals,
        });
    } catch (error) {
        console.error("Add custom wellness goal error:", error.message);
        res.status(500).json({
            message: "Failed to add custom wellness goal",
            error: error.message,
        });
    }
};