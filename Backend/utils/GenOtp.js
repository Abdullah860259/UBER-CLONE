module.exports.generateOTP = () => {
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000)); // 30 minutes from now
    const otp = Math.floor(100000 + Math.random() * 900000);
    return { otp: otp.toString(), expiry };
}