import React from "react";
import UserStories from "./UserStories";
import Profile from "./Profile";

const page = () => {
  return (
    <div className="grid grid-cols-12 gap-2 my-8">
      <div className="hidden lg:flex col-span-12 lg:col-span-3 justify-center bg-white rounded-lg ml-8">
        <Profile />
      </div>

      <div className="col-span-12 lg:col-span-6">
        <div className="w-full  flex justify-center">
          <UserStories />
        </div>
      </div>

      <div className="hidden lg:flex col-span-12 lg:col-span-3 justify-center">
        Contacts
      </div>
    </div>
  );
};

export default page;
