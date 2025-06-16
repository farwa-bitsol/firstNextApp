import nodemailer from "nodemailer";
import { prisma } from "@/dbConfig/config";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: { email: string; emailType: string; userId: string }) => {
    try {
        // Create hashed token
        const hashedToken = crypto.randomBytes(32).toString("hex");

        if (emailType === "VERIFY") {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
        } else if (emailType === "RESET") {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
        }

        // Ensure environment variables are available
        if (!process.env.MAILTRAP_USER || !process.env.MAILTRAP_PASS) {
            throw new Error("Mailtrap credentials are not configured");
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            },
            secure: false,
            tls: {
                rejectUnauthorized: false
            }
        });

        // Use environment DOMAIN or fallback to localhost
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const verificationLink = `${baseUrl}/user/verifyemail?token=${hashedToken}`;
        
        const mailOptions = {
            from: '"Your App" <noreply@yourapp.com>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${verificationLink}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${verificationLink}
            </p>`
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        console.error("Email sending error:", error);
        throw new Error(error.message);
    }
};