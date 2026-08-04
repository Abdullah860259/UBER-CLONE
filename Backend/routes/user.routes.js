const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller')
const router = express.Router();
exports.router = router;
const authMiddleware = require('../middleware/authUser.middleware');

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("firstname must be atleast of 3 characters long"),
    body('password').isLength({ min: 6 }).withMessage("Password must be atleast of 6 characters long")
], userController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
], userController.loginUser)

router.get('/profile', authMiddleware.authUser, userController.profile)
router.get('/logout', authMiddleware.authUser, userController.logoutUser)
router.get('/authenticate', authMiddleware.authUser, (req, res) => {
    res.status(200).json({ message: "User is authenticated", user: req.user });
})

router.post('/verify-otp', [
    body('otp').isLength({ min: 6 }).withMessage('Invalid Otp')
], authMiddleware.authUser, userController.verifyOtp)

module.exports = router;