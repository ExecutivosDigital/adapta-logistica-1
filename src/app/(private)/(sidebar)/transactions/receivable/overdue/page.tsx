"use client";
import { useLoadingContext } from "@/context/LoadingContext";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { ReceivableGoalCards } from "../components/goal-cards";
import { ReceivableTransactions } from "../components/transactions";

export default function Receivable() {
  const { handleNavigation } = useLoadingContext();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-2 pb-20 lg:gap-4 xl:pb-0">
      <span className="flex items-center gap-2 text-lg font-semibold lg:text-xl">
        <ChevronLeft
          onClick={() => handleNavigation("/transactions/receivable")}
          className="cursor-pointer"
        />
        Títulos á Receber
      </span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <ReceivableGoalCards selectedTableType="overdue" />
        </div>
        <div className="col-span-12">
          <ReceivableTransactions filterType="overdue" />
        </div>
      </div>
    </div>
  );
}
