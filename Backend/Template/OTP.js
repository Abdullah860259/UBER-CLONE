module.exports.OtpTemplate = (otp) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 0;">

                <table width="400px" cellpadding="0" cellspacing="0" 
                    style="background:white; border-radius:10px; padding:30px;">

                    <tr>
                        <td align="center">
                            <h2 style="color:#333;">
                                Verify Your Email
                            </h2>

                            <p style="color:#666; font-size:15px;">
                                Use the OTP below to verify your account.
                                This code will expire in 10 minutes.
                            </p>

                            <div style="
                                margin:25px 0;
                                padding:15px;
                                background:#f1f5ff;
                                border-radius:8px;
                                font-size:32px;
                                font-weight:bold;
                                letter-spacing:8px;
                                color:#2563eb;
                            ">
                                ${otp}
                            </div>

                            <p style="color:#777; font-size:14px;">
                                If you didn't request this code, you can safely ignore this email.
                            </p>

                            <hr style="border:none; border-top:1px solid #eee;">

                            <p style="font-size:12px; color:#999;">
                                © 2026 Hafiz Abdullah Anwar. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>`;
}