import Header from "@/components/Header";
import SideBar from "@/components/Sidebar";
import TransactionModal from "@/components/TransactionModal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Finances dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning={true}>
        <SideBar />
        <Header/>
        <TransactionModal />
        {children}
      </body>
    </html>
  );
}
