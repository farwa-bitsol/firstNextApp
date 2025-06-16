import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/dbConfig/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!user.isVerified) {
            // Send verification email
            await sendEmail({ email, emailType: "VERIFY", userId: user.id });
            return NextResponse.json(
                { error: "Please verify your email before logging in." },
                { status: 400 }
            );
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        };

        // Create token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin,
                isVerified: user.isVerified
            }
        });

        // Set token in cookies
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400 // 1 day
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
