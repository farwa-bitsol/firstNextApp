"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatDisplay from "./ChatDisplay";

const Page = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 h-auto md:h-full">
        <Sidebar onSelectChat={setSelectedChatId} />
      </div>
      {/* Chat Display */}
      <div className="w-full md:h-full flex-grow overflow-auto">
        <ChatDisplay chatId={selectedChatId} />
      </div>
    </div>
  );
};

export default Page;
