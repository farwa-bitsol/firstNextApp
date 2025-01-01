"use client";

import useFetchUser from "@/hooks/useFetchUser";

const SettingsUserInfo = () => {
  const { user, isLoading } = useFetchUser();
  if (isLoading) return <p>Loading...</p>;
  return (
    <p className="lg:pr-28">
      <p className="font-bold">{user?.fullName}</p>
      <p className="text-sm color-[#62618F]">{user?.email}</p>
    </p>
  );
};

export default SettingsUserInfo;
