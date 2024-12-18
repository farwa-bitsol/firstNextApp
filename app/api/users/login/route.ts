import { connect } from "@/dbConfig/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();


        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!user.isVerified) {
            // Send verification email
            await sendEmail({ email, emailType: "VERIFY", userId: user._id });
            return NextResponse.json(
                { error: "Please verify your email before logging in." },
                { status: 400 }
            );
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.TOKEN_SECRET || "",
            { expiresIn: "1d" }
        );

        // Set cookie with JWT
        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
