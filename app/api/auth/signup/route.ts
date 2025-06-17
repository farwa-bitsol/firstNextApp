import { NextResponse } from 'next/server';
import { prisma } from '@/dbConfig/config';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/lib/mailer';

export async function POST(req: Request) {
    try {
        const { email, password, fullName } = await req.json();

        // Validate input
        if (!email || !password || !fullName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with hashed password
        const user = await prisma.user.create({
            data: {
                email,
                fullName,
                password: hashedPassword,
                isVerified: false,
            },
        });

        // Send verification email
        try {
            await sendVerificationEmail(email);
        } catch (emailError) {
            // If email sending fails, delete the user and return error
            await prisma.user.delete({
                where: { id: user.id }
            });
            console.error('Failed to send verification email:', emailError);
            return NextResponse.json(
                { error: 'Failed to send verification email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'User created successfully. Please check your email for verification.' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error in signup:', error);
        return NextResponse.json(
            { error: 'Error creating user' },
            { status: 500 }
        );
    }
} 