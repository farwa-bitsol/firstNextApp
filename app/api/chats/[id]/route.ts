import { connect } from "@/dbConfig/config";
import { ChatModel } from '@/models/chatModel';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ message: "Chat ID is required" }, { status: 400 });
        }

        const chat = await ChatModel.findUnique({ where: { id } });

        if (!chat) {
            return NextResponse.json({ message: "Chat not found" }, { status: 404 });
        }

        return NextResponse.json(chat);
    } catch (error: any) {
        console.error("Error in GET by ID request:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch chat by ID" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ message: "Chat ID is required" }, { status: 400 });
        }

        const reqBody = await request.json();
        const updatedChat = await ChatModel.update({ where: { id }, data: reqBody });

        if (!updatedChat) {
            return NextResponse.json({ message: "Chat not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Chat updated successfully",
            chat: updatedChat,
        });
    } catch (error: any) {
        console.error("Error in PATCH request:", error);
        return NextResponse.json({ error: error.message || "Failed to update chat" }, { status: 500 });
    }
}
