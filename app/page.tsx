import React from "react";
import Link from "next/link";
import Image from "next/image";

export const AccountOption = ({
  heading,
  description,
  navigateTo,
}: {
  heading: string;
  description: string;
  navigateTo: string;
}) => {
  return (
    <Link href={navigateTo} className="account-type-container">
      <div className="px-2">
        <Image
          src={`/images/bgContainer.svg`}
          alt="container"
          width={50}
          height={50}
        />
      </div>

      <div className="px-2">
        <h1 className="font-2old text-gray-800 font-bold">{heading}</h1>
        <p className="font-normal text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="px-2">
        <Image src="/images/forward.svg" alt="logo" width={30} height={30} />
      </div>
    </Link>
  );
};

export default function Home() {
  return (
    <div className="relative bg-white h-screen">
      <div className="absolute top-12 right-12 text-gray-700 flex items-center space-x-2 border-b-2 border-transparent hover:border-blue-500">
        <p className="pl-2">Already have an account?</p>
        <Link href="/signin" className="text-blue-500 font-bold">
          Sign in
        </Link>
      </div>

      {/* main content */}
      <div className="flex justify-center flex-col h-full px-2 sm:px-12 xl:px-40">
        <h1 className="text-2xl font-bold text-gray-800">Join Us!</h1>
        <p className="mt-2 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          To begin this journey, tell us what type of account you’d be opening.
        </p>
        <AccountOption
          heading="Individual"
          description="Personal account to manage all you activities."
          navigateTo="/forms"
        />
        <AccountOption
          heading="Business"
          description="Own or belong to a company, this is for you."
          navigateTo="/form/1" // this is dynamic route, will not retain the form state, just for practice
        />
      </div>
    </div>
  );
}
