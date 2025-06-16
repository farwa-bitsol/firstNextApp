import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        console.log('>>>getting all posts')
        const data = await Post.findMany({
            orderBy: {
                postTime: 'desc'
            }
        });
        return NextResponse.json(data ?? []);

    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch posts" }, { status: 500 });
    }
}
