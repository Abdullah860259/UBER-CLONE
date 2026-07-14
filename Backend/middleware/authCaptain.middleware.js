const jwt = require('jsonwebtoken');
const captainModel = require('../modals/captain.modal');
const blackListTokens = require("../modals/blacklisted");

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blackListTokens.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.id);
        req.captain = captain;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}