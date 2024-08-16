"use client";

import React, { ReactElement } from "react";
import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }: { children: ReactElement }) => {
  return <SessionProvider>{children} </SessionProvider>;
};

export default SessionWrapper;
