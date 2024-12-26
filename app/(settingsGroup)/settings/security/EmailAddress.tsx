"use client"

import { IUser } from "@/models/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EmailAddress = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<{ data: IUser }>(`/api/users/me`);
        setUser(response.data.data);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.error ||
          error?.message ||
          error?.error ||
          "Failed to fetch user";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);
  return (
    <p className="lg:pr-28">
      Your email address is{" "}
      <span className="font-bold">{isLoading ? "..." : user?.email}</span>
    </p>
  );
};

export default EmailAddress;
