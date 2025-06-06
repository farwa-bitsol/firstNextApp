import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const resetPassHtml = `<p>You requested to reset your password. Please use the link below to set a new password:</p>
                   <a href="${process.env.NEXTAUTH_URL}/user/resetPassword?token=${hashedToken}">Reset Password</a> or copy and paste the link below in your browser. <br> ${process.env.NEXTAUTH_URL}/user/verifyemail?token=${hashedToken}
            </p><p>If you didn't request this, please ignore this email.</p>`

        const verifyEmailHtml = `<p>Click <a href="${process.env.NEXTAUTH_URL}/user/verifyemail?token=${hashedToken}">here</a> to verify your email
            or copy and paste the link below in your browser. <br> ${process.env.NEXTAUTH_URL}/user/verifyemail?token=${hashedToken}
            </p>`

        const mailOptions = {
            from: 'farwa@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === 'VERIFY' ? verifyEmailHtml : resetPassHtml
        }

        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}