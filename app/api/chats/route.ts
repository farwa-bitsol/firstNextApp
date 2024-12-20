import { connect } from "@/dbConfig/config";
import Chat from "@/models/chatModel";
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
        const { name, lastMessage, messages } = reqBody;

        const newChat = new Chat({
            name, lastMessage, messages
        });

        const savedPost = await newChat.save();
        console.log('This is our newChat', newChat);

        return NextResponse.json({
            message: "Chat created successfully.",
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
        const chats = await Chat.find();

        // If no chats are found, create the default message
        if (!chats || chats.length === 0) {
            // Create a new chat with the defaultMessage object
            const newChat = new Chat(defaultMessage);
            await newChat.save();  // Save the new chat to MongoDB

            console.log("Default chat created:", newChat);
            return NextResponse.json([defaultMessage], { status: 200 }); // Return the default message as an array
        }

        return NextResponse.json(chats);

    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch chats" }, { status: 500 });
    }
}



