"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useValueContext } from "@/context/ValueContext";
import { cn } from "@/utils/cn";
import moment from "moment";
import { useState } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

export function Kpis() {
  const { viewAllValues } = useValueContext();
  const [dateRange, setDateRange] = useState({
    from: moment().subtract(1, "month").toDate(),
    to: moment().toDate(),
  });

  const handleSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (range && range.from && range.to) {
      setDateRange({ from: range.from, to: range.to });
    } else {
      setDateRange({ from: new Date(), to: new Date() }); // or handle undefined case as needed
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-primary text-xl font-semibold 2xl:text-2xl">
          Indicadores do Cliente
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer rounded-md border border-zinc-200 px-2 py-1 text-zinc-400">
              {moment(dateRange.from).format("DD/MM/YYYY")} -{" "}
              {moment(dateRange.to).format("DD/MM/YYYY")}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              classNames={{
                day_range_middle: cn("bg-zinc-400", "hover:bg-zinc-500"),
              }}
              onSelect={handleSelect}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex w-full flex-col items-center justify-evenly gap-4 xl:flex-row">
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-1.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            kpi1
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            {viewAllValues ? "R$33.000,00" : "********"}
          </span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-2.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            kpi2
          </span>
          <span className="text-center text-2xl font-bold text-white xl:text-3xl">
            {viewAllValues ? "XYZ" : "********"}
          </span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-3.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            kpi3
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            {viewAllValues ? "XYZ" : "********"}
          </span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-4.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            kpi4
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            {viewAllValues ? "XYZ" : "********"}
          </span>
        </div>
      </div>
    </div>
  );
}
