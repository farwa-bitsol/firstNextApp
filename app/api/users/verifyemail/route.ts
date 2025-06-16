import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/dbConfig/config";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        // Find the user based on the provided token and ensure it's not expired
        const user = await prisma.user.findFirst({
            where: {
                verifyToken: token,
                verifyTokenExpiry: {
                    gt: new Date()
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        // Update the user's verification status
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verifyToken: null,
                verifyTokenExpiry: null
            }
        });

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}