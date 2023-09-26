import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FinancesDash from "@/components/FinancesDash";
import { authOptions } from "@/lib/auth-options";
import NotUserData from "@/components/NotUserData";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  
  const userData = await fetch(
    "https://backend-dashboard-gold.vercel.app/myextracts",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    }
  ).then(async (res) => await res.json());

  if (userData.length > 0) {
    return <FinancesDash />;
  }

  return <NotUserData />
}
