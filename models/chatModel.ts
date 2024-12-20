import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
    {
        sender: { type: String },
        text: { type: String },
    },
);


const chatSchema = new mongoose.Schema(
    {

        name: { type: String },
        lastMessage: { type: String },
        messages: [messageSchema],
    },
    { collection: "chats" }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
