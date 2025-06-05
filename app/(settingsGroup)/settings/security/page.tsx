import React from "react";
import SecurityForm from "./SecurityForm";
import EmailAddress from "./EmailAddress";
import PostCount from "./PostCount";
import DeleteAccount from "./DeleteAccount";

const page = () => {
  return (
    <div className="flex flex-col justify-start pt-24 md:pt-10 px-10">
      <p className="text-2xl font-bold">Security</p>

      {/*  email address field */}
      <div className="mt-6">
        <p className="text-lg font-bold">Email Address</p>
        <div className="flex flex-wrap justify-between gap-2 items-center border-b border-[#EFEFFF] w-fit py-4 mt-2">
          <EmailAddress />
          <button type="button" className="text-[#1565D8]">
            Change
          </button>
        </div>
      </div>

      <div className="border-b border-[#EFEFFF] w-fit py-8">
        <p className="text-lg font-bold">Password</p>
        <SecurityForm />
      </div>

      <div className="md:w-1/2 my-8">
        <p className="text-lg font-bold">Delete account</p>
        <PostCount />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default page;
