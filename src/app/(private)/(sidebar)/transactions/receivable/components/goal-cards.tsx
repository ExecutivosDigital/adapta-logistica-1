"use client";
import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import { getLocalTimeZone } from "@internationalized/date";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateValue } from "react-aria-components";
interface selectedTableType {
  selectedTableType?: string;
}
export function ReceivableGoalCards({ selectedTableType }: selectedTableType) {
  const [date, setDate] = useState<Date | null>(new Date());
  const router = useRouter();
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
      <div
        className={`col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm ${selectedTableType === "consolidated" ? "border-primary" : selectedTableType ? "opacity-80" : ""}`}
      >
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
          <span className="font-semibold text-white">Recebido Consolidado</span>
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

        <div className="relative flex flex-col gap-2 p-2 px-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <div className="h-full w-1 bg-[#00A181]" />
              <span className="text-md text-zinc-400">Recebido</span>
            </div>
            <span className="text-2xl font-semibold text-[#00A181]">
              R$ <span className="">1.322.890,00</span>
            </span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <button
            onClick={() => router.push("/transactions/receivable/consolidated")}
            className="text-primary self-center rounded-lg border border-zinc-400 p-2 text-sm transition-all duration-300 hover:scale-[1.02]"
          >
            Ver Transações Recebidas
          </button>
          <div />
        </div>
      </div>
      <div
        className={`col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm ${selectedTableType === "this-month" ? "border-primary" : selectedTableType ? "opacity-80" : ""}`}
      >
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
          <span className="font-semibold text-white">Receber neste Mês</span>
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

        <div className="relative flex flex-col gap-2 p-2 px-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <div className="h-full w-1 bg-[#00A181]" />
              <span className="text-md text-zinc-400">Em Aberto</span>
            </div>
            <span className="text-2xl font-semibold text-[#00A181]">
              R$ <span className="">1.322.890,00</span>
            </span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <button
            onClick={() => router.push("/transactions/receivable/this-month")}
            className="text-primary self-center rounded-lg border border-zinc-400 p-2 text-sm transition-all duration-300 hover:scale-[1.02]"
          >
            Ver Transações em Aberto
          </button>
          <div />
        </div>
      </div>
      <div
        className={`col-span-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-sm ${selectedTableType === "overdue" ? "border-primary" : selectedTableType ? "opacity-80" : ""}`}
      >
        <div className="bg-primary flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
          <span className="font-semibold text-white">Atrasados</span>
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

        <div className="relative flex flex-col gap-2 p-2 px-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <div className="h-full w-1 bg-[#EF4444]" />
              <span className="text-md text-zinc-400">Atrasados</span>
            </div>
            <span className="text-2xl font-semibold text-[#EF4444]">
              R$ <span className="">1.322.890,00</span>
            </span>
          </div>
          <div className="mx-auto h-px w-3/4 bg-zinc-200" />
          <button
            onClick={() => router.push("/transactions/receivable/overdue")}
            className="text-primary self-center rounded-lg border border-zinc-400 p-2 text-sm transition-all duration-300 hover:scale-[1.02]"
          >
            Ver Transações Atrasadas
          </button>
          <div />
        </div>
      </div>
    </div>
  );
}
