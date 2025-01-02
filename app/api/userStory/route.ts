import { connect } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserStory from "@/models/userStory";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.formData();
        const coverImage = reqBody.get("coverImage") as string;
        const storyText = reqBody.get("text") as string;
        const storyImage = reqBody.get("image") as File;

        let imageData = null;

        if (storyImage) {
            const bufferData = await storyImage.arrayBuffer();
            const buffer = Buffer.from(bufferData);
            const base64Data = buffer.toString("base64");
            imageData = `data:${storyImage.type};base64,${base64Data}`;
        }

        const newStory = {
            userId,
            coverImage,
            story: {
                text: storyText,
                image: imageData,
            },
        };

        const createdStory = await UserStory.create(newStory);

        return NextResponse.json({
            message: "Story created successfully.",
            success: true,
            story: createdStory,
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

        // Fetch all stories for the user
        const userStories = await UserStory.find({ userId })
            .sort({ createdAt: -1 })
            .populate("userId", "fullName email");

        return NextResponse.json({
            success: true,
            stories: userStories,
        });
    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch stories" },
            { status: 500 }
        );
    }
}
