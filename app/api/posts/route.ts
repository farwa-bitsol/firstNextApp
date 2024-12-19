import { connect } from "@/dbConfig/config";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { profilePhoto, userName, postTime, title, description, postPhoto, likes, comments, shares } = reqBody;

        const newPost = new Post({
            profilePhoto,
            userName,
            title,
            description,
            postPhoto,
            likes,
            comments,
            shares,
            postTime
        });

        const savedPost = await newPost.save();
        console.log('This is our new saved post:', savedPost);

        return NextResponse.json({
            message: "Post created successfully.",
            success: true,
            savedPost
        });

    } catch (error: any) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const posts = await Post.find().sort({ postTime: -1 });

        if (!posts) {
            return NextResponse.json({ message: "No posts found" }, { status: 404 });
        }

        return NextResponse.json(posts);

    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch posts" }, { status: 500 });
    }
}
