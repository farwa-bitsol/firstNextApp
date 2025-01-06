"use client";

import useFetchUser from "@/hooks/useFetchUser";
import { SkeletonUserInfo } from "../skeltons/UserInfo";

const SettingsUserInfo = () => {
  const { user, isLoading } = useFetchUser();

  if (isLoading) return <SkeletonUserInfo />;

  return (
    <div>
      <p className="font-bold">{user?.fullName}</p>
      <p className="text-sm text-[#62618F]">{user?.email}</p>
    </div>
  );
};

export default SettingsUserInfo;
