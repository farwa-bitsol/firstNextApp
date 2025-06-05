"use client";

import Image from "next/image";
import React, { useState } from "react";
import { articles } from "./data";

interface Article {
  id: number;
  title: string;
  author: string;
  time: string;
  image: string;
}

const MobileViewArticles = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredArticles = (articles as unknown as Article[]).filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:hidden p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <p className="text-center text-gray-500">No articles found</p>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
                width={300}
                height={200}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {article.title}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  By {article.author} | {article.time}
                </p>
                <button className="mt-4 w-full border py-2 px-4 rounded transition">
                  Read
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MobileViewArticles;
