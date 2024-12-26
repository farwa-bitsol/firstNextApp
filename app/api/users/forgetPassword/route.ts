import { connect } from "@/dbConfig/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import crypto from "crypto";
import nodemailer from "nodemailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User with this email does not exist" }, { status: 404 });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 3600 * 1000; // Token valid for 1 hour

        // Update user record with reset token and expiry
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Send reset token via email
        const transporter = nodemailer.createTransport({
            service: "gmail", // or your preferred email service
            auth: {
                user: process.env.EMAIL_USERNAME, // Your email address
                pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
            },
        });

        const resetLink = `${process.env.CLIENT_URL}/resetPassword?token=${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Hi ${user.name},</p>
                   <p>You requested to reset your password. Please use the link below to set a new password:</p>
                   <a href="${resetLink}" target="_blank">Reset Password</a>
                   <p>If you didn't request this, please ignore this email.</p>`,
        });

        return NextResponse.json({
            message: "Password reset email sent successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


