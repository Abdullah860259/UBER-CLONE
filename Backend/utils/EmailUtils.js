const getTransporter = require('./EmailTransporter').getTransporter;

let transporter = getTransporter();


module.exports.sendEmail = async (to, subject, html) => {
    try {
        transporter.sendMail({
            from: "abdullah860259@gmail.com",
            to: to,
            subject: subject,
            html: html,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
    return true;
};
