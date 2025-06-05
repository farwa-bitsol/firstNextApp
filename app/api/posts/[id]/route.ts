
import { connect } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postModel";
import { PostProps } from "@/models/types";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = await getDataFromToken(request);
        const { id } = params;

        if (!userId || !id) {
            return NextResponse.json({ message: "User ID and Post ID are required" }, { status: 400 });
        }

        // Find the user's document
        const userPostDoc = await Post.findOne({ userId });

        if (!userPostDoc) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Find the post index
        const postIndex = userPostDoc.posts.findIndex((post: PostProps) => post._id.toString() === id);

        if (postIndex === -1) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // Remove the post from the array
        userPostDoc.posts.splice(postIndex, 1);
        await userPostDoc.save();

        return NextResponse.json({
            message: "Post deleted successfully",
            posts: userPostDoc.posts,
        });
    } catch (error: any) {
        console.error("Error in DELETE request:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete post" },
            { status: 500 }
        );
    }
}
