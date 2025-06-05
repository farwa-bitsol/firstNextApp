import Image from "next/image";
import React from "react";

const jobs = [
  {
    id: 1,
    image: "/images/job.svg",
    title: "Software Engineer",
    company: "Tech Corp",
    location: "New York, NY",
    salary: "$45/hour",
  },
  {
    id: 2,
    image: "/images/job.svg",
    title: "Product Manager",
    company: "Product Co.",
    location: "San Francisco, CA",
    salary: "$50/hour",
  },
  {
    id: 3,
    image: "/images/job.svg",
    title: "UX Designer",
    company: "Creative Solutions",
    location: "Remote",
    salary: "$40/hour",
  },
];

const Page = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto px-8 md:w-1/2 py-8 h-screen">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Find jobs the easy way
        </h1>
        <h2 className="text-xl text-center text-gray-600 mt-2 mb-6">
          Broaden your job search with curated collections
        </h2>
        <div className="flex flex-col space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-start p-4 rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex-shrink-0">
                <Image
                  src={job.image}
                  alt={job.title}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {job.location} | {job.salary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
