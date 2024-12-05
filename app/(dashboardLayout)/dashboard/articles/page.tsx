import Image from "next/image";
import React from "react";

const articles = [
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

const Page = () => {
  return (
    <div className="flex flex-wrap gap-6 p-8 ">
      {articles.map((article) => (
        <div
          key={article.id}
          className="w-[300px] bg-white rounded-2xl shadow-md overflow-hidden"
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
            <button className="mt-4 w-full  border py-2 px-4 rounded  transition">
              Read
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
