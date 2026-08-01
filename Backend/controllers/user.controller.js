const userModal = require('../modals/user.modal');
const { validationResult } = require('express-validator')
const userService = require('../services/user.services')
const blackListTokenModal = require('../modals/blacklisted')

module.exports.registerUser = (async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await userModal.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })

    const token = user.generateAuthToken();

    res.status(201).json({ token, user })
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
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }
    const blacklistedToken = await blackListTokenModal.create({ token: token });
    res.clearCookie('token');

    res.status(200).json({ message: "logout successfully" });
}