import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import FinancesDash from "@/components/AreaChart";
import TransactionModal from "@/components/TransactionModal";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div>
      <p>Dashboard</p>
      <FinancesDash />
      {/* <TransactionModal title={"Testing"}>
        <p>A</p>
      </TransactionModal> */}
    </div>
  );
}
