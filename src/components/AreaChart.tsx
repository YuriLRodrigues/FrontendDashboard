import { authOptions } from "@/lib/auth-options";
import { FinanceDatasType, FinanceType, Date } from "@/types/finaces-type";
import {
  AreaChart,
  BarChart,
  Card,
  DonutChart,
  Subtitle,
  Title,
} from "@tremor/react";
import { getServerSession } from "next-auth";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { GiUnbalanced, GiWallet } from "react-icons/gi";

export const revalidate = 1000;

type DataExistType = {
  title: string;
  valor: number;
};

type DashboardEntriesType = {
  date: string;
  title: string;
  valor: number;
};
type DashboardExitsType = {
  date: string;
  title: string;
  valor: number;
};

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

  const finances: FinanceDatasType[] = userData.map(
    (finance: FinanceType) => finance.FinanceData
  );
  const data: Date[] = [];
  finances.map((fin) => {
    if (fin.transation === "entrada") {
      data.push({
        date: `${fin.day} ${fin.month} ${fin.year}`,
        title: fin.title,
        valor: fin.value,
      });
    }
  });

  const allExits = finances.filter((fin) => fin.transation === "saída");
  const allEntries = finances.filter((fin) => fin.transation === "entrada");
  const dashboardExits: DashboardExitsType[] = [];
  const dashboardEntries: DashboardEntriesType[] = [];

  allEntries.map((entr) => {
    dashboardEntries.push({
      date: `${entr.day} ${entr.month} ${entr.year}`,
      title: entr.title,
      valor: entr.value,
    });
  });

  allExits.map((fin) => {
    dashboardExits.push({
      date: `${fin.day} ${fin.month} ${fin.year}`,
      title: fin.title,
      valor: fin.value,
    });
  });

  return (
    <section className="grid p-4 gap-4 md:grid-cols-3 grid-cols-1 items-start overflow-hidden">
      <div className="dark:bg-zinc-950 dark:text-white flex flex-col gap-4 p-4 rounded bg-zinc-100">
        <GiWallet size={25} />
        <p className="text-lg font-semibold">Saldo atual</p>
        <p>
          {finances
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue.value,
              0
            )
            .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>
      </div>

      <div className="dark:bg-zinc-950 dark:text-white flex flex-col gap-4 p-4 rounded bg-zinc-100">
        <AiOutlineFullscreenExit size={25} />
        <h3 className="text-lg font-semibold">Total de Saídas</h3>
        <p>{allExits.length}</p>
      </div>

      <div className="dark:bg-zinc-950 dark:text-white flex flex-col gap-4 p-4 rounded bg-zinc-100">
        <GiUnbalanced size={25} />
        <h3 className="text-lg font-semibold">Total de Entradas</h3>
        <p>{allEntries.length}</p>
      </div>

      {/* <Card className="h-full flex flex-col justify-around items-center">
        <Title>Saídas (R$)</Title>
        <DonutChart
          data={dataExits}
          category="valor"
          index="title"
          colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
        />
      </Card> */}

      <Card className="md:col-span-3">
        <Title>Todas as saídas</Title>
        <BarChart
          data={dashboardEntries}
          index="date"
          categories={["valor"]}
          colors={["blue"]}
          // valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </Card>

      <Card className="md:col-span-3">
        <Title>Todas as entradas</Title>
        <AreaChart
          className="h-56 mt-4"
          data={dashboardExits}
          index="date"
          categories={["valor"]}
          colors={["indigo", "cyan"]}
          // valueFormatter={dataFormatter}
        />
      </Card>
    </section>
  );
}
