"use client";

import useFetchUser from "@/hooks/useFetchUser";
import { IUser } from "@/models/types";
import { ReactNode, createContext, useContext } from "react";

interface UserContextType {
  user: IUser | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useFetchUser();

  return (
    <UserContext.Provider value={{ user, isLoading }}>
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
