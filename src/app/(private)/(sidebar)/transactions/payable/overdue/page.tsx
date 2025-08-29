"use client";
import { useLoadingContext } from "@/context/LoadingContext";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { PayableGoalCards } from "../components/goal-cards";
import { PayableTransactions } from "../components/transactions";

export default function Payable() {
  const { handleNavigation } = useLoadingContext();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-2 pb-20 lg:gap-4 xl:pb-0">
      <span className="flex items-center gap-2 text-lg font-semibold lg:text-xl">
        <ChevronLeft
          onClick={() => handleNavigation("/transactions/payable")}
          className="cursor-pointer"
        />
        Contas á Pagar
      </span>

      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <PayableGoalCards selectedTableType="overdue" />
        </div>
        <div className="col-span-12">
          <PayableTransactions selectedStatus="OVERDUE" />
        </div>
      </div>
    </div>
  );
}
