export const sendToken = (res, user, message, statusCode = 200, expire) => {
    const token = user.getJWTToken();

    let options;
    if (expire) {
        options = {
            expires: new Date(Date.now() + 10 * 360 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        };
    }
    else {
        options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax", 
        };
    }

    const userProfile = {
        _id: user._id,
        username: user.username,
        role: user.role,
        wellnessGoals: user.wellnessGoals,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message,
        token, 
        user: userProfile, 
    });
};