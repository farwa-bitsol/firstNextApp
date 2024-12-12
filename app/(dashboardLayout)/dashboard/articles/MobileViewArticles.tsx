"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Article } from "./page";
const articles: Article[] = [
  {
    id: 1,
    title: "Understanding React Hooks",
    author: "John Doe",
    time: "7 min read",
    image: "/images/bg.jpeg",
  },
  {
    id: 2,
    title: "Getting Started with Tailwind CSS",
    author: "Jane Smith",
    time: "5 min read",
    image: "/images/bg.jpeg",
  },
  {
    id: 3,
    title: "Building a Fullstack App with Next.js",
    author: "Mike Johnson",
    time: "10 min read",
    image: "/images/bg.jpeg",
  },
];

const MobileViewArticles = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter articles based on the search term
  const filteredArticles: Article[] = useMemo(
    () =>
      (articles as Article[]).filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  return (
    <div className="flex flex-col bg-white p-4 md:hidden h-screen">
      {/* Search Bar */}
      <div className="p-2 bg-[#EEF4FD]  ml-3 rounded-full">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-[transparent] focus:outline-none"
        />
      </div>

      {/* Article List */}
      {filteredArticles.map((article: Article) => (
        <div
          className="flex   p-4 border-b justify-between items-center"
          key={article.id}
        >
          <div className="flex gap-4 items-center">
            <Image
              src={article.image}
              alt={article.title}
              className="rounded-full max-w-[30px] max-h-[30px]"
              width={50}
              height={50}
            />
            <div className="mt-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {article.title}
              </h2>
              <p className="text-gray-500 text-sm">By {article.author}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm">
              <span className="text-gray-500 font-medium text-sm">
                Est Time:{" "}
              </span>
              {article.time}
            </p>
          </div>
        </div>
      ))}

      {/* No Articles Found Message */}
      {filteredArticles.length === 0 && (
        <p className="text-gray-500 text-center mt-4">
          No articles found matching your search.
        </p>
      )}
    </div>
  );
};

export default MobileViewArticles;
