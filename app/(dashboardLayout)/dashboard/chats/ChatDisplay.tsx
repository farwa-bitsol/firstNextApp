"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Chat } from "./Sidebar";

interface ChatDisplayProps {
  chatId: string | null;
}

const fetchChats = async (): Promise<Chat[]> => {
  const response = await fetch("http://localhost:3000/chats", {
    cache: "no-store", // Ensures fresh data fetch each time
  });
  if (!response.ok) {
    throw new Error("Failed to fetch chats");
  }
  return response.json();
};

const generateRandomId = () => Math.random().toString(36).substr(2, 9);

const sendMessage = async ({
  chatId,
  message,
}: {
  chatId: string;
  message: string;
}): Promise<void> => {
  // Fetch the current chat data before updating the message list
  const chatResponse = await fetch(`http://localhost:3000/chats/${chatId}`);
  if (!chatResponse.ok) {
    throw new Error("Failed to fetch chat data");
  }

  const chatData = await chatResponse.json();

  const updatedMessages = [
    ...chatData.messages, // Existing messages
    {
      id: generateRandomId(),
      sender: "me", // Hardcoded sender for now
      text: message,
    },
  ];

  // Send the updated messages list back to the server
  const response = await fetch(`http://localhost:3000/chats/${chatId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: updatedMessages,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }
};

const ChatDisplay = ({ chatId }: ChatDisplayProps) => {
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState("");

  const { data: chats, isLoading, isError } = useQuery("chats", fetchChats);
  const mutation = useMutation(sendMessage, {
    // Optimistically update the chat messages
    onMutate: async ({ chatId, message }) => {
      await queryClient.cancelQueries("chats"); // Cancel any ongoing queries for chats

      // Snapshot the previous data
      const previousChats = queryClient.getQueryData<Chat[]>("chats");

      // Optimistically update the chat with the new message
      queryClient.setQueryData<Chat[]>("chats", (oldChats) =>
        (oldChats ?? [])?.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: (chat.messages.length + 1).toString(), // Generate a unique ID
                    sender: "me",
                    text: message,
                  },
                ],
              }
            : chat
        )
      );

      return { previousChats }; // Return the snapshot for rollback if needed
    },
    onError: (_err, _variables, context) => {
      // Rollback to the previous state
      queryClient.setQueryData("chats", context?.previousChats);
    },
    onSettled: () => {
      queryClient.invalidateQueries("chats"); // Ensure data is fresh after mutation
    },
  });

  const filteredChat = chats?.find((chat) => chat.id === chatId);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !chatId) return;
    mutation.mutate({ chatId, message: newMessage });
    setNewMessage(""); // Clear the input box after sending
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching chats</div>;

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
