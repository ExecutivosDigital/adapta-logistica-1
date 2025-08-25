"use client";
import { OrangeButton } from "@/components/OrangeButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  DollarSign,
  EllipsisVertical,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Step1 } from "./components/step1";
import { Step2 } from "./components/step2";

export interface DataType {
  totalValue: number;
  entryType: "DESPESAS" | "IMPOSTOS" | "C. VENDAS";
  supplier: {
    name: string;
    cnpj: string;
  };
  documentType: string;
  amount: number;
  currency: string;
  costType: string;
  category: string;
  costCenters: {
    name: string;
    value: string;
    locked?: boolean;
  }[];
  accountingAccount: {
    code: string;
    description: string;
  };
  paymentMethod: {
    bank: string;
    account: string;
  };
  paymentForm: string;
  documentNumber: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  paymentDetails: string;
  description: string;
  approval: string;
  mail: string;
}

export default function ApprovePayable() {
  const router = useRouter();

  const [steps, setSteps] = useState(1);
  const [data, setData] = useState<DataType>({
    totalValue: 100000,
    entryType: "DESPESAS",
    supplier: {
      name: "",
      cnpj: "",
    },
    documentType: "",
    amount: 0,
    currency: "",
    costType: "",
    category: "",
    costCenters: [],
    accountingAccount: {
      code: "",
      description: "",
    },
    paymentMethod: {
      bank: "",
      account: "",
    },
    paymentForm: "",
    documentNumber: "",
    issueDate: "",
    dueDate: "",
    paymentTerms: "",
    paymentDetails: "",
    description: "",
    approval: "",
    mail: "",
  });

  return (
    <div className="flex min-h-screen flex-col overflow-hidden pb-20 xl:pb-0">
      <header className="relative flex items-center justify-center border-b border-orange-200 border-b-zinc-400 px-2 py-2 xl:px-8 xl:py-4">
        <Image
          src="/logo/logoFull.png"
          alt="Adapta"
          width={140}
          height={24}
          className="h-16 w-auto"
          priority
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="absolute top-4 left-8 flex cursor-pointer items-center gap-1 rounded-lg border border-zinc-200 p-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 focus:outline-none">
              <EllipsisVertical size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="bg-white">
            <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-200">
              Reportar Erro
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-200">
              Negar Lançamento
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-200">
              Lorem
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-8 flex cursor-pointer items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Encerrar
          <X size={16} />
        </button>
      </header>

      <main className="flex flex-1 flex-col justify-between gap-4 overflow-y-auto bg-[#FBEFE9] xl:flex-row">
        <section className="flex w-full flex-col bg-white px-3 py-2 pb-4 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] xl:w-[49%] xl:px-12 xl:pt-10">
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <ChevronLeft
                onClick={() => setSteps((s) => s - 1)}
                className={cn("cursor-pointer", steps === 1 && "hidden")}
              />
              <div className="flex flex-col">
                <span className="font-semibold 2xl:text-lg">
                  Aprovar Documento
                </span>
                <span className="flex items-center gap-1 text-sm text-zinc-600">
                  <Calendar size={16} />
                  22/03/2025
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="flex flex-row items-center gap-1 text-xl font-semibold">
                <span className="flex flex-row items-center gap-1 text-xs">
                  <div className="bg-primary/20 text-primary flex h-4 w-4 items-center justify-center rounded-full">
                    <DollarSign size={14} />
                  </div>
                  R$
                </span>
                {data.totalValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h2>
              <span className="flex items-center gap-1 text-sm text-zinc-600">
                Valor da Fatura
              </span>
            </div>
          </div>
          <div className="my-4 h-px bg-zinc-200/60" />
          <Step1 data={data} setData={setData} />
        </section>
        <section className="flex w-full flex-col bg-white px-3 py-2 pb-4 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] xl:w-[49%] xl:px-12 xl:pt-10">
          <div className="my-4 h-px bg-zinc-200/60" />
          <Step2 data={data} />
        </section>
      </main>
      <footer className="mt-4 flex items-center justify-end gap-6 border-t border-orange-200 bg-white px-8 py-4">
        <OrangeButton
          className="h-9 w-[132px]"
          onClick={() => {
            toast.success("Fatura aprovada com sucesso!");
            setTimeout(() => {
              router.push("/calendar");
            }, 1000);
          }}
          icon={<ChevronDown size={16} className="-rotate-90" />}
          iconPosition="right"
        >
          Aprovar
        </OrangeButton>
      </footer>
    </div>
  );
}
