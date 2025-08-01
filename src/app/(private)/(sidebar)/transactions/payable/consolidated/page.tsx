import { PayableGoalCards } from "../components/goal-cards";
import { PayableTransactions } from "../components/transactions";
export default function Payable() {
  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <span className="text-lg font-semibold lg:text-xl">Contas á Pagar</span>

      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <PayableGoalCards selectedTableType="consolidated" />
        </div>
        <div className="col-span-12">
          <PayableTransactions filterType="consolidated" />
        </div>
      </div>
    </div>
  );
}
