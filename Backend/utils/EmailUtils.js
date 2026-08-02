const getTransporter = require('./EmailTransporter').getTransporter;

let transporter = getTransporter();


module.exports.sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: "abdullah860259@gmail.com",
            to: to,
            subject: subject,
            text: text
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
