"use client";

import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import Image from "next/image";
import { Routes } from "@/models/constants";

const SettingsUserInfo = () => {
  const { user, isLoading, userImageUrl } = useUser();
  
  if (isLoading) {
    return (
      <div className="flex items-center mx-auto space-x-4 mt-4 w-full pl-2">
        <div className="h-[55px] w-[55px] rounded-lg bg-gray-200 animate-pulse" />
        <div className="flex flex-col w-full">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center mx-auto space-x-4 mt-4 w-full pl-2">
      <Link href={Routes.dashboard}>
        <Image
          width={55}
          height={55}
          className="h-55 w-55 rounded-lg object-cover"
          src={userImageUrl || '/default-avatar.png'}
          alt="User profile"
        />
      </Link>
      <div className="flex flex-col w-full">
        <div>
          <p className="font-bold">{user?.fullName ?? 'Test User'}</p>
          <p className="text-sm text-[#62618F]">{user?.email ?? 'Test@gmail.com'}</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsUserInfo;
