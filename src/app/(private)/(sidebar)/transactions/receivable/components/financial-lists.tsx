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
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { DateValue } from "react-aria-components";
export function ReceivableFinancialLists() {
  const incomeList = [
    {
      id: "1",
      label: "Lorem",
      value: 12890,
    },
    {
      id: "2",
      label: "Lorem",
      value: 200,
    },
    {
      id: "3",
      label: "Lorem",
      value: 16000,
    },
    {
      id: "4",
      label: "Lorem",
      value: 321.32,
    },
    {
      id: "5",
      label: "Lorem",
      value: 0,
    },
    {
      id: "6",
      label: "Lorem",
      value: 12890,
    },
    {
      id: "7",
      label: "Lorem",
      value: 200,
    },
    {
      id: "8",
      label: "Lorem",
      value: 16000,
    },
    {
      id: "9",
      label: "Lorem",
      value: 321.32,
    },
    {
      id: "10",
      label: "Lorem",
      value: 0,
    },
  ];

  const expenseList = [
    {
      id: "1",
      label: "Lorem",
      value: 12890,
    },
    {
      id: "2",
      label: "Lorem",
      value: 200,
    },
    {
      id: "3",
      label: "Lorem",
      value: 16000,
    },
    {
      id: "4",
      label: "Lorem",
      value: 321.32,
    },
    {
      id: "5",
      label: "Lorem",
      value: 0,
    },
    {
      id: "6",
      label: "Lorem",
      value: 12890,
    },
    {
      id: "7",
      label: "Lorem",
      value: 200,
    },
    {
      id: "8",
      label: "Lorem",
      value: 16000,
    },
    {
      id: "9",
      label: "Lorem",
      value: 321.32,
    },
    {
      id: "10",
      label: "Lorem",
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
      <div className="flex w-full flex-col items-center justify-between gap-2 xl:flex-row xl:gap-8">
        <div className="flex w-full flex-col rounded-xl border border-zinc-200 shadow-sm xl:w-1/2">
          <div className="flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
            <div className="flex flex-col">
              <span className="text-sm">Recebido</span>
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
          <div className="flex h-20 w-full items-center justify-center gap-2 overflow-hidden border-t border-t-zinc-200 p-2">
            <button className="flex items-center justify-center rounded-full p-1 text-zinc-400">
              <ChevronLeft />
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              1
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              2
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              3
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              4
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              5
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              6
            </button>
            <button className="flex items-center justify-center rounded-full p-1 text-zinc-400">
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col rounded-xl border border-zinc-200 shadow-sm xl:w-1/2">
          <div className="flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
            <div className="flex flex-col">
              <span className="text-sm">Á Receber</span>
              <span className="font-semibold text-[#00A181]">-R$8,890.00</span>
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
            {expenseList.map((exp) => (
              <div
                className="my-2 flex w-full items-center justify-between"
                key={exp.id}
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#00A181]" />
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
          <div className="flex h-20 w-full items-center justify-center gap-2 overflow-hidden border-t border-t-zinc-200 p-2">
            <button className="flex items-center justify-center rounded-full p-1 text-zinc-400">
              <ChevronLeft />
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              1
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              2
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              3
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              4
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              5
            </button>
            <button className="text-primary bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm">
              6
            </button>
            <button className="flex items-center justify-center rounded-full p-1 text-zinc-400">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
