import { connect, prisma } from "@/dbConfig/config";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = params;

        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        // Find and verify the user performing the action
        const requestingUser = await prisma.user.findUnique({
            where: { id: userId }
        });
        
        if (!requestingUser) {
            return NextResponse.json(
                { message: "Requesting user not found" },
                { status: 404 }
            );
        }

        // Find and delete the target user
        const targetUser = await prisma.user.delete({
            where: { id: userId }
        });

        if (!targetUser) {
            return NextResponse.json(
                { message: "user not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error: any) {
        console.error("Error in DELETE request:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete user" },
            { status: 500 }
        );
    }
}
