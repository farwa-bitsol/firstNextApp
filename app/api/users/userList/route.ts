import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/dbConfig/config";

export async function GET(request: NextRequest) {
    try {
        // Fetch all users, excluding the password field
        const users = await prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
                userImage: true,
                isVerified: true,
                isAdmin: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return NextResponse.json({
            success: true,
            users
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
