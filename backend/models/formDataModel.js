import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

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