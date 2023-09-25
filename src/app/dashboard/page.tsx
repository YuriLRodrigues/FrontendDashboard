// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
import FinancesDash from "@/components/AreaChart";
// import { authOptions } from "@/lib/auth-options";

export default async function Dashboard() {
  // const session = await getServerSession(authOptions);
  // console.log(session)
  // if (!session) redirect("/");

  return (
    <FinancesDash />
  );
}
