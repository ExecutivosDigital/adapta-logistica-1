"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReceivableGoalCards } from "../components/goal-cards";
import { ReceivableTransactions } from "../components/transactions";
export default function Receivable() {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col gap-2 pb-20 lg:gap-4 xl:pb-0">
      <span className="flex items-center gap-2 text-lg font-semibold lg:text-xl">
        <ChevronLeft
          onClick={() => router.push("/transactions/receivable")}
          className="cursor-pointer"
        />
        Títulos á Receber
      </span>

      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <ReceivableGoalCards selectedTableType="this-month" />
        </div>
        <div className="col-span-12">
          <ReceivableTransactions filterType="this-month" />
        </div>
      </div>
    </div>
  );
}
