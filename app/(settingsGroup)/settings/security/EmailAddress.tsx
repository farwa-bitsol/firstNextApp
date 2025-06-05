"use client";

import { useUser } from "@/Context/UserContextProvider";

const EmailAddress = () => {
  const { user, isLoading } = useUser();
  if (isLoading) return <p>Loading...</p>;
  return (
    <p className="lg:pr-28">
      Your email address is <span className="font-bold">{user?.email}</span>
    </p>
  );
};

export default EmailAddress;
