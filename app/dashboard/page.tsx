import React from "react";
import UserStories from "./UserStories";
import Profile from "./Profile";
import Contatcs from "./Contatcs";
import AddFriends from "./AddFriends";
import Contributors from "./Contributers";
import WhatsOnYourMind from "./WhatsOnYourMid";

const page = () => {
  return (
    <div className="flex gap-4 my-8 justify-center">
      <div className="hidden lg:flex w-1/6 flex-col h-auto space-y-4">
        <div className="max-h-44 lg:flex justify-center items-center bg-white rounded-lg ml-1">
          <Profile />
        </div>
        <div className="h-fit bg-white rounded-lg ml-1 py-6">
          <AddFriends />
        </div>
        <div className="h-[110px] bg-white rounded-lg ml-1 py-6">
          <Contributors />
        </div>
      </div>

      <div className="w-fit md:px-0 sm:pl-28 sm:pr-6">
        <UserStories />
        <WhatsOnYourMind />
      </div>

      <div className="hidden h-fit lg:flex flex-col w-1/5 bg-white p-4 rounded-lg mr-1">
        <Contatcs />
      </div>
    </div>
  );
};

export default page;
