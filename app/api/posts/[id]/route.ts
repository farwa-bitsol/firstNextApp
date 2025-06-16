import { getDataFromToken } from "@/helpers/getDataFromToken";
import { prisma } from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = await getDataFromToken(request);
        const { id } = params;

        if (!userId || !id) {
            return NextResponse.json({ message: "User ID and Post ID are required" }, { status: 400 });
        }

        // Find the post using Prisma
        const post = await prisma.post.findFirst({
            where: {
                id: id,
                userId: userId
            }
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // Delete the post using Prisma
        await prisma.post.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({
            message: "Post deleted successfully"
        });
    } catch (error: any) {
        console.error("Error in DELETE request:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete post" },
            { status: 500 }
        );
    }
}
