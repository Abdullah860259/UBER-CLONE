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
    transporter.verify().then(() => {
        console.log("Server is ready to take our messages");
    }).catch((error) => {
        console.error("Error verifying transporter:", error);
    });
    return transporter;
}
