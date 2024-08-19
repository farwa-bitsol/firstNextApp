"use client";

import React, { useState } from "react";
import { fetchUsers } from "@/services/userService";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = async () => {
    const updatedCurr = currentPage + 1;
    await fetchUsers(updatedCurr);
    setCurrentPage(updatedCurr);
  };

  const handlePrevious = async () => {
    if (currentPage > 1) {
      const updatedCurr = currentPage - 1;
      setCurrentPage(updatedCurr);
      await fetchUsers(updatedCurr);
    }
  };

  return (
    <div className="flex justify-between px-2 py-4">
      <button onClick={handlePrevious}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 19l-7-7 7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
           
        </svg>
      </button>

      <button onClick={handleNext}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
           
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
