import { BarChart, Card, Title } from "@tremor/react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { GiUnbalanced, GiWallet } from "react-icons/gi";

export default async function NotUserData({userData}: any) {
  return (
    <section className="grid p-4 gap-4 md:grid-cols-3 grid-cols-1 items-start overflow-hidden">
      <div className="dark:bg-zinc-950 dark:text-white flex flex-col gap-4 p-4 rounded bg-zinc-100">
        <GiWallet size={25} />
        <p className="text-lg font-semibold">Saldo atual</p>
        <p>
          R$ 0
        </p>
      </div>

      <div className="dark:bg-zinc-950 dark:text-white flex flex-col gap-4 p-4 rounded bg-zinc-100">
        <AiOutlineFullscreenExit size={25} />
        <h3 className="text-lg font-semibold">Total de Saídas</h3>
        <p>0</p>
      </div>

      <div className="dark:bg-zinc-950 dark:text-white flex flex-col gap-4 p-4 rounded bg-zinc-100">
        <GiUnbalanced size={25} />
        <h3 className="text-lg font-semibold">Total de Entradas</h3>
        <p>0</p>
      </div>

      <Card className="md:col-span-3">
        <Title>Sem transações ainda, faça uma nova transação e atualize a página para ver suas transações</Title>
        <BarChart
          data={[0]}
          index="date"
          categories={["valor"]}
          colors={["violet"]}
          yAxisWidth={48}
        />
      </Card>
    </section>
  );
}