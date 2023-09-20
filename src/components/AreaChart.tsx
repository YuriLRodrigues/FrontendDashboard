import { authOptions } from "@/lib/auth-options";
import { AreaChart, Card, Title } from "@tremor/react";
import { getServerSession } from "next-auth";

type FinanceDatasType = {
  transation: string,
  day: string,
  hour: string,
  minutes: string,
  month: string,
  year: string,
  value: number,
  id: string,
  title: string,
  store: string | null,
  payment: string |  null,
  product: string | null
}

type FinanceType = {
  FinanceData: FinanceDatasType[]
}

type Date = {
  date: string,
  title: string,
  valor: number
}

export const revalidate = 1000

export default async function FinancesDash() {
  const session = await getServerSession(authOptions);

  const userData = await fetch(
    "https://backend-dashboard-opal.vercel.app/myextracts",
    {
      
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    }
  ).then(async (res) => await res.json());
  
  console.log(userData)
  const finances: FinanceDatasType[] = userData.map((finance:FinanceType)=> finance.FinanceData)
  const data:Date[] = []
  
  finances.map((fin)=> {
    if (fin.transation === "entrada"){

      data.push({
        date: `${fin.day} ${fin.month} ${fin.year}`,
        title: fin.title,
        valor: fin.value
      })
    }
  })
  console.log(data)
  
  return (
    <div className="grid p-4">
      <Card>
        <Title>Total valores de entradas</Title>
        <AreaChart
          className="h-72 mt-4"
          data={data}
          index="date"
          categories={["valor"]}
          colors={["indigo", "cyan"]}
          // valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  );
}
