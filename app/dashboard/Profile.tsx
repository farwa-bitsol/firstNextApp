import React from "react";
import Image from "next/image";
const Profile = () => {
  return (
    <div className=" flex items-center justify-center flex-col p-12">
      <Image
        src="/images/profile.png"
        width={80}
        height={80}
        alt="User Profile"
        className="rounded-xl"
      />
      <h1 className="pt-2 font-bold">User name</h1>
      <p className="text-[#62618F]">@userEmail</p>
    </div>
  );
};

export default Profile;
