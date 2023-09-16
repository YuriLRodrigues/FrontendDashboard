"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/client/queryClient";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </NextThemeProvider>
  );
}
