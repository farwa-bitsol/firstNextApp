import { connect } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { UserStoryModel } from '@/models/userStory';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/dbConfig/config";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, coverImage, story } = reqBody;

        // Create a new user story
        const createdStory = await prisma.userStory.create({
            data: {
                userId,
                coverImage,
                story: {
                    create: story.map((s: { text: string; image: string | null }) => ({
                        text: s.text,
                        image: s.image
                    }))
                }
            },
            include: {
                story: true
            }
        });

        return NextResponse.json({
            message: "Story created successfully.",
            success: true,
            createdStory
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
        // Fetch all user stories
        const userStories = await prisma.userStory.findMany({
            include: {
                story: true
            }
        });
        return NextResponse.json({
            success: true,
            userStories
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
