import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/dbConfig/config";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password, fullName } = reqBody;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

              
        const hashedPassword = await bcrypt.hash(password, 10);     
        // Create new user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                isVerified: true,
                createdAt: true,
                password: true // Temporarily include password in response for debugging
            }
        });

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: newUser.id });

        return NextResponse.json({
            message: "User created successfully. Please verify your email.",
            success: true,
            user: newUser // Only sending non-sensitive data
        });
    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}