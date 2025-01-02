"use client";
import Image from "next/image";
import React, { useState } from "react";

const users = [
  {
    name: "Guy",
    cover: "/images/dummyCover.jpg",
    profile: "/images/dummyProfile.png",
  },
  {
    name: "John",
    cover: "/images/dummyCover.jpg",
    profile: "/images/dummyProfile.png",
  },
  {
    name: "Steve",
    cover: "/images/dummyCover.jpg",
    profile: "/images/dummyProfile.png",
  },
];

const UserStories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyContent, setStoryContent] = useState<{
    text: string;
    image: string | null;
  }>({ text: "", image: null });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setStoryContent({
        ...storyContent,
        image: URL.createObjectURL(files[0]),
      });
    }
  };

  const handleTextChange = (e: { target: { value: any } }) => {
    setStoryContent({ ...storyContent, text: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Story Submitted:", storyContent);
    // Reset modal state and close
    setStoryContent({ text: "", image: null });
    closeModal();
  };

  return (
    <div>
      <div className="flex space-x-4 w-full overflow-x-auto justify-center overflow-y-hidden">
        <div className="relative w-[80px] h-[140px] sm:w-[160px] sm:h-[250px] shadow-lg">
          <div
            className="w-full h-[75%] flex items-center justify-center rounded-tl-lg rounded-tr-lg"
            style={{
              backgroundImage: `url(/images/profile.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <button
            className="absolute left-1/2 top-[75%] transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-2 h-2 transform scale-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          <div className="w-full h-[25%] bg-white flex items-center justify-center  text-xs lg:text-sm font-semibold text-gray-700 rounded-bl-lg rounded-br-lg">
            Create Story
          </div>
        </div>

        {users.map((user, index) => (
          <div
            className="relative w-[80px] h-[140px] sm:w-[160px] sm:h-[250px] rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${user.cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            key={`${user.name}-${index}`}
          >
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-white">
              {user.name}
            </div>

            <div className="absolute top-2 left-2 w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full border-2 border-white overflow-hidden">
              <Image
                src={user.profile}
                width={60}
                height={60}
                alt="User Profile"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Create Your Story</h2>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Write something..."
              value={storyContent.text}
              onChange={handleTextChange}
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            {storyContent.image && (
              <Image
                src={storyContent.image}
                alt="Preview"
                width={32}
                height={32}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStories;
