"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScreenWidth } from "@/lib/useScreenWidth";
import { DollarSign, Edit, Search } from "lucide-react";
import { useState } from "react";
import { DataType } from "../page";
import { TransactionsList } from "./installments-list";

interface Props {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  paymentType: string;
  setPaymentType: React.Dispatch<React.SetStateAction<string>>;
}

export function Step3({ data, setData, paymentType, setPaymentType }: Props) {
  const paymentTypes = [
    "PIX",
    "Boleto",
    "Cartão de Crédito",
    "Depósito",
    "Transferência Bancária",
    "Dinheiro em Mãos",
    "Fatura",
  ];

  const [filterPaymentType, setFilterPaymentType] = useState("");
  const { width } = useScreenWidth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    const amountNumber = Number(onlyDigits) / 100;

    setData({ ...data, value: amountNumber });
  };

  const handleGlobalPaymentTypeChange = (selectedPaymentType: string) => {
    setData({ ...data, paymentType: selectedPaymentType });

    if (data.transactions && data.transactions.length > 0) {
      const updatedTransactions = data.transactions.map((transaction) => ({
        ...transaction,
        paymentType: selectedPaymentType,
      }));

      setData({
        ...data,
        paymentType: selectedPaymentType,
        transactions: updatedTransactions,
      });
    }
  };

  return (
    <div className="flex-1">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="mt-2 flex gap-2">
          <div className="bg-primary/40 relative flex w-96 flex-row overflow-hidden rounded-lg p-2">
            <div
              className={`absolute top-0 bottom-0 left-0 flex w-1/2 transform items-center justify-center transition-transform duration-300 ${paymentType === "FULL" ? "translate-x-0 pl-2" : "translate-x-full"}`}
            >
              <div className="bg-primary h-[80%] w-[95%] rounded-lg"></div>
            </div>
            <button
              onClick={() => setPaymentType("FULL")}
              className={`relative z-10 w-1/2 px-4 py-1 text-sm transition-all duration-300 ${paymentType === "FULL" ? "font-semibold text-white" : "text-white/80"}`}
            >
              VALOR INTEIRO
            </button>
            <button
              onClick={() => setPaymentType("DIVIDED")}
              className={`relative z-10 w-1/2 px-4 py-1 text-sm transition-all duration-300 ${paymentType === "DIVIDED" ? "font-semibold text-white" : "text-white/80"}`}
            >
              VALOR DA PARCELA
            </button>
          </div>
        </div>
      </div>
      <div className="my-4 h-px bg-zinc-200/60" />
      <div className="grid grid-cols-12 gap-2 text-sm text-zinc-700 xl:gap-4">
        <label className="col-span-7 flex flex-col gap-1">
          <span className="text-zinc-600">Valor no Documento</span>
          <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
            <DollarSign
              size={16}
              className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
            />
            <div className="flex h-full flex-1 items-center text-center">
              <span className="font-semi-bold flex-1 text-xl">
                <input
                  value={
                    paymentType === "FULL"
                      ? data.value.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : Number(
                          data.value * data.installmentCount,
                        ).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                  }
                  onChange={handleChange}
                  placeholder="R$ 0,00"
                  className="flex-1 items-center bg-transparent text-center text-zinc-700 outline-none 2xl:text-lg"
                />
              </span>
            </div>
          </div>
        </label>

        <label className="col-span-5 flex flex-col gap-1">
          <span className="text-zinc-600">Tipo de Lançamento</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
                <div className="flex h-full w-6">
                  <DollarSign className="text-primary" size={16} />
                </div>
                <div className="flex-1 text-lg text-zinc-700">
                  {data.paymentType || "Selecione"}
                </div>
                <div className="flex h-full w-6 justify-end">
                  <Edit className="text-primary" size={16} />
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={width > 768 ? "right" : "bottom"}
              align={width > 768 ? "start" : "end"}
              className="z-[999] w-72 border-zinc-200"
            >
              <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                <input
                  value={filterPaymentType}
                  onChange={(e) => setFilterPaymentType(e.target.value)}
                  placeholder="Pesquisar Forma de Pagamento"
                  className="flex-1 focus:outline-none"
                />
                <Search size={14} />
              </div>
              {paymentTypes
                .filter((f) =>
                  f.toLowerCase().includes(filterPaymentType.toLowerCase()),
                )
                .map((form) => (
                  <DropdownMenuItem
                    key={form}
                    onClick={() => handleGlobalPaymentTypeChange(form)}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {form}
                      {data.paymentType === form && (
                        <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              {paymentTypes.filter((f) =>
                f.toLowerCase().includes(filterPaymentType.toLowerCase()),
              ).length === 0 && (
                <div className="p-2 text-center text-sm text-zinc-600">
                  Nenhum item encontrado
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </label>
        <div className="col-span-2 my-4 h-px bg-zinc-200/60" />
      </div>
      <div>
        <h3 className="mb-4 text-base font-semibold">Detalhes do Pagamento</h3>
        <TransactionsList data={data} setData={setData} type={paymentType} />
      </div>
    </div>
  );
}
