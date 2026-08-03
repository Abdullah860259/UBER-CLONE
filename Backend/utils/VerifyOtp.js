module.exports.verifyOtp = async (candidate, otp) => {
    if (!otp) {
        throw new Error('Invalid OTP')
    }

    if (otp !== candidate.otp) {
        throw new Error('Invalid OTP')
    }

    if (Date.now() > candidate.expiry) {
        throw new Error('OTP is expired')
    }
    candidate.otp = null;
    candidate.expiry = null;
    candidate.isVerified = true;
    await candidate.save();
}