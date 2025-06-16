import UserProvider from "@/Context/UserContextProvider";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
