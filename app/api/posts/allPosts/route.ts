import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const data = await Post.find().sort({ postTime: -1 });
        return NextResponse.json(data.map((d) => d.posts).flat() ?? []);

    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch posts" }, { status: 500 });
    }
}
