/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useValueContext } from "@/context/ValueContext";
import { cn } from "@/utils/cn";
import { Layers } from "lucide-react";
import { PayableTransactionProps } from ".";

export function CustomEventWeek({
  event,
  onView,
}: {
  event: PayableTransactionProps;
  onView: any;
}) {
  const { viewAllValues } = useValueContext();
  const viewHandler = (viewName: string) => {
    onView(viewName);
  };

  return (
    <button
      onClick={() => viewHandler("week")}
      className={cn(
        "flex w-full flex-col justify-between rounded-r-sm text-start",
        // {
        //   "bg-green-500/20 text-green-800": event.status === "Baixado",
        //   "bg-red-500/20 text-red-800": event.status === "Rejeitado",
        // },
      )}
    >
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-4.5 w-4.5 items-center justify-center">
            <Layers />
          </div>
          <span className="text-xs">
            {event.payable.type === "RECURRING" && "Recorrente"}
          </span>
          <span className="truncate text-sm font-bold">
            {event.payable ? "À Pagar" : "À Receber"}
          </span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <small className="text-xs">
            {viewAllValues
              ? event.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "********"}
          </small>
        </div>
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center self-center">
        <div className="mt-1 mb-1 flex w-full rounded-md bg-white">
          <div
            className={cn(
              "w-full rounded-md text-center text-xs",
              event.status === "Pago"
                ? "border border-[#00A181] bg-[#00A181]/20 px-1 py-1 text-[#00A181]"
                : event.status === "Atrasado"
                  ? "border border-[#EF4444] bg-[#EF4444]/20 px-1 py-1 text-[#EF4444]"
                  : "border border-[#D4A300] bg-[#D4A300]/20 px-1 py-1 text-[#D4A300]",
            )}
          >
            {event.status === "PENDING" ? "PENDENTE" : event.status}{" "}
          </div>{" "}
        </div>
      </div>
    </button>
  );
}
