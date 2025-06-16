import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await prisma.user.findUnique({
            where: { id: userId },
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
            message: "User found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}