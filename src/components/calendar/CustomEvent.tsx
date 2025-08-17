/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/chat/tooltip";
import { useValueContext } from "@/context/ValueContext";
import { cn } from "@/utils/cn";
import { Layers } from "lucide-react";

export function CustomEvent({ event, onView }: any) {
  const { viewAllValues } = useValueContext();
  const viewHandler = (viewName: string) => {
    onView(viewName);
  };

  return (
    <button
      onClick={() => viewHandler("week")}
      className={cn(
        "flex w-full flex-row justify-between rounded-r-sm pr-4 text-start",
        // {
        //   "bg-green-500/20 text-green-800": event.status === "Baixado",
        //   "bg-red-500/20 text-red-800": event.status === "Rejeitado",
        // },
      )}
    >
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="flex flex-row items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-4.5 w-4.5 items-center justify-center">
                  <Layers />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="start"
                className="border-primary border bg-white p-3"
              >
                <div className="font-bold text-[#6C7386]">
                  <span className="mr-1">Nome:</span>
                  <span className="text-primary">{event.name}</span>
                </div>
                <div className="font-bold text-[#6C7386]">
                  <span className="mr-1">Data:</span>
                  <span className="text-primary">
                    {event.start.toLocaleDateString()}
                  </span>
                </div>
                <div className="font-bold text-[#6C7386]">
                  <span className="mr-1">Movimento:</span>
                  <span className="text-primary">{event.movementType}</span>
                </div>
                <div className="font-bold text-[#6C7386]">
                  <span className="mr-1">Valor:</span>
                  <span className="text-primary">
                    {viewAllValues ? event.value : "********"}
                  </span>
                </div>
                <div className="font-bold text-[#6C7386]">
                  <span className="mr-1">Parcelas:</span>
                  <span className="text-primary">{event.installments}</span>
                </div>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm font-bold">{event.name}</span>
        </div>

        {event.installments && <small className="text-xs">{event.type}</small>}
        <div className="flex flex-row items-center gap-2">
          <small className="text-xs">
            {viewAllValues ? event.value : "********"}
          </small>
          {event.installments && (
            <small className="font-bold">{event.installments}</small>
          )}
        </div>
      </div>
      <div className="flex h-full flex-col items-center justify-center self-center">
        <div className="mt-1 mb-1 flex w-40 rounded-md bg-white">
          <div
            className={cn(
              "w-full text-center",
              event.status === "Pago"
                ? "rounded-md border border-[#00A181] bg-[#00A181]/20 px-2 py-1 text-[#00A181]"
                : event.status === "Atrasado"
                  ? "rounded-md border border-[#EF4444] bg-[#EF4444]/20 px-2 py-1 text-[#EF4444]"
                  : "rounded-md border border-[#D4A300] bg-[#D4A300]/20 px-2 py-1 text-[#D4A300]",
            )}
          >
            {event.status}{" "}
          </div>{" "}
        </div>
      </div>
    </button>
  );
}
