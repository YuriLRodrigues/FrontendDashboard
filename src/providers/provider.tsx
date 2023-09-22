"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/client/queryClient";
import { SidebarProvider } from "@/context/SidebarContext";
import { ModalProvider } from "@/context/ModalIsOpen";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider>
      <SessionProvider>
      <SidebarProvider>
        <ModalProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ModalProvider>
      </SidebarProvider>
      </SessionProvider>
    </NextThemeProvider>
  );
}
