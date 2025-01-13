"use client";

import useFetchUser from "@/hooks/useFetchUser";
import { IUser } from "@/models/types";
import { ReactNode, createContext, useContext } from "react";

interface UserContextType {
  user: IUser | null;
  userImageUrl: string;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, userImageUrl, refetchUser } = useFetchUser();

  return (
    <UserContext.Provider
      value={{ user, isLoading, userImageUrl, refetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
