import { ReceivableButtonGroup } from "./components/button-group";
import { ReceivableFinancialLists } from "./components/financial-lists";
import { ReceivableGoalCards } from "./components/goal-cards";
import { ReceivableResultsGraph } from "./components/results-graph";
import { ReceivableTransactions } from "./components/transactions";
export default function Receivable() {
  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <span className="text-lg font-semibold lg:text-xl">
        Títulos á Receber
      </span>

      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <ReceivableButtonGroup />
        </div>

        <div className="col-span-12 rounded-xl border border-zinc-200 p-2 shadow-sm lg:p-4">
          <ReceivableResultsGraph />
        </div>

        <div className="col-span-12">
          <ReceivableGoalCards />
        </div>
        <div className="col-span-12">
          <ReceivableTransactions />
        </div>
        <div className="col-span-12">
          <ReceivableFinancialLists />
        </div>
      </div>
    </div>
  );
}
