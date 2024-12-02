import React from "react";
import UserStories from "./UserStories";
import Profile from "./Profile";
import AddFriends from "./AddFriends";
import Contributors from "./Contributers";
import WhatsOnYourMind from "./WhatsOnYourMid";
import Contacts from "./Contacts";
import UpComingEvents from "./UpcomingEvents";
import EventPlanner from "./EventPlanner";

const Page = () => {
  return (
    <div className="flex gap-4 py-8 justify-center">
      <div className="hidden lg:flex flex-col gap-4 w-1/5">
        <div className="bg-white h-fit px-4 py-6 items-center flex flex-col rounded-lg shadow-md">
          <Profile />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <AddFriends />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md h-[110px]">
          <Contributors />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <EventPlanner />
        </div>
      </div>

      <div className="flex-1 max-w-2xl">
        <div className="mb-4">
          <UserStories />
        </div>

        <div className="bg-white px-4 py-6 rounded-lg shadow-md mx-3 sm:mx-0">
          <WhatsOnYourMind />
        </div>
      </div>

      <div className="hidden lg:flex flex-col w-1/5 space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Contacts />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <UpComingEvents />
        </div>
      </div>
    </div>
  );
};

export default Page;
