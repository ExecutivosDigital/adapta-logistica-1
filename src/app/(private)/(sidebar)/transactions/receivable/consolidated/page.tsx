import { ReceivableGoalCards } from "../components/goal-cards";
import { ReceivableTransactions } from "../components/transactions";
export default function Receivable() {
  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <span className="text-lg font-semibold lg:text-xl">
        Títulos á Receber
      </span>

      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <ReceivableGoalCards selectedTableType="consolidated" />
        </div>
        <div className="col-span-12">
          <ReceivableTransactions filterType="consolidated" />
        </div>
      </div>
    </div>
  );
}
