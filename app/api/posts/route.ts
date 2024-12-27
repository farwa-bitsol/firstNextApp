import { connect } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import MediaFile from "@/models/MediaFileModel";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
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

        const newPost = {
            profilePhoto,
            postMedia: media,
            userName,
            title,
            description,
            likes: +likes,
            comments: +comments,
            shares: +shares,
            postTime,
        };

        // Check if a document for the user already exists
        let postDocument = await Post.findOne({ userId });

        if (postDocument) {
            // Append the new post to the existing posts array
            postDocument.posts.push(newPost);
            await postDocument.save();
        } else {
            // Create a new document for the user
            postDocument = new Post({
                userId,
                posts: [newPost],
            });
            await postDocument.save();
        }

        return NextResponse.json({
            message: "Post created successfully.",
            success: true,
            posts: postDocument.posts,
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
        const userId = await getDataFromToken(request);
        const data = await Post.findOne({ userId }).sort({ postTime: -1 });

        return NextResponse.json(data?.posts ?? []);

    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch posts" }, { status: 500 });
    }
}
