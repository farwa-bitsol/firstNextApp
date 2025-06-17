import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from '@/helpers/mailer';

const prismaClient = new PrismaClient();

export async function POST(request: Request) {
  try {  

    const { email, password, fullName } = await request.json();

    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
      },
    });

    // Send verification email
    try {
      await sendEmail({ email, emailType: "VERIFY", userId: user.id });
    } catch (emailError) {
      // If email sending fails, delete the user and return error
      await prismaClient.user.delete({
        where: { id: user.id }
      });
      console.error('Failed to send verification email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "User created successfully. Please check your email for verification.", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error creating user" },
      { status: 500 }
    );
  }
} 