"use client";

import { useUser } from "@/Context/UserContextProvider";
import { SkeletonUserInfo } from "../skeltons/UserInfo";
import Link from "next/link";
import Image from "next/image";
import { Routes } from "@/models/constants";

const SettingsUserInfo = () => {
  const { user, isLoading, userImageUrl } = useUser();
  if (isLoading) return <SkeletonUserInfo />;

  return (
    <div className="flex items-center mx-auto space-x-4 mt-4 w-full pl-2">
      <Link href={Routes.dashboard}>
        <Image
          width={55}
          height={55}
          className="h-55 w-55 rounded-lg object-cover"
          src={userImageUrl}
          alt="Logo"
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
