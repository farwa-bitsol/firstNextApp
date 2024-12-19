import React from "react";
import Link from "next/link";
import Image from "next/image";
import UserPageInfo from "@/components/UserPageInfo";

const AccountOption = ({
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

const Page = () => {
  return (
    <div className="px-8 pt-16">
      <UserPageInfo
        Children={
          <>
            <AccountOption
              heading="Individual"
              description="Personal account to manage all you activities."
              navigateTo="/user/forms"
            />
            <AccountOption
              heading="Business"
              description="Own or belong to a company, this is for you."
              navigateTo="/user/form/1" // this is dynamic route, will not retain the form state, just for practice
            />
          </>
        }
      />
    </div>
  );
};

export default Page;
