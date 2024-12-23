import { connect } from "@/dbConfig/config";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
        }

        // Attempt to delete the chat by ID
        const deletePost = await Post.findByIdAndDelete(id);

        if (!deletePost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Post deleted successfully",
            deletePost,
        });
    } catch (error: any) {
        console.error("Error in DELETE request:", error);
        return NextResponse.json({ error: error.message || "Failed to delete post" }, { status: 500 });
    }
}
