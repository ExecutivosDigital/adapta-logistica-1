"use client";
import { OrangeButton } from "@/components/OrangeButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Home2ButtonGroup } from "./components/button-group";
import { Home2FinancialLists } from "./components/financial-lists";
import { Home2GoalCards } from "./components/goal-cards";
import { Home2ResultsGraph } from "./components/results-graph";
import { Home2Transactions } from "./components/transactions";
export default function Home2() {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <span className="text-lg font-semibold lg:text-xl">Contas á Pagar</span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12 flex w-full items-center justify-between">
          <Home2ButtonGroup />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <OrangeButton className="bg-primary hover:bg-primary-dark hover:border-primary-dark border-primary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-white shadow-sm transition duration-300">
                <span className="text-sm"> Criar Lançamento</span>
                <ChevronRight />
              </OrangeButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="z-[999]">
              <DropdownMenuItem
                onClick={() => router.push("/create-payment")}
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
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1 py-2">
                  Desp. Recorrentes
                  <div className="border-primary h-4 w-4 rounded-md border"></div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
