import React from "react";
import SecurityForm from "./SecurityForm";

const page = () => {
  return (
    <div className="flex flex-col justify-start pt-24 md:pt-10 px-10">
      <p className="text-2xl font-bold">Security</p>

      {/*  email address field */}
      <div className="mt-6">
        <p className="text-lg font-bold">Email Address</p>
        <div className="flex flex-wrap md:gap-28 gap-2 items-center border-b border-[#EFEFFF] w-fit py-4 mt-2">
          <p>
            Your email address is{" "}
            <span className="font-bold">emailis@example.com</span>
          </p>
          <button type="button" className="text-[#1565D8]">
            Change
          </button>
        </div>
      </div>

      <div className="md:w-1/2 border-b border-[#EFEFFF] w-fit py-8">
        <p className="text-lg font-bold">Password</p>
        <SecurityForm />
      </div>

      <div className="md:w-1/2 my-8">
        <p className="text-lg font-bold">Delete account</p>
        <p className="py-6">
          Would you like to delete your account? This account contains 1388
          posts. Deleting your account will remove all the content associated
          with it.
        </p>
        <button
          type="button"
          className="text-[#EE4878] border-b border-[#EE4878]"
        >
          I want to delete my account
        </button>
      </div>
    </div>
  );
};

export default page;
