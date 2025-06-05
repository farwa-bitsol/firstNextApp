import { connect } from "@/dbConfig/config";
import { postOperations } from "@/dbConfig/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

// Define PostType as a string union type instead of importing from @prisma/client
type PostType = "event" | "article" | "normal";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.formData();
        
        // Validate required fields
        const requiredFields = ['userName', 'postTime'];
        for (const field of requiredFields) {
            if (!reqBody.get(field)) {
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        const profilePhoto = reqBody.get("profilePhoto") as string;
        const postMedia = reqBody.get("postMedia") as File;
        const userName = reqBody.get("userName") as string;
        const postTime = reqBody.get("postTime") as string;
        const title = reqBody.get("title") as string;
        const description = reqBody.get("description") as string;
        const likes = reqBody.get("likes") as string;
        const comments = reqBody.get("comments") as string;
        const shares = reqBody.get("shares") as string;
        const postType = (reqBody.get("postType") as string) || 'normal';

        let media = null;

        if (postMedia) {
            // Validate file size (5MB limit)
            if (postMedia.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    { error: "File size too large. Maximum size is 5MB" },
                    { status: 400 }
                );
            }

            const bufferData = await postMedia.arrayBuffer();
            const buffer = Buffer.from(bufferData);
            const base64Data = buffer.toString("base64");
            media = {
                name: postMedia.name,
                data: base64Data,
                contentType: postMedia.type,
            };
        }

        const newPost = {
            userId,
            profilePhoto,
            postMedia: media,
            userName,
            title,
            description,
            likes: likes ? +likes : 0,
            comments: comments ? +comments : 0,
            shares: shares ? +shares : 0,
            postTime,
            postType: postType as PostType
        };

        const post = await postOperations.createPost(newPost);

        return NextResponse.json({
            message: "Post created successfully.",
            success: true,
            post,
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
        const posts = await postOperations.getPosts(userId);

        return NextResponse.json(posts);
    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch posts" },
            { status: 500 }
        );
    }
}
