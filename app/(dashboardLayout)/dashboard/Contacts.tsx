"use client";
import Overlay from "@/components/Overlay";
import UpcomingEventsSkelton from "@/components/skeletons/UpcomingEvents";
import { useUser } from "@/Context/UserContextProvider";
import useFetchUsers from "@/hooks/useFetchUsers";
import { Routes } from "@/models/constants";
import { IUser } from "@/models/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Contacts = () => {
  const router = useRouter();
  const { users, isLoading, error } = useFetchUsers();
  const [isChatLoading, setIsChatLoading] = useState(false);
  const { user, isLoading: isUserLoading } = useUser();
  const contacts = users?.reduce((acc: IUser[], current: IUser) => {
    // Check if the current user is not the logged-in user and not already in the accumulator
    if (
      current._id !== user?._id &&
      !acc.find((contact) => contact._id === current._id)
    ) {
      acc.push(current);
    }
    return acc;
  }, []);

  const handleCreateChat = async (contactName: string, userId: string) => {
    try {
      setIsChatLoading(true);
      const response = await axios.post("/api/chats", {
        name: contactName,
        lastMessage: "",
        messages: [],
        userId,
      });

      if (response.data.success) {
        // toast.success(`Chat with ${contactName} created successfully!`);
        router.push(Routes.chat);
      } else {
        console.error("Error creating chat:", response.data.error);
        toast.error("Failed to create chat.");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("An error occurred while creating the chat.");
    } finally {
      setIsChatLoading(false);
    }
  };

  if (isLoading || isUserLoading) {
    return <UpcomingEventsSkelton />;
  }
  if (error || !users) {
    return <p>Failed to load event User. Please try again later.</p>;
  }
  return (
    <div className="w-full">
      {isChatLoading && <Overlay title="Loading Chat..." />}
      <p className="font-bold text-lg ">Contacts</p>
      <div className="flex flex-col">
        {contacts?.map((contact: IUser, index: number) => (
          <div
            className="flex py-4 justify-between items-center flex-wrap"
            key={`${contact.fullName}-${index}`}
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
                <p className="text-sm font-bold">{contact.fullName}</p>
                {/* <p className="text-sm">{contact.location}</p> */}
              </div>
            </div>
            <div>
              <button
                onClick={() =>
                  handleCreateChat(contact.fullName, contact?._id ?? "")
                }
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