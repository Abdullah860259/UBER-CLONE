const getTransporter = require('./EmailTransporter').getTransporter;
const verifyTransporter = require('./EmailTransporter').verifyTransporter;

let transporter = getTransporter();

if (verifyTransporter()) {
    console.log("Email transporter is ready to send emails.");
} else {
    transporter = getTransporter();
}


const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: "abdullah860259@gmail.com",
            to: "abdu860259@gmail.com",
            subject: "Test",
            text: "Hello World"
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

sendEmail()