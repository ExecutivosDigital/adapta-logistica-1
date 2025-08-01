"use client";

import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import { getLocalTimeZone } from "@internationalized/date";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { DateValue } from "react-aria-components";

export function HomeGoalCards() {
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
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2 font-bold text-white">
          <span>Fluxo de Caixa Projetado</span>
          <div className="relative flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
            <EllipsisVertical />
            <SimpleDatePicker
              value={date}
              view="month"
              invisible
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Á Receber</span>
            </div>
            <span>R$ 9.999.999,99</span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Á Pagar</span>
            </div>
            <span>R$ 9.999.999,99</span>
          </div>
        </div>
      </div>
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2 font-bold text-white">
          <span>Análise de Margem</span>
          <div className="flex items-center gap-2">
            <div className="relative flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
              <EllipsisVertical />
              <SimpleDatePicker
                value={date}
                label="Ano Atual"
                view="month"
                invisible
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Margem Bruta</span>
            </div>
            <span>100%</span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Margem Líquida</span>
            </div>
            <span>100%</span>
          </div>
        </div>
      </div>
      <div className="col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2 font-bold text-white">
          <span> Obrigações Fiscais</span>
          <div className="flex items-center gap-2">
            <div className="relative flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
              <EllipsisVertical />
              <SimpleDatePicker
                value={date}
                label="Ano Atual"
                view="day"
                invisible
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">Pago</span>
            </div>
            <span>R$ 9.999.999,99</span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm">À Pagar</span>
            </div>
            <span>R$ 9.999.999,99</span>
          </div>
        </div>
      </div>
    </div>
  );
}
