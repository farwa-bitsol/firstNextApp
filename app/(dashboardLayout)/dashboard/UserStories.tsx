"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserStories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyContent, setStoryContent] = useState<{
    text: string;
    image: File | null;
  }>({ text: "", image: null });
  const [stories, setStories] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchStories = async () => {
    try {
      const response = await axios.get("/api/userStory");
      setStories(response?.data?.stories ?? []);
    } catch (error: any) {
      console.error("Error fetching stories:", error.message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setStoryContent({ ...storyContent, image: files[0] });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStoryContent({ ...storyContent, text: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("text", storyContent.text);
    if (storyContent.image) {
      formData.append("image", storyContent.image);
    }

    try {
      await axios.post("/api/userStory", formData);
      fetchStories(); // Refresh stories after submission
      setStoryContent({ text: "", image: null });
      closeModal();
    } catch (error: any) {
      console.error("Error posting story:", error.message);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

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

          <div className="w-full h-[25%] bg-white flex items-center justify-center text-xs lg:text-sm font-semibold text-gray-700 rounded-bl-lg rounded-br-lg">
            Create Story
          </div>
        </div>

        <div className="flex overflow-x-auto space-x-4 pb-4">
          {stories?.map((data: any, index: number) => (
            <div
              className="relative w-[160px] h-[250px] rounded-lg overflow-hidden shadow-lg"
              key={index}
              style={{
                backgroundImage: `url(${data.story.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: data.story.image ? "transparent" : "#f3f4f6",
              }}
            >
              {/* Centering the text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sm text-black">
                <div className="text-center">{data.story?.text}</div>
                <div className="absolute bottom-6 left-4 transform -translate-x-1/2 text-sm text-black">
                  {data?.userId?.fullName}
                </div>
              </div>
            </div>
          ))}
        </div>
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
