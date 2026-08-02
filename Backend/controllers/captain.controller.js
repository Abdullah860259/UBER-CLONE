const captainModel = require("../modals/captain.modal");
const captainService = require("../services/captain.services");
const { validationResult } = require("express-validator");
const blackListTokens = require("../modals/blacklisted");
const sendOTPEmail = require("../services/otp.services").sendOTPEmail;

module.exports.registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain && existingCaptain.isVerified) {
            return res.status(400).json({ message: "Captain with this email already exists" });
        }
        if (existingCaptain && !existingCaptain.isVerified) {
            await captainModel.deleteOne({ email }); // Delete the unverified captain to allow re-registration
        }
        const hashedPassword = await captainModel.hashedPassword(password);

        const newCaptain = await captainService.createCaptain({
            fullname,
            email,
            password: hashedPassword,
            vehicle: vehicle
        });

        const token = await newCaptain.generateAuthToken();
        delete newCaptain.password; // Remove password from the response
        delete newCaptain.__v; // Remove __v from the response

        sendOTPEmail(email, newCaptain); // Send OTP email to the captain
 
        res.status(201).json({
            token,
            captain: newCaptain
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await captain.generateAuthToken();

    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Set cookie for 24 hours

    res.status(200).json({
        token,
        captain
    });
}

module.exports.getCaptainProfile = async (req, res) => {
    const captain = req.captain;
    res.status(200).json({ captain });
}

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "Unauthorized" });
    }
    await blackListTokens.create({ token: token }); // Add the token to the blacklist
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
}
