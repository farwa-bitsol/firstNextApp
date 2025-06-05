"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

// Fixing the typing of ProvidersProps by specifying the generic type for PropsWithChildren
type ProvidersProps = PropsWithChildren<{}>; // You can pass {} or any other type for props

export default function QueryProviders({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
