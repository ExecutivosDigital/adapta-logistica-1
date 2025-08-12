"use client";
import { OrangeButton } from "@/components/OrangeButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { AllPayableButtonGroup } from "./components/button-group";
import { AllPayableGoalCards } from "./components/goal-cards";
import { AllPayableTransactions } from "./components/transactions";

export default function AllPayable() {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <div className="flex items-center gap-2">
        <ChevronLeft onClick={() => router.back()} className="cursor-pointer" />
        <span className="text-lg font-semibold lg:text-xl">
          Todas as Contas á Pagar
        </span>
      </div>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12 flex w-full items-center justify-between">
          <AllPayableButtonGroup />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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

        <div className="col-span-12">
          <AllPayableGoalCards />
        </div>
        <div className="col-span-12">
          <AllPayableTransactions />
        </div>
      </div>
    </div>
  );
}
