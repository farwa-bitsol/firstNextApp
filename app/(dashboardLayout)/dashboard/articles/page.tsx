import Image from "next/image";
import React from "react";
import MobileViewArticles from "./MobileViewArticles";

export interface Article {
  id: number;
  title: string;
  author: string;
  time: string;
  image: string;
}

const Page = () => {
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
  return (
    <React.Fragment>
      <div className="hidden md:flex flex-wrap gap-6 p-8">
        {(articles as Article[]).map((article: Article) => (
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

      <MobileViewArticles />
    </React.Fragment>
  );
};

export default Page;
