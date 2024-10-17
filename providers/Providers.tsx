"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type * as React from "react";
import { getQueryClient } from "@/providers/get-query-client";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}
