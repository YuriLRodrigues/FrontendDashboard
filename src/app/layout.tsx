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
    <html lang="pt-BR">
      <body className="dark:bg-zinc-900 bg-zinc-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
