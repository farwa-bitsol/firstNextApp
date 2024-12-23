import { connect } from "@/dbConfig/config";
import MediaFile from "@/models/MediaFileModel";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.formData();
        const profilePhoto = reqBody.get("profilePhoto") as string;
        const postMedia = reqBody.get("postMedia") as File;
        const userName = reqBody.get("userName") as string;
        const postTime = reqBody.get("postTime") as string;
        const title = reqBody.get("title") as string;
        const description = reqBody.get("description") as string;
        const likes = reqBody.get("likes") as string;
        const comments = reqBody.get("comments") as string;
        const shares = reqBody.get("shares") as string;

        let media = null;

        if (postMedia) {
            const bufferData = await postMedia.arrayBuffer();
            const buffer = Buffer.from(bufferData);
            const base64Data = buffer.toString("base64");
            media = new MediaFile({
                name: postMedia.name,
                data: base64Data,
                contentType: postMedia.type,
            });
        }

        const newPost = new Post({
            profilePhoto,
            postMedia: media,
            userName,
            title,
            description,
            likes: +likes,
            comments: +comments,
            shares: +shares,
            postTime,
        });

        const savedPost = await newPost.save();
        console.log("This is our new saved post:", savedPost);

        return NextResponse.json({
            message: "Post created successfully.",
            success: true,
            savedPost,
        });
    } catch (error: any) {
        console.error("Error in POST request:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
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
