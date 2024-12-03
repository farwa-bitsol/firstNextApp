"use client";

import React from "react";

const AddButton = () => {
  return (
    <button
      className="absolute left-1/2 top-[98%] transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={() => {}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-2 h-2 transform scale-150"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
};

export default AddButton;
