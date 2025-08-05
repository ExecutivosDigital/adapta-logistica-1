"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import { getLocalTimeZone } from "@internationalized/date";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { DateValue } from "react-aria-components";

export function HomeFinancialLists() {
  const incomeList = [
    {
      id: "1",
      label: "ALCAST DO BRASIL LTDA FILIAL",
      value: 12890,
    },
    {
      id: "2",
      label: "ALCAST DO BRASIL LTDA",
      value: 200,
    },
    {
      id: "3",
      label: "ALCAST DO BRASIL S A",
      value: 16000,
    },
    {
      id: "4",
      label: "CINPAL COMPANHIA INDUSTRIAL DE PECAS PARA AUTOMOVEIS",
      value: 321.32,
    },
    {
      id: "5",
      label: "SAVOY INDUSTRIA DE COSMETICOS",
      value: 0,
    },
    {
      id: "6",
      label: "COTY BRASIL COMERCIO S.A.",
      value: 12890,
    },
    {
      id: "7",
      label: "ELECTROLUX DO BRASIL S A",
      value: 200,
    },
    {
      id: "8",
      label: "ELECTROLUX DO BRASIL S A",
      value: 16000,
    },
    {
      id: "9",
      label: "ELECTROLUX DO BRASIL S A",
      value: 321.32,
    },
    {
      id: "10",
      label: "ENEVA S A SEDE",
      value: 0,
    },
  ];

  const expenseList = [
    {
      id: "1",
      label: "ELECTROLUX DO BRASIL S A",
      value: 12890,
    },
    {
      id: "2",
      label: "CASA E VIDEO RIO DE JANEIRO",
      value: 200,
    },
    {
      id: "3",
      label: "SAF DO BRASIL PRODUTOS ALIMENTICIOS LTDA",
      value: 16000,
    },
    {
      id: "4",
      label: "TK ELEVADORES BRASIL LTDA",
      value: 321.32,
    },
    {
      id: "5",
      label: "TP-LINK SISTEMAS DO BRASIL LTDA",
      value: 0,
    },
    {
      id: "6",
      label: "SHE OPL VOTORANTIM CIMENTOS SA",
      value: 12890,
    },
    {
      id: "7",
      label: "Potencial Fomento Mercantil Eireli",
      value: 200,
    },
    {
      id: "8",
      label: "Itau Administradora de Consorcios Ltda",
      value: 16000,
    },
    {
      id: "9",
      label: "Bradesco Administradora de Consorcios Ltda.",
      value: 321.32,
    },
    {
      id: "10",
      label: "Itau Unibanco S.a.",
      value: 0,
    },
  ];

  const [date, setDate] = useState<Date | null>(new Date());
  const handleDateChange = (value: DateValue | null) => {
    if (!value) {
      setDate(null);
      return;
    }

    // CalendarDate, ZonedDateTime e afins expõem .toDate()
    if ("toDate" in value) {
      setDate(value.toDate(getLocalTimeZone())); // <-- ✅ sem salto!
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if (value !== null && (value as any) instanceof Date) setDate(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <span className="font-semibold">Extrato Consolidado</span>
        <div className="flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 px-2 py-1 text-zinc-400 focus:outline-none">
          <SimpleDatePicker
            value={date}
            label="Filtro"
            onChange={handleDateChange}
            view="day"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-8">
        <div className="flex w-1/2 flex-col rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
            <div className="flex flex-col">
              <span className="text-sm">Receitas</span>
              <span className="font-semibold text-[#00A181]">R$12,890.00</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
                  <EllipsisVertical />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="left"
                className="divide-zin-400 divide-y-1"
              >
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer rounded-none transition duration-300">
                  Exportar Relatório
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer rounded-none transition duration-300">
                  Lorem Ipsum
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ScrollArea className="h-60 w-full px-4">
            {incomeList.map((inc) => (
              <div
                className="my-2 flex w-full items-center justify-between"
                key={inc.id}
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#00A181]" />
                  <span>{inc.label}</span>
                </div>
                <span>
                  {inc.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="flex h-20 items-center justify-between overflow-hidden border-t border-t-zinc-200 p-2">
            <div className="flex flex-col">
              <span className="text-sm text-zinc-400">
                Média dos Últimos 3 meses
              </span>
              <span className="text-[#00A181]">R$42.000,00</span>
            </div>
            <div className="flex items-end gap-2">
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">
                  R$<span className="text-sm">1M</span>
                </span>
                <div className="from-primary/40 border-t-primary flex h-10 w-10 flex-col border-t-2 bg-gradient-to-b to-transparent" />
                <span className="text-xs font-semibold">Abril</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">
                  R$<span className="text-sm">250k</span>
                </span>
                <div className="from-primary/40 border-t-primary flex h-4 w-10 flex-col border-t-2 bg-gradient-to-b to-transparent" />
                <span className="text-xs font-semibold">Maio</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">
                  R$<span className="text-sm">800k</span>
                </span>
                <div className="from-primary/40 border-t-primary flex h-8 w-10 flex-col border-t-2 bg-gradient-to-b to-transparent" />
                <span className="text-xs font-semibold">Junho</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
            <div className="flex flex-col">
              <span className="text-sm">Despesas</span>
              <span className="font-semibold text-[#EF4444]">-R$8,890.00</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
                  <EllipsisVertical />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="left"
                className="divide-zin-400 divide-y-1"
              >
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer rounded-none transition duration-300">
                  Exportar Relatório
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                  Lorem Ipsum
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ScrollArea className="h-60 w-full px-4">
            {expenseList.map((exp) => (
              <div
                className="my-2 flex w-full items-center justify-between"
                key={exp.id}
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#EF4444]" />
                  <span>{exp.label}</span>
                </div>
                <span>
                  {exp.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="flex h-20 items-center justify-between overflow-hidden border-t border-t-zinc-200 p-2">
            <div className="flex flex-col">
              <span className="text-sm text-zinc-400">
                Média dos Últimos 3 meses
              </span>
              <span className="text-[#EF4444]">-R$42.000,00</span>
            </div>
            <div className="flex items-end gap-2">
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">
                  R$<span className="text-sm">2k</span>
                </span>
                <div className="from-primary/40 border-t-primary flex h-3 w-10 flex-col border-t-2 bg-gradient-to-b to-transparent" />
                <span className="text-xs font-semibold">Abril</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">
                  R$<span className="text-sm">12k</span>
                </span>
                <div className="from-primary/40 border-t-primary flex h-8 w-10 flex-col border-t-2 bg-gradient-to-b to-transparent" />
                <span className="text-xs font-semibold">Maio</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">
                  R$<span className="text-sm">8k</span>
                </span>
                <div className="from-primary/40 border-t-primary flex h-5 w-10 flex-col border-t-2 bg-gradient-to-b to-transparent" />
                <span className="text-xs font-semibold">Junho</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
