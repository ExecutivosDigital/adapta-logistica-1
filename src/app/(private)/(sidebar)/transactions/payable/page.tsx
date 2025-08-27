"use client";
import { OrangeButton } from "@/components/OrangeButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoadingContext } from "@/context/LoadingContext";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { PayableButtonGroup } from "./components/button-group";
import { PayableFinancialLists } from "./components/financial-lists";
import { PayableGoalCards } from "./components/goal-cards";
import { PayableResultsGraph } from "./components/results-graph";
import { PayableTransactions } from "./components/transactions";

export default function Payable() {
  const { handleNavigation } = useLoadingContext();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-2 pb-20 xl:gap-4 xl:pb-0">
      <span className="text-lg font-semibold xl:text-xl">Contas á Pagar</span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12 flex w-full items-center justify-between">
          <PayableButtonGroup />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <OrangeButton
                  disabled
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-white shadow-sm transition duration-300"
                >
                  <span className="text-sm"> Criar Lançamento</span>
                  <ChevronRight />
                </OrangeButton>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="z-[999]">
              <DropdownMenuItem
                onClick={() => handleNavigation("/payable/new")}
                className="hover:bg-primary/20 cursor-pointer transition duration-300"
              >
                <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1 py-2">
                  Lançar Despesa
                  <div className="border-primary h-4 w-4 rounded-md border"></div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1 py-2">
                  Pagamento de Colaboradores
                  <div className="border-primary h-4 w-4 rounded-md border"></div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleNavigation("/payable/recurring/new")}
                className="hover:bg-primary/20 cursor-pointer transition duration-300"
              >
                <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1 py-2">
                  Desp. Recorrentes
                  <div className="border-primary h-4 w-4 rounded-md border"></div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="col-span-12 rounded-xl border border-zinc-200 p-2 shadow-sm xl:p-4">
          <PayableResultsGraph />
        </div>
        <div className="col-span-12">
          <PayableGoalCards />
        </div>
        <div className="col-span-12">
          <PayableTransactions />
        </div>
        <div className="col-span-12">
          <PayableFinancialLists />
        </div>
      </div>
    </div>
  );
}
