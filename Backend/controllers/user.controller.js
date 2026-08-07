const userModal = require('../modals/user.modal');
const { validationResult } = require('express-validator')
const userService = require('../services/user.services')
const blackListTokenModal = require('../modals/blacklisted')
const sendOTPEmail = require('../services/otp.services').sendOTPEmail;
const { verifyOtp: verifyOtpService } = require('../utils/VerifyOtp');

module.exports.registerUser = (async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const existingUser = await userModal.findOne({ email });
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        if (existingUser && !existingUser.isVerified) {
            await userModal.deleteOne({ email }); // Delete the unverified user to allow re-registration
        }

        const hashedPassword = await userModal.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        })


        const token = user.generateAuthToken();

        sendOTPEmail(email, user); // Send OTP email to the user

        const { otp, expiry, __v, ...safeUser } = user.toObject();
        delete safeUser.password;

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000
        })

        res.status(201).json({ token, user: safeUser })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModal.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).send("Invalid email or password")
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).send("Invalid email or password")
    }

    const token = user.generateAuthToken()

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000
    })

    let userObj = user.toObject();
    delete userObj.password

    res.status(200).json({ token, userObj });
}

module.exports.profile = async (req, res, next) => {
    const user = req.user;
    return res.status(200).json({ user });
}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: "Unauthorized" });
    }
    const blacklistedToken = await blackListTokenModal.create({ token: token });
    res.clearCookie('token');

    res.status(200).json({ message: "logout successfully" });
}

module.exports.verifyOtp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = req.user;
        const { otp } = req.body;

        await verifyOtpService(user, otp);

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}