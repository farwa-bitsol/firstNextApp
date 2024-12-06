"use client";

import { notifications } from "@/components/dashboard/DashboardNav";
import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="pt-0 md:pt-12">
      <p className="text-center text-2xl font-bold py-12 hidden md:block">
        Notifications
      </p>
      <div className="m-auto bg-white w-full md:w-[70%] flex flex-col justify-center">
        {notifications?.map((notification) => (
          <div
            key={notification.id}
            className="flex gap-3 items-start p-4 border-b last:border-none hover:text-[#1565D8] "
          >
            <Image
              src={notification.profileImage}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{notification.title}</p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
