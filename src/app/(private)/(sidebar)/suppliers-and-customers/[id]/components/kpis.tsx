"use client";

import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import { getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";
import { DateValue } from "react-aria-components";

export function Kpis() {
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
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-primary text-xl font-semibold 2xl:text-2xl">
          Indicadores do Cliente
        </span>
        <div className="self-star flex items-center gap-2 rounded-lg border border-zinc-400 p-2 text-black">
          <div className="">
            <SimpleDatePicker
              value={date}
              label="Ano Atual"
              view="day"
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-evenly gap-4 xl:flex-row">
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-1.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            kpi1
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            R$33.000,00
          </span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-2.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            kpi2
          </span>
          <span className="text-center text-2xl font-bold text-white xl:text-3xl">
            XYZ
          </span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-3.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            kpi3
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">XYZ</span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-4.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            kpi4
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">XYZ</span>
        </div>
      </div>
    </div>
  );
}
