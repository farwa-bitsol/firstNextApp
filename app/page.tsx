"use client";

import Logout from "@/components/Logout";
import { Routes } from "@/models/constants";
import { IUser } from "@/models/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

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

const fetchUser = async (): Promise<{ data: IUser }> => {
  try {
    const response = await axios.get(`/api/users/me`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error ||
      error?.message ||
      error?.error ||
      "Failed to fetch user";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
const Home = () => {
  const { data: user } = useQuery(["fetchUser"], () => fetchUser(), {
    keepPreviousData: true, // Keeps data from the previous query while fetching new data
  });

  return (
    <div className="px-8 pt-16">
      <div className="flex justify-between  space-x-2">
        <Link href={Routes.users} className="text-blue-500 font-bold">
          User Dashboard
        </Link>

        <div className="text-gray-700  space-x-2 border-b-2 border-transparent hover:border-blue-500">
          {user?.data ? (
            <Logout />
          ) : (
            <>
              <p className="inline-block">Already have an account?</p>
              <Link href="/user/signin" className="text-blue-500 font-bold">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>

      {/* main content */}

      <div className="flex flex-col gap-2 items-center justify-center h-[80vh] mx-auto max-w-md px-2">
        {user?.data ? (
          <h1 className="text-2xl font-bold text-gray-800">
            {`Welcome to Dashboard ${
              user?.data?.fullName ?? user?.data?.email
            }!`}
          </h1>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800">Join Us!</h1>
            <p className="mt-2 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              To begin this journey, tell us what type of account you’d be
              opening.
            </p>
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
        )}
      </div>
    </div>
  );
};

export default Home;
