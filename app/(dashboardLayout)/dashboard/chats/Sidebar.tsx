import React, { useState } from "react";
import { useQuery } from "react-query";

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  messages: { id: string; sender: string; text: string }[];
}

// Define the type for the props
interface SidebarProps {
  onSelectChat: (id: string) => void;
}

const fetchChats = async (): Promise<Chat[]> => {
  const response = await fetch("http://localhost:3000/chats", {
    cache: "no-store", // Ensures fresh data fetch each time
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

const Sidebar: React.FC<SidebarProps> = ({ onSelectChat }) => {
  const [search, setSearch] = useState<string>(""); // State for search input

  const { data: chats, isLoading, isError } = useQuery("postData", fetchChats);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching posts</div>;
  // Filter chats based on the search input
  const filteredChats = chats?.filter((chat) =>
    chat?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold text-gray-800 p-2">Chats</h2>

      <div className="px-2 bg-white  m-2 rounded-full">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 bg-[transparent] focus:outline-none"
        />
      </div>
      {/* Chat List */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {filteredChats?.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            <strong>{chat.name}</strong>
            <p style={{ margin: 0, fontSize: "0.9em", color: "#555" }}>
              {chat?.lastMessage}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
