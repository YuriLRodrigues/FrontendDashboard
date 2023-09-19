import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/providers/provider";


export const metadata: Metadata = {
  title: "Dashboard Login",
  description: "Dashboard Login",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-br">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
