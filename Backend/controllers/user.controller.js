const userModal = require('../modals/user.modal');
const { validationResult } = require('express-validator')
const userService = require('../services/user.services')
const blackListTokenModal = require('../modals/blacklisted')
const sendOTPEmail = require('../services/otp.services').sendOTPEmail;

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
        delete user.password; // Remove password from the response
        delete user.__v; // Remove __v from the response

        sendOTPEmail(email, user); // Send OTP email to the user

        res.status(201).json({ token, user })

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

    res.status(200).json({ token, user });
}

module.exports.profile = async (req, res, next) => {
    const user = req.user;
    return res.status(200).json({ user });
}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    const blacklistedToken = await blackListTokenModal.create({ token: token });
    res.status(200).json({ message: "logout successfully" });
}