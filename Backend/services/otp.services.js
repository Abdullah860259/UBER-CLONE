const OtpGenerator = require('../utils/GenOtp');
const sendEmail = require('../utils/EmailUtils').sendEmail;
const OtpTemplate = require('../Template/OTP').OtpTemplate;

module.exports.sendOTPEmail = async (email) => {
    const { otp, expiry } = OtpGenerator.generateOTP();
    const subject = "Your OTP Code";
    const html = OtpTemplate(otp);
    const result = sendEmail(email, subject, html);
    if (!result) {
        throw new Error("Failed to send OTP email");
    }
    return { otp, expiry };
}

module.exports.sendOTPEmail("abdu860259@gmail.com");