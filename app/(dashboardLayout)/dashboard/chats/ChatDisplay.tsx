"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
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

const ChatDisplay = ({ chatId }: ChatDisplayProps) => {
  const { data: chats, isLoading, isError } = useQuery("postData", fetchChats);

  const filteredChat = chats?.find((chat) => chat.id === chatId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching chats</div>;

  if (!filteredChat)
    return (
      <div className="bg-white flex items-center justify-center h-screen">
        Select a chat to view messages
      </div>
    );

  return (
    <div className="flex p-20 bg-white flex-col h-screen">
      <h2 className="text-2xl font-semibold mb-4">{filteredChat.name}</h2>
      <div className="flex flex-col gap-4">
        {filteredChat.messages.map((msg, index) => {
          return (
            <div key={msg.id} className="flex flex-col gap-2">
              {/* Sender's message */}
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
          );
        })}
      </div>
    </div>
  );
};

export default ChatDisplay;
