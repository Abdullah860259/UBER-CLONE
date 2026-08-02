const nodemailer = require('nodemailer');
let transporter;


module.exports.getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.NODE_MAIL,
                pass: process.env.NODE_PASSWORD,
            },
        });
    }

    return transporter;
}

module.exports.verifyTransporter = () => {
    transporter.verify((error, success) => {
        if (error) {
            console.log("Error:", error);
            return false;
        } else {
            console.log("Server is ready");
            return true;
        }
    });
};