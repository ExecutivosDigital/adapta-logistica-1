import { ChevronRight } from "lucide-react";
import { Home2ButtonGroup } from "./components/button-group";
import { Home2FinancialLists } from "./components/financial-lists";
import { Home2GoalCards } from "./components/goal-cards";
import { Home2ResultsGraph } from "./components/results-graph";
import { Home2Transactions } from "./components/transactions";

export default function Home2() {
  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <span className="text-lg font-semibold lg:text-xl">
        Bem vindo Geovane
      </span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-7">
          <Home2ButtonGroup />
        </div>
        <div className="col-span-5 flex items-end justify-end">
          <button className="bg-primary border-primary flex items-center gap-2 rounded-md px-2 py-1 text-white shadow-sm">
            <span className="text-sm"> Criar Lançamento</span>
            <ChevronRight />
          </button>
        </div>
        <div className="col-span-12 rounded-xl border border-zinc-200 p-2 shadow-sm lg:p-4">
          <Home2ResultsGraph />
        </div>
        <div className="col-span-12">
          <Home2GoalCards />
        </div>
        <div className="col-span-12">
          <Home2Transactions />
        </div>
        <div className="col-span-12">
          <Home2FinancialLists />
        </div>
      </div>
    </div>
  );
}
