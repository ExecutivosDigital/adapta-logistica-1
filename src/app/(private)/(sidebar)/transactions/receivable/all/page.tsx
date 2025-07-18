"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AllReceivableButtonGroup } from "./components/button-group";
import { AllReceivableGoalCards } from "./components/goal-cards";
import { AllReceivableTransactions } from "./components/transactions";

export default function AllReceivable() {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <div className="flex items-center gap-2">
        <ChevronLeft onClick={() => router.back()} className="cursor-pointer" />
        <span className="text-lg font-semibold lg:text-xl">
          Títulos á Receber
        </span>
      </div>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <AllReceivableButtonGroup />
        </div>

        <div className="col-span-12">
          <AllReceivableGoalCards />
        </div>
        <div className="col-span-12">
          <AllReceivableTransactions />
        </div>
      </div>
    </div>
  );
}
