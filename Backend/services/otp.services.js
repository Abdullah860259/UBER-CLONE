const OtpGenerator = require('../utils/GenOtp');
const sendEmail = require('../utils/EmailUtils').sendEmail;
const OtpTemplate = require('../Template/OTP').OtpTemplate;

module.exports.sendOTPEmail = async (email, user) => {
    if (!email) {
        throw new Error("Email is required to send OTP");
    }
    if (!user) {
        throw new Error("User is required to send OTP");
    }
    
    const { otp, expiry } = OtpGenerator.generateOTP();

    const subject = "Your OTP Code";
    const html = OtpTemplate(otp);
    const result = sendEmail(email, subject, html);

    user.otp = otp;
    user.expiry = expiry;
    user.isVerified = false;
    
    await user.save();

    delete user.otp; // Remove OTP from the response
    delete user.expiry; // Remove expiry from the response
    
    
    if (!result) {
        throw new Error("Failed to send OTP email");
    }
    return { otp, expiry };
}
