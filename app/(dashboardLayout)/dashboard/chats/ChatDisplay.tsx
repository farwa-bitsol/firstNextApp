"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chat } from "./Sidebar";

interface ChatDisplayProps {
  chatId: string | null;
}

const fetchChats = async (): Promise<Chat[]> => {
  try {
    const response = await axios.get("/api/chats");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch chats");
  }
};

const generateRandomId = () => Math.random().toString(36).substr(2, 9);

const sendMessage = async ({
  chatId,
  message,
}: {
  chatId: string;
  message: string;
}): Promise<void> => {
  try {
    // Fetch the current chat data before updating the message list
    const chatResponse = await axios.get(`/api/chats/${chatId}`);

    const chatData = chatResponse.data;

    const updatedMessages = [
      ...chatData.messages, // Existing messages
      {
        id: generateRandomId(),
        sender: "me", // Hardcoded sender for now
        text: message,
      },
    ];

    // Send the updated messages list back to the server
    await axios.patch(`/api/chats/${chatId}`, {
      messages: updatedMessages,
    });
  } catch (error) {
    throw new Error("Failed to send message");
  }
};

const ChatDisplay = ({ chatId }: ChatDisplayProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    // Fetch chats on component mount
    const getChats = async () => {
      try {
        setLoadingMessages(true);
        const chatData = await fetchChats();
        setChats(chatData);
        setLoadingMessages(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    getChats();
  }, []);

  const filteredChat = chats?.find((chat) => chat._id === chatId);
  console.log(">>>chat", chatId);
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chatId) return;
    try {
      await sendMessage({ chatId, message: newMessage });
      setNewMessage(""); // Clear the input box after sending
      // Refetch the chats to get updated messages (or alternatively, you can update the chat state locally)
      const updatedChats = await fetchChats();
      setChats(updatedChats);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loadingMessages) return <div>Loading...</div>;

  if (!chats || !chats?.length)
    return (
      <div className="bg-white flex items-center justify-center h-screen">
        No Messages right now
      </div>
    );

  if (!filteredChat)
    return (
      <div className="bg-white flex items-center justify-center h-screen">
        Select a chat to view messages
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-white relative">
      {/* Chat messages */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-semibold mb-4">{filteredChat.name}</h2>
        <div className="flex flex-col gap-4 h-full md:h-[500px] md:overflow-auto md:pr-6 md:pb-8">
          {filteredChat.messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-2">
              <div
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === "me"
                      ? "bg-blue-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  <span className="block">{msg.text}</span>
                  <span className="block text-xs mt-1 text-gray-500">
                    {msg.sender === "me" ? "You" : msg.sender}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed send message box */}
      <div className="md:sticky md:bottom-20 md:left-0 md:right-0 bg-white p-4 border-t flex items-center">
        <input
          type="text"
          className="flex-grow border rounded-lg px-4 py-2"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDisplay;
