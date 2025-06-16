import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/dbConfig/config";
import bcrypt from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function PATCH(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { newPassword } = reqBody;

        // Find the user by ID
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        return NextResponse.json({
            message: "Password updated successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
