import Image from "next/image";
import React from "react";
import MobileViewArticles from "./MobileViewArticles";
import { articles } from "./data";

type Article = {
  id: number;
  title: string;
  author: string;
  time: string;
  image: string;
};

const Page = () => {
  return (
    <React.Fragment>
      <div className="hidden md:flex flex-wrap gap-6 p-8">
        {articles.map((article: Article) => (
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
