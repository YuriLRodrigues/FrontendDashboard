import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Register",
  description: "Dashboard Register",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}