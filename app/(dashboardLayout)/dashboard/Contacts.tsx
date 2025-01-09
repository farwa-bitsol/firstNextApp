"use client";
import React from "react";
import Image from "next/image";
import useFetchAllPosts from "@/hooks/useFetchAllPosts";
import { PostProps } from "@/models/types";
import UpcomingEventsSkelton from "@/components/skeltons/UpcomingEvents";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Routes } from "@/models/constants";

const Contacts = () => {
  const router = useRouter();
  const { posts, isLoading, error } = useFetchAllPosts();

  const contacts = posts?.reduce((acc: PostProps[], current) => {
    // Check if the userName already exists in the accumulator
    if (!acc.find((event) => event.userName === current.userName)) {
      acc.push(current);
    }
    return acc;
  }, []);

  const handleCreateChat = async (contactName: string) => {
    try {
      const response = await axios.post("/api/chats", {
        name: contactName,
        lastMessage: "",
        messages: [],
      });

      if (response.data.success) {
        toast.success(`Chat with ${contactName} created successfully!`);
        router.push(Routes.chat);
      } else {
        console.error("Error creating chat:", response.data.error);
        toast.error("Failed to create chat.");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("An error occurred while creating the chat.");
    }
  };

  if (isLoading) {
    return <UpcomingEventsSkelton />;
  }
  if (error || !posts) {
    return <p>Failed to load event User. Please try again later.</p>;
  }
  return (
    <div className="w-full">
      <p className="font-bold text-lg ">Contacts</p>
      <div className="flex flex-col">
        {contacts?.map((contact, index) => (
          <div
            className="flex py-4 justify-between items-center flex-wrap"
            key={`${contact.userName}-${index}`}
          >
            <div className="flex items-center">
              <Image
                src="/images/profile.png"
                width={50}
                height={50}
                alt="User Profile"
                className="rounded-full"
              />
              <div className="flex flex-col px-2">
                <p className="text-sm font-bold">{contact.userName}</p>
                {/* <p className="text-sm">{contact.location}</p> */}
              </div>
            </div>
            <div>
              <button
                onClick={() => handleCreateChat(contact.userName)}
                className="flex items-center"
              >
                <Image
                  src="/images/message.svg"
                  width={30}
                  height={30}
                  alt="message icon"
                />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="bg-[#1565D8] text-white px-6 py-3 rounded-xl"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default Contacts;
