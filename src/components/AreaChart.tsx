import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AreaChart, Card, Title } from "@tremor/react";
import { getServerSession } from "next-auth";

export default async function FinancesDash() {
  const session = await getServerSession(authOptions)

  try {
    const res = await fetch("http://localhost:3000/api/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session?.user.token)
    }).then((data)=> data.json())
    
    console.log(res)
  } catch (error) {
    console.log(error)
  }

  return (
    <div className="grid p-4">
      {/* <Card>
        <Title>Newsletter revenue over time (USD)</Title>
        <AreaChart
          className="h-72 mt-4"
          data={[1,2,3,4,5]}
          index="date"
          categories={["SemiAnalysis", "The Pragmatic Engineer"]}
          colors={["indigo", "cyan"]}
          // valueFormatter={dataFormatter}
        />
      </Card> */}
    </div>
  );
}
