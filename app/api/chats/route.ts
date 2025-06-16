import { connect } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { ChatModel } from '@/models/chatModel';
import { NextRequest, NextResponse } from "next/server";

connect();

const defaultMessage = {
    "id": "1",
    "name": "Alice",
    "lastMessage": "Hey, are you free this weekend?",
    "messages": [
        {
            "id": "1",
            "sender": "Alice",
            "text": "Hey, are you free this weekend?"
        },
    ]
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, lastMessage, messages, userId } = reqBody;

        // Check if a chat already exists for the user
        const existingChat = await ChatModel.findFirst({ where: { userId } });
        if (existingChat) {
            return NextResponse.json({
                message: "Chat already exists.",
                success: true,
                existingChat,
            });
        }

        // Create a new chat if it doesn't exist
        const savedPost = await ChatModel.create({
            data: {
                name,
                lastMessage,
                messages,
                userId,
            }
        });

        console.log("This is our newChat", savedPost);

        return NextResponse.json({
            message: "Chat created successfully.",
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
        const chats = await ChatModel.findMany();

        // If no chats are found, return an empty array (cannot create default chat without a valid userId)
        if (!chats || chats.length === 0) {
            console.warn("No chats found and cannot create default chat without a valid userId.");
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(chats);

    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch chats" }, { status: 500 });
    }
}



