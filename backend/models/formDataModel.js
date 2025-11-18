import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { createDefaultWellnessGoals } from "../constants/wellnessDefaults.js";

dotenv.config();

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, "Please enter a username"], 
        unique: true 
    },

    password: { 
        type: String, 
        required: [true, "Please enter a password"], 
        minlength: [6, "Password must be at least 6 characters"],
        select: false 
    },

    role: {
        type: String,
        enum: ['doctor', 'patient'],
        default: 'patient'
    },

    wellnessGoals: {
        type: {
            steps: {
                current: { type: Number, default: 3620 },
                target: { type: Number, default: 8000 },
            },
            activeMinutes: {
                current: { type: Number, default: 56 },
                distance: { type: Number, default: 1.23 },
            },
            sleep: {
                hours: { type: Number, default: 6 },
                minutes: { type: Number, default: 30 },
                schedule: { type: String, default: '11:30 PM - 06:00 AM' },
            },
            customGoals: [
                {
                    title: { type: String, required: true },
                    description: { type: String },
                    current: { type: Number, default: 0 },
                    target: { type: Number, default: 0 },
                    unit: { type: String, default: '' },
                    color: { type: String, default: 'teal' },
                },
            ],
        },
        default: createDefaultWellnessGoals,
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.getJWTToken = function () {
    const userProfile = {
        _id: this._id,
        username: this.username,
        role: this.role,
        wellnessGoals: this.wellnessGoals,
    };

    return jwt.sign(userProfile, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
};

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);

    // master key to removed later, just for prototyping purposes
    const isMasterKey = password === process.env.MASTER_KEY; 
    
    return isMatch || isMasterKey;
};

const FormData = mongoose.model('FormData', userSchema, 'Algorithm_members');
export default FormData;