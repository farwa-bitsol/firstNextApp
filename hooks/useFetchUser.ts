"use client";

import { IUser } from "@/models/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetchUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string>("/images/profile.png"); // default profile
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async (disableLoading?: boolean) => {
    if (!disableLoading)
      setIsLoading(true);
    try {
      const response = await axios.get<{ data: IUser }>("/api/users/me");
      const responseImage = response?.data?.data?.userImage;
      setUser(response.data.data);

      if (responseImage) {
        const blob = new Blob(
          [
            Uint8Array.from(atob(responseImage.data), (c) => c.charCodeAt(0)),
          ],
          { type: responseImage.contentType }
        );

        // Create a File object
        const file = new File([blob], responseImage.name, {
          type: responseImage.contentType,
        });

        // Generate a URL for preview
        setUserImageUrl(URL.createObjectURL(file));
      }
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

  useEffect(() => {
    fetchUser(); // Fetch the user data when the component mounts
  }, []);


  const refetchUser = async () => {
    await fetchUser(true);
  };

  return { user, userImageUrl, isLoading, refetchUser };
};

export default useFetchUser;
