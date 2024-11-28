import React from "react";
import Image from "next/image";
const Profile = () => {
  return (
    <div className=" flex items-center justify-center flex-col">
      <Image
        src="/images/profile.png"
        width={100}
        height={100}
        alt="User Profile"
        className="rounded-lg"
      />
      <h1 className="pt-2">User name</h1>
      <p className="text-[#62618F]">@userEmail</p>
    </div>
  );
};

export default Profile;
